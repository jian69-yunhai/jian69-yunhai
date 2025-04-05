const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    userInfo: null,
    registrations: [],
    isLoading: false
  },

  onLoad: function() {
    // 检查用户是否已登录
    if (app.globalData.isAuthenticated && app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
      this.loadRegistrations();
    } else {
      // 如果未登录，返回首页
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        complete: () => {
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }, 1500);
        }
      });
    }
  },

  // 加载用户的报名记录
  async loadRegistrations() {
    this.setData({ isLoading: true });
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const result = await db.collection('registrations')
        .where({
          userId: this.data.userInfo._id,
          status: 'active',
          sportDate: db.command.gte(this.formatDate(today))
        })
        .orderBy('sportDate', 'asc')
        .get();

      if (result.data) {
        this.setData({
          registrations: result.data
        });
      } else {
        throw new Error('获取报名记录失败');
      }
    } catch (error) {
      console.error('加载报名记录失败：', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    } finally {
      this.setData({ isLoading: false });
    }
  },

  // 格式化日期为YYYY-MM-DD
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // 处理取消报名
  async handleCancel(e) {
    const registrationId = e.currentTarget.dataset.id;
    console.log('准备取消报名，ID:', registrationId);
    
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个报名项目吗？',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中...',
            mask: true
          });
          
          try {
            // 先检查记录是否存在
            const checkResult = await db.collection('registrations')
              .doc(registrationId)
              .get();
            
            if (!checkResult.data) {
              throw new Error('报名记录不存在');
            }

            console.log('当前记录状态:', checkResult.data.status);
            
            // 更新记录状态
            const result = await db.collection('registrations')
              .doc(registrationId)
              .update({
                data: {
                  status: 'cancelled',
                  updatedAt: new Date()
                }
              });

            console.log('更新结果:', result);

            // 检查更新是否成功
            if (result.errMsg === 'document.update:ok') {
              wx.showToast({
                title: '取消成功',
                icon: 'success'
              });
              
              // 重新加载报名记录
              this.loadRegistrations();
            } else {
              console.error('更新失败，结果:', result);
              throw new Error('更新失败，请重试');
            }
          } catch (error) {
            console.error('取消报名失败，详细错误：', error);
            wx.showToast({
              title: error.message || '取消失败',
              icon: 'none',
              duration: 2000
            });
          } finally {
            wx.hideLoading();
          }
        }
      }
    });
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
}); 