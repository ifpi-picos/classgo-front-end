"use client"

import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState()

    const forgotPasswordUrl = "https://reverse-time-back-end.vercel.app/forgotpassword"

    const forgotPassword = (e) => {
        e.preventDefault()

        axios
            .post(forgotPasswordUrl, {email})
            .then((res) => {               
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    return alert(res.data.message)
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50">
            <form className="flex justify-center items-center w-1/3 bg-blue-500 rounded-xl shadow-md" onSubmit={forgotPassword}>
                <fieldset className="flex flex-col items-center w-5/6 my-10 border border-gray-50 rounded-xl">
                    <div className="flex justify-center items-center my-10 text-gray-50 text-xl">
                        <span>Login</span>
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
                        <button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl">
                            Solicitar
                        </button>

                        <Link className="underline" href="/signup">
                            Voltar
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}
