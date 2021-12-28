const pk_profile = require('../models/pk_profile')


exports.profileUpdateController = async (req, res) => {
    const { username, classID, khoa } = req.body

    try {
        let updateProfile = {
            username, 
            classID, 
            khoa
        }
        const profileUpdateCond = { _id: req.userId }

        updateProfile = await pk_profile.findOneAndUpdate(profileUpdateCond, updateProfile)
        //khong dung user hoac khong dung id bai viet
        if (!updateProfile)
            return res.status(401).json({
                success: false,
                message: 'Ko dung ng dung'
            })

        res.json({
            success: true,
            message: 'Da update',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Intenal server error' })
    }
}