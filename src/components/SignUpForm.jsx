"use client"

import axios from "axios"
import Link from "next/link"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpForm() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [visiblePassoword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

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
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <form onSubmit={signUp} className="w-1/3 bg-blue-500 text-gray-100 rounded-xl shadow-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col rounded-xl">
                <div className="my-14 flex justify-center items-center">
                    <span className="text-xl">Novo Usuário</span>
                </div>

                <div className="w-full flex flex-col justify-evenly items-center">
                    <div className="w-full mb-5 flex justify-center items-center">
                        <input
                            className="w-5/6 px-3 py-2 text-gray-800 rounded-lg"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Nome"
                            minLength="3"
                            maxLength="30"
                            onChange={(e) => setName(e.currentTarget.value)}
                            required
                        />
                    </div>

                    <div className="w-full mb-5 flex justify-center items-center">
                        <input
                            className="w-5/6 px-3 py-2 text-gray-800 rounded-lg"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            maxLength="45"
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            required
                        />
                    </div>

                    <div className=" w-full mb-5 flex justify-center items-center">
                        <input
                            className="w-5/6 pl-3 pr-12 py-2 text-gray-800 rounded-lg"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            minLength="6"
                            maxLength="15"
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

                    <div className="w-full flex justify-center items-center">
                        <input
                            className="w-5/6 pl-3 pr-12 py-2 text-gray-800 rounded-lg"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar Senha"
                            maxLength="15"
                            type={!visibleConfirmPassword ? "password" : "text"}
                            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                            required
                        />

                        <div className="flex justify-end items-center">
                            <div className="w-12 h-8 absolute flex justify-center items-center">
                                {!visibleConfirmPassword ? (
                                    <HiEye
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleConfirmPassword(true)}
                                    />
                                ): (
                                    <HiEyeOff
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleConfirmPassword(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-10 flex flex-col justify-center items-center">
                    <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg">Cadastrar-se</button>
                    <Link className="underline" href="/">Entrar</Link>
                </div>
            </fieldset>
        </form>
    )
}
