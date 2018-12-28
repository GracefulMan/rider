'use strict';
const connection=require('../index');

const addUser=(mobile, user_id, open_id, avatar_url, nick_name)=>{
    let _sql = `INSERT INTO public.r_user (mobile, user_id, open_id, avatar_url, nick_name, total_time, 
    default_time)VALUES('${mobile}', '${user_id}', '${open_id}', '${avatar_url}', '${nick_name}', 0, 0);`;
    return connection.pgSQL(_sql);
};

const getUserInfoByOpenId=(openId)=>{
    let _sql = `SELECT * FROM public.r_user WHERE open_id = '${openId}';`;
    return connection.pgSQL(_sql);
};
const getUserInfoById=(id)=>{
    let _sql = `SELECT * FROM public.r_user WHERE id = ${id}`;
    return connection.pgSQL(_sql);
};
const getUserInfoByMobile=(mobile)=>{
    let _sql = `SELECT * FROM public.r_user WHERE mobile = '${mobile}'`;
    return connection.pgSQL(_sql);
};

module.exports={
    addUser,

    getUserInfoByOpenId,
    getUserInfoById,
    getUserInfoByMobile,
};