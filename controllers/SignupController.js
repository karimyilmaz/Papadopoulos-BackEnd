// const User = require('../Models/User')
// const bcrypt = require('bcrypt')

// let signup = async (req, res) => {
//     var hashedPassword = await bcrypt.hash(req.body.password, 10).then((hashedPassword) => hashedPassword)
        
        

//     var user = new User({
//         name: req.body.name,
//         phone: req.body.phone,
//         password: hashedPassword
//     })
//     user.save()
//     .then((response) => {
//         res.json({
//             message: 'user added successfully'
//         })
//     })
//     .catch((error) => {
//         res.json({
//             message: 'An error occurred'
//         })
//     })


// }

// module.exports = { signup }