"use strict";
const ScheduleModel = require('../model/schedule');
const PeriodModel = require('../model/period');

// 添加班次
const addPeriod = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let schedule = await ScheduleModel.getScheduleById(timeid);
    let num = schedule[0].num_signed;
    let scheduleStatus = await scheduleCheckNum(timeid);
    if (scheduleStatus === 1) {
        num += 1 ;
        await ScheduleModel.changeScheduleNumSigned(timeid, num);  // 班次报名人数+1
        await scheduleCheckNum(timeid);  // 检查班次
        await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
        ctx.body = '添加成功';
        ctx.status = 200;
    } else {
        ctx.body = '添加失败';
        ctx.status = 403;
    }
};

// 取消班次
const deletePeriod = async ctx =>{
    let id  = ctx.request.body.id;
    await PeriodModel.deletePeriod(id);  // 删除班次
    let period = await PeriodModel.getPeriod(id);
    let timeid = period[0].timeid;
    let schedule = await ScheduleModel.getScheduleById(timeid);
    let num = schedule[0].num_signed - 1;
    await ScheduleModel.changeScheduleNumSigned(timeid, num);  // 班次报名人数-1
    await scheduleCheckNum(timeid);  // 检查班次
    ctx.body = '取消成功';
    ctx.status = 200;
};

// 用户待完成 只包含待完成
const periodsTodoOnly = async ctx =>{
    let id  = ctx.query.id;
    ctx.body = await PeriodModel.getUserTodoOnly(id);
    ctx.status = 200;
};
// 用户待完成 包含待完成和等待中
const periodsTodoAll = async ctx =>{
    let id  = ctx.query.id;
    ctx.body = await PeriodModel.getUserTodoAll(id);
    ctx.status = 200;
};


// Todo 检测班次，返回状态 1 空余 2 已满 3 过期
const scheduleCheckNum = async (id)=>{
    let schedule = await ScheduleModel.getScheduleById(id);
    if (schedule[0].num_signed >= schedule[0].num_needed && schedule[0].status === 1) {
        await ScheduleModel.changeScheduleStatus(id, 2);
        return 2;
    } else if (schedule[0].num_signed < schedule[0].num_needed && schedule[0].status === 2) {
        await ScheduleModel.changeScheduleStatus(id, 1);
        return 1;
    } else {
        return schedule[0].status;
    }
};




module.exports.routers = {
    'POST /addPeriod':addPeriod,
    'POST /deletePeriod':deletePeriod,

    'GET /periods/todo/only': periodsTodoOnly,
    'GET /periods/todo/all': periodsTodoAll,

};
module.exports.securedRouters = {

};