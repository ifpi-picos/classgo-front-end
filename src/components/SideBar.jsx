"use client"

import { HiAcademicCap, HiMenu, HiOutlineLogin, HiUser, HiX } from "react-icons/hi"
import Link from "next/link"
import useSideBar from "@/hooks/useSideBar"

export default function SideBar({myClassesRoute, profileRoute}) {
    const {isOpen, enableSideBar, disableSideBar} = useSideBar()

    return (
        <>
            <nav className={`${isOpen ? "flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen z-10 bg-blue-500 text-white shadow-md 2xl:w-1/4 xl:w-[30%] lg:w-[35%] md:w-2/5 sm:w-1/2 xs:w-4/5" : "hidden"}`}>
                <div className="flex items-center justify-between w-[90%] h-[120px] p-2 lg:h-[100px]">
                    <span>idCurso</span>
                    <HiX className="text-2xl cursor-pointer" onClick={disableSideBar}/>
                </div>

                <Link className={`${myClassesRoute} flex items-center w-[90%] mb-4 p-2 rounded-xl hover:border active:bg-blue-500`} href="/myclasses">
                    <HiAcademicCap className="text-2xl"/>
                    <span className="ml-4">Turmas</span>
                </Link>

                <Link className={`${profileRoute} flex items-center w-[90%] mb-4 p-2 rounded-xl hover:border active:bg-blue-500`} href="/profile">
                    <HiUser className="text-2xl"/>
                    <span className="ml-4">Perfil</span>
                </Link>

                <Link className="flex items-center w-[90%] p-2 rounded-xl hover:border active:bg-red-500" href="/">
                    <HiOutlineLogin className="text-2xl"/>
                    <span className="ml-4">Sair</span>
                </Link>
            </nav>

            <HiMenu className={`${isOpen ? "hidden" : "fixed z-10 left-12 top-12 text-2xl text-neutral-800 cursor-pointer lg:left-10 lg:top-10"}`} onClick={enableSideBar}/>
        </>
    )
}
