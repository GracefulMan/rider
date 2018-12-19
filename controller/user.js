"use strict";
const jwt = require('../middleware/jwt');
const UserModel =  require('../model/user');
const PeriodModel =  require('../model/period');
const commonFunction = require('../middleware/commonFunction');
const config = require('../config');
const request = require('request');

// 获取用户当前是否有排班
const checkUserPeriod = async(ctx)=>{
    let mobile = ctx.query.mobile;
    let checkUser = await UserModel.getUserInfoByPhone(mobile);
    if (checkUser.length === 0) {
        ctx.body = "用户不存在或微信未绑定账号";
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
    console.log(now);
    let checkResult = await PeriodModel.checkPeriodByPhoneTime(mobile, year, month, date, checkTime);
    let result = {};
    if (checkResult.length === 0) {
        result['status'] = 0;
        result['msg'] = "骑手当前时间没有排班";
    } else {
        result['status'] = 1;
        result['msg'] = "骑手当前时间有排班";
    }
    ctx.body = result;
    ctx.status = 200;
};

const loginGetOpenId = async(ctx)=>{
    let code = ctx.query.code;
    let url ="https://api.weixin.qq.com/sns/jscode2session?appid="+config.appid+"&secret="+config.appsecret+"&js_code="+code+"&grant_type=authorization_code";
    let result = await commonFunction.apireq(url);
    if(result===undefined||result.length!==28) {
        ctx.status = 410;
        return;
    }
    ctx.body=result;
};

const loginByWechat2 = async(ctx)=>{
    let code = ctx.query.code;
    let result = await loginTest(code);
    console.log(result);
    /*
    if(result===undefined||result.length!==28) {
        ctx.status = 410;
        return;
    }*/
    ctx.body=result;
};

const loginTest = async(code) =>{
    return new Promise(function(resolve, reject){
        //做一些异步操作
        request({
            method:"POST",
            url:"http://139.196.71.238:8081/user/common/login",
            headers:{
                "content-type":"application/json",
                "X-Device-Id":"fdajflkdjkafj11d"
            },
            body:{
                "loginType":"WECHAT_AUTH",
                "wechatCode":code
            },
            json:true      //这个针对body是不是支持json
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                let data = body;
                resolve(data);
            }
        })
    })
};


const addUser = async ctx =>{
    let phone = ctx.request.body.phone;
    let nickName = ctx.request.body.nickName;
    let avatar = ctx.request.body.avatar;
    let openId = ctx.request.body.openId;
    let result = await UserModel.addUser(phone, nickName, avatar, openId);
    ctx.body = result;
    ctx.status = 200;
};

const getUserInfoByCode = async ctx =>{
    let code = ctx.query.code;
    let url ="https://api.weixin.qq.com/sns/jscode2session?appid="+config.appid+"&secret="+config.appsecret+"&js_code="+code+"&grant_type=authorization_code";
    let openId = await commonFunction.apireq(url);
    console.log(openId);
    if (openId === undefined || openId.length !== 28) {
        ctx.status = 410;
        return;
    }
    let userInfo = await UserModel.getUserInfoByOpenId(openId);
    if (userInfo.length === 0) {
        ctx.status = 411;
        ctx.body = "用户未绑定微信";
    } else {
        ctx.body = userInfo;
        ctx.status = 200;
    }
};


const getTestInfo = async ctx =>{
    let id  = ctx.query.id;
    let userInfo = await UserModel.getTestById(id);
    ctx.body = userInfo;
    ctx.status = 200;
};
const getUserInfo = async ctx =>{
    let id  = ctx.query.id;
    let userInfo = await UserModel.getUserInfoById(id);
    ctx.body = userInfo;
    ctx.status = 200;
};
const getUserTodo = async ctx =>{
    let id  = ctx.query.id;
    let periodsTodo = await UserModel.getUserTodo(id);
    ctx.body = periodsTodo;
    ctx.status = 200;
};
const getUserMonthDone = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let uid = ctx.request.body.uid;
    let userMonthDone = await UserModel.getUserMonthDone(year, month, uid);
    for (let i=0; i<userMonthDone.length; i++) {
        userMonthDone[i]['status'] = 3;
    }
    ctx.body = userMonthDone;
    ctx.status = 200;
};
const getUserDayDone = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let uid = ctx.request.body.uid;
    let userDayDone = await UserModel.getUserDayDone(year, month, day, uid);
    ctx.body = userDayDone;
    ctx.status = 200;
};


module.exports.routers = {
    'GET /checkUserPeriod': checkUserPeriod,

    'GET /loginGetOpenId':loginGetOpenId,
    'GET /loginByWechat2':loginByWechat2,

    'POST /addUser':addUser,
    'GET /getUserInfoByCode':getUserInfoByCode,


    'GET /getTestInfo':getTestInfo,
    'GET /getUserInfo':getUserInfo,
    'GET /getUserTodo':getUserTodo,
    'POST /getUserMonthDone':getUserMonthDone,
    'POST /getUserDayDone':getUserDayDone,

};
module.exports.securedRouters = {

};