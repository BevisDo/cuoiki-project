const Post = require('../models/Post')

// class PostsController{
//     create(req,res){
//         new Post({
//             content: req.body.content,
//             createAt: new Date(),
//         }).save(function(err){
//             if(err){
//                 console.log(err);
//                 res.json({success: 'false'});
//             }else{
//                 res.json({success: 'true'});
//             }
//         })
//     }
// }
// module.exports = new PostsController

exports.postController = async(req,res) =>{
    const {content} = req.body

    if(!content)
    return res.status(400).json({success: false, message: 'Chua nhap noi dung'})

    try {
        const newPost = new Post({
            user:req.userId,
            content
        })

        await newPost.save()

        res.json({success: true, message: 'Dang thanh cong', post: newPost})
    } catch (error) {
        
    }
}