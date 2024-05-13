"use client"

import { HiAcademicCap, HiOutlineLogin, HiUser } from "react-icons/hi"
import Link from "next/link"

export default function SideBar() {
    return (
        <aside className="flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-white shadow-md">
            <div className="flex justify-center items-center w-full h-32">
                <span>idCurso</span>
            </div>

            <div className="w-full">
                <div className="flex flex-col items-center w-full mb-8">
                    <span className="text-sm w-[95%] mb-4">Início</span>

                    <Link className="flex items-center w-[95%] p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/myclasses">
                        <HiAcademicCap className="text-lg mr-2"/>
                        <span>Turmas</span>
                    </Link>
                </div>

                <div className="flex flex-col items-center w-full mb-6">
                    <span className="text-sm w-[95%] mb-4">Configurações</span>

                    <Link className="flex items-center w-[95%] mb-2 p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/profile">
                        <HiUser className="text-lg mr-2"/>
                        <span>Perfil</span>
                    </Link>

                    <Link className="flex items-center w-[95%] p-2 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/">
                        <HiOutlineLogin className="text-lg mr-2"/>
                        <span>Sair</span>
                    </Link>
                </div>
            </div>

        </aside>
    )
}
