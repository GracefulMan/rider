'use strict';
const connection=require('../index');
const getMyTransfer=(uidA, status)=>{
    let _sql = `SELECT * FROM rider_transfer WHERE uidA = ${uidA} && status = ${status};`;
    return connection.query(_sql);
};

const submitMyTransfer=(uidA, userphoneA, uidB, userphoneB, periods)=>{
    let _sql = `INSERT INTO rider_transfer (uidA, userphoneA, uidB, userphoneB, periods, status)VALUES
    (${uidA}, ${userphoneA}, ${uidB}, ${userphoneB}, "${periods}", 1);`;
    return connection.query(_sql);
};

const cancelMyTransfer=(id)=>{
    let _sql = `UPDATE rider_transfer SET status = 4 WHERE id = ${id};`;
    return connection.query(_sql);
};

const getOthersTransfer=(uidB, status)=>{
    let _sql = `SELECT * FROM rider_transfer WHERE uidB = ${uidB} && status = ${status};`;
    return connection.query(_sql);
};

const acceptOthersTransfer=(id)=>{
    let _sql = `UPDATE rider_transfer SET status = 2 WHERE id = ${id};`;
    return connection.query(_sql);
};

const rejectOthersTransfer=(id)=>{
    let _sql = `UPDATE rider_transfer SET status = 3 WHERE id = ${id};`;
    return connection.query(_sql);
};


const getTransferById=(id)=>{
    let _sql = `SELECT * FROM rider_transfer WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    getMyTransfer,
    submitMyTransfer,
    cancelMyTransfer,
    getOthersTransfer,
    acceptOthersTransfer,
    rejectOthersTransfer,
    getTransferById
};