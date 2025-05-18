const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    userInfo: null,
    
    // 表单数据
    sportTypes: ['篮球', '足球', '网球', '羽毛球', '乒乓球', '游泳', '健身', '瑜伽', '跑步'],
    sportTypeIndex: 3,
    date: '',
    minDate: '',
    maxDate: '',
    timeSlots: ['上午 (08:00-12:00)', '下午 (14:00-18:00)', '晚上 (18:00-21:00)'],
    timeSlotIndex: 2,
    
    // 表单状态
    isFormValid: false,
    
    // 统计结果
    hasResult: false,
    registrationCount: 0,
    registrationsList: [] // 存储报名明细数据
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
    
    // 设置日期范围
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 30); // 过去30天
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30); // 未来30天
    
    this.setData({
      minDate: this.formatDate(pastDate),
      maxDate: this.formatDate(futureDate),
      date: this.formatDate(today)
    });
    
    this.checkFormValidity();
  },
  
  // 格式化日期为YYYY-MM-DD
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 运动项目选择变化
  onSportTypeChange(e) {
    this.setData({
      sportTypeIndex: parseInt(e.detail.value)
    });
    this.checkFormValidity();
  },
  
  // 日期选择变化
  onDateChange(e) {
    this.setData({
      date: e.detail.value
    });
    this.checkFormValidity();
  },
  
  // 时间段选择变化
  onTimeSlotChange(e) {
    this.setData({
      timeSlotIndex: parseInt(e.detail.value)
    });
    this.checkFormValidity();
  },
  
  // 检查表单是否有效
  checkFormValidity() {
    const isValid = 
      this.data.date && 
      this.data.timeSlotIndex !== -1;
    
    this.setData({
      isFormValid: isValid
    });
  },
  
  // 查询统计
  async queryStatistics() {
    if (!this.data.isFormValid) {
      return;
    }
    
    wx.showLoading({
      title: '查询中...',
      mask: true
    });
    
    try {
      // 构建查询条件
      const query = {
        sportDate: this.data.date,
        timeSlot: this.data.timeSlots[this.data.timeSlotIndex],
        status: 'active'
      };
      
      // 如果选择了特定的运动项目，添加到查询条件
      if (this.data.sportTypeIndex !== -1) {
        query.sportType = this.data.sportTypes[this.data.sportTypeIndex];
      }
      
      // 查询数据库获取数量
      const countResult = await db.collection('registrations')
        .where(query)
        .count();
      
      // 使用分页获取所有记录
      const MAX_LIMIT = 20; // 小程序云开发单次查询最大限制
      const totalCount = countResult.total;
      const batchTimes = Math.ceil(totalCount / MAX_LIMIT);
      const tasks = [];
      
      // 创建多个查询任务
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('registrations')
          .where(query)
          .field({
            username: true,
            sportDate: true,
            sportType: true,
            status: true,
            timeSlot: true
          })
          .orderBy('sportDate', 'asc')
          .skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT)
          .get();
        
        tasks.push(promise);
      }
      
      // 等待所有查询完成并合并结果
      const results = await Promise.all(tasks);
      const allRegistrations = [];
      
      // 合并所有查询结果
      results.forEach(result => {
        allRegistrations.push(...result.data);
      });
      
      // 更新统计结果
      this.setData({
        hasResult: true,
        registrationCount: totalCount,
        registrationsList: allRegistrations
      });
      
      wx.hideLoading();
      
    } catch (error) {
      wx.hideLoading();
      console.error('查询失败：', error);
      
      wx.showModal({
        title: '查询失败',
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