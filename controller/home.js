"use strict";
const HomeModel = require('../model/home');
const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let monthInfo = await HomeModel.getMonthInfo(year, month);
    ctx.body = monthInfo;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMonthInfo':getMonthInfo,

};
module.exports.securedRouters = {

};