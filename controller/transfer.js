"use strict";
const TransferModel = require('../model/transfer');
const PeriodModel = require('../model/period');
const getMyTransfer = async ctx =>{
    let uidA  = ctx.request.body.uidA;
    let userphoneA = ctx.request.body.userphoneA;
    let status = ctx.request.body.status;
    let myTransfer = await TransferModel.getMyTransfer(uidA, status);
    for (let i=0; i<myTransfer.length; i++) {
        let periods = myTransfer[i].periods.split(",");
        console.log(periods);
        let timeList = [];
        for (let j=0; j<periods.length; j++) {
            console.log(Number(periods[j]))
            let period = await PeriodModel.getPeriod(Number(periods[j]));
            timeList.push(period);
            console.log(period);
        }
        myTransfer[i]['timeList'] = timeList;
        console.log(myTransfer);
    }
    let result = {};
    result['myTransfer'] = myTransfer;
    result['msg'] = '查询成功';
    ctx.body = result;
    ctx.status = 200;
};
const submitMyTransfer = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const cancelMyTransfer = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const getOthersTransfer = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const acceptOthersTransfer = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const rejectOthersTransfer = async ctx =>{
    let uid  = ctx.request.body.uid;
    let userphone = ctx.request.body.userphone;
    let timeid = ctx.request.body.timeid;
    let year = ctx.request.body.year;
    let month = ctx.request.body.month;
    let day = ctx.request.body.day;
    let time = ctx.request.body.time;
    let car = ctx.request.body.car;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};


module.exports.routers = {
    'POST /getMyTransfer':getMyTransfer,
    'POST /submitMyTransfer':submitMyTransfer,
    'POST /cancelMyTransfer':cancelMyTransfer,
    'POST /getOthersTransfer':getOthersTransfer,
    'POST /acceptOthersTransfer':acceptOthersTransfer,
    'POST /rejectOthersTransfer':rejectOthersTransfer,

};
module.exports.securedRouters = {

};