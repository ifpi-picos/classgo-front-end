"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpForm() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const type = "Professor"
    
    const router = useRouter()

    const signUpUrl = "https://reverse-time-back-end.vercel.app/signup"


    const signUp = (e) => {
        e.preventDefault()

        axios
            .post(signUpUrl, {name, email, type, password, confirmPassword})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    return router.replace("/")
                }

                return console.log(res.data)
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                return console.log(err.response.data)
            })
    }

    return (
        <form onSubmit={signUp} className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col rounded-xl">
                <div className="my-14 flex justify-center items-center">
                    <span className="text-xl">Novo Usuário</span>
                </div>

                <div className="flex flex-col justify-evenly items-center">
                    <input
                        className="w-5/6 mb-5 text-gray-800 px-4 py-2 rounded-lg"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nome"
                        minLength={3}
                        maxLength={20}
                        onChange={(e) => setName(e.currentTarget.value)}
                        required
                    />

                    <input
                        className="w-5/6 mb-5 text-gray-800 px-4 py-2 rounded-lg"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        maxLength={50}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        required
                    />

                    <input
                        className="w-5/6 mb-5 text-gray-800 px-4 py-2 rounded-lg"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                        minLength={8}
                        maxLength={16}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required
                    />

                    <input
                        className="w-5/6 text-gray-800 px-4 py-2 rounded-lg"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar Senha"
                        maxLength={16}
                        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                        required
                    />
                </div>

                <div className="my-10 flex flex-col justify-center items-center">
                    <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg">Cadastrar-se</button>
                    <Link className="underline" href="/">Entrar</Link>
                </div>
            </fieldset>
        </form>
    )
}
