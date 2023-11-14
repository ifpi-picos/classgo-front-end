"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import PrivateRoute from "./PrivateRoute"

export default function RedefinePasswordForm() {
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const router = useRouter()

    const redefinePasswordUrl = "https://reverse-time-back-end.vercel.app/redefinepassword"

    const redefinePassword = () => {
        if (!newPassword) {
            alert("Campo Senha Atual obrigatório!")
        }

        else if (!confirmNewPassword) {
            alert("Campo Nova Senha obrigatório!")
        }

        else if (newPassword != confirmNewPassword) {
            alert("Campos Nova senha e Confirmar Nova Senha distintos!")
        }

        axios
            .put(redefinePasswordUrl, {newPassword, confirmNewPassword}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    alert("Senha redefinada com sucesso!")
                    localStorage.clear()
                    return router.replace("/")
                }

                else if (res.status === 400) {
                    return alert(res.data)
                }

                return console.log(res.data)
            })
            .catch ((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                return console.log(err.response.data)
            })
    }

    return (
        <PrivateRoute>
            <form className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
                <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                    <div className="my-10 flex justify-center items-center">
                        <span className="text-xl">Aterar Senha</span>
                    </div>

                    <div className="flex flex-col justify-evenly items-center">
                            <input
                                className="w-5/6 mb-5 text-gray-800 px-4 py-2 rounded-xl"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nova Senha"
                                required
                                onChange={(e) => setNewPassword(e.currentTarget.value)}
                            />

                            <input
                                className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                type="password"
                                placeholder="Confirmar Nova Senha"
                                required
                                onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
                            />
                    </div>

                    <div className="my-10 flex flex-col justify-center items-center">
                        <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg" type="button" onClick={() => {redefinePassword()}}>Redefinir</button>
                    </div>
                </fieldset>
            </form>
        </PrivateRoute>
    )
}
