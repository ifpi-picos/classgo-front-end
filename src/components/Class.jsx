"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import PrivateRoute from "./PrivateRoute"
import SideBar from "./SideBar"
import Main from "./Main"
import Header from "./Header"
import Section from "./Section"
import Link from "next/link"
import { HiChartBar, HiClipboardList, HiUsers } from "react-icons/hi"
import ClassDiary from "./ClassDiary"

export default function Class({description}) {
    const [myClass, setMyClass] = useState()

    const getMyClassUrl = `https://idcurso-back-end.vercel.app/classes/one/${description}`

    useEffect(() => {
        axios
            .get(getMyClassUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    return setMyClass(res.data)
                }
            })
            .catch((err) => {
                return console.log(err.response.data)
            })
    }, [])

    return (
        <PrivateRoute url={getMyClassUrl}>
            <SideBar/>

            {!myClass ? (
                <Main>
                    <Header>
                        <div className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${description}`}>
                                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
                            </Link>

                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={``}>
                                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
                            </Link>

                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={``}>
                                <HiUsers className="mr-2 mb-1" size="24"/> <span>Participantes</span>
                            </Link>
                        </div>
                    </Header>
                </Main>
            ) : (
                <Main>
                    <Header>
                        <div className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${description}`}>
                                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
                            </Link>

                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={``}>
                                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
                            </Link>

                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={``}>
                                <HiUsers className="mr-2 mb-1" size="24"/> <span>Participantes</span>
                            </Link>
                        </div>
                    </Header>

                    <Section>
                       <ClassDiary myClass={myClass}/>
                    </Section>
                </Main>
            )}

        </PrivateRoute>
    )
}