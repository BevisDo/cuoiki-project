const pk_profile = require('../models/pk_profile')
//module hash password
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

exports.pk_signup = async(req,res,next) => {
    const {username,password} = req.body
//check simple pass and username
    if(!username||!password)
    return res
        .status(400)
        .json({success:false, message:"thieu user hoac pass"})
//ktra trong database co hay ko
    try {
            //check exist user
            const user = await pk_profile.findOne({username})
            if(user)
            return res.status(400).json({success: false,message:'Co nguoi chon username nay roi'})
            //OK
            const hashedPassword = await argon2.hash(password)
            const newPk_profile = new pk_profile({
                username,password: hashedPassword
            })
            await newPk_profile.save()
            // token
            const accessToken = jwt.sign({userId: newPk_profile._id}, process.env.ACCESS_TOKEN_SECRET)
            
            res.json({success: true, message:'sign up thanh cong', accessToken})
        } catch (error) {}

}