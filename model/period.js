'use strict';
const connection=require('../index');


const checkPeriodByPhoneTime=(phone, year, month, day, time)=>{
    let _sql = `SELECT * FROM rider_period WHERE userphone = "${phone}" && year = ${year} 
    && month = ${month} && day = ${day} && time = "${time}" && (status = 1 || status = 2);`;
    return connection.query(_sql);
};

const addPeriod=(uid, userphone, timeid, year, month, day, time, car)=>{
    let _sql = `INSERT INTO rider_period (uid, userphone, timeid, year, month, day, time, car, status)VALUES
    (${uid}, ${userphone}, ${timeid}, ${year}, ${month}, ${day}, "${time}", ${car}, 1);`;
    return connection.query(_sql);
};

const deletePeriod=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

const getPeriod=(id)=>{
    let _sql = `SELECT * FROM rider_period WHERE id = ${id}`;
    return connection.query(_sql);
};


const getTimeidById=(id)=>{
    let _sql = `SELECT timeid FROM rider_period WHERE id = ${id}`;
    return connection.query(_sql);
};

const getPeriodByUidTimeid=(uid, timeid)=>{
    let _sql = `SELECT * FROM rider_period WHERE uid = ${uid} && timeid = ${timeid} && (status = 1 || status = 3);`;
    return connection.query(_sql);
};

const updatePeriodStatus=(id, status)=>{
    let _sql = `UPDATE rider_period SET status = ${status} WHERE id = ${id};`;
    return connection.query(_sql);
};

const updatePeriodUser=(id, uid, userphone)=>{
    let _sql = `UPDATE rider_period SET uid = ${uid}, userphone = ${userphone} WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    checkPeriodByPhoneTime,

    addPeriod,
    deletePeriod,
    getPeriod,

    getTimeidById,
    getPeriodByUidTimeid,
    updatePeriodStatus,
    updatePeriodUser
};