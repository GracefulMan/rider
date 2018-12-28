'use strict';
const connection=require('../index');


// Todo 检测某个人在某个时间是否有班次 外部接口
const checkPeriodByPhoneTime=(uid, date)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = '${phone} && year = ${year} 
    && month = ${month} && day = ${day} && time = "${time}" && (status = 1 || status = 3);`;
    return connection.pgSQL(_sql);
};

// SELECT
const getPeriod=(id)=>{
    let _sql = `SELECT * FROM public.r_period WHERE id = ${id}`;
    return connection.pgSQL(_sql);
};
const getUserTodoOnly=(uid)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND status = 1;`;
    return connection.pgSQL(_sql);
};
const getUserTodoAll=(uid)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND (status = 1 OR status = 3);`;
    return connection.pgSQL(_sql);
};
const getUserTodoByTime=(start, end, uid)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND (status = 1 OR status = 3) 
    AND start_time > '${start}' AND start_time < '${end}'`;
    return connection.pgSQL(_sql);
};
const getPeriodByUidScheduleId=(uid, schedule_id)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND (status = 1 OR status = 3) 
    AND schedule_id = ${schedule_id};`;
    return connection.pgSQL(_sql);
};
const getUserDone=(start, end, uid)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND status = 2
    AND start_time > '${start}' AND start_time < '${end}';`;
    return connection.pgSQL(_sql);
};

// UPDATE
const updatePeriodStatus=(id, status)=>{
    let _sql = `UPDATE public.r_period SET status = ${status} WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const updatePeriodUser=(id, uid, mobile, car)=>{
    let _sql = `UPDATE public.r_period SET uid = ${uid}, mobile = '${mobile}', car_had = ${car} 
    WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

// INSERT
const addPeriod=(schedule_id, uid, mobile, start_time, car_had)=>{
    let _sql = `INSERT INTO public.r_period (schedule_id, uid, mobile, start_time, car_had, status)VALUES
    (${schedule_id}, ${uid}, '${mobile}', '${start_time}', ${car_had}, 1);`;
    return connection.pgSQL(_sql);
};

// DELETE
const deletePeriod=(id)=>{
    let _sql = `DELETE FROM public.r_period WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

module.exports={
    getPeriod,
    getUserTodoOnly,
    getUserTodoAll,
    getUserTodoByTime,
    getPeriodByUidScheduleId,
    getUserDone,

    checkPeriodByPhoneTime,

    updatePeriodStatus,
    updatePeriodUser,
    addPeriod,
    deletePeriod,
};