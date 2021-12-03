const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sv_profileSchema = new Schema({
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

module.exports = mongoose.model('sv_profiles',sv_profileSchema)