"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { HiPencilAlt, HiPlus } from "react-icons/hi"

export default function Diary({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-neutral-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-600 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/diary`}>
                            Diário
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <div className="flex justify-between w-full px-2 border-b-2">
                            <span className="text-lg p-2 sm:text-base">
                                Aulas
                            </span>

                            <button className="text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-200" type="button">
                                <HiPlus className="text-2xl" title="Nova Aula"/>
                            </button>
                        </div>

                        <div className="w-full my-6">
                            <div className="flex justify-between w-full px-2 py-1 border-2 rounded-xl shadow-md cursor-pointer mb-2">
                                <span className="p-2">
                                    Aula 01
                                </span>

                                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100" type="button">
                                    <HiPencilAlt className="text-xl" title="Editar Aula"/>
                                </button>
                            </div>

                            <div className="flex justify-between w-full px-2 py-1 border-2 rounded-xl shadow-md cursor-pointer mb-2">
                                <span className="p-2">
                                    Aula 01
                                </span>

                                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100" type="button">
                                    <HiPencilAlt className="text-xl" title="Editar Aula"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Main>
    )
}
