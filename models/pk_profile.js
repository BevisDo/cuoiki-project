const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pk_profileSchema = new Schema({
    username: {
        type: String
    },
    authId: String,
    email: String,
    khoa: String,
    classID: String,
    password: {
        type: String
    },
    creatAt: {
        type: Date,
        default: Date.now
    },
    role: String
})

module.exports = mongoose.model('pk_profiles', pk_profileSchema)