var CronJob = require('cron').CronJob;
var fetch = require('./index').fetch;

var job = new CronJob({
  cronTime: '* 8,14 * * * *',
  onTick: fetch,
  start: true,
  timeZone: 'Europe/Zaporozhye'
});