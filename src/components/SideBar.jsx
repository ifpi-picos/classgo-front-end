"use client"

import { HiAcademicCap, HiMenu, HiOutlineLogin, HiUser, HiX } from "react-icons/hi"
import Link from "next/link"
import useToggleSideBar from "@/hooks/useToggleSideBar"

export default function SideBar() {
    const {isOpen, enableSideBar, disableSideBar} = useToggleSideBar()

    return (
        isOpen ? (
            <nav className="flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-white shadow-md xs:z-0 xs:w-4/5">
                <div className="flex justify-center items-center w-[90%] h-32 p-2 xs:justify-between">
                    <span>idCurso</span>
                    <HiX className="text-2xl hidden xs:flex" onClick={disableSideBar}/>
                </div>

                <Link className="flex items-center w-[90%] mb-4 p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/myclasses">
                    <HiAcademicCap className="text-2xl"/>
                    <span className="ml-4">Turmas</span>
                </Link>

                <Link className="flex items-center w-[90%] mb-4 p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/profile">
                    <HiUser className="text-2xl"/>
                    <span className="ml-4">Perfil</span>
                </Link>

                <Link className="flex items-center w-[90%] p-2 rounded-xl hover:bg-red-400 active:bg-red-500" href="/">
                    <HiOutlineLogin className="text-2xl"/>
                    <span className="ml-4">Sair</span>
                </Link>
            </nav>
        ) : (
            <nav className="hidden fixed left-0 w-1/5 h-32 justify-center items-center xs:flex">
                <HiMenu className="text-2xl" onClick={enableSideBar}/>
            </nav>
        )
    )
}
