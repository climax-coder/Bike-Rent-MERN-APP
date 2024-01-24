const mongoose = require('mongoose')

var mongoURL = process.env.dbURL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var dbconnect = mongoose.connection

dbconnect.on('error', () => {
    console.log('Con failed');
})

dbconnect.on('connected', () => {
    console.log('Con success');
})

module.exports = mongoose