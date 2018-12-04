'use strict';
const connection=require('../index');
const getMonthInfo=(year, month)=>{
    let _sql = `SELECT * FROM time_schedule WHERE year = ${year} && month = ${month}`;
    return connection.query(_sql);
};

module.exports={
    getMonthInfo
};