import mongoose, { version } from 'mongoose'

const snippetSchema = new mongoose.Schema({
  snippetID: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    default: Date.now,
    required: true,
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
  allowedUsers: {
    type: Array,
    default: [],
    required: false,
  },
  version: {
    type: Number,
    default: 0,
    required: true,
  },
  categories: {
    type: [],
    required: false,
    default: [],
  },
})

const SnippetModel = mongoose.model('SnippetModel', snippetSchema)
export default SnippetModel
