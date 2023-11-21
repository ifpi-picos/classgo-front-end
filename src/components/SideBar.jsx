"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PrivateRoute from "./PrivateRoute"

export default function SideBar() {
    const [course, setCourse] = useState()

    const router = useRouter()

    const coursesUrl = "https://reverse-time-back-end.vercel.app/courses"

    useEffect(() => {
        axios.get(coursesUrl, {headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")              
        }}).then((res) => {
            if (res.status === 200) {
                return setCourse(res.data.description)
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear()
                return router.replace("/")
            }
        })
    })

    return (
        <div className="w-1/5 h-screen bg-blue-500 text-gray-100 flex flex-col">
            <div className="w-full h-32 flex justify-center items-center">
                <span className="text-xl">idCurso</span>
            </div>

            <div className="w-full my-2 flex flex-col">
                <div className="ml-4 mb-6 flex items-center">
                    <span>Home</span>
                </div>

                <div className="mb-8 flex justify-center items-center">
                    <button className="w-11/12 p-4 rounded-lg hover:bg-blue-400 flex" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                        </svg>

                        <span className="pl-2">{course}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
