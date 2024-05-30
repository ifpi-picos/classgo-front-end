import { useCallback, useState } from "react"

export default function useSideBar() {
    const [isOpen, setIsOpen] = useState(true)
    const [active, setActive] = useState("bg-blue-400 border")

    const enableSideBar = useCallback(() => {
        setIsOpen(true)
    }, [])

    const disableSideBar = useCallback(() => {
        setIsOpen(false)
    }, [])

    return {
        isOpen,
        active,
        enableSideBar,
        disableSideBar
    }
}
