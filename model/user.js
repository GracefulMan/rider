'use strict';
const connection=require('../index');

const addUser=(phone, nickName, avatar, openId)=>{
    let _sql = `INSERT INTO user (phone, nick_name, avatar, openId, total_time, finish_times, unfinish_times)VALUES
    (${phone}, "${nickName}", "${avatar}", "${openId}", 0, 0, 0);`;
    return connection.query(_sql);
};

const getUserInfoByOpenId=(openId)=>{
    let _sql = `SELECT * FROM user WHERE openId = "${openId}";`;
    return connection.query(_sql);
}

const getTestById=(id)=>{
    let _sql = `SELECT * FROM user_info WHERE id = ${id}`;
    return connection.query(_sql);
};

const getUserInfoById=(id)=>{
    let _sql = `SELECT * FROM user WHERE id = ${id}`;
    return connection.query(_sql);
};
const getUserInfoByPhone=(phone)=>{
    let _sql = `SELECT * FROM user WHERE phone = "${phone}"`;
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
    getUserInfoByOpenId,

    getTestById,
    getUserInfoById,
    getUserInfoByPhone,
    getUserTodo,
    getUserMonthDone,
    getUserDayDone,
};