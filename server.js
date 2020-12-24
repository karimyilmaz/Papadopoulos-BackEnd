const express = require('express')
const mongo = require('./mongoose')
const bcrypt = require('bcrypt')
const User = require("./Models/User")
const jwt = require("jsonwebtoken")

const PORT = process.env.PORT || 3000
const cors = require('cors')

const app = express() // start a server
app.use(cors())
app.use(express.json()) // recognize the incoming request as a JSON Object

app.listen(PORT, () => {
    console.log('SERVER IS LISTENING', PORT)
})


//HANDLING A POST ON /SIGNUP 
app.post('/signup',  async (req, res) => {
    let phone = await User.findOne({phone: req.body.phone})
        if (phone) {
            console.log(phone)
            res.json({ message: "user already registerd", phone: phone})
            return
        }
        else {
            const user = new User({
                name: req.body.name,
                phone: req.body.phone,
                password: req.body.password
            })

            user.password = await bcrypt.hash(user.password, 10)    
            user.save()
            .then((response) => {
                res.json({
                    message: "success"
                })
            })
            .catch((err) => {
                res.json({
                    message: "error while adding user"
                })
            })    
        }
})

//HANDLING A GET ON LOGIN
app.post('/login', async (req, res) => {
    let phone = await User.findOne({phone: req.body.phone})
    if(phone){
        //CHECK IF PASSWORD EQUAL
        bcrypt.compare(req.body.password, phone.password, (err, same) => {
            if(err){
                return res.status(500).json({message: "error"}) 
            }
            
            if(same){
                //GET THE NAME OF THE LOGGED IN ACCOUNT TO SEND IT BACK TO THE USER ALONG WITH THE TOKEN
                let name = phone.name
                //HERE WE SHOULD GENERATE A WEB TOKEN SIGNATURE WITH THE DATA
                jwt.sign({phone: req.body.phone, password: req.body.password}, 'secretkeykui' , (err, token) => {
                    if(token)
                        return res.status(200).json({token, name})
                })
            }
            else
                return res.status(200).json({message: "invalid credentials"})
        })
        }
    else{
        res.json({message: "user doesnt exist"})
    }
}) 

mongo.connect()