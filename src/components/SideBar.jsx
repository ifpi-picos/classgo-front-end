"use client"

import { HiAcademicCap, HiOutlineLogin, HiUser } from "react-icons/hi"
import Link from "next/link"

export default function SideBar() {
    return (
        <aside className="flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-gray-50 shadow-md">
            <div className="flex justify-center items-center w-full my-12 text-xl text-gray-50">
                <span>idCurso</span>
            </div>

            <div className="flex flex-col w-full mb-8">
                <div className="h-full ml-4 mb-4">
                    <span>Início</span>
                </div>

                <div className="flex justify-center items-center">
                    <Link className="flex items-center w-11/12 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/home">
                        <HiAcademicCap className="mr-2" size="24"/> <span>Turmas</span>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col w-full mb-8">
                <div className="ml-4 mb-4">
                    <span>Configurações</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <Link className="flex items-center w-11/12 mb-2 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" href="/profile">
                        <HiUser className="mr-2 mb-1" size="24"/> <span>Perfil</span>
                    </Link>

                    <Link className="flex items-center w-11/12 p-4 rounded-xl hover:bg-red-400 active:bg-blue-500" href="/" onClick={() => localStorage.clear()}>
                        <HiOutlineLogin className="mr-2" size="24"/> <span>Sair</span>
                    </Link>
                </div>
            </div>
        </aside>
    )
}
