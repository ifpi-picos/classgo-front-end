"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { iconEdit, iconHome, iconLogout } from "./Icons"

export default function Main() {
    const [course, setCourse] = useState("Nome do Curso")
    const [courseButtonBg, setCourseButtonBg] = useState("bg-blue-400")

    const router = useRouter()

    const coursesUrl = "https://reverse-time-back-end.vercel.app/courses"

    useEffect(() => {
        axios
            .get(coursesUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")              
            }})
            .then((res) => {
                if (res.status === 200) {
                    return setCourse(res.data.description)
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    })

    const logout = () => {
        localStorage.clear()
        router.replace("/")
    }

    return (
        <main className="w-full h-screen flex">
            <div className="w-1/5 h-screen bg-blue-500 text-gray-100 flex flex-col">
                <div className="w-full h-32 flex justify-center items-center">
                    <span className="text-xl">idCurso</span>
                </div>

                <div className="w-full my-2 flex flex-col">
                    <div className="ml-4 mb-6 flex items-center">
                        <span>Home</span>
                    </div>

                    <div className="mb-8 flex justify-center items-center">
                        <button className={`w-11/12 py-4 pr-4 ${courseButtonBg} rounded-lg hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-500 flex`} type="button">
                            <span className="pl-4">{iconHome}</span>
                            <span className="pl-2">{course}</span>
                        </button>
                    </div>
                </div>

                <div className="w-full my-2 flex flex-col">
                    <div className="ml-4 mb-6 flex items-center">
                        <span>Configurações</span>
                    </div>

                    <div className="mb-8 flex justify-center items-center">
                        <button className="w-11/12 py-4 pr-4 rounded-lg hover:bg-red-400 active:bg-blue-500 flex" type="button" onClick={logout}>
                            <span className="pl-4">{iconLogout}</span>
                            <span className="pl-2">Sair</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-4/5 h-screen bg-gray-100 text-gray-800 flex flex-col">
                <div className="w-full h-32 border-2 border-gray-300 flex justify-center items-center">
                    <div className="w-1/3 flex justify-center items-center">
                        <span className="text-xl">{course}</span>
                    </div>
                </div>

                <div className="flex flex-grow justify-center items-center">
                    <div className="flex justify-center items-center">
                        <span>Turmas</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
