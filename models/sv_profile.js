const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sv_profileSchema = new Schema({
    authId: String,
    email: String,
    name: String,
    password: String,
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sv_profiles', sv_profileSchema)