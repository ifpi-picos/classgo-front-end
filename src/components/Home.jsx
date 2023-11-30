"use client"

import Header from "./Header"
import {  HiOutlinePencilAlt, HiOutlineTrash, HiTrash } from "react-icons/hi"
import Main from "./Main"
import Modal from "./Modal"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Home() {
    const [description, setDescription] = useState("")
    const [myClasses, setMyClasses] = useState([])
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const getMyClassesUrl = "https://idcurso-back-end.vercel.app/classes"
    const createMyClasseUrl = "https://idcurso-back-end.vercel.app/classes/create"

    useEffect(() => {
        axios
            .get(getMyClassesUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    return setMyClasses(res.data)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    })

    const createClass = (e) => {
        e.preventDefault()

        axios
            .post(createMyClasseUrl, {description}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    return setShowModal(false)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })

    }

    const myClassesList = myClasses.map((myClass) => 
        <div key={myClass.id} className="flex flex-col justify-between w-1/4 h-64 m-8 border-2  border-gray-300 rounded-xl shadow-md">
            <div className="flex justify-center items-center w-full h-16 border-b-2 border-gray-300">
                <button className="px-4 hover:underline">
                    {myClass.description}
                </button>
            </div>

            <div className="flex justify-end items-center w-full">
                <button className="mr-2 mb-2 text-green-700 rounded-full hover:bg-green-50 p-3" type="button">
                    <HiOutlinePencilAlt size="28"/>
                </button>

                <button className="mr-4 mb-2 text-red-700 rounded-full hover:bg-red-50 p-3" type="button">
                    <HiOutlineTrash size="28"/>
                </button>
            </div>
        </div>
    )
    
    return (
        <PrivateRoute url={getMyClassesUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <div className="flex justify-center items-center w-full">
                        <span>Minhas Turmas</span>
                    </div>
                </Header>

                <Section>
                    {myClasses.length > 0 ? (
                        <div className="flex flex-grow flex-col w-full">
                            <div className="flex justify-end items-center">
                                <button className="my-6 mr-8 py-3 px-6 bg-green-500 text-gray-50 rounded-lg shadow-gray-300 shadow-md" type="button" onClick={() => setShowModal(true)}>
                                    Nova Turma
                                </button>
                            </div>

                            <div className="flex flex-wrap w-full">
                                {myClassesList}
                            </div>

                            <Modal
                                openModal={showModal}
                                closeModal={() => setShowModal(false)}
                                onChange={setDescription}
                                nameButton="Criar"
                                onSubimit={createClass}
                            />
                        </div>
                    ) : (
                        <>
                            {showModal ? (
                                <Modal
                                    openModal={showModal}
                                    closeModal={() => setShowModal(false)}
                                    onChange={setDescription}
                                    nameButton="Criar"
                                    onSubimit={createClass}
                                />
                            ) : (
                                <div>
                                    <button className="py-3 px-6 bg-green-500 text-gray-50 rounded-lg shadow-gray-300 shadow-md" type="button" onClick={() => setShowModal(true)}>
                                        Crie uma Turma
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </Section>
            </Main>
        </PrivateRoute>
    )
}
