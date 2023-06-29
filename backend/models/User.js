const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type : String,
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
})
module.exports = Users = mongoose.model('User', UserSchema, "User");