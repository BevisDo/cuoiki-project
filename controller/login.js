const pk_profile = require('../models/pk_profile')
const argon2 = require('argon2')

exports.pk_login = async(req,res,next) => {
    const {username,password} = req.body

    if(!username||!password)
    return res
        .status(400)
        .json({success:false, message:"thieu user hoac pass"})

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
            // 
            res.json({success: true})
        } catch (error) {}

}