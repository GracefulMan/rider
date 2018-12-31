"use strict";
const Koa = require('koa');
const config = require('./config');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql');
const pg = require('pg');
const logger = require('koa-logger');
//const simpleServer1 = require('simple-server')(config.fileDir1,config.filePort1);
const app = new Koa();
const routers = require('./routers');
const parse = require('co-busboy');
const fileRouter=require('koa-router')();
const multer = require('koa-multer');
//middlewires
const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,config.UPLOAD_PATH)
    },
    filename:function (req,file,cb) {
        let firFormat = (file.originalname).split(".");
        let tempFilename = Date.now()+firFormat[firFormat.length-1]+Math.random();
        tempFilename = commonFunction.md5(tempFilename);
        cb(null,tempFilename);
    }
});
var upload = multer({storage:storage});
fileRouter.post('upload',upload.single('file'),async(ctx,next)=>{
    ctx.body={
        filename:ctx.req.file.filename
    };
});
app.use(
    bodyParser({
        multipart: true
    })
);
app.use(async (ctx, next) => {
    // the body isn't multipart, so busboy can't parse it
    if (!!ctx.request.is('multipart/*')) {
        var parts = parse(ctx);
        var part;
        while ((part = await parts())) {
            if (part.length) {
                // arrays are busboy fields
                console.log('key: ' + part[0]);
                console.log('value: ' + part[1]);
            } else {
                // otherwise, it's a stream
                ctx.req.part = part;
                await next(ctx);
                return;
            }
        }
        console.log('and we are done parsing the form!');
    }
    await next();
});
app.use(routers.routers());
app.use(routers.securedRouters());
app.use(logger());
app.listen(config.port);
console.log(`connect to database ${config.database.DATABASE} at port ${config.database.PORT}`);
console.log(`listening on port ${config.port}...`);


//create mysql connection pool
const pool = mysql.createPool(
    {
        host:config.database.HOST,
        user:config.database.USERNAME,
        password:config.database.PASSWORD,
        database:config.database.DATABASE
    }
);
exports.query = (sql,values)=>{
    return new Promise((resolve , reject) =>{
        pool.getConnection( (err,connection)=>{
            if(err) reject(err);
            else {
                connection.query(sql,values,(err,rows)=>{
                    if(err) reject(err);
                    else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
};

// test create postgreSQL connection pool
const configPG = {
    host: "101.132.146.158",
    user: "postgres",
    database: "rider",
    password: "123456",
    port: 5432,

    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, //连接最大空闲时间 3s
};

const connectionString = 'postgresql://postgres:123456@101.132.146.158:5432/rider';

// 创建连接池
// var poolPG = new pg.Pool(configPG);
const poolPG = new pg.Pool({
    connectionString: connectionString
});


exports.pgSQL = async (sql,values)=>{
    let connect = await poolPG.connect();
    try {
        let res = await connect.query(sql,values);
        return res.rows;
    } catch (e){
        console.error(e.message, e.stack);
    } finally {
        connect.release();
    }
};