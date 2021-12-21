const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'pk_profiles'
    },
    content: {
        type: String,
        require: true
    },
    comment: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'pk_profiles'
        },
        content: String
    }],
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', PostSchema)