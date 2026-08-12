const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
const app = express()
const connectDb = require('./config/db.js')
const promptRoutes = require('./routes/promptRoutes.js')
dotenv.config()

app.use(cors())
app.use(express.json())


app.use('/api/prompts',promptRoutes)

app.use('/api/prompts',promptRoutes)

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
} else {
  app.get('/',(req,res)=>{
      res.json({
          message:"Backend is running"
      })
  })
}

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong on the server"
    });
});

const PORT = process.env.PORT || 5000;

connectDb()
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

