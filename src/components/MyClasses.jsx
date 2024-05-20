"use client"

import Body from "../containers/Body"
import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import Image from "next/image"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"

export default function MyClasses() {
    return (
        <Body>
            <SideBar/>

            <Main>
                <Header>
                    Minhas Turmas
                </Header>

                <Section>
                    <div className="w-full">
                        <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                    </div>

                    <button className="px-4 py-2 bg-green-500 text-white font-semibold shadow-md rounded-xl md:text-sm" type="button">
                        <span>Crie uma Turma</span>
                    </button>
                </Section>
            </Main>
        </Body>
    )
}
