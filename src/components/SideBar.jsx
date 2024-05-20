"use client"

import { HiAcademicCap, HiMenu, HiOutlineLogin, HiUser, HiX } from "react-icons/hi"
import Link from "next/link"
import useToggleSideBar from "@/hooks/useToggleSideBar"

export default function SideBar() {
    const {isOpen, enableSideBar, disableSideBar} = useToggleSideBar()

    return (
        <>
            <nav className={`flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-white shadow-md ${isOpen ? "sm:z-10 sm:w-3/5 xs:w-4/5" : "sm:hidden"}`}>
                <div className="flex justify-center items-center w-full h-32 p-2 sm:w-[90%] sm:justify-between">
                    <span>idCurso</span>
                    <HiX className="hidden text-2xl sm:block" onClick={disableSideBar}/>
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

            <HiMenu className={`fixed hidden z-10 left-8 top-9 text-2xl text-neutral-800 ${isOpen ? "sm:hidden" : "sm:block"}`} onClick={enableSideBar}/>
        </>
    )
}
