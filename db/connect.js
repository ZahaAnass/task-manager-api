const mongoose = require("mongoose")

const connectionString = 
    `mongodb+srv://zahaanass277:TGlnHBk2IDokCuS2@node-express-course.kmntlo3.mongodb.net/task-manager-api?retryWrites=true&w=majority&appName=node-express-course`

const connectDB = (url) => {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,    
    })
}

module.exports = connectDB;