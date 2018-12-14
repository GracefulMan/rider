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
    ctx.body = myTransfer;
    ctx.status = 200;
};
const submitMyTransfer = async ctx =>{
    let uidA  = ctx.request.body.uidA;
    let userphoneA = ctx.request.body.userphoneA;
    let uidB  = ctx.request.body.uidB;
    let userphoneB = ctx.request.body.userphoneB;
    let periods = ctx.request.body.periods;
    let periodsArray = periods.split(",");
    let uidBPeriods = [];  // 骑手B待完成相冲突的时段
    for (let i=0; i<periodsArray.length; i++) {
        let period = await PeriodModel.getPeriod(periodsArray[i]);
        console.log(period);
        let timeid = period[0].timeid;
        let uidBPeriod = await PeriodModel.getPeriodByUidTimeid(uidB, timeid);
        if (uidBPeriod.length > 0) {
            uidBPeriods.push(uidBPeriod[0])
        }
    }
    let result = {};
    if (uidBPeriods.length > 0) {  // 骑手B班次冲突
        result['return'] = uidBPeriods;
        result['msg'] = '骑手有冲突班次';
        ctx.body = result;
        ctx.status = 403;
    } else {
        let submitMyTransfer = await TransferModel.submitMyTransfer(uidA, userphoneA, uidB, userphoneB, periods);  // 代班请求改为转让中状态
        for (let i=0; i< periodsArray.length; i++) {  // 送餐时段骑手信息改为B，状态改为待完成
            let period = await PeriodModel.getPeriod(periods[i]);
            if (period[0].status === 1) {
                await PeriodModel.updatePeriodStatus(periods[i], 3);
            }
        }
        result['return'] = submitMyTransfer;
        result['msg'] = '提交成功';
        ctx.body = result;
        ctx.status = 200;
    }
};
const cancelMyTransfer = async ctx =>{
    let id  = ctx.request.body.id;
    let cancelMyTransfer = await TransferModel.cancelMyTransfer(id);  // 代班请求改为取消状态
    let transfer = await TransferModel.getTransferById(id);
    let periods = transfer[0].periods.split(",");
    for (let i=0; i<periods.length; i++) {  // 骑手A对应班次状态回到待完成
        let period = await PeriodModel.getPeriod(periods[i]);
        if (period[0].status === 3) {
            await PeriodModel.updatePeriodStatus(periods[i], 1);
        }
    }
    let result = {};
    result['return'] = cancelMyTransfer;
    result['msg'] = '取消成功';
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
    let uidB = transfer[0].uidB;
    let userphoneB = transfer[0].userphoneB;
    let uidBPeriods = [];  // 骑手B待完成相冲突的时段
    for (let i=0; i< periods.length; i++) {
        let period = await PeriodModel.getTimeidById(periods[i]);
        let timeid = period[0].timeid;
        let uidBPeriod = await PeriodModel.getPeriodByUidTimeid(uidB, timeid);
        if (uidBPeriod.length > 0) {
            uidBPeriods.push(uidBPeriod[0])
        }
    }
    let result = {};
    if (uidBPeriods.length > 0) {  // 骑手B班次冲突
        result['return'] = uidBPeriods;
        result['msg'] = '骑手有冲突班次';
        ctx.body = result;
        ctx.status = 403;
    } else {
        let acceptOthersTransfer = await TransferModel.acceptOthersTransfer(id);  // 代班请求改为已接受状态
        for (let i=0; i< periods.length; i++) {  // 送餐时段骑手信息改为B，状态改为待完成
            let period = await PeriodModel.getPeriod(periods[i]);
            if (period[0].status === 3) {
                await PeriodModel.updatePeriodStatus(periods[i], 1);
                await PeriodModel.updatePeriodUser(periods[i], uidB, userphoneB);
            }
        }
        result['return'] = acceptOthersTransfer;
        result['msg'] = '接受成功';
        ctx.body = result;
        ctx.status = 200;
    }
};
const rejectOthersTransfer = async ctx =>{
    let id  = ctx.request.body.id;
    let rejectOthersTransfer = await TransferModel.rejectOthersTransfer(id);  // 代班请求改为被拒绝状态
    let transfer = await TransferModel.getTransferById(id);
    let periods = transfer[0].periods.split(",");
    for (let i=0; i<periods.length; i++) {  // 骑手A对应班次状态回到待完成
        let period = await PeriodModel.getPeriod(periods[i]);
        if (period[0].status === 3) {
            await PeriodModel.updatePeriodStatus(periods[i], 1);
        }
    }
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