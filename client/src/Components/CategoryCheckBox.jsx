import React from 'react'
import { Checkbox } from '@nextui-org/react'

export default function CategoryCheckBox({ categoryName, search, setSearch }) {
  const [isSelected, setIsSelected] = React.useState(() => {
    const categories = search.get('categories')?.split(',') || []
    return categories.includes(categoryName)
  })

  React.useEffect(() => {
    setSearch(
      (prev) => {
        const categories = new Set(prev.get('categories')?.split(',') || [])
        if (isSelected) {
          categories.add(categoryName)
        } else {
          categories.delete(categoryName)
        }
        const updatedSearch = new URLSearchParams(prev)
        updatedSearch.set('categories', Array.from(categories).join(','))
        return updatedSearch
      },
      {
        replace: true,
      }
    )
  }, [isSelected, categoryName, setSearch])

  return (
    <div className="flex flex-col gap-2 font-lato justify-center">
      <Checkbox
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      >
        {categoryName}
      </Checkbox>
    </div>
  )
}
