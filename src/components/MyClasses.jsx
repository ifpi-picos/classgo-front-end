"use client"

import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Header from "../containers/Header"
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiUsers, HiX } from "react-icons/hi"
import Image from "next/image"
import Link from "next/link"
import Main from "../containers/Main"
import Section from "../containers/Section"
import SideBar from "./SideBar"
import useSideBar from "@/hooks/useSideBar"
import useModal from "@/hooks/useModal"
import useMyClass from "@/hooks/useMyClass"

export default function MyClasses() {
    const {pageActive} = useSideBar()
    const {createFirstClass, myClasses, setDescription, createMyClass, submitButtonDisabled} = useMyClass()
    const {modalIsOpen, openModal, closeModal} = useModal()

    const myClassesList = myClasses.map((myClass) => 
        <div key={myClass.id} className="flex flex-col justify-between w-80 h-40 border-2 border-neutral-200 rounded-xl shadow-md hover:shadow-xl">
            <Link className="flex justify-center items-center w-full border-b-2 border-neutral-200"  href={`/classes/${myClass.description}/diary`}>
                <span className="p-[12px] hover:underline break-words">
                    {myClass.description}
                </span>
            </Link>

            <div className="flex justify-between items-center w-full">
                <div className="flex">
                    <HiUsers className="mt-[2px] ml-4 sm:mt-[3px] xs:mt-[2px]" title="Alunos"/>
                    <span className="text-sm ml-2 mb-1">{myClass.numberOfStudents}/50</span>
                </div>

                <div>
                    <button className="mr-2 mb-2 text-green-600 rounded-full hover:bg-green-100 p-2" type="button">
                        <HiOutlinePencilAlt className="text-xl" title="Editar"/>
                    </button>

                    <button className="mr-4 mb-2 text-red-500 rounded-full hover:bg-red-100 p-2" type="button">
                        <HiOutlineTrash className="text-xl" title="Excluir"/>
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

                <div className="flex justify-centera absolute top-[90px] w-full bg-white text-neutral-800">
                    {myClasses.length > 0 ? (
                        <div className="flex flex-wrap gap-4 mx-4 mb-4 w-full bg-white sm:justify-center">
                            <span className="fixed top-[18px] right-4 z-20 text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-100" onClick={openModal}>
                                <HiPlus className="text-2xl" title="Nova Turma"/>
                            </span>

                            {myClassesList}

                            {modalIsOpen ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createMyClass}>
                                        <div className="absolute top-0 right-0 m-4">
                                            <HiX className="text-2xl cursor-pointer" title="Fechar" onClick={closeModal}/>
                                        </div>

                                        <div className="text-lg sm:text-sm">
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
                                            <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeModal}>
                                                <span>Cancelar</span>
                                            </button>

                                            <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                <span>Criar</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    ) : (
                        createFirstClass ? (
                            <div className="flex flex-col justify-center items-center w-1/4 xl:w-[30%] lg:w-[35%] lg:mt-[100px] md:w-2/5 sm:w-1/2 xs:w-4/5">
                                <div className="w-full">
                                    <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                                </div>

                                <button className="w-3/5 py-1 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button" onClick={openModal}>
                                    <span>Crie uma Turma</span>
                                </button>

                                {modalIsOpen ? (
                                    <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                        <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[400px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createMyClass}>
                                            <div className="absolute top-0 right-0 m-4">
                                                <HiX className="text-2xl cursor-pointer" onClick={closeModal}/>
                                            </div>

                                            <div className="text-lg sm:text-sm">
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
                                                <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeModal}>
                                                    <span>Cancelar</span>
                                                </button>

                                                <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                    <span>Criar</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        ) : (
                            null
                        )
                    )}
                </div>
            </Section>
        </Main>
    )
}
