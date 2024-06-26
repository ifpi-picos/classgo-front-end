"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"

export default function Diary({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex justify-center items-center absolute top-[100px] w-full bg-white text-neutral-800">
                    <div className="flex justify-evenly items-center w-1/2 border-b-2">
                        <Link href={`/myclasses/${myClassDescription}/diary`} className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-600 hover:bg-neutral-100">
                            Diário
                        </Link>

                        <Link href={`/myclasses/${myClassDescription}/progress`} className="flex justify-center w-1/3 p-2 hover:bg-neutral-100">
                            Progresso
                        </Link>

                        <Link href={`/myclasses/${myClassDescription}/students`} className="flex justify-center w-1/3 p-2 hover:bg-neutral-100">
                            Alunos
                        </Link>
                    </div>
                </div>
            </Section>
        </Main>
    )
}
