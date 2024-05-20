import { useState } from "react"

export default function useToggleSideBar() {
    const [isOpen, setIsOpen] = useState(false)

    const enableSideBar = () => {
        setIsOpen(true)
    }

    const disableSideBar = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        enableSideBar,
        disableSideBar
    }
}
