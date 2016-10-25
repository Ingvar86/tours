var CronJob = require('cron').CronJob;
var fetch = require('./tours').fetch;
var shedule = process.env.SHEDULE;

var job = new CronJob({
  cronTime: shedule,
  onTick: fetch,
  start: true,
  timeZone: 'Europe/Zaporozhye'
});