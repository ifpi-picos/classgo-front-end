"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Image from "next/image"
import SideBar from "./SideBar"
import { HiMenu, HiX } from "react-icons/hi"
import { useState } from "react"

export default function MyClasses() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex justify-end w-full h-screen select-none">
            <SideBar isOpen={isOpen}/>

            <main className="flex flex-col w-4/5 xs:w-full">
                <header className="flex justify-center items-center w-full h-32 text-neutral-800 text-xl shadow-md">
                    <HiMenu className={`hidden absolute left-8 text-2xl cursor-pointer ${isOpen ? "xs:hidden" : "xs:flex"}`} onClick={() => setIsOpen(!false)}/>
                    <HiX className={`hidden absolute left-8 text-2xl cursor-pointer text-white ${isOpen ? "xs:z-0 xs:flex" : "xs:hidden"}`} onClick={() => setIsOpen(false)}/>
                    <span>Minhas Turmas</span>
                </header>

                <section className="flex flex-grow flex-col justify-center items-center w-full">
                    <div className="w-1/4 lg:w-1/2">
                        <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                    </div>

                    <button className="px-4 py-2 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button">
                        <span>Crie uma Turma</span>
                    </button>
                </section>
            </main>
        </div>
    )
}