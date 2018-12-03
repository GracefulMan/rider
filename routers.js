'use strict';
const fs = require('fs');
const Router = require('koa-router');
const jwt = require("./middleware/jwt");
const router = new Router();
const securedRouter = new Router();
securedRouter.use(jwt.errorHandler()).use(jwt.jwt());
function add_rule(router, securedRouter, rule) {
    for (let key in rule['securedRouters']) {
        if (key.startsWith('GET ')) {
            let path = key.substring(4);
            securedRouter.get(path, rule['securedRouters'][key]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (key.startsWith('POST ')) {
            let path = key.substring(5);
            securedRouter.post(path, rule['securedRouters'][key]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (key.startsWith('DEL ')) {
            let path = key.substring(4);
            securedRouter.del(path, rule['securedRouters'][key]);
            console.log(`register URL mapping: DEL ${path}`);
        } else if (key.startsWith('PUT ')) {
            let path = key.substring(4);
            securedRouter.put(path, rule['securedRouters'][key]);
            console.log(`register URL mapping: PUT ${path}`);
        } else {
            console.log(`invalid URL: ${key}`);
        }
    }
    for (let key in rule['routers']) {
        if (key.startsWith('GET ')) {
            let path = key.substring(4);
            router.get(path, rule['routers'][key]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (key.startsWith('POST ')) {
            let path = key.substring(5);
            router.post(path, rule['routers'][key]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (key.startsWith('DEL ')) {
            let path = key.substring(4);
            router.del(path, rule['routers'][key]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (key.startsWith('PUT ')) {
            let path = key.substring(4);
            router.put(path, rule['routers'][key]);
            console.log(`register URL mapping: PUT ${path}`);
        } else {
            console.log(`invalid URL: ${key}`);
        }
    }
}

// Import all controllers
function add_rules(router, securedRouter) {
    let files = fs.readdirSync(__dirname + '/controller');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let rule = require(__dirname + '/controller/' + f);
        add_rule(router, securedRouter, rule);
    }
}

add_rules(router, securedRouter);

module.exports.routers = function () {
    return router.routes();
};
module.exports.securedRouters = function () {
    return securedRouter.routes();
};