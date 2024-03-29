"use client"

import axios from "axios"
import Header from "@/components/tags/Header"
import FrequencyModal from "@/components/modals/FrequencyModal"
import { HiChartBar, HiClipboardList, HiOutlinePencilAlt, HiUsers } from "react-icons/hi"
import LessonModal from "@/components/modals/LessonModal"
import Link from "next/link"
import Main from "@/components/tags/Main"
import PrivateRoute from "@/components/user/PrivateRoute"
import Section from "@/components/tags/Section"
import SideBar from "@/components/tags/SideBar"
import { useEffect, useState } from "react"

export default function Diary({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const [myClass, setMyClass] = useState({})
    const [classId, setClassId] = useState(0)

    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(0)
    const [lessons, setLessons] = useState([])

    const [showLessonModal, setShowLessonModal] = useState(false)
    const [lessonModalTitle, setLessonModalTitle] = useState("")

    const [students, setStudents] = useState([])

    const [frequency, setFrequency] = useState([])
    const [fakeFrequency, setFakeFrequency] = useState([])

    const [showFrequencyModal, setShowFrequencyModal] = useState(false)
    const [frequencyModalSubimitButtonDisabled, setFrequencyModalSubimitButtonDisabled] = useState(false)

    const readMyClassUrl = `https://idcurso-back-end.vercel.app/classes/findOne/${classDescription}`

    const createLessonUrl = `https://idcurso-back-end.vercel.app/lessons/create`
    const readLessonsUrl = `https://idcurso-back-end.vercel.app/lessons/findAll/${classId}`
    const updateLessonUrl = `https://idcurso-back-end.vercel.app/lessons/update/${id}`

    const readStudentsUrl = `https://idcurso-back-end.vercel.app/students/findAll/${classId}`

    const readFrequencyUrl = `https://idcurso-back-end.vercel.app/frequencies/findAll/${id}`

    const readMyClass = () => {
        axios
            .get(readMyClassUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setMyClass(res.data)
                    setClassId(res.data.id)
                    return
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    useEffect(() => {
        readMyClass()
    }, [])

    const newLessonButtonClicked = () => {
        setShowLessonModal(true)
        setLessonModalTitle("Nova Aula")
    }

    const createLesson = (e) => {
        e.preventDefault()

        setFrequencyModalSubimitButtonDisabled(true)

        axios
            .post(createLessonUrl, {description, date, classId, frequency}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    closeAllModals()
                    return
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setFrequencyModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const readLessons = () => {
        axios
            .get(readLessonsUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length < 1) {
                        return
                    }
                    
                    return setLessons(res.data)
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
    }

    useEffect(() => {
        readLessons()
    }, [classId])

    const editLessonButtonClicked = (lesson) => {
        setShowLessonModal(true)
        setLessonModalTitle("Editar Aula")
        setId(lesson.id)
        setDescription(lesson.description)
        setDate(lesson.date)
    }

    const updateLesson = (e) => {
        e.preventDefault()

        setFrequencyModalSubimitButtonDisabled(true)

        axios
            .put(updateLessonUrl, {description, date, classId, frequency}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    alert(res.data)
                    closeAllModals()
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setFrequencyModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const readStudents = () => {
        axios
            .get(readStudentsUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length < 1) {
                        return
                    }

                    return setStudents(res.data)
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
    }

    useEffect(() => {
        readStudents()
    }, [classId])

    const readFrequency = () => {
        axios
            .get(readFrequencyUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length < 1) {
                        return
                    }

                    return setFrequency(res.data)
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
    }

    useEffect(() => {
        readFrequency()
    }, [id])

    const closeLessonModal = () => {
        setShowLessonModal(false)
    }

    const closeAllModals = () => {
        setFrequencyModalSubimitButtonDisabled(false)
        setShowFrequencyModal(false)
        setShowLessonModal(false)
        setDescription("")
        setDate("")
        readLessons()
        readFrequency()
    }

    const nextModal = () => {
        setShowFrequencyModal(true)
        addFakeFrequency()
    }

    const backModal = () => {
        setFrequencyModalSubimitButtonDisabled(false)
        setShowFrequencyModal(false)
        setShowLessonModal(true)
    }

    const addFakeFrequency = () => {
        const fakeFrequency = []

        students.map((student) => fakeFrequency.push({studentId: student.id, presence: false}))
        setFakeFrequency(fakeFrequency)
    }

    const navbar = (
        <nav className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/diary`}>
                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/progress`}>
                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/students`}>
                <HiUsers className="mr-2 mb-1" size="24"/> <span>Alunos</span>
            </Link>
        </nav>
    )
    
    const lessonsList = lessons.map((lesson, index) => 
        <tr key={lesson.id}>
            <td className="w-20 py-1 text-center border-2 border-gray-300">
                {index < 9 ? "0" + (index + 1) : index + 1}
            </td>

            <td className="w-40 py-1 text-center border-2 border-gray-300">
                {lesson.date.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1").toString()}
            </td>

            <td className="pl-4 py-1 border-2 border-gray-300">
                {lesson.description}
            </td>

            <td className="w-28 text-center items-center py-1 border-2 border-gray-300">
                <button className="text-green-600 rounded-full hover:bg-green-100 p-3" type="button" onClick={() => editLessonButtonClicked(lesson)}>
                    <HiOutlinePencilAlt size="24"/>
                </button>
            </td>
         </tr>
    )

    return (
        <PrivateRoute url={readLessonsUrl}>
            <SideBar/>

            {!myClass ? (
                <Main>
                    <Header>
                        {navbar}
                    </Header>
                </Main>
            ) : (
                <Main>
                    <Header>
                        {navbar}
                    </Header>

                    <Section>
                        <div className="flex flex-grow flex-col items-center w-5/6 text-gray-950">
                            <div className="flex justify-center items-center w-5/6 h-24 my-24 text-xl border-2 border-gray-300 shadow-md rounded-xl">
                                <span>
                                    {myClass.description}
                                </span>
                            </div>

                            <div className="flex flex-col items-center w-5/6 mb-16 border-2 border-gray-300 shadow-md rounded-xl">
                                <div className="flex items-center w-full h-20 mb-8 border-b-2 border-gray-300">
                                    <span className="pl-10">Aulas Registradas</span>
                                </div>

                                <div className="flex flex-col items-center w-full">
                                    <div className="flex justify-end items-center w-11/12">
                                        <button className="py-2 px-8 bg-green-500 text-gray-50 shadow-md rounded-md" type="button" onClick={newLessonButtonClicked}>
                                            Nova Aula
                                        </button>
                                    </div>

                                    {lessons.length < 1 ? (
                                        <div className="my-12">
                                            <span>Nenhuma Aula Registrada</span>
                                        </div>
                                    ) : (
                                        <table className="w-11/12 my-12 rounded-xl">
                                            <thead className="">
                                                <tr>
                                                    <th className="w-20 py-4 border-2 border-gray-300">Aula</th>
                                                    <th className="w-40 py-4 border-2 border-gray-300">Data</th>
                                                    <th className="py-4 border-2 border-gray-300">Descrição</th>
                                                    <th className="w-28 py-4 border-2 border-gray-300">Ações</th>
                                                </tr>
                                            </thead>

                                            <tbody className="">
                                                {lessonsList}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            {lessonModalTitle === "Nova Aula" ? (
                                <LessonModal
                                    title={lessonModalTitle}
                                    openModal={showLessonModal}
                                    closeModal={closeLessonModal}
                                    nextModal={nextModal}
                                    onChangeDescription={setDescription}
                                    onChangeDate={setDate}
                                />
                            ) : (
                                <LessonModal
                                    title={lessonModalTitle}
                                    openModal={showLessonModal}
                                    closeModal={closeLessonModal}
                                    nextModal={nextModal}
                                    description={description}
                                    onChangeDescription={setDescription}
                                    date={date}
                                    onChangeDate={setDate}
                                />
                            )}

                            {lessonModalTitle === "Nova Aula" && showFrequencyModal ? (
                                <FrequencyModal
                                    openModal={showFrequencyModal}
                                    closeModal={closeAllModals}
                                    backModal={backModal}
                                    onSubmit={createLesson}
                                    students={students}
                                    fakeFrequency={fakeFrequency}
                                    onChangeFrequency={setFrequency}
                                    buttonBg="bg-green-500"
                                    buttonName="Registrar"
                                    disabled={frequencyModalSubimitButtonDisabled}
                                />
                            ) : (
                                null
                            )}

                            {lessonModalTitle === "Editar Aula" && showFrequencyModal ? (
                                <FrequencyModal
                                    openModal={showFrequencyModal}
                                    closeModal={closeAllModals}
                                    backModal={backModal}
                                    onSubmit={updateLesson}
                                    students={students}
                                    frequency={frequency}
                                    onChangeFrequency={setFrequency}
                                    buttonBg="bg-blue-500"
                                    buttonName="Salvar"
                                    disabled={frequencyModalSubimitButtonDisabled}
                                />
                            ) : (
                                null
                            )}
                        </div>
                    </Section>
                </Main>
            )}
        </PrivateRoute>
    )
}
