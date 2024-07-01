import express from 'express'
import UserModel from '../schema/user-schema.js'
import codeSnippet from '../schema/snippet-schema.js'
const router = express.Router()

//create a get request to get the user with the userId from frontend

router.get('/getUser/:userId', async (req, res) => {
  console.log('get request to get the user with the userId')
  const { userId } = req.params
  try {
    const user = await UserModel.findOne({ userId: userId })
    if (!user) {
      return //no return statement as I don't want to show the toast on the screen, these routes are only for some features like adding friends and adding access so I can maintain user data for email. Nothing more
    }
    res.json(user)
  } catch (error) {
    res.status(500).send({ message: 'Server Error.' })
  }
})
router.post('/register', async (req, res) => {
  const { email, userId, name, profilePicture } = req.body
  try {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) return

    const existingUserId = await UserModel.findOne({ userId })
    if (existingUserId) return
    const user = new UserModel({ email, userId, name, profilePicture })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
router.post('/add-access', async (req, res) => {
  const { email, snippetId } = req.body
  try {
    const user = await UserModel.findOne({ email: email })
    console.log('Access granted')
    if (!user) {
      return res.status(404).send({ message: 'User not found.' })
    }
    const snippet = await codeSnippet.findOneAndUpdate(
      { snippetID: snippetId }, // Find the document with this snippetID
      { $addToSet: { allowedUsers: user.email } }, // Add userId to the allowedUsers array if it doesn't already exist
      { new: true } // Return the updated document
    )

    if (!snippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }

    return res.status(200).send({
      message: 'Access granted to ' + user.name,
      snippet: snippet,
      user: user,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/remove-access', async (req, res) => {
  const { email, snippetId } = req.body

  try {
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(404).send({ message: 'User not found.' })
    }

    const snippet = await codeSnippet.findOneAndUpdate(
      { snippetID: snippetId }, // Find the document with this snippetID
      { $pull: { allowedUsers: user.email } }, // Remove userId from the allowedUsers array if it exists
      { new: true } // Return the updated document
    )

    if (!snippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }

    return res.status(200).send({
      message: 'Access removed for ' + user.name,
      snippet: snippet,
      user: user,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
