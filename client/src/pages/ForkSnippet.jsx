//copy createSnippet.jsx

import { useUser } from '@clerk/clerk-react'
import { Button, snippet } from '@nextui-org/react'
import { ArrowLeft, Check, Eye, EyeOffIcon, Plus } from 'lucide-react'
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCategory,
  addSnippet,
  getCategories,
  getOneSnippet,
} from '../../redux/slices/codeSnippet'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-rust'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'
import { languages } from '../data/CreateSnippet'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import SelectCategory from '../Components/SelectCategory'
import Loading from '../Components/Loading'
import { useParams } from 'react-router-dom'

const CodeEditorComponent = ({ mode, className, value, onChange }) => {
  return (
    <AceEditor
      mode={mode.toLowerCase()}
      onChange={onChange}
      value={value}
      enableLiveAutocompletion
      enableBasicAutocompletion
      className={className}
      width="100%"
      theme="github"
    />
  )
}

const CreateSnippet = () => {
  const { snippetID } = useParams()
  const { oneSnippet, loading } = useSelector((state) => state.snippetReducer)

  const user = useUser()
  const [selectedCodinglanguage, setCodingLanguage] = useState('JavaScript')
  const [value, setValue] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [publicSnippet, setPublicSnippet] = useState(true)
  const [category, setCategory] = useState([])
  const [categoryInput, setCategoryInput] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOneSnippet(snippetID))
  }, [dispatch, snippetID])
  useEffect(() => {
    if (!loading && oneSnippet) {
      setValue(oneSnippet.code)
      setName(oneSnippet.name + ' (forked)')
      setDescription(oneSnippet.description)
      setPublicSnippet(oneSnippet.publicSnippet)
      setSelectedCategories(oneSnippet.categories)
      setCodingLanguage(oneSnippet.coding_language)
    }
  }, [loading, JSON.stringify(oneSnippet)])
  const handleSubmit = (e) => {
    e.preventDefault()
    const newSnippet = {
      userId: user.user.id,
      name: name,
      description: description,
      publicSnippet: publicSnippet,
      code: value,
      coding_language: selectedCodinglanguage.toLowerCase(),
      categories: selectedCategories,
    }

    dispatch(addSnippet(newSnippet))
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    dispatch(addCategory(category))
    setCategory('')
    setCategoryInput(false)
  }
  useEffect(() => {
    dispatch(getCategories(user.user.id))
  }, [dispatch, user.user.id])

  if (loading) {
    return <Loading />
  }
  return (
    <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
      <div className="lg:flex w-[90%] max-lg:flex max-lg:flex-col max-lg:items-center max-lg:my-5">
        <div className="mt-5 flex flex-col gap-3 justify-center items-center h-full w-[55%] max-lg:w-5/6 max-lg:ml-5 max-lg:my-10">
          <div className="w-full">
            <h1 className="subHeader">Create a new snippet</h1>
            <p className="font-lato text-sm text-default-500 italic mt-1 p-1">
              A code snippet is a piece of code that you can use as and when
              required.
            </p>
          </div>
          <div className="w-full">
            <div className="inline-flex gap-3 items-center p-3 bg-gray-50 rounded-md">
              <img
                src={`${user.user.imageUrl}`}
                className="rounded-full h-8"
                alt="user"
              ></img>
              <span>{user.user.fullName}</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center gap-3">
            <div className="flex flex-col gap-2 w-4/5">
              <label className="font-lato text-sm text-default-500 w-full">
                Snippet Name
              </label>
              <input
                type="text"
                className="border-2 border-gray-200 rounded-md p-2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-4/5">
              <label className="font-lato text-sm text-default-500">
                Snippet Description
              </label>
              <textarea
                className="border-2 border-gray-200 rounded-md p-2 w-full"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>
            <h1 className="subHeader">Category</h1>
            <div className="flex flex-col gap-5 w-3/6">
              {!categoryInput ? (
                <SelectCategory
                  setCategoryInput={setCategoryInput}
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />
              ) : (
                <div className="flex gap-5 items-center">
                  <input
                    type="text"
                    className="border-2 border-gray-200 rounded-md p-2"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setCategoryInput(false)
                    }}
                  >
                    <ArrowLeft />
                  </button>
                  <button onClick={handleAddCategory}>
                    <Check />
                  </button>
                </div>
              )}
            </div>
            <h1 className="subHeader">Visibility</h1>
            <div className="flex flex-col gap-5 w-3/6">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="public"
                    name="accessibility"
                    checked={publicSnippet}
                    onChange={() => setPublicSnippet(true)}
                  />
                  <Eye />
                  <label htmlFor="public">Public</label>
                </div>
                <div>
                  <p className="font-lato text-sm text-default-500 italic mt-1 p-1">
                    Keep your code snippet public globally
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="private"
                    name="accessibility"
                    checked={!publicSnippet}
                    onChange={() => setPublicSnippet(false)}
                  />
                  <EyeOffIcon />
                  <label htmlFor="private">Private</label>
                </div>
                <div>
                  <p className="font-lato text-sm text-default-500 italic mt-1 p-1">
                    Keep your code snippet to yourself (private)
                  </p>
                </div>
              </div>
              <Dropdown className="">
                <DropdownTrigger>
                  <Button variant="bordered">
                    <h1 className="font-semibold text-sm">
                      {selectedCodinglanguage || 'JavaScript'}
                    </h1>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                  selectionMode="single"
                >
                  {languages.map((language) => {
                    return (
                      <DropdownItem
                        key={language}
                        onClick={() => {
                          setCodingLanguage(language)
                        }}
                      >
                        {language}
                      </DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center max-lg:self-start max-lg:items-center grow mt-5 h-full max-lg:w-full">
          <span className="font-lato text-sm text-default-500 italic text-center w-full">
            Preview
          </span>
          <CodeEditorComponent
            mode={selectedCodinglanguage || 'JavaScript'}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            className="py-5"
          />
        </div>
      </div>
      <Button
        className="font-inter-tight text-white font-bold"
        color="success"
        type="submit"
      >
        Save
      </Button>
    </form>
  )
}

export default CreateSnippet
