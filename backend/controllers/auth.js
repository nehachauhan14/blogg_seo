const User = require('../models/user')
const shortId = require('shortid')

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({email: email}).exec((err, user) => {
        if(user) {
            return res.status(400).json({
                error: 'Email is already taken'
            })
        }
    })

    let username = shortId.generate()
    let profile = `${process.env.CLIENT_URL}/${username}`

    let newUser = new User({
        name,
        email,
        password,
        profile,
        username
    })

    newUser.save((err, success) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            user: success,
            message: 'Signup success! please signin.'
        })
    })
    res.json({
        user: { name, email, password}
    })
    
}