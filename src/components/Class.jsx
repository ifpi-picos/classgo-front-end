"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import PrivateRoute from "./PrivateRoute"
import SideBar from "./SideBar"
import Main from "./Main"
import Header from "./Header"
import Section from "./Section"
import Link from "next/link"
import { HiChartBar, HiClipboardList, HiOutlinePencilAlt, HiOutlineTrash, HiUsers } from "react-icons/hi"

export default function Class({params}) {
    const [myClass, setMyClass] = useState()
    const getMyClassUrl = `https://idcurso-back-end.vercel.app/classes/${params}`

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
                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${params}`}>
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
                            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${params}`}>
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
                        <div className="flex flex-grow flex-col items-center w-5/6 text-gray-950">
                            <div className="flex justify-center items-center w-5/6 h-24 my-24 text-xl border-2 border-gray-300 shadow-md rounded-xl">
                                <span>
                                    {myClass.description}
                                </span>
                            </div>

                            <div className="flex flex-col items-center w-5/6 border-2 border-gray-300 shadow-md rounded-xl">
                                <div className="flex items-center w-full h-20 mb-8 border-b-2 border-gray-300">
                                    <span className="pl-10">Aulas Registradas</span>
                                </div>

                                <div className="flex flex-col items-center w-full">
                                    <div className="flex justify-end items-center w-11/12">
                                        <button className="py-2 px-8 bg-green-500 text-gray-50 shadow-md rounded-md" type="button">
                                            Nova Aula
                                        </button>
                                    </div>

                                    <table className="w-11/12 my-12 rounded-xl">
                                        <thead className="">
                                            <th className="w-20 py-4 border-2 border-gray-300">Aula</th>
                                            <th className="w-40 py-4 border-2 border-gray-300">Data</th>
                                            <th className="py-4 border-2 border-gray-300">Descrição</th>
                                            <th className="w-28 py-4 border-2 border-gray-300">Ações</th>
                                        </thead>

                                        <tbody className="">
                                            <td className="w-20 py-1 text-center border-2 border-gray-300">

                                            </td>

                                            <td className="w-40 py-1 text-center border-2 border-gray-300">

                                            </td>

                                            <td className="pl-4 py-1 border-2 border-gray-300">
                                                
                                            </td>

                                            <td className="w-28 text-center items-center py-1 border-2 border-gray-300">
                                                <button className="text-green-600 rounded-full hover:bg-green-100 p-3" type="button">
                                                    <HiOutlinePencilAlt size="24"/>
                                                </button>
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Section>
                </Main>
            )}

        </PrivateRoute>
    )
}