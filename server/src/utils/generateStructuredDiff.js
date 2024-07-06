import { diff } from 'jest-diff'
import stripAnsi from 'strip-ansi'

export function generateStructuredDiff(original, updated) {
  const differences = diff(original, updated)

  if (!differences) return null

  const lines = stripAnsi(differences).split('\n')
  const structuredDiff = {
    removed: [],
    added: [],
  }

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i].trim()
    if (line.startsWith('-')) {
      let cleanedLine = line.substring(1).trim()
      //   cleanedLine = cleanedLine.replace(/\\"/g, '').replace(/^"|"$/g, '') // Remove escaped and surrounding double quotes
      structuredDiff.removed.push(cleanedLine)
    } else if (line.startsWith('+')) {
      let cleanedLine = line.substring(1).trim()
      //   cleanedLine = cleanedLine.replace(/\\"/g, '').replace(/^"|"$/g, '') // Remove escaped and surrounding double quotes
      structuredDiff.added.push(cleanedLine)
    }
  }

  return structuredDiff
}
