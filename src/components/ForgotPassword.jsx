"use client"

import { HiMail } from "react-icons/hi"
import ForgotPasswordImg from "../../assets/ForgotPasswordImg.jpg"
import Image from "next/image"
import Link from "next/link"
import useUser from "@/hooks/useUser"

export default function ForgotPassword() {
    const {setEmail, forgotPassword, submitButtonDisabled} = useUser()

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50 text-white">
            <div className="flex w-3/5 h-[500px] rounded-xl shadow-md xl:w-[70%] lg:w-[50%] md:w-[60%] md:text-sm md:font-semibold sm:w-[70%] sm:text-xs xs:w-[90%]">
                <div className="flex justify-center items-center w-1/2 h-full rounded-s-xl lg:hidden">
                    <Image className="h-full rounded-s-xl" src={ForgotPasswordImg} alt="Imagem ilustrativa" priority/>
                </div>

                <form className="flex flex-col justify-evenly items-center w-1/2 h-full bg-blue-500 rounded-e-xl lg:w-full lg:rounded-xl" onSubmit={forgotPassword}>
                    <div className="flex justify-center items-center w-4/5 text-lg md:text-base sm:text-sm">
                        <span>Solicitar Nova Senha</span>
                    </div>

                    <div className="flex flex-col items-center justify-evenly w-4/5">
                        <div className="flex items-center w-full border-b">
                            <HiMail className="w-[10%] text-lg"/>

                            <input
                                className="w-[90%] bg-transparent placeholder:text-white p-1 outline-none"
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

                    <div className="flex flex-col justify-between items-center w-4/5">
                        <button className="w-full bg-blue-400 mb-4 py-1 rounded-md sm:py-2" disabled={submitButtonDisabled}>
                            <span>Solicitar</span>
                        </button>

                        <Link className="hover:underline" href="/">
                            <span>Voltar</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
