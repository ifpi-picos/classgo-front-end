"use client"

import { HiHome, HiOutlineLogin, HiUser } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function SideBar() {
    const router = useRouter()
    
    const homeButtonClicked = (e) => {
        router.push("/home")
    }
    
    const profileButtonClicked = () => {
        router.push("/profile")
    }

    const logoutButtonClicked = () => {
        localStorage.clear()
        router.replace("/")
    }

    return (
        <aside className="w-1/5 h-screen bg-blue-500 text-gray-50 border-r-2 shadow-md flex flex-col items-center">
            <div className="flex justify-center items-center w-full h-32 text-xl text-gray-50">
                <span>idCurso</span>
            </div>

            <div className="flex flex-col w-full mb-8">
                <div className="ml-4 mb-4">
                    <span>Início</span>
                </div>

                <div className="flex justify-center items-center">
                    <button className="flex items-center w-11/12 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" type="button"onClick={homeButtonClicked}>
                        <HiHome className="mr-2 mb-1 text-2xl"/> <span>Home</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-full mb-8">
                <div className="ml-4 mb-4">
                    <span>Configurações</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <button className="flex items-center w-11/12 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" type="button"onClick={profileButtonClicked}>
                        <HiUser className="mr-2 mb-1 text-2xl"/> <span>Perfil</span>
                    </button>

                    <button className="flex items-center w-11/12 p-4 rounded-xl hover:bg-red-400 active:bg-blue-500" type="button"onClick={logoutButtonClicked}>
                        <HiOutlineLogin className="mr-2 text-2xl"/> <span>Sair</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
