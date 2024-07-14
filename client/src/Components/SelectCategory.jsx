import React, { useState, useEffect, useCallback } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  DropdownSection,
} from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { Plus } from 'lucide-react'

export default function SelectCategory(props) {
  const { setCategoryInput } = props || false
  const { setSelectedCategories } = props
  const { selectedCategories } = props || []
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const categories = useSelector((state) => state.snippetReducer.categories) // console.log(categories)
  console.log(selectedCategories)
  // console.log(categories)
  const selectedCategoriesFunction = useCallback(
    () => [...selectedKeys],
    [selectedKeys]
  )
  useEffect(() => {
    setSelectedCategories(selectedCategoriesFunction)
  }, [selectedCategoriesFunction, setSelectedCategories])
  return (
    <div className="flex gap-5 items-center">
      <Dropdown className="grow">
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedCategories.length > 0
              ? selectedCategories.join(', ')
              : 'Select A Category'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {categories.map((category) => {
            return <DropdownItem key={category}>{category}</DropdownItem>
          })}
        </DropdownMenu>
      </Dropdown>
      <button
        onClick={(e) => {
          e.preventDefault()
          setCategoryInput(true)
        }}
      >
        <Plus />
      </button>
    </div>
  )
}
