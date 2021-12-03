const Post = require('../models/post')

class PostsController{
    create(req,res){
        new Post({
            content: req.body.content,
            createAt: new Date(),
        }).save(function(err){
            if(err){
                console.log(err);
                res.json({success: 'false'});
            }else{
                res.json({success: 'true'});
            }
        })
    }
}
module.exports = new PostsController