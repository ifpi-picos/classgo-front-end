"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiHome, HiOutlineLogin, HiUser } from "react-icons/hi"

export default function SideBar() {
    const [homeButtonBg, setHomeButtonBg] = useState("bg-blue-400")

    const router = useRouter()

    const profileButtonClicked = () => {
        router.push("/profile")
    }

    const logout = () => {
        localStorage.clear()
        router.replace("/")
    }

    return (
        <div className="w-1/5 h-screen bg-blue-500 text-gray-100 flex flex-col">
            <div className="w-full h-32 mb-4 flex justify-center items-center">
                <span className="text-xl">idCurso</span>
            </div>

            <div className="w-full mb-8 flex flex-col">
                <div className="ml-4 mb-4 flex items-center">
                    <span>Início</span>
                </div>

                <div className="flex justify-center items-center">
                    <button className={`w-11/12 p-4 ${homeButtonBg} rounded-lg hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-500 flex items-center`} type="button">
                        <HiHome size="24"/>
                        <span className="pl-2">Home</span>
                    </button>
                </div>
            </div>

            <div className="w-full my-2 flex flex-col">
                <div className="ml-4 mb-4 flex items-center">
                    <span>Configurações</span>
                </div>

                <div className="mb-2 flex justify-center items-center">
                    <button className="w-11/12 p-4 rounded-lg hover:bg-blue-400 active:bg-blue-500 flex items-center" type="button" onClick={profileButtonClicked}>
                        <HiUser size="24"/>
                        <span className="pl-2">Perfil</span>
                    </button>
                </div>

                <div className="flex justify-center items-center">
                    <button className="w-11/12 p-4 rounded-lg hover:bg-red-400 active:bg-blue-500 flex items-center" type="button" onClick={logout}>
                        <HiOutlineLogin size="24"/>
                            <span className="pl-2">Sair</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
