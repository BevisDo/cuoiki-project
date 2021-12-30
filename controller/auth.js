const pk_profile = require('../models/pk_profile')

//module hash password
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

exports.pk_login = async (req, res, next) => {
    const { username, password } = req.body
    //check simple pass and username
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "thieu user hoac pass" })

    try {
        //check exist
        const user = await pk_profile.findOne({ username })
        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username' })

        //username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect password' })

        //all good
        const accessTokengg = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

        return res.json({ success: true, message: 'Login thanh cong', accessTokengg })
        // return accessToken

    } catch (error) { }
}

exports.pk_signup = async (req, res, next) => {
    const { username, password } = req.body
    //check simple pass and username
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "thieu user hoac pass" })
    //ktra trong database co hay ko
    try {
        //check exist user
        const user = await pk_profile.findOne({ username })
        if (user)
            return res.status(400).json({ success: false, message: 'Co nguoi chon username nay roi' })
        //OK
        const hashedPassword = await argon2.hash(password)
        const newPk_profile = new pk_profile({
            username, password: hashedPassword
        })
        await newPk_profile.save()
        // token
        const accessTokengg = jwt.sign({ userId: newPk_profile._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: 'sign up thanh cong', accessTokengg })
    } catch (error) { 
    }
}

exports.pk_logout = (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/auth/login')
}
