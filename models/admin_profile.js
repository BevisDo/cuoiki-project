const mongoose = require('mongoose');
const Schema = mongoose.Schema

const admin_profileSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    creatAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('admin_profiles',admin_profileSchema)