"use client"

import { HiAcademicCap, HiMenu, HiOutlineLogin, HiUser } from "react-icons/hi"
import Link from "next/link"

export default function SideBar() {
    return (
        <nav className="flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-white shadow-md lg:w-[30%] md:text-sm sm:w-[20%]">
            <div className="flex justify-center items-center w-full h-32">
                <HiMenu className="hidden text-2xl sm:block"/>
                <span className="sm:hidden">idCurso</span>
            </div>

            <Link className="flex items-center w-[90%] mb-4 p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500 sm:justify-center" href="/myclasses">
                <HiAcademicCap className="text-2xl"/>
                <span className="ml-4 sm:hidden">Turmas</span>
            </Link>

            <Link className="flex items-center w-[90%] mb-4 p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500 sm:justify-center" href="/profile">
                <HiUser className="text-2xl"/>
                <span className="ml-4 sm:hidden">Perfil</span>
            </Link>

            <Link className="flex items-center w-[90%] p-2 rounded-xl hover:bg-red-400 active:bg-red-500 sm:justify-center" href="/">
                <HiOutlineLogin className="text-2xl"/>
                <span className="ml-4 sm:hidden">Sair</span>
            </Link>
        </nav>
    )
}
