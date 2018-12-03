'use strict';
const connection=require('../index');
const getTestById=(id)=>{
    let _sql = `SELECT * FROM user_info WHERE id = ${id}`;
    return connection.query(_sql);

}

module.exports={
    getTestById
};