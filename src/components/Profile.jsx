"use client"

import Header from "@/containers/Header"
import { HiMail, HiUser } from "react-icons/hi"
import Main from "@/containers/Main"
import SideBar from "./SideBar"
import Section from "@/containers/Section"

export default function Profile() {
    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    Meu Perfil
                </Header>

                <form className="flex flex-col justify-evenly items-center w-2/5 h-[500px] mt-[120px] border rounded-xl shadow-xl xl:w-[45%] lg:w-1/2 md:w-3/5 sm:w-4/5 sm:text-xs xs:w-[90%] xs:h-[450px]">
                    <HiUser className="text-8xl"/>

                    <div className="flex flex-col items-center w-[90%]">
                        <div className="flex items-center w-[90%] mb-4 border-b border-neutral-800">
                            <HiUser className="w-[10%] text-lg"/>

                            <input
                                className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="30"
                                
                                required
                            />
                        </div>

                        <div className="flex items-center w-[90%] border-b border-neutral-800">
                            <HiMail className="w-[10%] text-lg"/>

                            <input
                                className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                minLength="12"
                                maxLength="60"
                                
                                required
                            />
                        </div>
                    </div>

                    <button className="w-2/5 bg-green-600 text-white font-semibold px-4 py-2 rounded-md" type="button">
                        <span>Editar</span>
                    </button>
                </form>
            </Section>
        </Main>
    )
}
