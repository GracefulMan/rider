"use strict";
const HomeModel = require('../model/home');
const getMonthInfo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let monthInfoTodo = await HomeModel.getMonthInfoTodo(year, month);
    let monthInfoAll = await HomeModel.getMonthInfoAll(year, month);
    let monthInfo = [];
    for (let i=0; i<monthInfoAll.length; i++) {
      let dayInfo = monthInfoAll[i];
      dayInfo['status'] = 2;
      monthInfo.push(dayInfo)
    };
    ctx.body = monthInfo;
    ctx.status = 200;
};
const getDayTodo = async ctx =>{
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let uid = ctx.request.body.uid;
    let dayTodo = await HomeModel.getDayTodo(year, month, day);
    console.log(dayTodo);
    let userDayTodo = await HomeModel.getUserDayTodo(year, month, day, uid);
    console.log(userDayTodo);
    for (let i=0; i<userDayTodo.length; i++) {
        let timeid = userDayTodo[i].timeid;
        for (let j=0; j<dayTodo.length; j++) {
            if (dayTodo[j].id === timeid) {
                dayTodo.splice(j,1);
                break;
            }
        } ;
    };
    ctx.body = dayTodo;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMonthInfo':getMonthInfo,
    'POST /getDayTodo':getDayTodo,

};
module.exports.securedRouters = {

};