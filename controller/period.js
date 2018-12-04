"use strict";
const PeriodModel = require('../model/peirod');
const addPeriod = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const deletePeriod = async ctx =>{
    let id  = ctx.request.body.id;
    let deletePeriod = await PeriodModel.deletePeriod(id);
    let result = {};
    result['deletePeriod'] = deletePeriod;
    result['msg'] = '取消成功';
    ctx.body = result;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /addPeriod':addPeriod,
    'POST /deletePeriod':deletePeriod,

};
module.exports.securedRouters = {

};