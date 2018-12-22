"use strict";
const ScheduleModel = require('../model/schedule');
const PeriodModel = require('../model/period');

const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let uid = ctx.request.body.uid;
    let monthInfoTodo = await ScheduleModel.getMonthInfoTodo(year, month);
    let monthInfoAll = await ScheduleModel.getMonthInfoAll(year, month);
    let monthInfo = [];
    for (let i=0; i<monthInfoAll.length; i++) {
        let dayInfo = monthInfoAll[i];
        dayInfo['status'] = 2;
        for (let j = 0; j < monthInfoTodo.length; j++) {
            if (monthInfoTodo[j].day === dayInfo.day) {
                let day = dayInfo.day;
                let dayTodo = await ScheduleModel.getDayTodo(year, month, day);
                let userDayTodo = await PeriodModel.getUserDayTodo(year, month, day, uid);
                for (let i=0; i<userDayTodo.length; i++) {
                    let timeid = userDayTodo[i].timeid;
                    for (let j=0; j<dayTodo.length; j++) {
                        if (dayTodo[j].id === timeid) {
                            dayTodo.splice(j,1);
                            break;
                        }
                    }
                }
                if (dayTodo.length !== 0) {
                    dayInfo.status = 1;
                }
                break;
            }
        }
        monthInfo.push(dayInfo)
    }
    ctx.body = monthInfo;
    ctx.status = 200;
};
const getDayTodo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let uid = ctx.request.body.uid;
    let dayTodo = await ScheduleModel.getDayTodo(year, month, day);
    let userDayTodo = await PeriodModel.getUserDayTodo(year, month, day, uid);
    for (let i=0; i<userDayTodo.length; i++) {
        let timeid = userDayTodo[i].timeid;
        for (let j=0; j<dayTodo.length; j++) {
            if (dayTodo[j].id === timeid) {
                dayTodo.splice(j,1);
                break;
            }
        }
    }
    ctx.body = dayTodo;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMonthInfo':getMonthInfo,
    'POST /getDayTodo':getDayTodo,

};
module.exports.securedRouters = {

};