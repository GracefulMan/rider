'use strict';
const config = require('../config');
const crypto = require('crypto');
const request = require('request');

const UserModel =  require('../model/user');
const PeriodModel =  require('../model/period');
const ScheduleModel =  require('../model/schedule');
const TransferModel =  require('../model/transfer');
const commonFunction = require('../middleware/commonFunction');

// Todo 检测班次，返回状态 1 空余 2 已满 3 过期
const scheduleCheckNum = async (id)=>{
    let schedule = await ScheduleModel.getScheduleById(id);
    if (schedule[0].num_signed >= schedule[0].num_needed && schedule[0].status === 1) {
        await ScheduleModel.changeScheduleStatus(id, 2);
        return 2;
    } else if (schedule[0].num_signed < schedule[0].num_needed && schedule[0].status === 2) {
        await ScheduleModel.changeScheduleStatus(id, 1);
        return 1;
    } else {
        return schedule[0].status;
    }
};


module.exports = {
    scheduleCheckNum,
};