"use client"

import { HiAcademicCap, HiOutlineLogin, HiUser } from "react-icons/hi"
import Link from "next/link"

export default function SideBar({isOpen}) {
    return (
        <nav className={`flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-white shadow-md ${isOpen ? "xs:z-0 xs:w-4/5" : "xs:hidden"}`}>
            <div className="flex justify-center items-center w-full h-32 p-2">
                <span>idCurso</span>
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
    )
}
