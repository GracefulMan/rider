'use strict';
const connection=require('../index');

// SELECT
const getScheduleById=(id)=>{
    let _sql = `SELECT * FROM public.r_schedule WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const getScheduleTodoByDate=(start, end)=>{
    let _sql = `SELECT * FROM public.r_schedule WHERE status = 1 AND
    start_time > '${start}' AND end_time < '${end}';`;
    return connection.pgSQL(_sql);
};
const getScheduleAllByDate=(start, end)=>{
    let _sql = `SELECT * FROM public.r_schedule WHERE 
    start_time > '${start}' AND end_time < '${end}';`;
    return connection.pgSQL(_sql);
};

const getMonthTodo=(year, month)=>{
    let _sql = `SELECT year, month, day FROM public.r_schedule 
    WHERE status = 1 AND year = ${year} AND month = ${month} 
    GROUP BY year, month, day ORDER BY day;`;
    return connection.pgSQL(_sql);
};
const getMonthAll=(year, month)=>{
    let _sql = `SELECT year, month, day FROM public.r_schedule 
    WHERE year = ${year} AND month = ${month} 
    GROUP BY year, month, day ORDER BY day;`;
    return connection.pgSQL(_sql);
};
const getDayTodo=(year, month, day)=>{
    let _sql = `SELECT * FROM public.r_schedule WHERE status = 1 AND 
    year = ${year} AND month = ${month} AND day = ${day};`;
    return connection.pgSQL(_sql);
};

// UPDATE
const changeScheduleNumSigned=(id, num)=>{
    let _sql = `UPDATE public.r_schedule SET num_signed = ${num} WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const changeScheduleStatus=(id, status)=>{
    let _sql = `UPDATE public.r_schedule SET status = ${status} WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

// INSERT
const addSchedule=(year, month, day, period, start_time, end_time, num_needed)=>{
    let _sql = `INSERT INTO public.r_schedule (year, month, day, period, start_time, end_time, 
    num_needed, num_signed, status)VALUES
    (${year}, ${month}, ${day}, '${period}', '${start_time}', '${end_time}', ${num_needed}, 0, 1);`;
    return connection.pgSQL(_sql);
};

// DELETE
const deleteSchedule=(id)=>{
    let _sql = `DELETE FROM public.r_schedule WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

module.exports={
    getScheduleById,
    getScheduleTodoByDate,
    getScheduleAllByDate,
    getMonthTodo,
    getMonthAll,
    getDayTodo,

    changeScheduleNumSigned,
    changeScheduleStatus,

    addSchedule,

    deleteSchedule
};