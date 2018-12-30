'use strict';
const connection=require('../index');

// SELECT
const getTransferById=(id)=>{
    let _sql = `SELECT * FROM public.r_transfer WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const getMyTransfer=(uidA)=>{
    let _sql = `SELECT * FROM public.r_transfer WHERE finder_id = ${uidA} AND status != 4;`;
    return connection.pgSQL(_sql);
};

const getOthersTransfer=(uidB)=>{
    let _sql = `SELECT * FROM public.r_transfer WHERE acceptor_id = ${uidB} AND status != 4;`;
    return connection.pgSQL(_sql);
};

// INSERT
const submitMyTransfer=(uidA, mobileA, uidB, mobileB, periods, start_time)=>{
    let _sql = `INSERT INTO public.r_transfer (finder_id, finder_mobile, acceptor_id, 
    acceptor_mobile, periods, first_start_time, status)VALUES(${uidA}, '${mobileA}', ${uidB}, 
    '${mobileB}', '${periods}', '${start_time}', 1);`;
    return connection.pgSQL(_sql);
};

// UPDATE
const cancelMyTransfer=(id)=>{
    let _sql = `UPDATE public.r_transfer SET status = 4 WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const acceptOthersTransfer=(id)=>{
    let _sql = `UPDATE public.r_transfer SET status = 2 WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};

const rejectOthersTransfer=(id)=>{
    let _sql = `UPDATE public.r_transfer SET status = 3 WHERE id = ${id};`;
    return connection.pgSQL(_sql);
};


module.exports={
    getTransferById,
    getMyTransfer,
    getOthersTransfer,

    submitMyTransfer,

    cancelMyTransfer,
    acceptOthersTransfer,
    rejectOthersTransfer,

};