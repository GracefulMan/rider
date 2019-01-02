'use strict';
const config = require('../config');
const crypto = require('crypto');
const request = require('request');

// Transfer UTC to timestamp.
const timeUTC = (time)=>{
    let date = new Date(time.toString());
    let timestamp = date.getTime();
    return timestamp;
};
// Transfer timestamp to common date.
const timeDate = (time)=>{
    let date_ch = new Date(time);
    let year = date_ch.getFullYear();
    let month = date_ch.getMonth() + 1;
    let day = date_ch.getDate();
    let date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) +  ' '
        + date_ch.toTimeString().substr(0,8);
    return date;
};
// Get user openid.
const openidAPI = (url)=> new Promise((resolve, reject) => request.get(url, (err, response, body) => {
    if (err) {
        reject(err);
    } else {
        let data = JSON.parse(body);
        let openid = data.openid;
        resolve(openid);
    }
}));
// md5
const md5 =(name)=>{
    let time=new Date();
    let string = time.toString()+name;
    const hash = crypto.createHash('md5');
    hash.update(string);
    return hash.digest('hex').toUpperCase();
};


module.exports = {
    timeUTC,
    timeDate,
    md5,
    openidAPI
};