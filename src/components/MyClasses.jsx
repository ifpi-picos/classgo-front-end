"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import { HiOutlinePencilAlt, HiOutlineTrash, HiUsers, HiX } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"
import useSideBar from "@/hooks/useSideBar"
import useModal from "@/hooks/useModal"
import useMyClass from "@/hooks/useMyClass"
import { useEffect } from "react"

export default function MyClasses() {
    const {pageActive} = useSideBar()
    const {myClassesExist, myClasses, setDescription, createMyClass, submitButtonDisabled} = useMyClass()
    const {modalIsOpen, openModal, closeModal} = useModal()

    useEffect(() => {
        closeModal()
    }, [closeModal, myClasses])

    const myClassesList = myClasses.map((myClass) => 
        <div key={myClass.id} className="flex flex-col justify-between w-[17.5%] h-48 border-2 border-neutral-300 rounded-xl shadow-md break-all xl:w-[22.5%] lg:w-[27.5%] md:w-[35%] sm:w-2/5 sm:text-sm xs:w-[100%] xs:h-60 xs:text-base">
            <div className="flex justify-center items-center w-full h-12 border-b-2 border-neutral-300 xs:h-16">
                <Link className="p-4 hover:underline break-words" href={`/classes/${myClass.description}/diary`}>
                    {myClass.description}
                </Link>
            </div>

            <div className="flex justify-between items-center w-full">
                <div className="flex">
                    <HiUsers className="mt-1 ml-4 sm:mt-[3px] xs:mt-1"/>
                    <span className="ml-2 mb-2">{myClass.numberOfStudents}/50</span>
                </div>

                <div>
                    <button className="mr-2 mb-2 text-green-600 rounded-full hover:bg-green-100 p-2" type="button">
                        <HiOutlinePencilAlt className="text-xl sm:text-base xs:text-xl"/>
                    </button>

                    <button className="mr-4 mb-2 text-red-500 rounded-full hover:bg-red-100 p-2" type="button">
                        <HiOutlineTrash className="text-xl sm:text-base xs:text-xl"/>
                    </button>
                </div>
            </div>
        </div>        
    )

    return (
        <Main>
            <SideBar myClassesPage={pageActive}/>

            <Section>
                <Header>
                    Minhas Turmas
                </Header>

                <div className="flex flex-grow justify-center items-center w-full mt-[120px] bg-white text-neutral-800">
                    {modalIsOpen ? (
                        <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                            <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createMyClass}>
                                <div className="absolute top-0 right-0 m-4">
                                    <HiX className="text-xl cursor-pointer" onClick={closeModal}/>
                                </div>

                                <div className="sm:text-sm">
                                    <span>Nova Turma</span>
                                </div>

                                <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                    <input
                                        className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Nome da turma"
                                        minLength="3"
                                        maxLength="30"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                    <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl sm:w-full sm:py-2" type="button" onClick={closeModal}>
                                        <span>Cancelar</span>
                                    </button>

                                    <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                        <span>Criar</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    ): (
                        myClassesExist ? (
                            myClasses.length > 0 ? (
                                <div className="w-[95%] h-[95%]">
                                    {myClassesList}
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center w-1/4 xl:w-[30%] lg:w-[35%] lg:mt-[100px] md:w-2/5 sm:w-1/2 xs:w-4/5">
                                    <div className="w-full">
                                        <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                                    </div>

                                    <button className="w-3/5 py-1 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button" onClick={openModal}>
                                        <span>Crie uma Turma</span>
                                    </button>
                                </div>
                            )
                        ) : (
                            null
                        )
                    )}
                </div>
            </Section>
        </Main>
    )
}
