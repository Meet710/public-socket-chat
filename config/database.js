require('dotenv').config()
const mongoose = require('mongoose')


const connectDB = async () =>{
    try{
      const uri = process.env.DB_URI
       const connect = await mongoose.connect(uri) 
      if (connect) {
         console.log("Sucessfully Connect with the database")
      }
    }
    catch(err){
       console.log(err.message)
    }
}



module.exports = connectDB