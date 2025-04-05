const app = getApp();

Page({
  data: {
    userInfo: null,
    
    // 表单数据
    sportTypes: ['篮球', '足球', '网球', '羽毛球', '乒乓球', '游泳', '健身', '瑜伽', '跑步'],
    sportTypeIndex: -1,
    date: '',
    minDate: '',
    maxDate: '',
    timeSlots: ['上午 (08:00-12:00)', '下午 (14:00-18:00)', '晚上 (19:00-22:00)'],
    timeSlotIndex: -1,
    remark: '',
    remarkLength: 0,
    
    // 表单状态
    isFormValid: false
  },
  
  onLoad: function() {
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
    
    // 设置日期范围：今天到未来30天
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);
    
    this.setData({
      minDate: this.formatDate(today),
      maxDate: this.formatDate(futureDate)
    });
  },
  
  // 格式化日期为YYYY-MM-DD
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 运动项目选择变更
  onSportTypeChange(e) {
    this.setData({
      sportTypeIndex: parseInt(e.detail.value)
    });
    this.checkFormValidity();
  },
  
  // 日期选择变更
  onDateChange(e) {
    this.setData({
      date: e.detail.value
    });
    this.checkFormValidity();
  },
  
  // 时间段选择变更
  onTimeSlotChange(e) {
    this.setData({
      timeSlotIndex: parseInt(e.detail.value)
    });
    this.checkFormValidity();
  },
  
  // 备注信息变更
  onRemarkInput(e) {
    const text = e.detail.value;
    this.setData({
      remark: text,
      remarkLength: text.length
    });
  },
  
  // 检查表单是否有效
  checkFormValidity() {
    const isValid = 
      this.data.sportTypeIndex !== -1 && 
      this.data.date && 
      this.data.timeSlotIndex !== -1;
    
    this.setData({
      isFormValid: isValid
    });
  },
  
  // 提交报名信息
  async submitRegistration() {
    if (!this.data.isFormValid) {
      return;
    }
    
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    try {
      // 构建报名数据
      const registrationData = {
        userId: this.data.userInfo._id || '',
        username: this.data.userInfo.username || '',
        openid: this.data.userInfo.openid || '',
        sportType: this.data.sportTypes[this.data.sportTypeIndex],
        sportDate: this.data.date,
        timeSlot: this.data.timeSlots[this.data.timeSlotIndex],
        remark: this.data.remark,
        createdAt: new Date(),
        status: 'active' // 状态：active-有效, cancelled-已取消
      };
      
      // 调用云函数保存数据
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'addRegistration',
          registrationData: registrationData
        }
      });
      
      if (result && result.result && result.result.success) {
        wx.hideLoading();
        
        wx.showModal({
          title: '报名成功',
          content: '您已成功报名参加' + registrationData.sportType + '活动',
          showCancel: false,
          success: () => {
            // 返回到仪表盘页面
            wx.navigateBack();
          }
        });
      } else {
        throw new Error(result.result?.message || '报名失败');
      }
    } catch (error) {
      wx.hideLoading();
      console.error('报名失败：', error);
      
      wx.showModal({
        title: '报名失败',
        content: error.message || '请稍后重试',
        showCancel: false
      });
    }
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
}); 