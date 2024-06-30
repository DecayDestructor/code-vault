import mongoose from 'mongoose'

const socialList = mongoose.Schema({
  friendList: {
    accepted: {
      type: Array,
      default: [],
    },
    pending: {
      type: Array,
      default: [],
    },
    rejected: {
      type: Array,
      default: [],
    },
  },
  blockList: {
    type: Array,
    default: [],
  },
})

const SocialModel = mongoose.model('SocialModel', socialList)

export default SocialModel
