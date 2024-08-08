import { useState } from "react"

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclosure = (): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function onOpen() {
    setIsOpen(true)
  }
  function onClose() {
    setIsOpen(false)
  }
  function onToggle() {
    setIsOpen(!isOpen)
  }

  return {isOpen, onOpen, onClose, onToggle}
}
