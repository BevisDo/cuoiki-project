const { countDocuments } = require('../models/pk_profile')
const pk_profile = require('../models/pk_profile')
const Post = require('../models/Post')

exports.commentCreateController = async (req, res) => {
    const { content } = req.body

    if (!content)
        return res.status(400).json({
            success: false,
            message: 'Chua nhap noi dung'
        })

    try {
        let newComment = [{
            user: req.userId,
            content
        }]
        const commentCond = { _id: req.params.id }
        
        newComment = await Post.findOneAndUpdate(commentCond, { $push: { comment: newComment } })
        const username = await Post.findOne({ user: newComment.user }).populate({ path: 'comment', populate: { path: 'user' } })

        if (!newComment)
            return res.status(401).json({
                success: false,
                message: 'Ko dung ng dung hoac khong co bai viet',
            })
        res.json({
            success: true,
            message: 'Dang thanh cong',
            comment: newComment,
            username: username
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Intenal server error' })
    }
}

exports.commentDeleteCotroller = async (req, res) => {
    try {
        const deleteCommentCond = { _id: req.params.id, user: req.userId }
        // console.log(deleteCommentCond)
        // const deleteComment = await Post.populate('comment').findOneAndDelete(deleteCommentCond)
        const deleteComment = await Post.find({ 'comment.content': { $lte: "comment 1" } })
        // console.log(deleteComment)
        const a = deleteComment.comment
        console.log(a)
        for (let index = 0; index < a.length; index++) {
            console.log(a[index])

        }
        // console.log(b)
        if (!deleteComment)
            return res.status(401).json({
                success: false,
                message: 'Ko dung ng dung hoac khong co bai viet'
            })

        res.json({
            success: true,
            message: 'Da xoa bai viet',
            post: deleteComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Intenal server error' })
    }
}
