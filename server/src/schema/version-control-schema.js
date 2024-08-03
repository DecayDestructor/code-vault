import mongoose from 'mongoose'
const versonControlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
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
    default: new Date(),
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
  editMessage: {
    type: String,
    default: '',
    required: false,
  },
  editName: {
    type: String,
    default: '',
    required: false,
  },
  editID: {
    type: String,
    required: true,
    unique: true,
  },
})

const VersionControlModel = mongoose.model(
  'VersionControlModel',
  versonControlSchema
)
export default VersionControlModel
