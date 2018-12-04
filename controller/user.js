"use strict";
const UserModel = require('../model/user');
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
    'GET /getTestInfo':getTestInfo,
    'GET /getUserInfo':getUserInfo,
    'GET /getUserTodo':getUserTodo,
    'POST /getUserMonthDone':getUserMonthDone,
    'POST /getUserDayDone':getUserDayDone,

};
module.exports.securedRouters = {

};