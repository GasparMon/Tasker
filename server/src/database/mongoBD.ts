import dontenv from 'dotenv'
import mongoose from 'mongoose'

dontenv.config()

const DB_NAME = process.env.DB_ATLAS_NAME;
const DB_PASSWORD = process.env.DB_ATLAS_PASSWORD;

const uri : string = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@tasker.1iej4lo.mongodb.net/?retryWrites=true&w=majority&appName=tasker`

mongoose.connect(uri)
.then(() => {
    console.log(`DataBase is Connected`)
})
.catch(error => {
    console.error(`Error to tried to connect to database`, error.message)
})