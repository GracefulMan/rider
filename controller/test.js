"use strict";
const jwt = require('../middleware/jwt');
const ScheduleModel = require('../model/schedule');
const PeriodModel = require('../model/period');
const TestModel = require('../model/test');
const RScheduleModel = require('../model/rider_schedule');
const RPeriodModel = require('../model/rider_period');
const RUserModel = require('../model/rider_user');
const RTransferModel = require('../model/rider_transfer');

const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let token = jwt.getToken(ctx);
    let uid = token.uid;
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
    let token = jwt.getToken(ctx);
    let uid = token.uid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
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

const testInfo = async ctx =>{
    let periodsArray = [1, 3, 5];
    let timeA = [];
    for (let i=0; i<periodsArray.length; i++) {
        let period = await RPeriodModel.getPeriod(1);
        let test = await RPeriodModel.getPeriod(1);
        console.log(period);
        console.log(period);
        //let start_time = period[0].start_time;
        //console.log(start_time);
        //let date = new Date(start_time);
        //console.log(date);
        //timeA.push(date);
    }
    let result = {};
    result['sql'] = timeA;
    result['status'] = 'run';
    ctx.body = result;
    ctx.status = 200;
};

const testInsert = async ctx =>{
    let result = {};
    result['sql'] = await TestModel.test2('2018-12-25 18:00', '2018-12-25 18:30', 10);
    result['status'] = 'run';
    ctx.body = result;
    ctx.status = 200;
};


const testDelete = async ctx =>{
    let result = {};
    result['sql'] = await TestModel.test3(3);
    result['status'] = 'run';
    ctx.body = result;
    ctx.status = 200;
};

const testUpdate = async ctx =>{
    let result = {};
    result['sql'] = await TestModel.test4(2, 5);
    result['status'] = 'run';
    ctx.msg = 'run';
    ctx.body = result;
    ctx.status = 200;
};


module.exports.routers = {
    'GET /test/info': testInfo,
    'GET /test/insert': testInsert,
    'GET /test/delete': testDelete,
    'GET /test/update': testUpdate,
};
module.exports.securedRouters = {

};