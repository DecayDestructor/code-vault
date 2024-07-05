import express from 'express'
import codeSnippet from '../schema/snippet-schema.js'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

router.get('/getAllByUserID/:userId/:page', async (req, res) => {
  // console.log('get request')
  const { userId } = req.params
  const { page } = req.params || 0
  const pageNumber = parseInt(page, 10)
  try {
    const snippets = await codeSnippet
      .find({ userId: userId })
      .sort({
        date: -1, //sort by date descending
        name: 1, //sort by name ascending
      })
      .skip(pageNumber * 10) //skip the previous pages snippets
      .limit(10) //limit 10 snippets per page
    if (snippets.length === 0) {
      return res.status(404).send({ message: 'No Snippets' })
    }
    if (!snippets) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).send(snippets)
  } catch (error) {
    return res.status(500).send(error)
  }
})

router.get('/getOneBySnippetID/:id', async (req, res) => {
  const { id } = req.params
  try {
    const snippet = await codeSnippet.findOne({ snippetID: id })
    if (!snippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    res.status(200).send(snippet)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', async (req, res) => {
  // console.log('post request')
  const snippetID = uuidv4()
  const date = new Date()
  console.log(date.toDateString())
  const snippet = new codeSnippet({
    ...req.body,
    snippetID: snippetID,
    date: date.toDateString(),
    allowedUsers: [],
  })
  const name = snippet.name
  try {
    const existingSnippet = await codeSnippet.findOne({ name })

    if (existingSnippet) {
      return res
        .status(400)
        .send({ message: 'Snippet with this name already exists.' })
    }
    await snippet.save()
    res.status(201).send(snippet)
  } catch (error) {
    res.status(400).send(error)
  }
})

// add one get route to get all the allowedUsers to a snippet

router.delete('/:id', async (req, res) => {
  console.log('Delete')
  try {
    const id = req.params.id
    const record = await codeSnippet.findOneAndDelete({ snippetID: id })
    console.log(record)
    if (!record) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    return res
      .status(200)
      .send({ message: 'Snippet deleted successfully', snippet: record })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/edit-snippet', async (req, res) => {
  const snippet = req.body
  //write logic for route to update snippet
  // console.log(snippet)
  console.log('update snippet')
  try {
    const record = await codeSnippet.findOne({ snippetID: snippet.snippetID })
    if (record.userId !== snippet.userId) {
      return res
        .status(403)
        .send({ message: 'Unauthorized to update snippet.' })
    }
    if (!record) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    const updatedSnippet = await codeSnippet.findOneAndUpdate(
      { snippetID: snippet.snippetID },
      snippet,
      { new: true }
    )
    if (!updatedSnippet) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    res.status(200).send(updatedSnippet)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default router
