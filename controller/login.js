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
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //all good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

        return res.json({ success: true, message: 'Login thanh cong', accessToken })
        // return accessToken

    } catch (error) { }
}
