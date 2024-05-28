"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import Image from "next/image"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"

export default function MyClasses() {
    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    Minhas Turmas
                </Header>

                <div className="flex flex-grow flex-col justify-center items-center w-1/5 mt-[120px] bg-white text-neutral-800 2xl:w-1/4 xl:w-[30%] lg:w-[35%] lg:mt-[100px] md:w-2/5 sm:w-1/2 xs:w-4/5">
                    <div className="w-full">
                        <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                    </div>

                    <button className="w-3/5 py-1 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button">
                        <span>Crie uma Turma</span>
                    </button>
                </div>
            </Section>
        </Main>
    )
}
