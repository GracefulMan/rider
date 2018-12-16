"use strict";
const jwt = require('../middleware/jwt');
const UserModel =  require('../model/user');
const commonFunction = require('../middleware/commonFunction');
const config = require('../config');

const loginByWechat = async(ctx)=>{
    let url ="https://api.weixin.qq.com/sns/jscode2session?appid="+config.appid+"&secret="+config.appsecret+"&js_code="+ctx.params.code+"&grant_type=authorization_code";
    let result =await commonFunction.apireq(url);
    if(result===undefined||result.length!==28) {
        ctx.status = 410;
        return;
    }
    ctx.body=result;
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
    'GET /loginByWechat:code':loginByWechat,

    'GET /getTestInfo':getTestInfo,
    'GET /getUserInfo':getUserInfo,
    'GET /getUserTodo':getUserTodo,
    'POST /getUserMonthDone':getUserMonthDone,
    'POST /getUserDayDone':getUserDayDone,

};
module.exports.securedRouters = {

};