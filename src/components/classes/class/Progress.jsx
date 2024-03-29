"use client"

import Header from "@/components/tags/Header"
import { HiChartBar, HiClipboardList, HiUsers } from "react-icons/hi"
import Link from "next/link"
import Main from "@/components/tags/Main"
import PrivateRoute from "@/components/user/PrivateRoute"
import Section from "@/components/tags/Section"
import SideBar from "@/components/tags/SideBar"

export default function Progress({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const getMyClassUrl = `https://idcurso-back-end.vercel.app/classes/findOne/${classDescription}`

    const navbar = (
        <nav className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/diary`}>
                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/progress`}>
                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/students`}>
                <HiUsers className="mr-2 mb-1" size="24"/> <span>Alunos</span>
            </Link>
        </nav>
    )

    return (
        <PrivateRoute url={getMyClassUrl}>
            <SideBar/>

            <Main>
                <Header>
                    {navbar}
                </Header>
            </Main>
        </PrivateRoute>
    )
}
