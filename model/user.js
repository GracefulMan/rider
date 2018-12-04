'use strict';
const connection=require('../index');
const getTestById=(id)=>{
    let _sql = `SELECT * FROM user_info WHERE id = ${id}`;
    return connection.query(_sql);
};

const getUserInfoById=(id)=>{
    let _sql = `SELECT * FROM user WHERE id = ${id}`;
    return connection.query(_sql);
};
const getUserTodo=(uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && (status = 1 || status = 3)`;
    return connection.query(_sql);
};
const getUserMonthDone=(year, month, uid)=>{
    let _sql = `SELECT DISTINCT day FROM rider_period WHERE year = ${year} && month = ${month} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};
const getUserDayDone=(year, month, day, uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE year = ${year} && month = ${month} && day = ${day} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};

module.exports={
    getTestById,
    getUserInfoById,
    getUserTodo,
    getUserMonthDone,
    getUserDayDone,
};