"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RedefinePasswordForm() {
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const router = useRouter()

    const redefinePasswordUrl = "https://reverse-time-back-end.vercel.app/redefinepassword"

    const redefinePassword = (e) => {
        e.preventDefault()

        axios
            .put(redefinePasswordUrl, {newPassword, confirmNewPassword}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.clear()
                    alert("Senha redefinada com sucesso!")
                    return router.replace("/")
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch ((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    return (
        <form onSubmit={redefinePassword} className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <div className="my-10 flex justify-center items-center">
                    <span className="text-xl">Aterar Senha</span>
                </div>

                <div className="flex flex-col justify-evenly items-center">
                        <input
                            className="w-5/6 mb-5 px-3 py-2 text-gray-800 rounded-xl"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nova Senha"
                            minLength={8}
                            maxLength={16}
                            onChange={(e) => setNewPassword(e.currentTarget.value)}
                            required
                        />

                        <input
                            className="w-5/6 px-3 py-2 text-gray-800 rounded-xl"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type="password"
                            placeholder="Confirmar Nova Senha"
                            maxLength={16}
                            onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
                            required
                        />
                </div>

                <div className="my-10 flex flex-col justify-center items-center">
                    <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg">Redefinir</button>
                </div>
            </fieldset>
        </form>
    )
}
