import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
import codeSnippetRouter from './routes/codeSnippet.js'
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
const mongoURI = `mongodb+srv://aaryanmantri29:${process.env.MONGO_PASSWORD}@cluster0.gs24h2r.mongodb.net/`

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('connected to db')
  })
  .catch((err) => console.error(' could not connect to db' + err))
app.use('/code-snippets', codeSnippetRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
