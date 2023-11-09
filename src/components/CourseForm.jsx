"use client"

import axios from "axios"
import PrivateRoute from "./PrivateRoute"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CourseForm() {
    const [description, setDescription] = useState()
    const [userId, setUserId] = useState()

    const router = useRouter()
    
    const courseUrl = "http://localhost:3030/courses"

    const create = () => {
        if (!description) {
            return alert("Campo Nome do Curso vazio!")
        }

        else if (!userId) {
            return alert("Campo Id do Usuário vazio")
        }

        axios
            .post(courseUrl, {description, userId}, {headers: {
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
                if (err.response.status === 401) {
                    localStorage.removeItem("token")
                    return router.replace("/")
                }
                
                return console.log(err.response.data)
            })
    }

    return (
        <PrivateRoute>
            <form className="w-1/3 h-3/5 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
                <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                    <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                    <div className="flex justify-center">
                        <span className="text-xl">Novo Curso</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-5/6 mb-5 flex flex-col">
                            <label htmlFor="description" className="mb-3">Nome do Curso</label>
                            <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="description" name="description" type="text" placeholder="Digite o nome do Curso" required onChange={(e) => setDescription(e.currentTarget.value)}/>
                        </div>

                        <div className="w-5/6 mb-5 flex flex-col">
                            <label htmlFor="userId" className="mb-3">Id do Usuário</label>
                            <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="userId" name="userId" type="number" placeholder="Digite seu id" required onChange={(e) => setUserId(e.currentTarget.value)}/>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <button className="px-7 py-3 mb-5 border border-gray-100 rounded-sm" type="button" onClick={() => {create()}}>Criar</button>
                    </div>
                </fieldset>
            </form>
        </PrivateRoute>
    )
}
