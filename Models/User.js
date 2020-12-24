const mongoose = require("mongoose")

const { Schema }= mongoose

const schema = new Schema({
    name: String,
    phone: String,
    password: String
}, {collection : 'users'})

const User = mongoose.model("User", schema)

module.exports = User

