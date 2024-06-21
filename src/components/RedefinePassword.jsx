"use client"

import { HiLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import Image from "next/image"
import RedefinePasswordImg from "../../assets/RedefinePasswordImg.jpg"
import { useState } from "react"
import useUser from "@/hooks/useUser"

export default function RedefinePassword() {
    const [visiblePassword, setVisblePassword] = useState(false)
    const [visibleConfirmPassword, setVisbleConfirmPassword] = useState(false)
    const {setPassword, setConfirmPassword, redefinePassword, submitButtonDisabled} = useUser()

    return (
        <div className="flex justify-center items-center w-full h-screen bg-blue-50 text-white">
            <div className="flex w-3/5 h-[500px] rounded-xl shadow-md xl:w-[70%] lg:w-[50%] md:w-[60%] sm:w-[70%] sm:text-sm xs:w-[95%] xs:h-[450px] xs:text-xs">
                <div className="flex justify-center items-center w-1/2 h-full rounded-s-xl lg:hidden">
                    <Image className="h-full rounded-s-xl" src={RedefinePasswordImg} alt="Imagem ilustrativa" priority/>
                </div>

                <form className="flex flex-col justify-evenly items-center w-1/2 h-full bg-blue-500 rounded-e-xl lg:w-full lg:rounded-xl" onSubmit={redefinePassword}>
                    <div className="flex justify-center items-center w-4/5 text-lg md:text-base sm:text-sm">
                        <span>Redefinir Senha</span>
                    </div>

                    <div className="flex flex-col items-center justify-evenly w-4/5">
                        <div className="flex items-center w-full mb-4 border-b">
                            <HiLockClosed className="w-[10%] text-lg"/>

                            <input
                                className="w-[80%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="password"
                                name="password"
                                type={!visiblePassword ? "password" : "text"}
                                placeholder="Senha"
                                minLength="6"
                                maxLength="18"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            
                            {!visiblePassword ? (
                                <HiOutlineEye className="w-[10%] text-lg cursor-pointer" onClick={() => setVisblePassword(true)}/>
                            ) : (
                                <HiOutlineEyeOff className="w-[10%] text-lg cursor-pointer" onClick={() => setVisblePassword(false)}/>
                            )}
                        </div>

                        <div className="flex items-center w-full border-b">
                            <HiLockClosed className="w-[10%] text-lg"/>

                            <input
                                className="w-[80%] bg-transparent placeholder:text-white p-1 outline-none"
                                id="confirmPassword"
                                name="confirmPassword"
                                type={!visibleConfirmPassword ? "password" : "text"}
                                placeholder="Confirmar senha"
                                minLength="6"
                                maxLength="18"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            
                            {!visibleConfirmPassword ? (
                                <HiOutlineEye className="w-[10%] text-lg cursor-pointer" onClick={() => setVisbleConfirmPassword(true)}/>
                            ) : (
                                <HiOutlineEyeOff className="w-[10%] text-lg cursor-pointer" onClick={() => setVisbleConfirmPassword(false)}/>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center w-4/5">
                        <button className="w-full bg-blue-400 py-1 rounded-xl hover:shadow-xl sm:py-2" disabled={submitButtonDisabled}>
                            <span>Redefinir</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
