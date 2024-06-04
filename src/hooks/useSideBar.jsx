import { useCallback, useState } from "react"

export default function useSideBar() {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false)
    
    const pageActive = "bg-blue-400 border"

    const enableSideBar = useCallback(() => {
        setSideBarIsOpen(true)
    }, [])

    const disableSideBar = useCallback(() => {
        setSideBarIsOpen(false)
    }, [])

    return {
        sideBarIsOpen,
        pageActive,
        enableSideBar,
        disableSideBar
    }
}
