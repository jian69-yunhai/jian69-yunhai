// app.js
App({
  onLaunch: function () {
    // 检查更新版本
    this.checkForUpdate();
    
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "",
        traceUser: true,
      });

      // 确保必要的集合存在
      this.checkAndCreateUserCollection();
      this.checkAndCreateRegistrationsCollection();
    }

    this.globalData = {
      userInfo: null,
      isAuthenticated: false,
      version: '1.1.3',
      hasNewVersion: false,
      updateReady: false,
      updateFailed: false
    };
    
    // 尝试自动登录
    this.tryAutoLogin();
  },

  // 尝试自动登录
  tryAutoLogin: async function() {
    try {
      // 从本地存储获取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        // 设置全局登录状态
        this.globalData.userInfo = userInfo;
        this.globalData.isAuthenticated = true;
        
        console.log('自动登录成功:', userInfo.username);
        
        // 如果当前在首页，直接跳转到dashboard页面
        const pages = getCurrentPages();
        if (pages.length > 0 && pages[0].route === 'pages/index/index') {
          wx.redirectTo({
            url: '/pages/dashboard/index'
          });
        }
      }
    } catch (error) {
      console.error('自动登录失败:', error);
      // 清除可能损坏的存储
      wx.removeStorageSync('userInfo');
    }
  },

  // 检查并创建users集合
  checkAndCreateUserCollection: async function() {
    try {
      // 调用云函数创建集合
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'createCollection',
          collection: 'users'
        }
      });
      
      console.log('确保users集合存在：', result);
    } catch (error) {
      console.error('检查users集合出错：', error);
    }
  },
  
  // 检查并创建registrations集合
  checkAndCreateRegistrationsCollection: async function() {
    try {
      // 调用云函数创建集合
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'createCollection',
          collection: 'registrations'
        }
      });
      
      console.log('确保registrations集合存在：', result);
    } catch (error) {
      console.error('检查registrations集合出错：', error);
    }
  },

  // 用户登录方法
  userLogin: async function (username, password) {
    try {
      if (!username || !password) {
        return {
          success: false,
          message: '用户名和密码不能为空'
        };
      }
      
      // 调用登录云函数
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'userAuth',
          action: 'login',
          username: username,
          password: password
        }
      });

      if (result.result && result.result.success) {
        // 保存用户信息到全局变量
        this.globalData.userInfo = result.result.userInfo;
        this.globalData.isAuthenticated = true;
        
        // 保存用户信息到本地存储，用于下次自动登录
        wx.setStorageSync('userInfo', result.result.userInfo);
        
        // 打印用户信息到控制台（方便调试）
        console.log('用户信息：', result.result.userInfo);
        
        // 返回成功结果
        return {
          success: true,
          message: result.result.message,
          userInfo: result.result.userInfo
        };
      } else {
        console.error('用户登录失败：', result);
        return {
          success: false,
          message: result.result?.message || '登录失败'
        };
      }
    } catch (error) {
      console.error('登录出错：', error);
      return {
        success: false,
        message: '登录失败',
        error: error
      };
    }
  },
  
  // 仅使用用户名登录方法
  userLoginByUsername: async function (username) {
    try {
      if (!username) {
        return {
          success: false,
          message: '用户名不能为空'
        };
      }
      
      // 调用登录云函数，使用仅用户名模式
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'userAuth',
          action: 'loginByUsername',
          username: username
        }
      });

      if (result.result && result.result.success) {
        // 保存用户信息到全局变量
        this.globalData.userInfo = result.result.userInfo;
        this.globalData.isAuthenticated = true;
        
        // 保存用户信息到本地存储，用于下次自动登录
        wx.setStorageSync('userInfo', result.result.userInfo);
        
        // 打印用户信息到控制台（方便调试）
        console.log('用户信息：', result.result.userInfo);
        
        // 返回成功结果
        return {
          success: true,
          message: result.result.message,
          userInfo: result.result.userInfo
        };
      } else {
        console.error('用户登录失败：', result);
        return {
          success: false,
          message: result.result?.message || '登录失败'
        };
      }
    } catch (error) {
      console.error('登录出错：', error);
      return {
        success: false,
        message: '登录失败',
        error: error
      };
    }
  },
  
  // 检查小程序更新
  checkForUpdate: function() {
    const updateManager = wx.getUpdateManager();
    
    // 监听检查更新结果
    updateManager.onCheckForUpdate(function(res) {
      // res.hasUpdate 表示是否有新版本
      console.log('是否有新版本：', res.hasUpdate);
      if (res.hasUpdate) {
        // 有新版本，将状态保存到全局变量
        getApp().globalData.hasNewVersion = true;
      }
    });
    
    // 监听新版本下载完成
    updateManager.onUpdateReady(function() {
      console.log('新版本下载完成');
      // 新版本下载完成，将状态保存到全局变量
      getApp().globalData.updateReady = true;
    });
    
    // 监听新版本下载失败
    updateManager.onUpdateFailed(function() {
      console.log('新版本下载失败');
      getApp().globalData.updateFailed = true;
    });
  },
  
  // 手动更新应用
  updateApp: function() {
    if (this.globalData.updateReady) {
      const updateManager = wx.getUpdateManager();
      // 提示用户是否重启应用
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用更新？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    } else if (this.globalData.hasNewVersion && !this.globalData.updateFailed) {
      wx.showToast({
        title: '新版本下载中，请稍后再试',
        icon: 'none',
        duration: 2000
      });
    } else if (this.globalData.updateFailed) {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败，是否重新尝试？',
        success: function(res) {
          if (res.confirm) {
            // 重新检查更新
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function() {});
          }
        }
      });
    } else {
      wx.showToast({
        title: '当前已是最新版本',
        icon: 'success',
        duration: 2000
      });
    }
  },
  
  // 用户注册方法
  userRegister: async function (username, password, userInfo = {}) {
    try {
      if (!username || !password) {
        return {
          success: false,
          message: '用户名和密码不能为空'
        };
      }
      
      // 调用注册云函数
      const result = await wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'userAuth',
          action: 'register',
          username: username,
          password: password,
          ...userInfo
        }
      });

      if (result.result && result.result.success) {
        // 注册成功，但不自动登录，需要用户手动登录
        console.log('注册成功，用户信息：', result.result.userInfo);
        
        return {
          success: true,
          message: result.result.message,
          userInfo: result.result.userInfo
        };
      } else {
        console.error('用户注册失败：', result);
        return {
          success: false,
          message: result.result?.message || '注册失败'
        };
      }
    } catch (error) {
      console.error('注册出错：', error);
      return {
        success: false,
        message: '注册失败',
        error: error
      };
    }
  },

  // 退出登录方法
  logout: function() {
    // 清除本地存储的用户信息
    wx.removeStorageSync('userInfo');
    
    // 重置全局状态
    this.globalData.userInfo = null;
    this.globalData.isAuthenticated = false;
    
    // 跳转到登录页面
    wx.redirectTo({
      url: '/pages/index/index'
    });
  }
});
