"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const router = useRouter()

    const signInUrl = "https://reverse-time-back-end.vercel.app"

    const signIn = () => {
        if (!email) {
            return alert("Campo Email obrigatório!")
        }

        else if (!password) {
            return alert("Campo Senha obrigatório!")
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
                <div className="my-14 flex justify-center items-center">
                    <span className="text-xl">Login</span>
                </div>

                <div className="flex flex-col items-center">
                    <input
                        className="w-5/6 mb-5 px-4 py-2 text-gray-800 rounded-xl"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <input
                        className="w-5/6 px-4 py-2 text-gray-800 rounded-xl"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    
                    <Link className="w-5/6 mt-2 flex justify-end underline" href="/forgotpassword">esqueceu senha?</Link>
                </div>

                <div className="my-10 flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-lg" type="button" onClick={() => {signIn()}}>Entrar</button>
                    <Link className="underline" href="/signup">Cadastrar-se</Link>
                </div>
            </fieldset>
        </form>
    )
}
