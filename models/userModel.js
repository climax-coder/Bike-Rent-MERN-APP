const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    date: {type:String, required:true},
    update:{type:String}
})

const User = mongoose.model('users', userSchema)

module.exports = User