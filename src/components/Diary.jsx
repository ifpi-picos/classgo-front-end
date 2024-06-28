"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { HiOutlinePencilAlt, HiPlus } from "react-icons/hi"
import useLesson from "@/hooks/useLesson"

export default function Diary({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const {lessons} = useLesson()

    const lessonsList = lessons.map((lesson, index) => (
        <tr key={index}>
            <td className="text-center p-1 border-2 border-neutral-300">
                {lesson.date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1").toString()}
            </td>

            <td className="px-4 py-1 border-2 border-neutral-300">
                {lesson.description}
            </td>

            <td className="text-center p-1 border-2 border-neutral-300">
                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100" type="button">
                    <HiOutlinePencilAlt className="text-xl xs:text-base" title="Editar Aula"/>
                </button>
            </td>
        </tr>
    ))

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

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${myClassDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm xs:text-xs">
                        <div className="flex justify-between w-full border-b-2 border-neutral-300">
                            <span className="text-lg p-2 sm:text-base">
                                Aulas
                            </span>

                            <button className="text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-200" type="button">
                                <HiPlus className="text-2xl" title="Nova Aula"/>
                            </button>
                        </div>

                        <table className="w-full my-6 break-all text-neutral-800 rounded-xl">
                            <thead className="w-full">
                                <tr>
                                    <th className="w-1/5 p-2 border-2 border-neutral-300">Data</th>
                                    <th className="w-[65%] p-2 border-2 border-neutral-300">Descrição</th>
                                    <th className="w-[20%] p-2 border-2 border-neutral-300">Ação</th>
                                </tr>                            
                            </thead>

                            <tbody className="w-full">
                                {lessonsList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </Main>
    )
}
