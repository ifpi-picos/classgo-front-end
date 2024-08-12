"use client"

import Header from "@/containers/Header"
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus, HiX } from "react-icons/hi"
import Link from "next/link"
import Main from "@/containers/Main"
import { MyClassContext } from "@/contexts/MyClassContext"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { useContext } from "react"
import useStudent from "@/hooks/useStudent"
import Loading from "./Loading"

export default function Students() {
    const {classDescription} = useContext(MyClassContext)

    const {loading, showConfirmModal, closeConfirmModal, showStudentModal, closeStudentModal, studentModalAction, name, setName, students, createStudent, updateStudent, deleteStudent, createButtonClicked, editButtonClicked, deleteButtonClicked, submitButtonDisabled}  = useStudent({classDescription})

    const studentsList = students.map((student) => 
        <div key={student.id} className="flex justify-between items-center w-full px-2 py-1 border-2 border-neutral-300 rounded-xl cursor-pointer mb-2">
            <span className="p-2">
                {student.name}
            </span>

            <div>
                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100" type="button" onClick={() => editButtonClicked(student)}>
                    <HiOutlinePencilAlt className="text-xl" title="Editar Aluno"/>
                </button>

                <button className="text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-100" type="button" onClick={() => deleteButtonClicked(student)}>
                    <HiOutlineTrash className="text-xl" title="Excluir Aluno"/>
                </button>
            </div>
        </div>
    )

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-neutral-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${classDescription}/diary`}>
                            Diário
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-300 hover:bg-neutral-200" href={`/myclasses/${classDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-neutral-600 hover:bg-neutral-200" href={`/myclasses/${classDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 break-all rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <div className="flex justify-between w-full border-b-2 border-neutral-300 mb-6 p-1">
                            <span className="text-lg pl-2 pt-2 sm:text-base">
                                Alunos
                            </span>

                            <span className="text-neutral-800 cursor-pointer p-2 rounded-full hover:bg-neutral-200" onClick={createButtonClicked}>
                                <HiPlus className="text-2xl" title="Novo Aluno"/>
                            </span>
                        </div>

                        <div className="flex flex-col w-full mb-6">
                            {loading ? (
                                <div className="text-center mb-6">
                                    <Loading/>
                                </div>
                            ) : (
                                students.length === 0 ? (
                                    <span className="text-center mb-6">
                                        Nenhum Aluno adionado
                                    </span>
                                ) : (
                                    studentsList
                                )
                            )}

                            {showConfirmModal ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[200px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-[65%] sm:w-4/5 xs:w-[95%]" onSubmit={deleteStudent}>
                                            <span className="absolute top-0 right-0 m-4" onClick={closeConfirmModal}>
                                                <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                            </span>
                                            
                                            <div className="flex justify-center items-center text-lg mt-6 font-medium">
                                                <span>Excluir esse aluno?</span>
                                            </div>
                        
                                            <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeConfirmModal}>
                                                    <span>Cancelar</span>
                                                </button>

                                                <button className="w-[40%] bg-blue-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                    <span>Confirmar</span>
                                                </button>
                                            </div>
                                    </form>
                                </div>
                            ) : (
                                null
                            )}

                            {showStudentModal ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    {studentModalAction === "Create" ? (
                                        <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[350px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={createStudent}>
                                            <span className="absolute top-0 right-0 m-4" onClick={closeStudentModal}>
                                                <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                            </span>

                                            <div className="text-lg sm:text-sm">
                                                <span>Novo Aluno</span>
                                            </div>

                                            <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                                <input
                                                    className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nome do Aluno"
                                                    minLength="3"
                                                    maxLength="30"
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeStudentModal}>
                                                    <span>Cancelar</span>
                                                </button>

                                                <button className="w-[40%] bg-green-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                    <span>Criar</span>
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <form className="flex flex-col justify-evenly items-center relative w-2/5 h-[350px] bg-gray-50 rounded-xl xl:w-1/2 lg:w-3/5 md:w-[70%] sm:w-4/5 xs:w-[95%]" onSubmit={updateStudent}>
                                            <span className="absolute top-0 right-0 m-4" onClick={closeStudentModal}>
                                                <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                            </span>

                                            <div className="text-lg sm:text-sm">
                                                <span>Editar Aluno</span>
                                            </div>

                                            <div className="flex items-center w-[80%] border-b border-neutral-800 sm:text-xs">
                                                <input
                                                    className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nome do Aluno"
                                                    minLength="3"
                                                    maxLength="30"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-between w-[80%] sm:flex-col-reverse sm:text-xs">
                                                <button className="w-[40%] bg-red-500 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2" type="button" onClick={closeStudentModal}>
                                                    <span>Cancelar</span>
                                                </button>

                                                <button className="w-[40%] bg-green-600 text-white font-semibold py-1 rounded-xl hover:shadow-xl sm:w-full sm:py-2 sm:mb-4" disabled={submitButtonDisabled}>
                                                    <span>Editar</span>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </Section>
        </Main>
    )
}
