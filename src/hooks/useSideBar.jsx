import { useCallback, useState } from "react"

export default function useSideBar() {
    const [isOpen, setIsOpen] = useState(true)
    const [activeMyClassesButton, setActiveMyClassesButton] = useState(true)
    const [activeProfileButton, setActiveProfileButton] = useState(false)

    const enableSideBar = useCallback(() => {
        setIsOpen(true)
    }, [])

    const disableSideBar = useCallback(() => {
        setIsOpen(false)
    }, [])

    const activateMyClassesButton = useCallback(() => {
        setIsOpen(true)
        setActiveProfileButton(false)
        setActiveMyClassesButton(true)
    }, [])

    const activateProfileButton = useCallback(() => {
        setIsOpen(true)
        setActiveMyClassesButton(false)
        setActiveProfileButton(true)
    }, [])

    return {
        isOpen,
        activeMyClassesButton,
        activeProfileButton,
        enableSideBar,
        disableSideBar,
        activateMyClassesButton,
        activateProfileButton
    }
}
