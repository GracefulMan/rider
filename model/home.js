'use strict';
const connection=require('../index');
const getMonthInfo=(year, month)=>{
    let _sql = `SELECT day, status FROM time_schedule WHERE year = ${year} && month = ${month} && status = 1`;
    return connection.query(_sql);
};

module.exports={
    getMonthInfo
};