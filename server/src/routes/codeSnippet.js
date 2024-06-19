import express from 'express'
import codeSnippet from '../schema/snippet-schema.js'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

router.get('/getAllByUserID/:userId/:page', async (req, res) => {
  console.log('get request')
  const { userId, page } = req.params
  const pageNumber=parseInt(page, 10)
  try {
    const snippets = await codeSnippet.find({ userId: userId }).sort({
      date: -1,
      name: 1,
    }).skip(pageNumber*1).limit(1)
    if (snippets.length === 0) {
      return res.status(404).send('No Records Found')
    }
    res.status(200).send(snippets)
  } catch (error) {
    return res.status(500).send(error)
  }
})

router.post('/', async (req, res) => {
  console.log('post request')
  const snippetID = uuidv4()
  const date = new Date()
  const snippet = new codeSnippet({ ...req.body, snippetID: snippetID,date })
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

export default router
