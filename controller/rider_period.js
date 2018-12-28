"use strict";
const jwt = require('../middleware/jwt');
const RScheduleModel = require('../model/rider_schedule');
const RPeriodModel = require('../model/rider_period');
const RUserModel = require('../model/rider_user');

// Todo 添加班次
const periodAdd = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    let scheduleId = ctx.request.body.scheduleId;
    let car = ctx.request.body.car;
    let schedule = await RScheduleModel.getScheduleById(scheduleId);
    let num = schedule[0].num_signed;
    let scheduleStatus = await scheduleCheckNum(scheduleId);
    if (scheduleStatus === 1) {
        num += 1 ;
        await RScheduleModel.changeScheduleNumSigned(scheduleId, num);  // 班次报名人数+1
        await scheduleCheckNum(scheduleId);  // 检查班次
        let userInfo = await RUserModel.getUserInfoById(uid);
        let mobile = userInfo[0].mobile;
        let start_time = schedule[0].start_time;
        await RPeriodModel.addPeriod(scheduleId, uid, mobile, start_time, car);
        ctx.body = '添加成功';
        ctx.status = 200;
    } else {
        ctx.body = '添加失败';
        ctx.status = 403;
    }
};

// Todo 取消班次 Todo token检测
const periodDelete = async ctx =>{
    let id  = ctx.request.body.id;
    let period = await RPeriodModel.getPeriod(id);
    let schedule_id = period[0].schedule_id;
    await RPeriodModel.deletePeriod(id);  // 删除班次
    let schedule = await RScheduleModel.getScheduleById(schedule_id);
    let num = schedule[0].num_signed - 1;
    await RScheduleModel.changeScheduleNumSigned(schedule_id, num);  // 班次报名人数-1
    await scheduleCheckNum(schedule_id);  // 检查班次
    ctx.body = '取消成功';
    ctx.status = 200;
};

// Todo 用户待完成 只包含待完成
const periodTodoOnly = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    ctx.body = await RPeriodModel.getUserTodoOnly(uid);
    ctx.status = 200;
};
// Todo 用户待完成 包含待完成和等待中
const periodTodoAll = async ctx =>{
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    ctx.body = await RPeriodModel.getUserTodoAll(uid);
    ctx.status = 200;
};


// Todo 检测班次，返回状态 1 空余 2 已满 3 过期
const scheduleCheckNum = async (id)=>{
    let schedule = await RScheduleModel.getScheduleById(id);
    if (schedule[0].num_signed >= schedule[0].num_needed && schedule[0].status === 1) {
        await RScheduleModel.changeScheduleStatus(id, 2);
        return 2;
    } else if (schedule[0].num_signed < schedule[0].num_needed && schedule[0].status === 2) {
        await RScheduleModel.changeScheduleStatus(id, 1);
        return 1;
    } else {
        return schedule[0].status;
    }
};

// Todo 获取用户月份已完成
const getUserMonthDone = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    let userMonthDone = await RPeriodModel.getUserMonthDone(year, month, uid);
    console.log(userMonthDone);
    for (let i=0; i<userMonthDone.length; i++) {
        userMonthDone[i]['status'] = 3;
    }
    ctx.body = userMonthDone;
    ctx.status = 200;
};

module.exports.routers = {
    'POST /rider/period/delete':periodDelete,

};
module.exports.securedRouters = {
    'GET /rider/period/todo/only': periodTodoOnly,
    'GET /rider/period/todo/all': periodTodoAll,

    'POST /rider/period/add':periodAdd,

    'POST /rider/period/done/month': getUserMonthDone,

};