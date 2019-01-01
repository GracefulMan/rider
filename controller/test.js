"use strict";
const jwt = require('../middleware/jwt');
const commonFunction = require('../middleware/commonFunction');
const RScheduleModel = require('../model/rider_schedule');
const RPeriodModel = require('../model/rider_period');
const RUserModel = require('../model/rider_user');
const RTransferModel = require('../model/rider_transfer');


const testInfo = async ctx =>{
    let periodsArray = [3, 5];
    let timeA = [];
    let timeB = [];
    let firstTime = 10000000000000;
    for (let i=0; i<periodsArray.length; i++) {
        let period = await RPeriodModel.getPeriod(periodsArray[i]);
        timeA.push(period[0]);
        let timestamp = commonFunction.timeUTC(period[0].start_time);
        firstTime = (timestamp < firstTime ? timestamp : firstTime);
    }
    timeB.push(firstTime);
    timeB.push(commonFunction.timeDate(firstTime));
    let result = {};
    result['timeA'] = timeA;
    result['timeB'] = timeB;
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