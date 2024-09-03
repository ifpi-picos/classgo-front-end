"use client"

import { HiAcademicCap, HiMenu, HiOutlineLogout, HiUser, HiX } from "react-icons/hi"
import Link from "next/link"
import useSideBar from "@/hooks/useSideBar"

export default function SideBar({myClassesPage, profilePage}) {
    const {sideBarIsOpen, enableSideBar, disableSideBar} = useSideBar()

    return (
        <>
            <nav className={`${sideBarIsOpen ? "flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen z-20 bg-blue-500 text-white shadow-md xl:w-1/4 lg:w-[30%] md:w-2/5 sm:w-1/2 xs:w-4/5" : "hidden"}`}>
                <div className="flex items-center justify-between w-[90%] h-[75px] p-2">
                    <span className="text-lg">Class Go</span>

                    <button type="button" onClick={disableSideBar}>
                        <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                    </button>
                </div>

                <Link className={`${myClassesPage} flex items-center w-[90%] mb-4 p-2 rounded-xl hover:border active:bg-blue-500`} href="/myclasses">
                    <HiAcademicCap className="text-2xl"/>
                    <span className="ml-4">Turmas</span>
                </Link>

                <Link className={`${profilePage} flex items-center w-[90%] mb-4 p-2 rounded-xl hover:border active:bg-blue-500`} href="/profile">
                    <HiUser className="text-2xl"/>
                    <span className="ml-4">Perfil</span>
                </Link>

                <Link className="flex items-center w-[90%] p-2 rounded-xl hover:border active:bg-blue-500" href="/">
                    <HiOutlineLogout className="text-2xl"/>
                    <span className="ml-4">Sair</span>
                </Link>
            </nav>
            
            <button className={`${sideBarIsOpen ? "hidden" : "fixed z-20 left-4 top-[18px] text-gray-800 p-2 cursor-pointer rounded-full hover:bg-gray-200 active:bg-transparent"}`} type="button" onClick={enableSideBar}>
                <HiMenu className="text-2xl" title="Menu"/>
            </button>
        </>
    )
}
