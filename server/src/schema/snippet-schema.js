import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema({
  snippetID: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  publicSnippet: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
})

const SnippetModel = mongoose.model('SnippetModel', snippetSchema)

export default SnippetModel
