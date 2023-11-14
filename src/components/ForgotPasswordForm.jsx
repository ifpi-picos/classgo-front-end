"use client"

import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState()

    const forgotPasswordUrl = "https://reverse-time-back-end.vercel.app/forgotpassword"

    const requestNewPassword = () => {
        axios
            .post(forgotPasswordUrl, {email})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    return alert(res.data.mesaage)
                }
    
                else if(res.status === 400) {
                    return alert(res.data)
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
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <div className="my-14 flex justify-center items-center">
                    <span className="text-xl">Solicitar Nova Senha</span>
                </div>

                <div className="flex justify-center items-center">
                    <input
                        className="w-5/6 text-gray-800 px-4 py-2 rounded-xl"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>

                <div className="my-10 flex flex-col justify-center items-center">
                    <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg" type="button" onClick={() => {requestNewPassword()}}>Solicitar</button>
                    <Link className="underline" href="/">Voltar</Link>
                </div>
            </fieldset>
        </form>
    )
}
