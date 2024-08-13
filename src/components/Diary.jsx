"use client"

import Header from "@/containers/Header"
import Link from "next/link"
import Main from "@/containers/Main"
import { MyClassContext } from "@/contexts/MyClassContext"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import { HiArrowLeft, HiOutlinePencilAlt, HiPlus, HiX } from "react-icons/hi"
import { useContext } from "react"
import useLesson from "@/hooks/useLesson"
import Loading from "./Loading"

export default function Diary() {
    const {classDescription} = useContext(MyClassContext)

    const {loading, showLessonModal, lessonModalAction, closeLessonModal, showFrequencyModal, frequencyModalAction, closeFrequencyModal, description, setDescription, date, setDate, frequency, onChangeFrequency, lessons, createLesson, updateLesson, createButtonClicked, editButtonClicked, nextModal, backModal, submitButtonDisabled} = useLesson()

    const lessonsList = lessons.map((lesson) => (
        <tr key={lesson.id}>
            <td className="text-center p-1 border-2 border-gray-300">
                {lesson.date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1").toString()}
            </td>

            <td className="px-4 py-1 border-2 border-gray-300">
                {lesson.description}
            </td>

            <td className="text-center p-1 border-2 border-gray-300">
                <button className="text-green-600 cursor-pointer p-2 rounded-full hover:bg-green-100 active:bg-transparent" type="button" onClick={() => editButtonClicked(lesson)}>
                    <HiOutlinePencilAlt className="text-xl xs:text-base" title="Editar Aula"/>
                </button>
            </td>
        </tr>
    ))

    const frequencyList = frequency.map((data, index) => (
        <div key={index} className="mb-4">
            <input
                className="mr-2"
                id={data.studentName}
                name={data.studentName}
                type="checkbox"
                defaultChecked={data.presence}
                onChange={() => onChangeFrequency(data.studentName)}
            />

            <label className="cursor-pointer" htmlFor={data.studentName}>
                {data.studentName}
            </label>
        </div>
    ))

    return (
        <Main>
            <SideBar/>

            <Section>
                <Header>
                    {classDescription}
                </Header>

                <div className="flex flex-col items-center absolute top-[100px] w-full bg-white text-gray-800">
                    <div className="flex justify-evenly items-center w-1/2 xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm">
                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-600 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/diary`}>
                            Diário
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/progress`}>
                            Progresso
                        </Link>

                        <Link className="flex justify-center w-1/3 p-2 border-b-2 border-gray-300 hover:bg-gray-200 active:bg-transparent" href={`/myclasses/${classDescription}/students`}>
                            Alunos
                        </Link>
                    </div>

                    <div className="flex flex-col w-1/2 mt-20 rounded-md xl:w-3/5 lg:w-3/4 md:w-[95%] sm:text-sm xs:text-xs">
                        <div className="flex justify-between w-full border-b-2 border-gray-300 mb-6 p-1">
                            <span className="text-lg pl-2 pt-2 sm:text-base">
                                Aulas
                            </span>

                            <button className="text-gray-800 cursor-pointer p-2 rounded-full hover:bg-gray-200 active:bg-transparent" type="button" onClick={createButtonClicked}>
                                <HiPlus className="text-2xl" title="Nova Aula"/>
                            </button>
                        </div>
                        
                        {loading ? (
                            <div className="text-center mb-6">
                                <Loading/>
                            </div>
                        ) : (
                            lessons.length === 0 ? (
                                null
                            ) : (
                                <table className="w-full mb-5 break-all text-gray-800 rounded-xl">
                                    <thead className="w-full">
                                        <tr className="w-full">
                                            <th className="w-1/4 p-2 border-2 border-gray-300">Data</th>
                                            <th className="w-[55%] p-2 border-2 border-gray-300">Descrição</th>
                                            <th className="w-[20%] p-2 border-2 border-gray-300">Ação</th>
                                        </tr>                            
                                    </thead>
        
                                    <tbody className="w-full">
                                        {lessonsList}
                                    </tbody>
                                </table>
                            )
                        )}

                        {showLessonModal ? (
                            <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                {lessonModalAction === "Create" ? (
                                    <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]">
                                        <button className="absolute top-0 right-0 m-4" type="button" onClick={closeLessonModal}>
                                            <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <div className="text-lg sm:text-sm">
                                            <span>Nova Aula</span>
                                        </div>

                                        <div className="flex flex-col w-[80%] sm:text-sm">
                                            <input
                                                className="w-full bg-transparent mb-4 border-b border-gray-800 placeholder:text-gray-500 p-1 outline-none"
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Descrição da aula"
                                                minLength="3"
                                                maxLength="30"
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />

                                            <input
                                                className="flex justify-end w-full bg-transparent border-b border-gray-800 p-1 outline-none"
                                                id="date"
                                                name="date"
                                                type="date"
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button className="w-1/2 bg-blue-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" type="button" onClick={nextModal}>
                                            <span>Próximo</span>
                                        </button>
                                    </form>                                    
                                ) : (
                                    <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]">
                                        <button className="absolute top-0 right-0 m-4" type="button" onClick={closeLessonModal}>
                                            <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <div className="text-lg sm:font-medium sm:text-base">
                                            <span>Editar Aula</span>
                                        </div>

                                        <div className="flex flex-col w-[80%] sm:text-sm">
                                            <input
                                                className="w-full bg-transparent mb-4 p-1 border-b border-gray-800 outline-none placeholder:text-gray-500"
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Descrição da aula"
                                                minLength="3"
                                                maxLength="30"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />

                                            <input
                                                className="flex justify-end w-full bg-transparent p-1 border-b border-gray-800 outline-none placeholder:text-gray-500"
                                                id="date"
                                                name="date"
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button className="w-1/2 bg-blue-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" type="button" onClick={nextModal}>
                                            <span>Próximo</span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            null
                        )}

                        {showFrequencyModal ? (
                            <div className="flex justify-center items-center fixed inset-0 z-20 bg-black bg-opacity-25">
                                {frequencyModalAction === "Create" ? (
                                    <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]" onSubmit={createLesson}>
                                        <button className="absolute top-0 left-0 m-4" type="button" onClick={backModal}>
                                            <HiArrowLeft className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <button className="absolute top-0 right-0 m-4" type="button" onClick={closeFrequencyModal}>
                                            <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <div className="text-lg sm:font-medium sm:text-sm">
                                            <span>Frequência</span>
                                        </div>

                                        <div className="flex flex-col w-[80%] h-[100px] overflow-x-hidden sm:text-sm">
                                            {frequencyList}
                                        </div>

                                        <button className="w-1/2 bg-green-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" disabled={submitButtonDisabled}>
                                            <span>Registrar</span>
                                        </button>
                                    </form>
                                ) : (
                                    <form className="flex flex-col justify-evenly items-center relative w-[30%] h-[300px] bg-gray-50 rounded-xl xl:w-2/5 lg:w-1/2 md:w-3/5 sm:w-3/4 xs:w-[85%]" onSubmit={updateLesson}>
                                        <button className="absolute top-0 left-0 m-4" type="button" onClick={backModal}>
                                            <HiArrowLeft className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <button className="absolute top-0 right-0 m-4" type="button" onClick={closeFrequencyModal}>
                                            <HiX className="text-2xl cursor-pointer" title="Fechar"/>
                                        </button>

                                        <div className="text-lg sm:font-medium sm:text-sm">
                                            <span>Frequência</span>
                                        </div>

                                        <div className="flex flex-col w-[80%] h-[100px] overflow-x-hidden sm:text-sm">
                                            {frequencyList}
                                        </div>

                                        <button className="w-1/2 bg-blue-500 text-white font-bold py-1 rounded-xl hover:shadow-xl active:shadow-none sm:text-sm" disabled={submitButtonDisabled}>
                                            <span>Salvar</span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </Section>
        </Main>
    )
}
