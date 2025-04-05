const app = getApp();

Page({
  data: {
    userInfo: null,
    isLoading: false
  },

  onLoad: function(options) {
    // 检查用户是否已登录
    if (app.globalData.isAuthenticated && app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
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
  
  // 报名按钮点击事件
  handleSignUp() {
    wx.navigateTo({
      url: '/pages/registration/index'
    });
  },
  
  // 取消按钮点击事件
  handleCancel() {
    wx.navigateTo({
      url: '/pages/cancel-registration/index'
    });
  },
  
  // 统计按钮点击事件
  handleStats() {
    wx.navigateTo({
      url: '/pages/statistics/index'
    });
  },
  
  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除全局用户数据
          app.globalData.userInfo = null;
          app.globalData.isAuthenticated = false;
          
          // 返回登录页
          wx.redirectTo({
            url: '/pages/index/index'
          });
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  }
}); 