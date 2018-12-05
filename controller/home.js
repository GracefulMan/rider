"use strict";
const HomeModel = require('../model/home');
const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let monthInfo = await HomeModel.getMonthInfo(year, month);
    ctx.body = monthInfo;
    ctx.status = 200;
};
const getDayTodo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let uid = ctx.request.body.uid;
    let dayTodo = await HomeModel.getDayTodo(year, month, day);
    let userDayTodo = await HomeModel.getUserDayTodo(year, month, day, uid);
    let dayTodoNew = [];
    for (let i=0; i<userDayTodo.length; i++) {
        let timeid = userDayTodo[i].timeid;
        for (let j=0; j<dayTodo.length; j++) {
            if (dayTodo[j].id != timeid) {
                dayTodoNew.push(dayTodo[j]);
            } ;
        } ;
    };
    ctx.body = dayTodoNew;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMonthInfo':getMonthInfo,
    'POST /getDayInfo':getDayTodo,

};
module.exports.securedRouters = {

};