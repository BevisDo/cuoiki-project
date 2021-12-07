const pk_profile = require('../models/pk_profile')
const Post = require('../models/Post')


// posts/create
// Create Post
exports.postCreateController = async(req,res) =>{
    const {content} = req.body

    if(!content)
    return res.status(400).json({
        success: false, 
        message: 'Chua nhap noi dung'
    })

    try {
        const newPost = new Post({
            user:req.userId,
            content
        })
        await newPost.save()

        res.json({
            success: true, 
            message: 'Dang thanh cong', 
            post: newPost
        })
    } catch (error) {
        
    }
}

// posts/id_post
// update post
exports.postUpdateController =async(req,res) =>{
    const {content} = req.body
    
    if(!content)
    return res.status(400).json({
        success: false, 
        message: 'Chua nhap noi dung'
    })

    try {
        let updatePost = {
            content
        }
    const postUpdateCond = {_id: req.params.id, user: req.userId}

    updatePost = await Post.findOneAndUpdate(postUpdateCond,updatePost,{new: true})

    //khong dung user hoac khong dung id bai viet
    if(!updatePost)
    return res.status(401).json({
        success: false, 
        message:'Ko dung ng dung hoac khong co bai viet'
    })

    res.json({success: true, message: 'Da update',post: updatePost})
    } catch (error) {
        
    }
}

//post/id_post
//delete post
exports.postDeleteController =async(req,res) =>{
    try {
        const postDeleteCond = {_id: req.params.id, user: req.userId}
        const deletePost = await Post.findOneAndDelete(postDeleteCond)

        if(!deletePost)
        return res.status(401).json({
            success: false, 
            message:'Ko dung ng dung hoac khong co bai viet'
        })

        res.json({
            success: true,
            message: 'Da xoa bai viet',
            post: deletePost
        })
    } catch (error) {
        
    }

}