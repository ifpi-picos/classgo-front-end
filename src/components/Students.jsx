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

    const {loading, showConfirmModal, closeConfirmModal, showStudentModal, closeStudentModal, studentModalAction, name, setName, students, createStudent, updateStudent, deleteStudent, createButtonClicked, editButtonClicked, deleteButtonClicked, submitButtonDisabled}  = useStudent()

    const studentsList = students.map((student) => 
        <div key={student.id} className="flex justify-between items-center w-full px-2 py-1 border-2 border-gray-300 rounded-xl mb-4 hover:shadow-md">
            <span className="p-2">
                {student.name}
            </span>

            <div>
                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100 active:bg-transparent" type="button" onClick={() => editButtonClicked(student)}>
                    <HiOutlinePencilAlt className="text-xl" title="Editar Aluno"/>
                </button>

                <button className="text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-100 active:bg-transparent" type="button" onClick={() => deleteButtonClicked(student)}>
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
                
                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-gray-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/lessons`}>
                            Aulas
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-600 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 break-all rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <div className="flex justify-between w-full border-b-2 border-gray-300 mb-6 p-1">
                            <span className="text-lg pl-2 pt-2 sm:text-base">
                                Alunos
                            </span>

                            <button className="text-gray-800 cursor-pointer p-2 rounded-full hover:bg-gray-200 active:bg-transparent" type="button" onClick={createButtonClicked}>
                                <HiPlus className="text-2xl" title="Novo Aluno"/>
                            </button>
                        </div>

                        <div className="flex flex-col w-full mb-6">
                            {loading ? (
                                <div className="text-center mb-6">
                                    <Loading/>
                                </div>
                            ) : (
                                students.length === 0 ? (
                                    null
                                ) : (
                                    studentsList
                                )
                            )}

                            {showConfirmModal ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    <form className="flex flex-col justify-evenly items-center relative w-[20%] h-[200px] bg-gray-50 rounded-xl xl:w-[30%] lg:w-2/5 md:w-1/2 sm:w-3/5 xs:w-[75%]" onSubmit={deleteStudent}>
                                        <button className="absolute top-0 right-0 m-4" type="button" onClick={closeConfirmModal}>
                                            <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <div className="text-lg sm:font-medium sm:text-base">
                                            <span>Excluir Aluno?</span>
                                        </div>
                            
                                        <button className="w-1/2 bg-red-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" disabled={submitButtonDisabled}>
                                            <span>Excluir</span>
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                null
                            )}

                            {showStudentModal ? (
                                <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                    {studentModalAction === "Create" ? (
                                        <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]" onSubmit={createStudent}>
                                            <button className="absolute top-0 right-0 m-4" type="button" onClick={closeStudentModal}>
                                                <HiX className="text-2xl cursor-pointer"/>
                                            </button>
        
                                            <div className="text-lg sm:font-medium sm:text-base">
                                                <span>Novo Aluno</span>
                                            </div>
        
                                            <input
                                                className="w-4/5 p-1 bg-transparent border-b border-gray-800 outline-none placeholder:text-gray-500 sm:text-sm"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Nome do aluno"
                                                minLength="3"
                                                maxLength="30"
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
        
                                            <button className="w-1/2 bg-green-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" disabled={submitButtonDisabled}>
                                                <span>Adicionar</span>
                                            </button>
                                        </form>
                                    ) : (
                                        <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]" onSubmit={updateStudent}>
                                            <button className="absolute top-0 right-0 m-4" type="button" onClick={closeStudentModal}>
                                                <HiX className="text-2xl cursor-pointer"/>
                                            </button>
        
                                            <div className="text-lg sm:font-medium sm:text-base">
                                                <span>Editar Aluno</span>
                                            </div>
        
                                            <input
                                                className="w-4/5 p-1 bg-transparent border-b border-gray-800 outline-none placeholder:text-gray-500 sm:text-sm"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Nome do aluno"
                                                minLength="3"
                                                maxLength="30"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
        
                                            <button className="w-1/2 bg-green-600 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" disabled={submitButtonDisabled}>
                                                <span>Editar</span>
                                            </button>
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
