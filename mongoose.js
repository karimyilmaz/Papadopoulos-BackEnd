const mongoose = require('mongoose')

//CONNECTION TO MONGODB
const mongoURI = 'mongodb+srv://karim199:Karma1991@krmcluster.kkuti.mongodb.net/Papadopolous?retryWrites=true&w=majority'

// mongoose.Promise = Promise

mongoose.connection.on("error", () => {
    console.log("error occurred while connecting to mongodb")
})

mongoose.connection.once("open", () => {
    console.log('successfully connected to mongodb')
})

exports.connect = () => {
    mongoose.connect(mongoURI)
    return mongoose.connection
}
