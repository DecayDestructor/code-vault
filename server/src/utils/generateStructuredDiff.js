export function generateStructuredDiff(original, updated) {
  const structuredDiff = {
    modified: {},
    previous: {},
  }

  for (const item in original) {
    if (typeof updated[item] !== 'boolean' && !updated[item]) {
      continue
    }
    if (Array.isArray(updated[item]) && Array.isArray(original[item])) {
      //compare the two arrays and store it in structuredDiff without using diff
      if (JSON.stringify(updated[item]) !== JSON.stringify(original[item])) {
        structuredDiff.modified[item] = updated[item]
        structuredDiff.previous[item] = original[item]
      }
    } //check if the key-value pair is object and if they are unequal, push into structuredDiff
    else if (typeof original[item] === 'object' && updated[item] !== null) {
      structuredDiff.modified[item] = generateStructuredDiff(
        original[item],
        updated[item]
      )
      structuredDiff.previous[item] = generateStructuredDiff(
        updated[item],
        original[item]
      )
    } else if (updated[item] !== original[item]) {
      structuredDiff.modified[item] = updated[item]
      structuredDiff.previous[item] = original[item]
    } else {
      structuredDiff.previous[item] = original[item]
    }
  }
  return structuredDiff
}
