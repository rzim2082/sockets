var moment = require('moment');
var now = moment();



//console.log(now.format());
//console.log(now.format('X'));
//console.log(now.format('x'));
//console.log(now.valueOf());

var timestamp = 1460514640240;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.format());


//console.log(now.format("MMM Do YYYY, h:mma"));
//add month and day of month