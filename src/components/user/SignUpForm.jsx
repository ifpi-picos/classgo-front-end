"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import VisiblePassword from "./VisiblePassword"

export default function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visiblePassoword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false)

    const type = "Professor"
    
    const router = useRouter()

    const signUpUrl = "https://idcurso-back-end.vercel.app/auth/signup"

    const signUp = (e) => {
        e.preventDefault()

        setSignUpButtonDisabled(true)

        axios
            .post(signUpUrl, {name, email, type, password, confirmPassword})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    setSignUpButtonDisabled(false)
                    router.replace("/")
                    return
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setSignUpButtonDisabled(false)
                    return
                }
            })
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50">
            <form className="flex justify-center items-center w-1/3 bg-blue-500 rounded-xl shadow-md" onSubmit={signUp}>
                <fieldset className="flex flex-col items-center w-5/6 my-10 border border-gray-50 rounded-xl">
                    <div className="flex justify-center items-center my-10 text-gray-50 text-xl">
                        <span>Cadastro</span>
                    </div>

                    <div className="flex flex-col items-center w-5/6 my-5">
                        <div className="flex flex-col items-center w-full mb-5">
                            <input
                                className="w-full px-3 py-2 rounded-xl"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="30"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col items-center w-full mb-5">
                            <input
                                className="w-full px-3 py-2 rounded-xl"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                maxLength="60"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center items-center w-full mb-5">
                            <input
                                className="w-full pl-3 pr-12 py-2 rounded-xl"
                                id="password"
                                name="password"
                                type={!visiblePassoword ? "password" : "text"}
                                placeholder="Senha"
                                maxLength="15"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <VisiblePassword
                                visiblePassoword={visiblePassoword}
                                setVisiblePassword={setVisiblePassword}
                            />
                        </div>

                        <div className="flex justify-center items-center w-full">
                            <input
                                className="w-full pl-3 pr-12 py-2 rounded-xl"
                                id="newPassword"
                                name="newPassword"
                                type={!visibleConfirmPassword ? "password" : "text"}
                                placeholder="Confirmar Senha"
                                maxLength="15"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <VisiblePassword
                                visiblePassoword={visibleConfirmPassword}
                                setVisiblePassword={setVisibleConfirmPassword}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center my-10 text-gray-50">
                        <button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl" disabled={signUpButtonDisabled}>
                            Cadastrar-se
                        </button>

                        <Link className="underline" href="/">
                            Entrar
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
