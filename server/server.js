const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
const connectDb = require('./config/db.js')
const promptRoutes = require('./routes/promptRoutes.js')
dotenv.config()

app.use(cors())
app.use(express.json())


app.use('/api/prompts',promptRoutes)

app.get('/',(req,res)=>{
    res.json({
        message:"Backend is running"
    })
})

const PORT = process.env.PORT || 5000;

connectDb()
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

