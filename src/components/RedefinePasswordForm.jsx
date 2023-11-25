"use client"

import axios from "axios"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RedefinePasswordForm() {
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [visibleNewPassoword, setVisibleNewPassword] = useState(false)
    const [visibleConfirmNewPassword, setVisibleConfirmNewPassword] = useState(false)


    const router = useRouter()

    const redefinePasswordUrl = "https://reverse-time-back-end.vercel.app/redefinepassword"

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
        <form onSubmit={redefinePassword} className="w-1/3 bg-blue-500 text-gray-100 rounded-xl shadow-xl flex justify-center items-center">
            <fieldset className="w-5/6 my-10 border border-gray-100 flex flex-col justify-evenly rounded-xl">
                <div className="my-10 flex justify-center items-center">
                    <span className="text-xl">Alterar Senha</span>
                </div>

                <div className="w-full flex flex-col justify-evenly items-center">
                    <div className="w-full mb-5 flex justify-center items-center">
                        <input
                            className="w-5/6 pl-3 pr-12 py-2 text-gray-800 rounded-xl"
                            id="password"
                            name="password"
                            placeholder="Nova Senha"
                            minLength="6"
                            maxLength="15"
                            type={!visibleNewPassoword ? "password" : "text"}
                            onChange={(e) => setNewPassword(e.currentTarget.value)} 
                            required
                        />

                        <div className="flex justify-end items-center">
                            <div className="w-12 h-8 absolute flex justify-center items-center">
                                {!visibleNewPassoword ? (
                                    <HiEye
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleNewPassword(true)}
                                    />
                                ): (
                                    <HiEyeOff
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleNewPassword(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mb-5 flex justify-center items-center">
                        <input
                            className="w-5/6 pl-3 pr-12 py-2 text-gray-800 rounded-xl"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Confirmar Nova Senha"
                            maxLength="15"
                            type={!visibleConfirmNewPassword ? "password" : "text"}
                            onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
                            required
                        />

                        <div className="flex justify-end items-center">
                            <div className="w-12 h-8 absolute flex justify-center items-center">
                                {!visibleConfirmNewPassword ? (
                                    <HiEye
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleConfirmNewPassword(true)}
                                    />
                                ): (
                                    <HiEyeOff
                                        className="text-gray-500 absolute text-xl cursor-pointer"
                                        onClick={() => setVisibleConfirmNewPassword(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="my-10 flex flex-col justify-center items-center">
                    <button className="mb-5 px-7 py-3 border border-gray-100 rounded-lg">Redefinir</button>
                </div>
            </fieldset>
        </form>
    )
}
