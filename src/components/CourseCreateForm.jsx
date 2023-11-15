"use client"

import axios from "axios"
import PrivateRoute from "./PrivateRoute"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CourseCreateForm() {
    const [description, setDescription] = useState()

    const router = useRouter()
    
    const courseUrl = "https://reverse-time-back-end.vercel.app/courses"

    const create = () => {
        if (!description) {
            return alert("Campo Nome do Curso Obrigatório!")
        }

        axios
            .post(courseUrl, {description}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")              
            }})
            .then((res) => {
                if (res.status === 201) {
                    return alert(res.data)
                }
                
                else if (res.status === 401) {
                    localStorage.clear()                  
                    return router.replace("/")
                }

                return console.log(res.data)
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
                
                return console.log(err.response.data)
            })
    }

    return (
        <PrivateRoute>
            <form className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
                <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                    <div className="my-10 flex justify-center items-center">
                        <span className="text-xl">Novo Curso</span>
                    </div>

                    <div className="flex justify-center items-center">
                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Nome do Curso"
                            required
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                    </div>

                    <div className="my-10 flex justify-center items-center">
                        <button className="px-7 py-3 border border-gray-100 rounded-lg" type="button" onClick={create}>Criar</button>
                    </div>
                </fieldset>
            </form>
        </PrivateRoute>
    )
}
