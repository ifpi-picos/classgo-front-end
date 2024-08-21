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
        <div key={index} className="w-full">
            <span>
                {data.studentName}
            </span>

            <div className="flex justify-between w-full mt-2">
                <div className="w-[80%] h-6 border-2 border-gray-300 rounded-xl mb-4">
                    <div className={`${data.width} h-full bg-green-500 rounded-xl`}></div>
                </div>

                <span>
                    {data.frequency}
                </span>
            </div>
        </div>
    ))

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-gray-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/diary`}>
                                Diário
                            </Link>

                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-600 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/progress`}>
                                Progresso
                            </Link>

                            <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/students`}>
                                Alunos
                            </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 break-all rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <div className="flex justify-between w-full border-b-2 border-gray-300 mb-6 p-1">
                            <span className="text-lg p-2 sm:text-base">
                                Progresso
                            </span>
                        </div>

                        {loading ? (
                            <div className="text-center mb-6">
                                <Loading/>
                            </div>
                        ) : (
                            progress.length === 0 ? (
                                null
                            ) : (
                                <div className="w-full">
                                    {progressList}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </Section>
        </Main>
    )
}
