'use strict';
const connection=require('../index');

// SELECT
const test1=(id)=>{
    let _sql = `SELECT * FROM public.schedule WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const getMonthInfoTodo=(year, month)=>{
    let _sql = `SELECT DISTINCT year, month, day FROM time_schedule WHERE 
    year = ${year} && month = ${month} && status = 1`;
    return connection.query(_sql);
};
const getMonthInfoAll=(year, month)=>{
    let _sql = `SELECT DISTINCT year, month, day FROM time_schedule WHERE 
    year = ${year} && month = ${month} && (status = 1 || status = 2)`;
    return connection.query(_sql);
};
const getDayTodo=(year, month, day)=>{
    let _sql = `SELECT * FROM time_schedule WHERE year = ${year} && month = ${month} 
    && day = ${day} && status = 1`;
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
    test1,

    getMonthInfoTodo,
    getMonthInfoAll,
    getDayTodo,

    changeScheduleNumSigned,
    changeScheduleStatus,

    addSchedule,

    deleteSchedule
};