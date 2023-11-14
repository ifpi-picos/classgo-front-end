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

    const signUpUrl = "https://reverse-time-back-end.vercel.app/signup"

    const router = useRouter()

    const signUp = () => {
        if (!name) {
            return alert("Campo Nome Obrigatório!")
        }

        else if (!email) {
            return alert("Campo Email Obrigatório!")
        }

        else if (!password) {
            return alert("Campo Senha Obrigatório!")
        }

        else if (!confirmPassword) {
            return alert("Campo Confirmar Senha Obrigatório!")
        }

        if (password != confirmPassword) {
            return alert("Campos Senha e Confirmar Senha distintos!")
        }

        axios
            .post(signUpUrl, {name, email, type, password, confirmPassword})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    return router.replace("/")
                }

                if (res.status === 400) {
                    return alert(res.data)
                }

                return console.log(res.data)
            })
            .catch((err) => {
                if (err.response.status === 200) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                return console.log(err.response.data)
            })
    }

    return (
        <form className="w-1/3 h-2/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <div className="flex justify-center">
                    <span className="text-xl">Novo Usuário</span>
                </div>

                <div className="flex flex-col items-center">
                    <input
                        className="w-5/6 text-gray-800 mb-7 px-4 py-2 rounded-lg"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Nome"
                        required
                        onChange={(e) => setName(e.currentTarget.value)}
                    />

                    <input
                        className="w-5/6 text-gray-800 mb-7 px-4 py-2 rounded-lg"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <input
                        className="w-5/6 text-gray-800 mb-7 px-4 py-2 rounded-lg"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />

                    <input
                        className="w-5/6 text-gray-800 px-4 py-2 rounded-lg"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar Senha"
                        required
                        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    />
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-lg" type="button" onClick={() => {signUp()}}>Cadastrar-se</button>
                    <Link className="underline" href="/">Entrar</Link>
                </div>
            </fieldset>
        </form>
    )
}
