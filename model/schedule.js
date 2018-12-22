'use strict';
const connection=require('../index');

// SELECT
const getScheduleById=(id)=>{
    let _sql = `SELECT * FROM time_schedule WHERE id = ${id};`;
    return connection.query(_sql);
};

// UPDATE
const changeScheduleNumSigned=(id, num)=>{
    let _sql = `UPDATE time_schedule SET num_signed = ${num} WHERE id = ${id};`;
    return connection.query(_sql);
};

const changeScheduleStatus=(id, status)=>{
    let _sql = `UPDATE time_schedule SET status = ${status} WHERE id = ${id};`;
    return connection.query(_sql);
};

// INSERT
const addSchedule=(year, month, day, time, num_needed)=>{
    let _sql = `INSERT INTO time_schedule (year, month, day, time, num_needed, num_signed, status)VALUES
    (${year}, ${month}, ${day}, "${time}", ${num_needed}, 0, 1);`;
    return connection.query(_sql);
};

// DELETE
const deleteSchedule=(id)=>{
    let _sql = `DELETE FROM time_schedule WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    getScheduleById,

    changeScheduleNumSigned,
    changeScheduleStatus,

    addSchedule,

    deleteSchedule
};