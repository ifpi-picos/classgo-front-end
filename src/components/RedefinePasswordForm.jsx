"use client"

import axios from "axios"
import Link from "next/link"
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
            alert("Campo Email obrigatório!")
        }

        else if (!password) {
            alert("Campo Senha Atual obrigatório!")
        }

        else if (!newPassword) {
            alert("Campo Nova Senha obrigatório!")
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
        <form className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <div className="h-20 flex justify-center items-end">
                    <span className="text-xl">Aterar Senha</span>
                </div>

                <div className="h-72 flex flex-col justify-evenly items-center">
                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />

                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha Atual"
                            required
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />

                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Nova Senha"
                            required
                            onChange={(e) => setNewPassword(e.currentTarget.value)}
                        />
                </div>

                <div className="h-32 flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-lg" type="button" onClick={() => {redefinePassword()}}>Redefinir</button>
                    <Link className="underline" href="/">Voltar</Link>
                </div>
            </fieldset>
        </form>
    )
}
