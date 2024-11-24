import dotenv from 'dotenv'

import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import invoiceRouter from "./routes/invoiceRoute.js"
import "./database/conn.js"

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use("/api", invoiceRouter)

app.get("/", (req, res) => {
    res.send("Welcome to backend")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is listen on port no ${process.env.PORT || 5000}`)
})


