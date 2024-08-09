import express from 'express'
import codeSnippet from '../schema/snippet-schema.js'
import UserModel from '../schema/user-schema.js'
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
  const snippet = new codeSnippet({
    ...req.body,
    snippetID: snippetID,
    date: date,
    allowedUsers: [],
  })
  const name = snippet.name
  try {
    const existingSnippet = await codeSnippet.findOne({
      name,
      userId: snippet.userId,
    })

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

router.put('/restore', async (req, res) => {
  const snippet = req.body
  console.log(snippet)
  try {
    const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
      { snippetID: snippet.snippetID },
      {
        ...snippet,
        date: new Date(),
      },
      { new: true }
    )
    if (!updatedSnippetDoc) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    return res.status(200).send({
      message: 'Snippet updated successfully',
      snippet: updatedSnippetDoc,
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error occured, please try again' })
  }
})

router.get('/getCategoriesByUserID/:userId', async (req, res) => {
  console.log('categories')
  const { userId } = req.params
  try {
    const categories = await codeSnippet
      .find({
        userId,
      })
      .distinct('categories')
      .sort({
        name: 1,
      })
    console.log(categories)
    return res.status(200).send(categories)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Error occured, please try again' })
  }
})

router.get('/getAllBySearchParam/:searchParam?', async (req, res) => {
  const { searchParam } = req.params
  if (!searchParam) {
    //return random snippets
    const randomSnippet = await codeSnippet.aggregate([
      { $match: { publicSnippet: true } },
      { $sample: { size: 15 } },
    ])
    if (randomSnippet.length === 0) {
      return res.status(404).send({ message: 'No Public Snippets found' })
    }
    return res.status(200).send(randomSnippet)
  }

  if (searchParam && searchParam.trim() === '') {
    //return random entries from database that have publicSnippet field as true
    const randomSnippet = await codeSnippet.aggregate([
      { $match: { publicSnippet: true } },
      { $sample: { size: 15 } },
    ])
    if (randomSnippet.length === 0) {
      return res.status(404).send({ message: 'No Public Snippets found' })
    }
    return res.status(200).send(randomSnippet)
  }
  try {
    const snippets = await codeSnippet.find({
      $text: { $search: searchParam },
      publicSnippet: true,
    })
    if (snippets.length === 0) {
      return res.status(404).send({ message: 'No Snippets found' })
    }
    res.status(200).send(snippets)
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).send(error)
  }
})

//route to add or remove like of a user in a snippet
router.put('/handleLike', async (req, res) => {
  const { type, payload } = req.body
  if (type === 'ADD_LIKE') {
    const { userId, snippetID } = payload
    try {
      const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
        { snippetID: snippetID },
        { $addToSet: { likes: userId } },
        { new: true }
      )
      console.log(updatedSnippetDoc)

      res.json(updatedSnippetDoc)
    } catch (error) {
      res.status(500).send({ message: 'Server Error.' })
    }
  } else {
    const { userId, snippetID } = payload
    try {
      const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
        { snippetID: snippetID },
        { $pull: { likes: userId } },
        { new: true }
      )
      console.log(updatedSnippetDoc)
      res.json(updatedSnippetDoc)
    } catch (error) {
      res.status(500).send({ message: 'Server Error.' })
    }
  }
})

router.put('/handleBookmark', async (req, res) => {
  const { type, payload } = req.body
  if (type === 'ADD_BOOKMARK') {
    const { userId, snippetID } = payload
    try {
      const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
        { snippetID: snippetID },
        { $addToSet: { bookmarked: userId } },
        { new: true }
      )
      res.json(updatedSnippetDoc)
    } catch (error) {
      res.status(500).send({ message: 'Server Error.' })
    }
  } else {
    const { userId, snippetID } = payload
    try {
      const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
        { snippetID: snippetID },
        { $pull: { bookmarked: userId } },
        { new: true }
      )
      res.json(updatedSnippetDoc)
    } catch (error) {
      res.status(500).send({ message: 'Server Error.' })
    }
  }
})

export default router
