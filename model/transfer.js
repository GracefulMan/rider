'use strict';
const connection=require('../index');
const getMyTransfer=(uidA, status)=>{
    let _sql = `SELECT * FROM rider_transfer WHERE uidA = ${uidA} && status = ${status};`;
    return connection.query(_sql);
};

const submitMyTransfer=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

const cancelMyTransfer=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

const getOthersTransfer=(uidB, status)=>{
    let _sql = `SELECT * FROM rider_transfer WHERE uidB = ${uidB} && status = ${status};`;
    return connection.query(_sql);
};

const acceptOthersTransfer=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

const rejectOthersTransfer=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    getMyTransfer,
    submitMyTransfer,
    cancelMyTransfer,
    getOthersTransfer,
    acceptOthersTransfer,
    rejectOthersTransfer
};