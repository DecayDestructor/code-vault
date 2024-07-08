export function generateStructuredDiff(original, updated) {
  const structuredDiff = {
    modified: [],
  }

  for (const item in original) {
    if (typeof updated[item] !== 'boolean' && !updated[item]) {
      continue
    }
    if (Array.isArray(updated[item]) && Array.isArray(original[item])) {
      //compare the two arrays and store it in structuredDiff without using diff
      if (JSON.stringify(updated[item]) !== JSON.stringify(original[item])) {
        structuredDiff.modified.push({
          path: item,
          previous: original[item],
          current: updated[item],
        })
      }
    } //check if the key-value pair is object and if they are unequal, push into structuredDiff
    else if (typeof original[item] === 'object' && updated[item] !== null) {
      structuredDiff.modified.push({
        path: item,
        previous: generateStructuredDiff(original[item], updated[item]),
        current: generateStructuredDiff(updated[item], original[item]),
      })
    } else if (updated[item] !== original[item]) {
      structuredDiff.modified.push({
        path: item,
        previous: original[item],
        current: updated[item],
      })
    }
  }
  return structuredDiff
}
