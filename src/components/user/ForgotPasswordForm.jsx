"use client"

import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [forgotPasswordButtonDisabled, setForgotPasswordButtonDisabled] = useState(false)

    const forgotPasswordUrl = "https://idcurso-back-end.vercel.app/users/forgotpassword"

    const forgotPassword = (e) => {
        e.preventDefault()

        setForgotPasswordButtonDisabled(true)

        axios
            .post(forgotPasswordUrl, {email})
            .then((res) => {               
                if (res.status === 200) {
                    alert(res.data.message)
                    setForgotPasswordButtonDisabled(false)
                    localStorage.setItem("token", res.data.token)
                    return
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setForgotPasswordButtonDisabled(false)
                    return
                }
            })
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50">
            <form className="flex justify-center items-center w-1/3 bg-blue-500 rounded-xl shadow-md" onSubmit={forgotPassword}>
                <fieldset className="flex flex-col items-center w-5/6 my-10 border border-gray-50 rounded-xl">
                    <div className="flex justify-center items-center my-10 text-gray-50 text-xl">
                        <span>Solicitar Senha</span>
                    </div>

                    <div className="flex flex-col items-center w-5/6 my-5">
                        <div className="w-full flex justify-center items-center">
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
                    </div>

                    <div className="flex flex-col items-center my-10 text-gray-50">
                        <button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl" disabled={forgotPasswordButtonDisabled}>
                            Solicitar
                        </button>

                        <Link className="underline" href="/">
                            Voltar
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
