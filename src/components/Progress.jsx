"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import { MyClassContext } from "@/contexts/MyClassContext"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { useContext } from "react"
import useProgress from "@/hooks/useProgress"
import Loading from "./Loading"

export default function Progress() {
    const {classDescription} = useContext(MyClassContext)

    const {loading, progress} = useProgress()

    const progressList = progress.map((data, index) => (
        <tr key={index}>
            <td className="py-2 px-2 border-2 border-neutral-300">
                {data.name}
            </td>

            <td className="text-center p-1 border-2 border-neutral-300">
                {data.absences}
            </td>

            <td className="text-center p-1 border-2 border-neutral-300">
                {data.lessons}
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
                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${classDescription}/diary`}>
                                Diário
                            </Link>

                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-600 hover:bg-neutral-200" href={`/myclasses/${classDescription}/progress`}>
                                Progresso
                            </Link>

                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${classDescription}/students`}>
                                Alunos
                            </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 break-all rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <div className="flex justify-between w-full border-b-2 border-neutral-300 mb-6 p-1">
                            <span className="text-lg pl-2 pt-2 sm:text-base">
                                Progresso
                            </span>
                        </div>

                        {loading ? (
                            <div className="text-center mb-6">
                                <Loading/>
                            </div>
                        ) : (
                            progress.length === 0 ? (
                                <span className="text-center mb-6">
                                    Nenhum Progresso gerado
                                </span>
                            ) : (
                                <table className="w-full mb-6">
                                    <thead className="w-full break-all">
                                        <tr className="w-full">
                                            <th className="w-3/5 p-2 border-2 border-neutral-300">Aluno</th>
                                            <th className="w-1/5 p-2 border-2 border-neutral-300">Faltas</th>
                                            <th className="w-1/5 p-2 border-2 border-neutral-300">Aulas</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody className="w-full">
                                        {progressList}
                                    </tbody>
                                </table>
                            )
                        )}
                    </div>
                </div>
            </Section>
        </Main>
    )
}
