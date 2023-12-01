"use client"

import axios from "axios"
import { HiAcademicCap, HiHome, HiOutlineLogin, HiUser } from "react-icons/hi"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SideBar() {
    const [myClasses, setMyClasses] = useState([])

    const router = useRouter()

    const getMyClassesUrl = "https://idcurso-back-end.vercel.app/classes"

    useEffect(() => {
        axios
            .get(getMyClassesUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setMyClasses(res.data)
                    return
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }, [])

    const myClassesList = myClasses.map((myClass) => 
        <button key={myClass.id} className="flex items-center w-11/12 mb-2 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" type="button">
            <HiAcademicCap className="mr-2" size="24"/> <span>{myClass.description}</span>
        </button>
    )
    
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
        <aside className="flex flex-col items-center fixed left-0 float-left overflow-auto w-1/5 h-screen bg-blue-500 text-gray-50 shadow-md">
            <div className="flex justify-center items-center w-full my-12 text-xl text-gray-50">
                <span>idCurso</span>
            </div>

            <div className="flex flex-col w-full mb-8">
                <div className="h-full ml-4 mb-4">
                    <span>Início</span>
                </div>

                <div className="flex justify-center items-center">
                    <button className="flex items-center w-11/12 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" type="button"onClick={homeButtonClicked}>
                        <HiHome className="mr-2 mb-1" size="24"/> <span>Home</span>
                    </button>
                </div>
            </div>

            {myClasses.length > 0 ? (
                <div className="flex flex-col w-full mb-8">
                    <div className="ml-4 mb-4">
                        <span>Turmas</span>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        {myClassesList}
                    </div>
                </div>
            ) : (
                null
            )}

            <div className="flex flex-col w-full mb-8">
                <div className="ml-4 mb-4">
                    <span>Configurações</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <button className="flex items-center w-11/12 mb-2 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500" type="button" onClick={profileButtonClicked}>
                        <HiUser className="mr-2 mb-1" size="24"/> <span>Perfil</span>
                    </button>

                    <button className="flex items-center w-11/12 p-4 rounded-xl hover:bg-red-400 active:bg-blue-500" type="button" onClick={logoutButtonClicked}>
                        <HiOutlineLogin className="mr-2" size="24"/> <span>Sair</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
