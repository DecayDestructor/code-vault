import React, { useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSnippet } from '../../redux/slices/codeSnippet'
import { User } from 'lucide-react'

export default function ShowUserIdModal() {
  const allowedUsers = useSelector((state) => state.userReducer.access)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>
        <User size={16} />
      </button>
      <Modal
        backdrop="opaque"
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
                Users with allowed access to this snippet
              </ModalHeader>
              <ModalBody className="flex flex-col gap-3 items-center">
                {allowedUsers.length === 0 && (
                  <div className="text-lg text-center">No users found</div>
                )}
                {allowedUsers.map((user, index) => {
                  return <div key={index}>{user}</div>
                })}
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
