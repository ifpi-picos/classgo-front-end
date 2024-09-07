"use client"

import { HiLockClosed, HiMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import SignInImg from "../../assets/SignInImg.jpg"
import { useState } from "react"
import useUser from "@/hooks/useUser"

export default function SignIn() {
    const [visiblePassword, setVisblePassword] = useState(false)
    const {setEmail, setPassword, signIn, submitButtonDisabled} = useUser()

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50 text-white">
            <div className="flex w-3/5 h-[500px] rounded-xl shadow-md xl:w-[70%] lg:w-[50%] md:w-[60%] sm:w-[70%] sm:text-sm xs:w-[95%] xs:h-[450px] xs:text-xs">
                <div className="flex justify-center items-center w-1/2 h-full rounded-s-xl lg:hidden">
                    <Image className="h-full rounded-s-xl" src={SignInImg} alt="Imagem ilustrativa" priority/>
                </div>

                <form className="flex flex-col justify-evenly items-center w-1/2 h-full bg-blue-500 font-semibold rounded-e-xl lg:w-full lg:rounded-xl" onSubmit={signIn}>
                    <div className="flex justify-center items-center w-4/5 text-lg md:text-base sm:text-sm">
                        <span>Login</span>
                    </div>

                    <div className="flex flex-col items-center justify-evenly w-4/5">
                        <div className="flex items-center w-full mb-4 border-b">
                            <HiMail className="w-[10%] text-lg"/>

                            <input
                                className="w-[95%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                maxLength="60"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mb-4 border-b">
                            <HiLockClosed className="w-[10%] text-lg"/>

                            <input
                                className="w-[80%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="password"
                                name="password"
                                type={!visiblePassword ? "password" : "text"}
                                placeholder="Senha"
                                maxLength="18"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            
                            {!visiblePassword ? (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisblePassword(true)}>
                                    <HiOutlineEye title="Exibir senha"/>
                                </button>
                            ) : (
                                <button className="flex justify-center w-[10%] text-lg cursor-pointer" type="button" onClick={() => setVisblePassword(false)}>
                                    <HiOutlineEyeOff title="Exibir senha"/>
                                </button>
                            )}
                        </div>

                        <div className="flex justify-end w-full">
                            <Link className="text-xs hover:underline" href="/forgotpassword">
                                <span>esqueceu sua senha?</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center w-4/5">
                        <button className="w-full bg-blue-400 mb-4 py-1 rounded-xl hover:shadow-xl sm:py-2" disabled={submitButtonDisabled}>
                            <span>Entrar</span>
                        </button>

                        <Link className="hover:underline" href="/signup">
                            <span>Registrar-se</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
