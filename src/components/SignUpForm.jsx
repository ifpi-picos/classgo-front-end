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

    const signUpUrl = "http://localhost:3030/signup"

    const router = useRouter()

    const signUp = () => {
        if (!name) {
            return alert("Campo Nome vazio!")
        }

        else if (!email) {
            return alert("Campo Email vazio!")
        }

        else if (!password) {
            return alert("Campo Senha vazio!")
        }

        else if (!confirmPassword) {
            return alert("Campo Confirmar Senha vazio!")
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
        <form className="w-1/3 h-4/5 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                <div className="flex justify-center">
                    <span className="text-xl">Cadastro</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-5/6 mb-5 flex flex-col">
                        <label className="mb-3" htmlFor="name">Nome</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="name" name="name" type="text" placeholder="Digite seu nome" required onChange={(e) => setName(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label className="mb-3" htmlFor="email">Email</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="email" name="email" type="email" placeholder="Digite seu email" required onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label className="mb-3" htmlFor="password">Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="password" name="password" type="password" placeholder="Digite sua senha" required onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label className="mb-3" htmlFor="confirmPassword">Confirmar Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required onChange={(e) => setConfirmPassword(e.currentTarget.value)}/>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-sm" type="button" onClick={() => {signUp()}}>Cadastrar-se</button>
                    <Link className="underline" href="/">Entrar</Link>
                </div>
            </fieldset>
        </form>
    )
}
