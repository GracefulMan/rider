"use strict";
const jwt = require('../middleware/jwt');
const config = require('../config');

const RUserModel =  require('../model/rider_user');
const commonFunction = require('../middleware/commonFunction');

// Todo 获取用户当前是否有排班
/*
const checkUserPeriod = async(ctx)=>{
    let mobile = ctx.query.mobile;
    let checkUser = await UserModel.getUserInfoByPhone(mobile);
    let result = {};
    if (checkUser.length === 0) {
        result['msg'] = "用户不存在或微信未绑定账号";
        ctx.body = result;
        ctx.status = 401;
        return
    }
    let thisDate = new Date();
    let year = thisDate.getFullYear();
    let month = thisDate.getMonth() + 1;
    let date = thisDate.getDate();
    let hour = thisDate.getHours(); //获取当前小时数(0-23)
    let minute = thisDate.getMinutes(); //获取当前分钟数(0-59)
    let checkTime = "";
    if (minute < 30) {
        checkTime = hour + ":00-" + hour + ":30";
    } else {
        let nextHour = hour + 1;
        checkTime = hour + ":30-" + nextHour + ":00";
    }
    let now = [year, month, date, hour, minute, checkTime];
    let checkResult = await PeriodModel.checkPeriodByPhoneTime(mobile, year, month, date, checkTime);
    if (checkResult.length === 0) {
        result['status'] = 0;
        result['msg'] = "骑手当前时间没有排班";
    } else {
        result['status'] = 1;
        result['msg'] = "骑手当前时间有排班";
    }
    ctx.body = result;
    ctx.status = 200;
}; */

// 添加用户
const addUser = async ctx =>{
    let mobile = ctx.request.body.mobile;
    let nickName = ctx.request.body.nickName;
    let avatar = ctx.request.body.avatar;
    let openId = ctx.request.body.openId;
    let userId = ctx.request.body.userId;
    let checkUser = await RUserModel.getUserInfoByMobile(mobile);
    if (checkUser.length === 0) {
        await RUserModel.addUser(mobile, userId, openId, avatar, nickName);
        ctx.body = '用户绑定成功';
        ctx.status = 200;
    } else {
        ctx.body = '绑定用户已存在，请勿重复提交';
        ctx.status = 403;
    }
};

// 用户微信登录
const userLoginByWechat = async ctx =>{
    let code = ctx.query.code;
    let url ="https://api.weixin.qq.com/sns/jscode2session?appid="+config.appid+"&secret="+config.appsecret+"&js_code="+code+"&grant_type=authorization_code";
    let openId = await commonFunction.openidAPI(url);
    if (openId === undefined || openId.length !== 28) {
        ctx.status = 410;
        return;
    }
    let userInfo = await RUserModel.getUserInfoByOpenId(openId);
    if (userInfo.length === 0) {
        ctx.status = 401;
        ctx.body = "用户未绑定微信";
    } else {
        let token = jwt.issue({uid: userInfo[0].id, openId: openId});
        ctx.body = token;
        ctx.status = 200;
    }
};

// 获取用户信息
const getUserInfo = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    let userInfo = await RUserModel.getUserInfoById(uid);
    if (userInfo.length === 0) {
        ctx.status = 410;
        ctx.body = "未获取到用户信息";
    } else {
        let result = {};
        result['phone'] = userInfo[0].phone;
        result['total_time'] = userInfo[0].total_time;
        result['default_time'] = userInfo[0].default_time;
        ctx.body = result;
        ctx.status = 200;
    }
};


module.exports.routers = {
    'GET /rider/user/login': userLoginByWechat,
    'POST /rider/user/add':addUser
};
module.exports.securedRouters = {

    'GET /rider/user/info': getUserInfo
};