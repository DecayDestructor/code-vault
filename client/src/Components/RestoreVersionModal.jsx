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
import { useDispatch } from 'react-redux'
import { restoreVersion } from '../../redux/slices/codeSnippet'
import { ListRestart } from 'lucide-react'
export default function RestoreVersionModal({ snippet }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const dispatch = useDispatch()
  console.log(snippet)
  const handleSubmit = () => {
    onClose()
    dispatch(restoreVersion(snippet))
  }
  return (
    <div className="flex items-center justify-center">
      <button onClick={onOpen}>
        <Tooltip content="Restore Version">
          <ListRestart />
        </Tooltip>
      </button>
      <Modal
        backdrop="opaque"
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Caution
              </ModalHeader>
              <ModalBody className="text-center">
                <p className="font-inter-tight">
                  Do you really want to restore the snippet to this version?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={handleSubmit}>
                  Yes, Restore it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
