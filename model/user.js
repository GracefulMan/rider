'use strict';
const connection=require('../index');

const addUser=(userphone, nickname, wechat_avatar, openid)=>{
    let _sql = `INSERT INTO user (userphone, nickname, wechat_avatar, openid, total_time, finish_times, unfinish_times)VALUES
    (${userphone}, ${nickname}, ${wechat_avatar}, ${openid}, 0, 0, 0);`;
    return connection.query(_sql);
};

const getTestById=(id)=>{
    let _sql = `SELECT * FROM user_info WHERE id = ${id}`;
    return connection.query(_sql);
};

const getUserInfoById=(id)=>{
    let _sql = `SELECT * FROM user WHERE id = ${id}`;
    return connection.query(_sql);
};
const getUserInfoByPhone=(phone)=>{
    let _sql = `SELECT * FROM user WHERE userphone = ${phone}`;
    return connection.query(_sql);
};
const getUserTodo=(uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && (status = 1 || status = 3)`;
    return connection.query(_sql);
};
const getUserMonthDone=(year, month, uid)=>{
    let _sql = `SELECT DISTINCT year, month, day FROM rider_period WHERE year = ${year} && month = ${month} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};
const getUserDayDone=(year, month, day, uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE year = ${year} && month = ${month} && day = ${day} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};

module.exports={
    addUser,

    getTestById,
    getUserInfoById,
    getUserInfoByPhone,
    getUserTodo,
    getUserMonthDone,
    getUserDayDone,
};