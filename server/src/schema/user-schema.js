import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: [String],
    default: [],
    required: false,
  },
  saves: {
    type: [String],
    default: [],
    required: false,
  },
  forks: {
    type: [String],
    default: [],
    required: false,
  },
})

const UserModel = mongoose.model('UserModel', userSchema)
export default UserModel
