const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    // user:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    content: {
        type: String,
        require: true
    },
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comments', CommentSchema)