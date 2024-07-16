import React from 'react'
import { Checkbox } from '@nextui-org/react'

export default function CategoryCheckBox({ categoryName, search, setSearch }) {
  const [isSelected, setIsSelected] = React.useState(() => {
    const categories = search.get('categories')?.split(',') || []
    return categories.includes(categoryName)
  })

  React.useEffect(() => {
    setSearch((prev) => {
      const categories = new Set(prev.get('categories')?.split(',') || [])
      if (isSelected) {
        categories.add(categoryName)
      } else {
        categories.delete(categoryName)
      }
      const updatedSearch = new URLSearchParams(prev)
      updatedSearch.set('categories', Array.from(categories).join(','))
      console.log(updatedSearch.get('categories'))
      //convert updatedSearch.get('categories') to array
      console.log(updatedSearch.get('categories').split(','))
      // setCategories(updatedSearch.get('categories').split(','))
      return updatedSearch
    })
  }, [isSelected, categoryName, setSearch, setCategories])

  React.useEffect(() => {
    console.log('isSelected state changed:', isSelected)
  }, [isSelected])

  return (
    <div className="flex flex-col gap-2 font-lato">
      <Checkbox
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      >
        {categoryName}
      </Checkbox>
    </div>
  )
}
