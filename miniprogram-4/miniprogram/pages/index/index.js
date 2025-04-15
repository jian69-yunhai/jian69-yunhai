const { envList } = require("../../envList");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

const app = getApp();

Page({
  data: {
    knowledgePoints: QuickStartPoints,
    steps: QuickStartSteps,
    isLoading: false,
    userInfo: null,
    isAuthenticated: false,
    version: '',
    
    // 用户名密码登录相关
    username: '',
    password: '',
    confirmPassword: '',
    isRegisterMode: false, // 是否为注册模式
    showPassword: false,   // 是否显示密码
    errorMessage: ''       // 错误信息
  },

  onLoad: function() {
    // 设置应用版本号
    this.setData({
      version: app.globalData.version
    });
    
    // 检查用户是否已登录
    if (app.globalData.isAuthenticated && app.globalData.userInfo) {
      // 如果已登录，直接跳转到dashboard页面
      wx.redirectTo({
        url: '/pages/dashboard/index'
      });
    }
  },
  
  // 切换注册/登录模式
  switchMode() {
    this.setData({
      isRegisterMode: !this.data.isRegisterMode,
      errorMessage: '',
      confirmPassword: ''
    });
  },
  
  // 切换密码显示/隐藏
  togglePasswordVisibility() {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },
  
  // 输入用户名
  inputUsername(e) {
    this.setData({
      username: e.detail.value,
      errorMessage: ''
    });
  },
  
  // 输入密码
  inputPassword(e) {
    this.setData({
      password: e.detail.value,
      errorMessage: ''
    });
  },
  
  // 输入确认密码
  inputConfirmPassword(e) {
    this.setData({
      confirmPassword: e.detail.value,
      errorMessage: ''
    });
  },
  
  // 表单提交（登录/注册）
  async formSubmit() {
    // 表单验证
    if (!this.data.username) {
      this.setData({ errorMessage: '请输入用户名' });
      return;
    }
    
    // 注册模式下还需要密码
    if (this.data.isRegisterMode) {
      if (!this.data.password) {
        this.setData({ errorMessage: '请输入密码' });
        return;
      }
      
      if (!this.data.confirmPassword) {
        this.setData({ errorMessage: '请确认密码' });
        return;
      }
      
      if (this.data.password !== this.data.confirmPassword) {
        this.setData({ errorMessage: '两次输入的密码不一致' });
        return;
      }
      
      if (this.data.password.length < 6) {
        this.setData({ errorMessage: '密码至少需要6个字符' });
        return;
      }
    }
    
    this.setData({ isLoading: true });
    
    try {
      let result;
      
      if (this.data.isRegisterMode) {
        // 注册
        wx.showLoading({ title: '注册中...' });
        result = await app.userRegister(this.data.username, this.data.password);
        
        if (result.success) {
          // 注册成功后自动登录
          wx.showLoading({ title: '登录中...' });
          // 使用刚注册的用户名密码执行登录
          result = await app.userLogin(this.data.username, this.data.password);
        }
      } else {
        // 登录 - 只需要用户名
        wx.showLoading({ title: '登录中...' });
        result = await app.userLoginByUsername(this.data.username);
      }
      
      if (result.success) {
        this.setData({
          userInfo: result.userInfo,
          isAuthenticated: true,
          errorMessage: ''
        });
        
        wx.showToast({
          title: result.message || (this.data.isRegisterMode ? '注册并登录成功' : '登录成功'),
          icon: 'success',
          success: () => {
            // 登录成功后跳转到dashboard页面
            setTimeout(() => {
              // 登录成功后跳转到dashboard页面
              wx.redirectTo({
                url: '/pages/dashboard/index'
              });
            }, 1000);
          }
        });
      } else {
        this.setData({
          errorMessage: result.message || (this.data.isRegisterMode ? '注册失败' : '登录失败')
        });
      }
    } catch (error) {
      console.error('操作失败', error);
      this.setData({
        errorMessage: error.message || '操作失败'
      });
    } finally {
      this.setData({ isLoading: false });
      wx.hideLoading();
    }
  },

  copyCode(e) {
    const code = e.target?.dataset?.code || '';
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({
          title: '已复制',
        })
      },
      fail: (err) => {
        console.error('复制失败-----', err);
      }
    })
  },

  discoverCloud() {
    wx.navigateTo({
      url: '/pages/examples/index',
    })
  },

  // 进入仪表盘页面
  gotoGoodsListPage() {
    wx.redirectTo({
      url: '/pages/dashboard/index',
    })
  },
  
  // 检查更新
  checkUpdate() {
    app.updateApp();
  },
  
  // 退出登录
  logout() {
    app.logout();
  }
});
