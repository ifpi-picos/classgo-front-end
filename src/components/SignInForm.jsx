"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const signInUrl = "https://reverse-time-back-end.vercel.app"

    const router = useRouter()

    const signIn = () => {
        if (!email) {
            return alert("Campo Email vazio!")
        }

        else if (!password) {
            return alert("Campo Senha vazio!")
        }

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)

                    if (res.data.userType === "administrador") {
                        return router.replace("/users")
                    }

                    return router.replace("/courses")
                }

                else if (res.status === 400) {
                    alert(res.data)
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
        <form className="w-1/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col rounded-xl">
                <div className="h-28 flex justify-center items-center">
                    <span className="text-xl">Login</span>
                </div>

                <div className="h-40 flex flex-col justify-evenly items-center">
                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.currentTarget.value)}/>
                        <input
                            className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            required
                            onChange={(e) => setPassword(e.currentTarget.value)}/>
                </div>

                <div className="h-10 flex justify-center">
                    <Link className="w-5/6 flex justify-end underline" href="/redefinepassword">esqueceu senha?</Link>
                </div>

                <div className="h-32 flex flex-col justify-center items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-lx" type="button" onClick={() => {signIn()}}>Entrar</button>
                    <Link className="underline" href="/signup">Cadastrar-se</Link>
                </div>
            </fieldset>
        </form>
    )
}
