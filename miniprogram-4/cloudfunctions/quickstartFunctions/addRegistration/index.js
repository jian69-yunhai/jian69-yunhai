// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const registrationsCollection = db.collection('registrations')

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('添加报名信息请求，参数：', event)
  
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  try {
    // 验证必填字段
    const registrationData = event.registrationData || {}
    
    if (!registrationData.sportType || !registrationData.sportDate || !registrationData.timeSlot) {
      return {
        success: false,
        message: '缺少必要的报名信息'
      }
    }
    
    // 检查是否已经有相同的报名记录
    const checkResult = await registrationsCollection.where({
      userId: registrationData.userId,  
      sportType: registrationData.sportType,
      sportDate: registrationData.sportDate,
      timeSlot: registrationData.timeSlot,
      status: 'active'
    }).get()
    
    // 如果存在重复报名，返回错误
    if (checkResult.data && checkResult.data.length > 0) {
      return {
        success: false,
        message: '您已经报名参加该时间段的该运动项目，请勿重复报名'
      }
    }
    
    // 添加系统字段
    const now = new Date()
    const finalData = {
      ...registrationData,
      openid: openid,  // 使用服务端获取的openid以确保安全
      createdAt: now,
      updatedAt: now,
      status: 'active'
    }
    
    console.log('准备添加报名记录：', finalData)
    
    // 添加到数据库
    const addResult = await registrationsCollection.add({
      data: finalData
    })
    
    console.log('报名记录添加成功：', addResult)
    
    return {
      success: true,
      message: '报名成功',
      registrationId: addResult._id
    }
  } catch (error) {
    console.error('添加报名记录失败：', error)
    return {
      success: false,
      message: '报名失败',
      error: error
    }
  }
} 