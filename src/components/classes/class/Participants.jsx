"use client"

import Header from "@/components/tags/Header"
import { HiChartBar, HiClipboardList, HiOutlinePencilAlt, HiOutlineTrash, HiUsers } from "react-icons/hi"
import Link from "next/link"
import Main from "@/components/tags/Main"
import PrivateRoute from "@/components/user/PrivateRoute"
import Section from "@/components/tags/Section"
import SideBar from "@/components/tags/SideBar"
import { useState } from "react"

export default function Participants({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const getMyClassUrl = `https://idcurso-back-end.vercel.app/classes/findOne/${classDescription}`

    const navbar = (
        <div className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/diary`}>
                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/progress`}>
                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/participants`}>
                <HiUsers className="mr-2 mb-1" size="24"/> <span>Participantes</span>
            </Link>
        </div>
    )

    return (
        <PrivateRoute url={getMyClassUrl}>
            <SideBar/>

            <Main>
                <Header>
                    {navbar}
                </Header>

                <Section>
                    <div className="flex flex-grow flex-col items-center w-5/6">
                        <div className="flex flex-col items-center w-5/6 my-24 border-2 border-gray-300 shadow-md rounded-xl">
                            <div className="flex justify-end items-center w-5/6 mt-12">
                                <button className="py-2 px-4 bg-green-500 text-gray-50 shadow-md rounded-md" type="button">
                                    Novo Aluno
                                </button>
                            </div>

                            <div className="w-5/6 mt-6 mb-4">
                                <span>Alunos</span>
                            </div>

                            <div className="flex justify-between items-center w-5/6 h-16 mb-12 border-2 border-gray-300 shadow-md rounded-xl">
                                <div className="ml-6">
                                    <span className="">Carlos Landeilson Veloso Macêdo</span>
                                </div>

                                <div className="flex items-center mr-6">
                                    <button className="mr-2 text-green-600 rounded-full hover:bg-green-100 p-2" type="button">
                                        <HiOutlinePencilAlt size="24"/>
                                    </button>

                                    <button className="text-red-500 rounded-full hover:bg-red-100 p-2" type="button">
                                        <HiOutlineTrash size="24"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
