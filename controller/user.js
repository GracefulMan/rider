"use strict";
const jwt = require('../middleware/jwt');
const UserModel =  require('../model/user');
const commonFunction = require('../middleware/commonFunction');
const config = require('../config');
const request = require('request');

const loginByWechat = async(ctx)=>{
    let code = ctx.query.code;
    let url ="https://api.weixin.qq.com/sns/jscode2session?appid="+config.appid+"&secret="+config.appsecret+"&js_code="+code+"&grant_type=authorization_code";
    let result =await commonFunction.apireq(url);
    if(result===undefined||result.length!==28) {
        ctx.status = 410;
        return;
    }
    ctx.body=result;
};

const loginByWechat2 = async(ctx)=>{
    let code = ctx.query.code;
    let result =await loginTest(code);
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
                "content-type":"application/json"
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
                let data = JSON.parse(body);
                resolve(data);
            }
        })
    })
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
    'GET /loginByWechat':loginByWechat,
    'POST /loginByWechat2':loginByWechat2,


    'GET /getTestInfo':getTestInfo,
    'GET /getUserInfo':getUserInfo,
    'GET /getUserTodo':getUserTodo,
    'POST /getUserMonthDone':getUserMonthDone,
    'POST /getUserDayDone':getUserDayDone,

};
module.exports.securedRouters = {

};