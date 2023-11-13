"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RedefinePasswordForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()

    const router = useRouter()

    const redefinePasswordUrl = "https://reverse-time-back-end.vercel.app/redefinepassword"

    const redefinePassword = () => {
        if (!email) {
            alert("Campo Email vazio!")
        }

        else if (!password) {
            alert("Campo Senha Atual vazio!")
        }

        else if (!newPassword) {
            alert("Campo Nova Senha vazio!")
        }

        axios
            .put(redefinePasswordUrl, {email, password, newPassword})
            .then((res) => {
                if (res.status === 200) {
                    alert("Senha redefinada com sucesso!")
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
        <form className="w-1/3 h-2/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                <div className="flex justify-center">
                    <span className="text-xl">Redefinir Senha</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="email" className="mb-3">Email</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="email" name="email" type="email" placeholder="Digite seu email" required onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="password" className="mb-3">Senha Atual</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="password" name="password" type="password" placeholder="Digite sua senha atual" required onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="newPassword" className="mb-3">Nova Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="newPassword" name="newPassword" type="password" placeholder="Digite sua nova senha" required onChange={(e) => setNewPassword(e.currentTarget.value)}/>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-sm" type="button" onClick={() => {redefinePassword()}}>Redefinir</button>
                </div>
            </fieldset>
        </form>
    )
}
