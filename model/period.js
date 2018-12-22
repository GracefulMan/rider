'use strict';
const connection=require('../index');

// SELECT
const getPeriod=(id)=>{
    let _sql = `SELECT * FROM rider_period WHERE id = ${id}`;
    return connection.query(_sql);
};
const getUserTodoOnly=(uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && status = 1;`;
    return connection.query(_sql);
};
const getUserTodoAll=(uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && (status = 1 || status = 3)`;
    return connection.query(_sql);
};

const getUserDayTodo=(year, month, day, uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && year = ${year} 
    && month = ${month} && day = ${day} && (status = 1 || status = 3)`;
    return connection.query(_sql);
};

const getPeriodByUidTimeid=(uid, timeid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && timeid = ${timeid} && (status = 1 || status = 3);`;
    return connection.query(_sql);
};

const checkPeriodByPhoneTime=(phone, year, month, day, time)=>{
    let _sql = `SELECT * FROM rider_period WHERE userphone = "${phone}" && year = ${year} 
    && month = ${month} && day = ${day} && time = "${time}" && (status = 1 || status = 2);`;
    return connection.query(_sql);
};

const getUserMonthDone=(year, month, uid)=>{
    let _sql = `SELECT DISTINCT year, month, day FROM rider_period WHERE 
    year = ${year} && month = ${month} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};

const getUserDayDone=(year, month, day, uid)=>{
    let _sql = `SELECT * FROM rider_period WHERE year = ${year} && month = ${month} && 
    day = ${day} && uid = ${uid} && status = 2`;
    return connection.query(_sql);
};

// UPDATE
const updatePeriodStatus=(id, status)=>{
    let _sql = `UPDATE rider_period SET status = ${status} WHERE id = ${id};`;
    return connection.query(_sql);
};

const updatePeriodUser=(id, uid, userphone, car)=>{
    let _sql = `UPDATE rider_period SET uid = ${uid}, userphone = ${userphone}, car = ${car} WHERE id = ${id};`;
    return connection.query(_sql);
};

// INSERT
const addPeriod=(uid, userphone, timeid, year, month, day, time, car)=>{
    let _sql = `INSERT INTO rider_period (uid, userphone, timeid, year, month, day, time, car, status)VALUES
    (${uid}, ${userphone}, ${timeid}, ${year}, ${month}, ${day}, "${time}", ${car}, 1);`;
    return connection.query(_sql);
};

// DELETE
const deletePeriod=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    getPeriod,
    getUserTodoOnly,
    getUserTodoAll,
    getUserDayTodo,
    getPeriodByUidTimeid,
    getUserMonthDone,
    getUserDayDone,
    checkPeriodByPhoneTime,

    updatePeriodStatus,
    updatePeriodUser,
    addPeriod,
    deletePeriod,
};