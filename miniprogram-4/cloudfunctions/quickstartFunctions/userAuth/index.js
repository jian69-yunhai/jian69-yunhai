// 云函数入口文件
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const userCollection = db.collection('users')

// 加密密码 
function encryptPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('用户认证请求，参数：', event)
  
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  console.log('获取到openid:', openid)
  
  // 登录操作
  if (event.action === 'login') {
    try {
      // 检查必要参数
      if (!event.username || !event.password) {
        return {
          success: false,
          message: '用户名和密码不能为空'
        }
      }
      
      // 加密密码进行比对
      const encryptedPassword = encryptPassword(event.password)
      
      // 查询用户
      const userResult = await userCollection.where({
        username: event.username
      }).get()
      
      console.log('登录查询结果：', userResult)
      
      // 用户不存在
      if (userResult.data.length === 0) {
        return {
          success: false,
          message: '用户名不存在'
        }
      }
      
      const user = userResult.data[0]
      
      // 密码不匹配
      if (user.password !== encryptedPassword) {
        return {
          success: false,
          message: '密码错误'
        }
      }
      
      // 更新登录信息
      await userCollection.doc(user._id).update({
        data: {
          lastLoginTime: new Date(),
          openid: openid // 关联当前微信openid
        }
      })
      
      // 不返回密码
      delete user.password
      
      return {
        success: true,
        message: '登录成功',
        userInfo: user
      }
    } catch (error) {
      console.error('登录出错：', error)
      return {
        success: false,
        message: '登录失败',
        error: error
      }
    }
  }
  
  // 仅用户名登录操作
  else if (event.action === 'loginByUsername') {
    try {
      // 检查必要参数
      if (!event.username) {
        return {
          success: false,
          message: '用户名不能为空'
        }
      }
      
      // 查询用户
      const userResult = await userCollection.where({
        username: event.username
      }).get()
      
      console.log('用户名登录查询结果：', userResult)
      
      // 用户不存在
      if (userResult.data.length === 0) {
        return {
          success: false,
          message: '用户名不存在'
        }
      }
      
      const user = userResult.data[0]
      
      // 更新登录信息
      await userCollection.doc(user._id).update({
        data: {
          lastLoginTime: new Date(),
          openid: openid // 关联当前微信openid
        }
      })
      
      // 不返回密码
      delete user.password
      
      return {
        success: true,
        message: '登录成功',
        userInfo: user
      }
    } catch (error) {
      console.error('用户名登录出错：', error)
      return {
        success: false,
        message: '登录失败',
        error: error
      }
    }
  }
  
  // 注册操作
  else if (event.action === 'register') {
    try {
      // 检查必要参数
      if (!event.username || !event.password) {
        return {
          success: false,
          message: '用户名和密码不能为空'
        }
      }
      
      // 查询用户名是否已存在
      const checkResult = await userCollection.where({
        username: event.username
      }).get()
      
      if (checkResult.data.length > 0) {
        return {
          success: false,
          message: '用户名已存在'
        }
      }
      
      // 加密密码
      const encryptedPassword = encryptPassword(event.password)
      
      const now = new Date()
      
      // 构建用户数据
      const userData = {
        username: event.username,
        password: encryptedPassword,
        openid: openid,
        createdAt: now,
        updatedAt: now,
        lastLoginTime: now,
        nickName: event.nickName || '',
        avatarUrl: event.avatarUrl || '',
        gender: event.gender || 0,
        country: event.country || '',
        province: event.province || '',
        city: event.city || ''
      }
      
      console.log('准备创建新用户：', {...userData, password: '***'})
      
      // 添加用户到数据库
      const addResult = await userCollection.add({
        data: userData
      })
      
      console.log('新用户创建成功：', addResult)
      
      // 不返回密码
      delete userData.password
      
      return {
        success: true,
        message: '注册成功',
        userId: addResult._id,
        userInfo: userData
      }
    } catch (error) {
      console.error('注册出错：', error)
      return {
        success: false,
        message: '注册失败',
        error: error
      }
    }
  }
  
  // 其他操作类型
  else {
    return {
      success: false,
      message: '不支持的操作类型'
    }
  }
} 