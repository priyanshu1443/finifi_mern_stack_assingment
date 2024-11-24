import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config();
const url = process.env.MONOGODBURL

const connection = async () => {
    try {
        const responce = mongoose.connect(url);
        if (responce) {
            console.log("connection with db is successful")
        }
    } catch (error) {
        console.log(error)
    }
}

connection()
