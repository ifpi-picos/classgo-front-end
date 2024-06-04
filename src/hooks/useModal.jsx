import { useCallback, useState } from "react"

export default function useModal() {
    const [modalIsOpen, setMoadlIsOpen] = useState(false)

    const openModal = useCallback(() => {
        setMoadlIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setMoadlIsOpen(false)
    }, [])

    return {
        modalIsOpen,
        openModal,
        closeModal
    }
}
