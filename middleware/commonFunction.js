'use strict';
const config = require('../config');
const crypto = require('crypto');
const request = require('request');

const timeUTC = (time)=>{
    let date = new Date(time.toString());
    let timestamp = date.getTime();
    return timestamp;
};

const md5 =(name)=>{
    let time=new Date();
    let string = time.toString()+name;
    const hash = crypto.createHash('md5');
    hash.update(string);
    return hash.digest('hex').toUpperCase();
};
const decodeString=(myStr)=>{
    let tempBuffer=new Buffer(myStr,'base64');
    return tempBuffer.toString();
};
const encodeString=(myStr)=>{
    let tempBuffer=new Buffer(myStr.toString());
    return tempBuffer.toString('base64');
};
const stringToArray=(imageString)=>{
    if(imageString.length==0) return;
    let tempRes = imageString.split(',');
    tempRes.forEach(function (val,index,err) {
        tempRes[index]=config.imageUrl1+val;
    });
    return tempRes;
};
const changeTime=(timeStr)=>{
    let mytime = new Date(timeStr);
    let hours = mytime.getHours()+8;
    hours=Number(hours);
    mytime.setHours(hours);
    return mytime
};
const judgeWhetherSignUpYesterday=(lastReadDate)=>{
    const dd= new Date();
    const yesterday=dd.setDate(dd.getDate()-1);
    const newDay = new Date(yesterday);
    lastReadDate=new Date(lastReadDate);
    if (lastReadDate.getDate()==newDay.getDate()){
        return 1;
    }else if (lastReadDate.getDate()==new Date().getDate()) {
        return 2;
    } else {
        return 0;
    }
};

const urlReplaceForImage=(content)=>{
    let result =content.replace(/\/ckfinder\/userfiles\//g,config.imageUrl2);
    return result
};
const parseJSON=(content)=>{
    let dataString=JSON.stringify(content);
    return JSON.parse(dataString);
};

const timeCutOut=(time)=>{
    let timeStr = new Date(time);
    let year = timeStr.getFullYear();
    let month = timeStr.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    let day =timeStr.getDate();
    if(day<10){
        day="0"+day;
    }
    return year+'-'+month+'-'+day;
};
const dealWithTime=(timeStr)=>{
    timeStr = new Date(timeStr);
    let year = timeStr.getFullYear();
    let month = timeStr.getMonth()+1;
    if(month<10){
        month="0"+month;
    }
    let day =timeStr.getDate();
    if(day<10){
        day="0"+day;
    }
    timeStr = String(timeStr);
    let time=timeStr.split(' ')[4];
    return year+"-"+month+"-"+day+" "+time
};
const generateOrderNumber=()=>{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    if(month<10){
        month="0"+month.toString()
    }
    let day = date.getDate();
    let timeStr = year.toString()+month+day.toString();
    let randomNum = Math.floor(Math.random()*100000).toString();
    while (randomNum.length!=5){
        randomNum="0"+randomNum;
    }
    return timeStr+randomNum;
};
const generateBarCode = ()=>{
    let randomNum = Math.floor(Math.random()*100000000).toString();
    while(randomNum.length<8){
        randomNum="0"+randomNum;
    }
    return "6"+randomNum
};
const judgeWhetherInSpecialPriceTime =(lower,upper)=>{
    let startTime = new Date(lower);
    let endTime = new Date(upper);
    let timeNow = new Date();
    if(timeNow<=endTime&&timeNow>=startTime){
        return true;
    }
    else return false;
};
const apireq = (url)=> new Promise((resolve, reject) => request.get(url, (err, response, body) => {
    if (err) {
        reject(err);
    } else {
        let data = JSON.parse(body);
        let openid = data.openid;
        resolve(openid);
    }
}));


module.exports = {
    timeUTC,

    encodeString,
    decodeString,
    stringToArray,
    urlReplaceForImage,
    parseJSON,
    timeCutOut,
    dealWithTime,
    generateOrderNumber,
    md5,
    generateBarCode,
    judgeWhetherSignUpYesterday,
    judgeWhetherInSpecialPriceTime,
    apireq
};