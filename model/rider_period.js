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
    let _sql = `SELECT r_period.id, r_period.status, r_schedule.year, r_schedule.month, r_schedule.day, 
    r_schedule.period, r_period.schedule_id, r_schedule.start_time 
    FROM public.r_period INNER JOIN public.r_schedule ON r_period.schedule_id = r_schedule.id
    WHERE r_period.id = ${id}`;
    return connection.pgSQL(_sql);
};
const getUserTodoOnly=(uid)=>{
    let _sql = `SELECT r_period.id, r_period.status, r_schedule.year, r_schedule.month, r_schedule.day, 
    r_schedule.period 
    FROM public.r_period INNER JOIN public.r_schedule ON r_period.schedule_id = r_schedule.id
    WHERE r_period.uid = ${uid} AND r_period.status = 1 AND
    r_schedule.start_time > now()
    ORDER BY r_schedule.start_time;`;
    return connection.pgSQL(_sql);
};
const getUserTodoAll=(uid)=>{
    let _sql = `SELECT r_period.id, r_period.status, r_schedule.year, r_schedule.month, r_schedule.day, 
    r_schedule.period 
    FROM public.r_period INNER JOIN public.r_schedule ON r_period.schedule_id = r_schedule.id
    WHERE r_period.uid = ${uid} AND (r_period.status = 1 OR r_period.status = 3) AND 
    r_schedule.start_time > now()
    ORDER BY r_schedule.start_time;`;
    return connection.pgSQL(_sql);
};
const getUserTodoDay=(year, month, day, uid)=>{
    let _sql = `SELECT public.r_schedule.id FROM public.r_schedule 
    INNER JOIN public.r_period ON r_period.schedule_id = r_schedule.id
    WHERE r_period.uid = ${uid} AND r_schedule.year = ${year} AND r_schedule.month = ${month} AND 
    r_schedule.day = ${day} AND (r_period.status = 1 OR r_period.status = 3);`;
    return connection.pgSQL(_sql);
};
const getPeriodByUidScheduleId=(uid, schedule_id)=>{
    let _sql = `SELECT * FROM public.r_period WHERE uid = ${uid} AND (status = 1 OR status = 3) 
    AND schedule_id = ${schedule_id};`;
    return connection.pgSQL(_sql);
};
const getUserMonthDone=(year, month, uid)=>{
    let _sql = `SELECT r_schedule.year, r_schedule.month, r_schedule.day FROM public.r_schedule 
    INNER JOIN public.r_period ON r_period.schedule_id = r_schedule.id
    WHERE r_period.uid = ${uid} AND r_schedule.year = ${year} AND r_schedule.month = ${month} AND 
    r_period.status = 2
    GROUP BY year, month, day ORDER BY day;`;
    return connection.pgSQL(_sql);
};
const getUserDayDone=(year, month, day, uid)=>{
    let _sql = `SELECT r_schedule.period FROM public.r_schedule 
    INNER JOIN public.r_period ON r_period.schedule_id = r_schedule.id
    WHERE r_period.uid = ${uid} AND r_schedule.year = ${year} AND r_schedule.month = ${month} AND 
    r_schedule.day = ${day} AND r_period.status = 2
    ORDER BY r_period.start_time;`;
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
const addPeriod=(schedule_id, uid, mobile, car_had)=>{
    let _sql = `INSERT INTO public.r_period (schedule_id, uid, mobile, car_had, status)VALUES
    (${schedule_id}, ${uid}, '${mobile}', ${car_had}, 1);`;
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
    getUserTodoDay,
    getPeriodByUidScheduleId,
    getUserMonthDone,
    getUserDayDone,

    checkPeriodByPhoneTime,

    updatePeriodStatus,
    updatePeriodUser,
    addPeriod,
    deletePeriod,
};