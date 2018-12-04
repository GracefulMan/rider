'use strict';
const connection=require('../index');
const getMonthInfo=(year, month)=>{
    let _sql = `SELECT DISTINCT day FROM time_schedule WHERE year = ${year} && month = ${month} && status = 1`;
    return connection.query(_sql);
};
const getDayInfo=(year, month, day)=>{
    let _sql = `SELECT * FROM time_schedule WHERE year = ${year} && month = ${month} && day = ${day} && status = 1`;
    return connection.query(_sql);
};

module.exports={
    getMonthInfo,
    getDayInfo
};