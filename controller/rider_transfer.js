"use strict";
const jwt = require('../middleware/jwt');
const RScheduleModel = require('../model/rider_schedule');
const RPeriodModel = require('../model/rider_period');
const RUserModel = require('../model/rider_user');
const RTransferModel = require('../model/rider_transfer');

const getMyTransfer = async ctx =>{
    let token = jwt.getToken(ctx);
    let uidA = token.uid;
    let myTransfer = await TransferModel.getMyTransfer(uidA);
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
    let token = jwt.getToken(ctx);
    let uidA = token.uid;
    let userphoneB = ctx.request.body.userphoneB;
    let periods = ctx.request.body.periods;
    let userB = await UserModel.getUserInfoByPhone(userphoneB);
    let result = {};
    if (userB.length === 0) {
        result['msg'] = '填入的骑手用户不存在或未绑定微信';
        ctx.body = result;
        ctx.status = 406;
        return
    }
    let userA = await UserModel.getUserInfoById(uidA);
    let userphoneA = userA[0].phone;
    let uidB = userB[0].id;
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
    if (uidBPeriods.length > 0) {  // 骑手B班次冲突
        result['return'] = uidBPeriods;
        result['msg'] = '骑手有冲突班次';
        ctx.body = result;
        ctx.status = 403;
    } else {
        let submitMyTransfer = await TransferModel.submitMyTransfer(uidA, userphoneA, uidB, userphoneB, periods);  // 代班请求改为转让中状态
        for (let i=0; i< periodsArray.length; i++) {  // 骑手A对应班次状态改为待完成
            let period = await PeriodModel.getPeriod(periodsArray[i]);
            console.log(period);
            if (period[0].status === 1) {
                await PeriodModel.updatePeriodStatus(periodsArray[i], 3);
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
    let token = jwt.getToken(ctx);
    let uidB = token.uid;
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
    let car = ctx.request.body.car;
    let transfer = await  TransferModel.getTransferById(id);
    let periods = transfer[0].periods.split(",");
    let uidB = transfer[0].uidB;
    let userphoneB = transfer[0].userphoneB;
    let uidBPeriods = [];  // 骑手B待完成相冲突的时段
    for (let i=0; i< periods.length; i++) {
        let period = await PeriodModel.getPeriod(periods[i]);
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
                await PeriodModel.updatePeriodUser(periods[i], uidB, userphoneB, car);
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
    'POST /transfer/cancel':cancelMyTransfer,
    'POST /transfer/accept':acceptOthersTransfer,
    'POST /transfer/reject':rejectOthersTransfer,

};
module.exports.securedRouters = {
    'GET /transfer/user':getMyTransfer,
    'POST /transfer/submit':submitMyTransfer,
    'POST /transfer/others':getOthersTransfer,
};