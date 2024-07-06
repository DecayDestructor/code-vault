import mongoose from 'mongoose'

const versonControlSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  snippetID: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  diff: {
    type: Object,
    required: true,
  },
  version: {
    type: Number,
    default: 1,
    required: true,
  },
})

const VersionControlModel = mongoose.model(
  'VersionControlModel',
  versonControlSchema
)
export default VersionControlModel
