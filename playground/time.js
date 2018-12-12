// Jan 1st 1970 00:00:00 am TIMESTAMP OF 0 UNIX?
// 0 (milliseconds)

// Jan 1st 1970 00:00:01 am TIMESTAMP OF 0 UNIX?
// 1000 (milliseconds)

// Jan 1st 1959 11:59:59 am TIMESTAMP OF 0 UNIX?
// -1000 (milliseconds)

const moment = require('moment');

// const date = new Date();
// const months = ['Jan', 'Feb']
// console.log(date.getMonth())

const date = moment();
const date2 = moment();
// date.add(1, 'year')
console.log(date.format('MMM Do, YYYY.'))
console.log(date.endOf('hour').fromNow()) //remember this manipulates date
console.log(date.format('h:mm A'))
console.log(date2.format('h:mm A'))