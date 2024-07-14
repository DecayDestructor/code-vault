export default function compareObjects(obj1, obj2) {
  // Convert objects to JSON strings
  var json1 = JSON.stringify(obj1)
  var json2 = JSON.stringify(obj2)

  // Compare JSON strings
  if (json1 === json2) {
    console.log('Objects are identical.')
  } else {
    console.log('Objects are different.')

    // Convert JSON strings back to objects
    var parsed1 = JSON.parse(json1)
    var parsed2 = JSON.parse(json2)
    var updatedObject = {}

    // Find and print the differences
    for (var key in parsed1) {
      if (!parsed1[key] || !parsed2[key]) {
        continue
      }
      if (parsed1.hasOwnProperty(key)) {
        if (typeof parsed1[key] == 'object' && !Array.isArray(parsed1[key])) {
          if (JSON.stringify(parsed1[key]) !== JSON.stringify(parsed2[key])) {
            updatedObject[key] = parsed1[key]
          }
        } else if (Array.isArray(parsed1[key])) {
          if (JSON.stringify(parsed1[key]) !== JSON.stringify(parsed2[key])) {
            updatedObject[key] = parsed1[key]
          }
        }
        if (parsed1[key] !== parsed2[key]) {
          updatedObject[key] = parsed1[key] // Correct way to update updatedObject
        }
      }
    }

    console.log(updatedObject)
    return updatedObject // Now updatedObject will contain the differing properties
  }
}

// Example usage:
