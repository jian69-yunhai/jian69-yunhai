// app.js
App({
  onLaunch: function () {
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
      isAuthenticated: false
    };
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
  }
});
