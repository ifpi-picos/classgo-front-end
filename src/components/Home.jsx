"use client"

import Header from "./Header"
import { HiPlusCircle } from "react-icons/hi"
import Main from "./Main"
import Modal from "./Modal"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import { useState } from "react"

export default function Home() {
    const [showModal, setShowModal] = useState(false)
    
    const getClassesUrl = "https://idcurso-back-end.vercel.app/classes"

    return (
        <PrivateRoute url={getClassesUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <div className="flex justify-center items-center">
                        <span>Minhas Turmas</span>
                    </div>
                </Header>

                <Section>
                    <div className="w-full flex flex-grow flex-col justify-center items-center">
                        <div className="w-full flex flex-grow justify-end items-end">
                            <Modal visibleModal={showModal}/>
                        </div>

                        <div className="w-full h-48 flex justify-end">
                            <div className="flex items-center mr-20">
                                <button className="cursor-pointer border border-gray-800 rounded-full" onClick={() => setShowModal(true)}>
                                    <span>
                                        <HiPlusCircle className="text-7xl text-green-500"/>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
