import express from 'express'
import UserModel from '../schema/user-schema.js'
import codeSnippet from '../schema/snippet-schema.js'
const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, userId, name, profilePicture } = req.body
  try {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User with this email already exists.' })

    const existingUserId = await UserModel.findOne({ userId })
    if (existingUserId)
      return res
        .status(400)
        .json({ message: 'User with this userId already exists.' })
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
    const userId = user.userId
    const snippet = await codeSnippet.findOneAndUpdate(
      { snippetID: snippetId }, // Find the document with this snippetID
      { $addToSet: { allowedUsers: userId } }, // Add userId to the allowedUsers array if it doesn't already exist
      { new: true } // Return the updated document
    )

    if (!snippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }

    return res.status(200).send({
      message: 'Access granted to ' + user.name,
      snippet: snippet,
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

    const userId = user.userId

    const snippet = await codeSnippet.findOneAndUpdate(
      { snippetID: snippetId }, // Find the document with this snippetID
      { $pull: { allowedUsers: userId } }, // Remove userId from the allowedUsers array if it exists
      { new: true } // Return the updated document
    )

    if (!snippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }

    return res.status(200).send({
      message: 'Access removed for ' + user.name,
      snippet: snippet,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
