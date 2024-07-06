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
  profilePicture: {
    type: String,
    required: true,
  },
  friendList: {
    type: [String],
    default: [],
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
})

const UserModel = mongoose.model('UserModel', userSchema)
export default UserModel
