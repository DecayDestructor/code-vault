import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function DeleteModal({ handleDelete }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleDeleteAndClose = () => {
    handleDelete()
    onClose()
    toast.success('Snippet Deleted Successfully', {
      duration: 5000,
    })
  }

  return (
    <>
      <Tooltip content="Delete Snippet">
        <button onClick={onOpen} className="">
          <TrashIcon color="red" size={18} />
        </button>
      </Tooltip>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              <span className="text-2xl">Delete</span>
              <span className="text-lg">Are you sure?</span>
            </ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={handleDeleteAndClose}>
                Yes
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
