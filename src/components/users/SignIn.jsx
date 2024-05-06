"use client"

import { HiLockClosed, HiMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import SignInImg from "../../../assets/SignInImg.jpg"
import { useState } from "react"

export default function SignIn() {
    const [visiblePassword, setVisblePassword] = useState(true)

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50 text-white">
            <div className="flex w-3/5 h-[500px] rounded-xl shadow-md xl:w-[70%] lg:w-[50%] md:w-[60%] md:text-sm sm:w-[70%] sm:text-xs xs:w-[90%]">
                <div className="flex justify-center items-center w-1/2 h-full rounded-s-xl lg:hidden">
                    <Image className="w-full h-full rounded-s-xl" src={SignInImg} alt="Imagem ilustrativa"/>
                </div>

                <div className="flex flex-col justify-evenly items-center w-1/2 h-full bg-blue-500 rounded-e-xl lg:w-full lg:rounded-xl">
                    <div className="flex justify-center items-center w-4/5 text-lg md:text-base sm:text-sm">
                        <span>Login</span>
                    </div>

                    <div className="flex flex-col items-center justify-evenly w-4/5">
                        <div className="flex items-center w-full mb-4 border-b">
                            <HiMail className="text-lg"/>

                            <input
                                className="w-[90%] bg-transparent placeholder:text-white px-2 py-1 outline-none"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                minLength="12"
                                maxLength="60"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mb-4 border-b">
                            <HiLockClosed className="text-lg"/>

                            <input
                                className="w-[90%] bg-transparent placeholder:text-white px-2 py-1 outline-none"
                                id="password"
                                name="password"
                                type={visiblePassword ? "password" : "text"}
                                placeholder="Senha"
                                minLength="6"
                                maxLength="15"
                                required
                            />
                            
                            {visiblePassword ? (
                                <HiOutlineEye className="text-lg cursor-pointer" onClick={() => setVisblePassword(false)}/>
                            ) : (
                                <HiOutlineEyeOff className="text-lg cursor-pointer" onClick={() => setVisblePassword(true)}/>
                            )}
                        </div>

                        <div className="flex justify-end w-full">
                            <Link className="text-xs hover:underline" href="/forgotpassword">
                                <span>esqueceu sua senha?</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center w-4/5">
                        <button className="w-full bg-blue-400 mb-4 py-1 rounded-md">
                            <span>Entrar</span>
                        </button>

                        <Link className="hover:underline" href="/signup">
                            <span>Registrar-se</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
