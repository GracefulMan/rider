"use strict";
const TransferModel = require('../model/transfer');
const PeriodModel = require('../model/period');
const getMyTransfer = async ctx =>{
    let uidA  = ctx.request.body.uid;
    let userphoneA = ctx.request.body.userphone;
    let status = ctx.request.body.status;
    let myTransfer = await TransferModel.getMyTransfer(uidA, status);
    for (let i=0; i<myTransfer.length; i++) {
        let periods = myTransfer[i].periods.split(",");
        console.log(periods);
        let timeList = [];
        for (let j=0; j<periods.length; j++) {
            let period = await PeriodModel.getPeriod(Number(periods[j]));
            timeList.push(period[0]);
        }
        myTransfer[i]['timeList'] = timeList;
        console.log(myTransfer);
    }
    let result = myTransfer;
    ctx.body = result;
    ctx.status = 200;
};
const submitMyTransfer = async ctx =>{
    let uidA  = ctx.request.body.uidA;
    let userphoneA = ctx.request.body.userphoneA;
    let uidB  = ctx.request.body.uidB;
    let userphoneB = ctx.request.body.userphoneB;
    let periods = ctx.request.body.periods;
    let addPeriod = await PeriodModel.addPeriod(uid, userphone, timeid, year, month, day, time, car);
    let result = {};
    result['addPeriod'] = addPeriod;
    result['msg'] = '添加成功';
    ctx.body = result;
    ctx.status = 200;
};
const cancelMyTransfer = async ctx =>{
    let id  = ctx.request.body.id;
    let cancelMyTransfer = await TransferModel.cancelMyTransfer(id);
    let result = {};
    result['return'] = cancelMyTransfer;
    result['msg'] = '删除成功';
    ctx.body = result;
    ctx.status = 200;
};
const getOthersTransfer = async ctx =>{
    let uidB  = ctx.request.body.uid;
    let userphoneB = ctx.request.body.userphone;
    let status = ctx.request.body.status;
    let othersTransfer = await TransferModel.getOthersTransfer(uidB, status);
    for (let i=0; i<othersTransfer.length; i++) {
        let periods = othersTransfer[i].periods.split(",");
        console.log(periods);
        let timeList = [];
        for (let j=0; j<periods.length; j++) {
            let period = await PeriodModel.getPeriod(Number(periods[j]));
            timeList.push(period[0]);
        }
        othersTransfer[i]['timeList'] = timeList;
        console.log(othersTransfer);
    }
    let result = othersTransfer;
    ctx.body = result;
    ctx.status = 200;
};
const acceptOthersTransfer = async ctx =>{
    let id  = ctx.request.body.id;
    let transfer = await  TransferModel.getTransferById(id);
    let periods = transfer[0].periods.split(",");
    let uidB = transfer.uidB;
    let uidBPeriods = []; // 骑手B待完成相冲突的时段
    for (let i=0; i< periods.length; i++) {
        let period = await PeriodModel.getTimeidById(periods[i]);
        let timeid = period[0].timeid;
        let uidBPeriod = await PeriodModel.getPeriodByUidTimeid(uidB, timeid);
        console.log(uidBPeriod);
        if (uidBPeriod > 0) {
            uidBPeriods.push(uidBPeriod[0])
        }
    }
    let result = {};
    console.log(uidBPeriods);
    if (uidBPeriods.length > 0) {
        result['return'] = uidBPeriods;
        result['msg'] = '骑手有冲突班次';
        ctx.body = result;
        ctx.status = 403;
    } else {
        let acceptOthersTransfer = await TransferModel.acceptOthersTransfer(id);
        result['return'] = acceptOthersTransfer;
        result['msg'] = '删除成功';
        ctx.body = result;
        ctx.status = 200;
    }
};
const rejectOthersTransfer = async ctx =>{
    let id  = ctx.request.body.id;
    let rejectOthersTransfer = await TransferModel.rejectOthersTransfer(id);
    let result = {};
    result['return'] = rejectOthersTransfer;
    result['msg'] = '拒绝成功';
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