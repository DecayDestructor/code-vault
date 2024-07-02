import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useSelect,
} from '@nextui-org/react'
import { Edit, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { allowAccess, removeAccess } from '../../redux/slices/userManagement'
import { useUser } from '@clerk/clerk-react'

export default function RemoveUserIdModal({ snippetId }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const { user } = useUser()
  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
    dispatch(
      removeAccess({ email: email, snippetId: snippetId, sender: user.id })
    )
  }

  return (
    <>
      <button onClick={onOpen}>
        <Trash2 size={16} />
      </button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-2 font-inter-tight"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Remove Access from a user
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 justify-center"
                >
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="bg-blue-700 text-white font-inter-tight py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
