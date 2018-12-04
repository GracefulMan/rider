'use strict';
const connection=require('../index');
const addPeriod=(uid, userphone, timeid, year, month, day, time)=>{
    let _sql = `INSERT INTO rider_period (uid, userphone, timeid, year, month, day, time, status)VALUES(${uid}, ${userphone}, ${timeid}, ${year}, ${month}, ${day}, ${time}, 1);`;
    return connection.query(_sql);
};

const deletePeriod=(id)=>{
    let _sql = `DELETE FROM rider_period WHERE id = ${id};`;
    return connection.query(_sql);
};

module.exports={
    addPeriod,
    deletePeriod
};