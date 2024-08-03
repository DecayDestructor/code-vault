import express from 'express'
import UserModel from '../schema/user-schema.js'
const router = express.Router()

router.get('/categories/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const user = await UserModel.find({ userId })
    if (!user) {
      return res.status(404).send({ message: 'User not found.' })
    }
    res.send(user.categories)
  } catch (error) {
    res.status(500).send({ message: 'Error occurred, please try again.' })
  }
})
//post for adding a category

router.post('/addCategory/:userId', async (req, res) => {
  const { userId } = req.params
  const { category } = req.body

  try {
    const user = await UserModel.findOneAndUpdate(
      { userId },
      { $push: { categories: category } },
      { new: true }
    )

    if (!user) {
      return res.status(404).send({ message: 'User not found.' })
    }
    res.send(user.categories)
  } catch (error) {
    res.status(500).send({ message: 'Error occurred, please try again.' })
  }
})
export default router
