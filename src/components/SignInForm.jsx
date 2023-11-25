"use client"

import axios from "axios"
import Link from "next/link"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [visiblePassoword, setVisiblePassword] = useState(false)

    const router = useRouter()

    const signInUrl = "https://reverse-time-back-end.vercel.app"

    const signIn = (e) => {
        e.preventDefault()

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)

                    if (res.data.userType === "administrador") {
                        return router.replace("/users")
                    }

                    if (!res.data.course) {
                        return router.replace("/")
                    }
                    
                    return router.replace("/home")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <form onSubmit={signIn} className="w-1/3 bg-blue-500 text-gray-100 rounded-xl shadow-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col items-center rounded-xl">
                <div className="my-14 flex justify-center items-center">
                    <span className="text-xl">Login</span>
                </div>

                <div className="w-5/6 flex flex-col items-center">
                    <div className="mb-5 w-full flex justify-center items-center">
                        <input
                            className="w-full px-3 py-2 text-gray-800 rounded-xl"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            maxLength="50"
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            required
                        />
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <input
                            className="w-full pl-3 pr-12 py-2 text-gray-800 rounded-xl"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            maxLength="16"
                            type={!visiblePassoword ? "password" : "text"}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            required
                        />

                        <div className="flex justify-end items-center">
                            <div className="w-12 h-8 absolute flex justify-center items-center">
                                {!visiblePassoword ? (
                                    <HiEye
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisiblePassword(true)}
                                    />
                                ): (
                                    <HiEyeOff
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisiblePassword(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full mt-2 flex justify-end">
                        <Link className="underline" href="/forgotpassword">esqueceu senha?</Link>
                    </div>
                </div>

                <div className="my-10 flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-lg">Entrar</button>
                    <Link className="underline" href="/signup">Cadastrar-se</Link>
                </div>
            </fieldset>
        </form>
    )
}
