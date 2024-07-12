import express from 'express'
import VersionControl from '../schema/version-control-schema.js'
import codeSnippet from '../schema/snippet-schema.js'
import { generateStructuredDiff } from '../utils/generateStructuredDiff.js'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

router.get('/:snippetID/:userId', async (req, res) => {
  const { snippetID, userId } = req.params

  //look for and return all the edits found in the versionControlModel with the snippetID
  try {
    //validate the userId with the userId in the versionControlModel and return a message if they are not equal
    const record = await VersionControl.findOne({
      snippetID: snippetID,
    })
    if (!record) {
      return res.status(404).send({ message: 'No edits found.' })
    }
    if (record.userId !== userId) {
      return res
        .status(403)
        .send({ message: 'User not authorized to view this snippet.' })
    }
    const edits = await VersionControl.find({ snippetID: snippetID })
    res.status(200).send(edits)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/edit', async (req, res) => {
  const editID = uuidv4()
  const { snippetUpdates, editMessage, editName } = req.body
  for (const item in snippetUpdates) {
    if (!snippetUpdates[item] && typeof snippetUpdates[item] !== 'boolean') {
      return res
        .status(400)
        .send({ message: `Empty ${item}. Please enter a valid value ` })
    }
  }
  if (!editMessage || !editName) {
    return res
      .status(400)
      .send({ message: 'Edit message and name are required.' })
  }

  console.log('update snippet')
  console.log(snippetUpdates)
  try {
    const record = await codeSnippet.findOne({
      snippetID: snippetUpdates.snippetID,
    })

    if (!record) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }

    if (record.userId !== snippetUpdates.userId) {
      return res
        .status(403)
        .send({ message: 'Unauthorized to update snippet.' })
    }

    // Create a plain JavaScript object for both record and updatedSnippet
    const recordObj = record.toObject()
    const updatedSnippet = {
      ...recordObj,
      ...snippetUpdates,
    }
    console.log(recordObj)
    console.log(updatedSnippet)
    // Check if updatedSnippet is equal to record before attempting update
    if (JSON.stringify(updatedSnippet) === JSON.stringify(recordObj)) {
      console.log('No changes detected')
      return res.status(400).send({
        record,
        message: 'No changes detected. No update performed.',
      }) // Return the unchanged record
    }

    const updatedSnippetDoc = await codeSnippet.findOneAndUpdate(
      { snippetID: snippetUpdates.snippetID },
      {
        name: snippetUpdates.name,
        publicSnippet: snippetUpdates.publicSnippet,
        description: snippetUpdates.description,
        code: snippetUpdates.code,
        language: snippetUpdates.language,
        version: record.version + 1,
      },
      { new: true }
    )

    const versionControlSnippet = generateStructuredDiff(
      recordObj,
      snippetUpdates
    )
    console.log(versionControlSnippet)
    const newSnippet = new VersionControl({
      snippetID: snippetUpdates.snippetID,
      version: record.version,
      userId: snippetUpdates.userId,
      diff: { ...versionControlSnippet },
      editMessage: editMessage,
      editName,
      name: snippetUpdates.name,
      editID,
    })
    await newSnippet.save()
    return res.status(200).send(updatedSnippetDoc)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

router.get('/:editID', async (req, res) => {
  const editID = req.params.editID
  try {
    const record = await VersionControl.findOne({ editID })
    if (!record) {
      return res.status(404).send({ message: 'Snippet not found.' })
    }
    return res.status(200).send(record)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', async (req, res) => {
  const editID = req.params.id
  try {
    const record = await VersionControl.findOneAndDelete({ editID })
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

export default router
