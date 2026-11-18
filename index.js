import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.DB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB()    
const db = connectedClient.db("hireloop")
const user = db.collection("user")
const jobs = db.collection("jobs")


app.get("/", (req,res) => {
    res.send("Welcome to hireloop server")
})

app.get("/user", async(req, res) =>{
    const result = await user.find({}).toArray()
    res.json(result)
})

app.post("/add-jobs", async(req, res) =>{
  const newJobs = req.body
  const result = await jobs.insertOne(newJobs)
  res.send(result)
  console.log(result)
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})