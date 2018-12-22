"use strict";
const jwt = require('../middleware/jwt');
const ScheduleModel = require('../model/schedule');
const PeriodModel = require('../model/period');
const UserModel = require('../model/user');

// 添加班次
const periodAdd = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
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
        let userinfo = await UserModel.getUserInfoById(uid);
        let userphone = userinfo[0].phone;
        await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
        ctx.body = '添加成功';
        ctx.status = 200;
    } else {
        ctx.body = '添加失败';
        ctx.status = 403;
    }
};

// 取消班次
const periodDelete = async ctx =>{
    let id  = ctx.request.body.id;
    let period = await PeriodModel.getPeriod(id);
    let timeid = period[0].timeid;
    await PeriodModel.deletePeriod(id);  // 删除班次
    let schedule = await ScheduleModel.getScheduleById(timeid);
    let num = schedule[0].num_signed - 1;
    await ScheduleModel.changeScheduleNumSigned(timeid, num);  // 班次报名人数-1
    await scheduleCheckNum(timeid);  // 检查班次
    ctx.body = '取消成功';
    ctx.status = 200;
};

// 用户待完成 只包含待完成
const periodTodoOnly = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    ctx.body = await PeriodModel.getUserTodoOnly(uid);
    ctx.status = 200;
};
// 用户待完成 包含待完成和等待中
const periodTodoAll = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    ctx.body = await PeriodModel.getUserTodoAll(uid);
    ctx.status = 200;
};


// 检测班次，返回状态 1 空余 2 已满 3 过期
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
    'POST /period/delete':periodDelete,

};
module.exports.securedRouters = {
    'GET /period/todo/only': periodTodoOnly,
    'GET /period/todo/all': periodTodoAll,

    'POST /period/add':periodAdd,
};