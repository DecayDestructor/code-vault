import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema(
  {
    snippetID: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    publicSnippet: {
      type: Boolean,
      required: true,
    },
    code: {
      type: String,
      required: true,
      index: true,
    },
    coding_language: {
      type: String,
      required: true,
    },
    allowedUsers: {
      type: [String],
      default: [],
    },
    version: {
      type: Number,
      default: 0,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    bookmarked: {
      type: [String],
      default: [],
    },
    forked: {
      type: [String],
      default: [],
    },
  },
  {
    autoIndex: true,
  }
)

// Creating a text index
snippetSchema.index({
  name: 'text',
  description: 'text',
  code: 'text',
  categories: 'text',
})

const SnippetModel = mongoose.model('SnippetModel', snippetSchema)
export default SnippetModel
