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
    origin: 'https://finifi-mern-stack-assingment-kdl80vod7-priyanshu1443s-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://finifi-mern-stack-assingment-kdl80vod7-priyanshu1443s-projects.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
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


