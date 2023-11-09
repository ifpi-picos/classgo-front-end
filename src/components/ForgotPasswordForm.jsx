"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const router = useRouter()

    const forgotPasswordUrl = "http://localhost:3030/"

    const changePassword = () => {
        if (!email) {
            alert("Campo Emailvazio!")
        }

        else if (!password) {
            alert("Campo Nova Senha vazio!")
        }

        else if (!confirmPassword) {
            alert("Campo Confirmar Nova Senha vazio")
        }
    }

    return (
        <form className="w-1/3 h-2/3 bg-blue-500 text-gray-100 font-semibold border-gray-100 border rounded-xl flex justify-center items-center">
            <fieldset className="w-5/6 h-5/6 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <legend className="m-auto px-6 py-3 border border-gray-100 rounded-sm">idCurso</legend>

                <div className="flex justify-center">
                    <span className="text-xl">Redefinir Senha</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="email" className="mb-3">Email</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="email" name="email" type="email" placeholder="Digite seu email" required onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="newPassword" className="mb-3">Nova Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="newPassword" name="newPassword" type="password" placeholder="Digite sua nova senha" required onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>

                    <div className="w-5/6 mb-5 flex flex-col">
                        <label htmlFor="confirmNewPassword" className="mb-3">Confirma Nova Senha</label>
                        <input className="text-gray-800 px-2 py-1 border border-gray-100 rounded-sm" id="confirmNewPassword" name="confirmNewPassword" type="password" placeholder="Confirme sua nova senha" required onChange={(e) => setConfirmPassword(e.currentTarget.value)}/>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <button className="px-7 py-3 mb-5 border border-gray-100 rounded-sm" type="button">Redefinir</button>
                </div>
            </fieldset>
        </form>
    )
}