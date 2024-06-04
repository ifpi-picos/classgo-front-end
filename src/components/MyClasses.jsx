"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import Image from "next/image"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"
import useSideBar from "@/hooks/useSideBar"
import useModal from "@/hooks/useModal"
import { HiTemplate, HiX } from "react-icons/hi"

export default function MyClasses() {
    const {pageActive} = useSideBar()
    const {modalIsOpen, openModal, closeModal} = useModal()

    return (
        <Main>
            <SideBar myClassesPage={pageActive}/>

            <Section>
                <Header>
                    Minhas Turmas
                </Header>

                <div className="flex flex-grow flex-col justify-center items-center w-1/5 mt-[120px] bg-white text-neutral-800 2xl:w-1/4 xl:w-[30%] lg:w-[35%] lg:mt-[100px] md:w-2/5 sm:w-1/2 xs:w-4/5">
                    {modalIsOpen ? (
                        <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                            <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[90%]">
                                <div className="absolute top-0 right-0 m-4">
                                    <HiX className="text-xl cursor-pointer" onClick={closeModal}/>
                                </div>

                                <div>
                                    <span>Nova Turma</span>
                                </div>

                                <div className="flex items-center w-[80%] mb-4 border-b border-neutral-800">
                                    <input
                                        className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                        id="newClass"
                                        name="newClass"
                                        type="text"
                                        placeholder="Nome da turma"
                                        minLength="3"
                                        maxLength="30"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between w-[80%] sm:flex-col-reverse">
                                    <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl sm:w-full" type="button" onClick={closeModal}>
                                        <span>Cancelar</span>
                                    </button>

                                    <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl sm:w-full sm:mb-2">
                                        <span>Criar</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    ): (
                        <>
                            <div className="w-full">
                                <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                            </div>

                            <button className="w-3/5 py-1 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button" onClick={openModal}>
                                <span>Crie uma Turma</span>
                            </button>
                        </>
                    )}
                </div>
            </Section>
        </Main>
    )
}
