import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.send("Welcome to hireloop server")
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})