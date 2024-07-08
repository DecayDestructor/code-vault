import express from 'express'
import VersionControl from '../schema/version-control-schema.js'
import codeSnippet from '../schema/snippet-schema.js'
import { generateStructuredDiff } from '../utils/generateStructuredDiff.js'
const router = express.Router()

router.put('/edit', async (req, res) => {
  const { snippetUpdates, editMessage } = req.body
  for (const item in snippetUpdates) {
    if (!snippetUpdates[item] && typeof snippetUpdates[item] !== 'boolean') {
      return res
        .status(400)
        .send({ message: `Empty ${item}. Please enter a valid value ` })
    }
  }

  console.log('update snippet')

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
      updatedSnippet
    )
    console.log(versionControlSnippet)
    const newSnippet = new VersionControl({
      snippetID: snippetUpdates.snippetID,
      version: record.version,
      userId: snippetUpdates.userId,
      diff: { ...versionControlSnippet },
      editMessage: editMessage,
    })
    await newSnippet.save()
    return res.status(200).send(updatedSnippetDoc)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

export default router
