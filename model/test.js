'use strict';
const connection=require('../index');

// SELECT
const test1=(id)=>{
    let _sql = `SELECT * FROM public.schedule WHERE id = ${id} OR id = 3;`;
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
const test4=(id, num)=>{
    let _sql = `UPDATE public.schedule SET num_signed = ${num} WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const changeScheduleStatus=(id, status)=>{
    let _sql = `UPDATE time_schedule SET status = ${status} WHERE id = ${id};`;
    return connection.query(_sql);
};

// INSERT
const test2=(startTime, endTime, numNeeded)=>{
    let _sql = `INSERT INTO public.schedule (start_time, end_time, num_needed, num_signed, status)VALUES
    ('${startTime}', '${endTime}', ${numNeeded}, 0, 1);`;
    return connection.pgSQL(_sql);
};

// DELETE
const test3=(id)=>{
    let _sql = `DELETE FROM public.schedule WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

module.exports={
    test1,
    test2,
    test3,
    test4,

};