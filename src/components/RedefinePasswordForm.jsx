"use client"

import axios from "axios"
import PrivateRoute from "./PrivateRoute"
import { useRouter } from "next/navigation"
import { useState } from "react"
import VisiblePassword from "./VisiblePassword"

export default function RedefinePasswordForm() {
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [visibleNewPassoword, setVisibleNewPassword] = useState(false)
    const [visibleConfirmNewPassword, setVisibleConfirmNewPassword] = useState(false)

    const router = useRouter()

    const redefinePasswordUrl = `https://reverse-time-back-end.vercel.app/redefinepassword/${2}`

    const redefinePassword = (e) => {
        e.preventDefault()

        axios
            .put(redefinePasswordUrl, {newPassword, confirmNewPassword}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.clear()
                    alert("Senha redefinada com sucesso!")
                    return router.replace("/")
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch ((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    return (
        <PrivateRoute url={redefinePasswordUrl}>
            <div className="flex justify-center items-center w-full h-screen bg-blue-50">
                <form className="flex justify-center items-center w-1/3 bg-blue-500 rounded-xl shadow-md" onSubmit={redefinePassword}>
                    <fieldset className="flex flex-col items-center w-5/6 my-10 border border-gray-50 rounded-xl">
                        <div className="flex justify-center items-center my-10 text-gray-50 text-xl">
                            <span>Redefinir Senha</span>
                        </div>

                        <div className="flex flex-col items-center w-5/6 my-5">
                            <div className="w-fulflex flex-col items-center l mb-5">
                                <input
                                    className="w-full pl-3 pr-12 py-2 rounded-xl"
                                    id="password"
                                    name="password"
                                    type={!visibleNewPassoword ? "password" : "text"}
                                    placeholder="Senha"
                                    maxLength="15"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />

                                <VisiblePassword
                                    visiblePassoword={visibleNewPassoword}
                                    setVisiblePassword={setVisibleNewPassword}
                                />
                            </div>

                            <div className="flex flex-col items-center w-full">
                                <input
                                    className="w-full pl-3 pr-12 py-2 rounded-xl"
                                    id="newPassword"
                                    name="newPassword"
                                    type={!visibleConfirmNewPassword ? "password" : "text"}
                                    placeholder="Confirmar Senha"
                                    maxLength="15"
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />

                                <VisiblePassword
                                    visiblePassoword={visibleConfirmNewPassword}
                                    setVisiblePassword={setVisibleConfirmNewPassword}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center my-10 text-gray-50">
                            <button className="px-6 py-3 border border-gray-50 rounded-xl">
                                Redefinir
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </PrivateRoute>
    )
}
