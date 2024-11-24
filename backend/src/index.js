import dotenv from 'dotenv'

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import invoiceRouter from "./routes/invoiceRoute.js"
import "./database/conn.js"

dotenv.config();

const app = express()

console.log(process.env.CLINT_PORT)

app.use(cors({
    origin: process.env.CLINT_PORT,
    credentials: true
}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLINT_PORT);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
app.use(express.json())
app.use(bodyParser.json())

app.use("/api", invoiceRouter)

app.get("/", (req, res) => {
    res.send("Welcome to backend")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is listen on port no ${process.env.PORT || 5000}`)
})


