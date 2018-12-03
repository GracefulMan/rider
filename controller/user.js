"use strict";
const UserModel = require('../model/user');
const getTestInfo = async ctx =>{
    let id  = ctx.query.id;
    let userInfo = await UserModel.getTestById(id);
    ctx.body = userInfo;
    ctx.status = 200;
};
module.exports.routers = {
    'GET /getTestInfo':getTestInfo
};
module.exports.securedRouters = {

};