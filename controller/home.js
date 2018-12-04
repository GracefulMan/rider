"use strict";
const HomeModel = require('../model/home');
const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let monthInfo = await HomeModel.getMonthInfo(year, month);
    ctx.body = monthInfo;
    ctx.status = 200;
};
const getDayInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let dayInfo = await HomeModel.getDayInfo(year, month, day);
    ctx.body = dayInfo;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMonthInfo':getMonthInfo,
    'POST /getDayInfo':getDayInfo,

};
module.exports.securedRouters = {

};