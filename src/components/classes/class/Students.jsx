"use client"

import axios from "axios"
import ConfirmModal from "@/components/modals/ConfirmModal"
import Header from "@/components/tags/Header"
import { HiChartBar, HiClipboardList, HiOutlinePencilAlt, HiOutlineTrash, HiUsers } from "react-icons/hi"
import Link from "next/link"
import Main from "@/components/tags/Main"
import PrivateRoute from "@/components/user/PrivateRoute"
import Section from "@/components/tags/Section"
import SideBar from "@/components/tags/SideBar"
import StudentModal from "@/components/modals/StudentModal"
import { useEffect, useState } from "react"

export default function Students({myClassDescription}) {
    const [classId, setClassId] = useState(0)
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [numberOfPresencies, setNumberOfPresencies] = useState(0)
    const [students, setStudents] = useState([])
    const [orderedStudents, setOrderedStudents] = useState([])
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalSubimitButtonDisabled, setConfirmModalSubimitButtonDisabled] = useState(false)
    const [showStudentModal, setShowStudentModal] = useState(false)
    const [studentModalButtonName, setStudentModalButtonName] = useState("")
    const [studentModalSubimitButtonDisabled, setStudentModalSubimitButtonDisabled] = useState(false)
    
    const classDescription = myClassDescription.split("%20").join(" ")

    const getMyClassUrl = `https://idcurso-back-end.vercel.app/classes/findOne/${classDescription}`

    const createStudentUrl = `https://idcurso-back-end.vercel.app/students/create`
    const getStudentsUrl = `https://idcurso-back-end.vercel.app/students/findAll/${classId}`
    const updateStudentUrl = `https://idcurso-back-end.vercel.app/students/update/${id}`
    const deleteStudentUrl = `https://idcurso-back-end.vercel.app/students/destroy/${id}`

    const getMyClass = () => {
        axios
            .get(getMyClassUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
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
        getMyClass()
    }, [])

    const getStudents = () => {
        axios
            .get(getStudentsUrl, {headers: {
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
        getStudents()
    }, [classId])

    useEffect(() => {
        orderingStudents()
    }, [students])

    const newStudentButtonClicked = () => {
        setShowStudentModal(true)
        setStudentModalButtonName("Adicionar")
    }

    const createStudent = (e) => {
        e.preventDefault()

        axios
            .post(createStudentUrl, {name, numberOfPresencies, classId}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 201) {
                    setStudentModalSubimitButtonDisabled(false)
                    setShowStudentModal(false)
                    getStudents()
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
                    setStudentModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const editStudentButtonClicked = (student) => {
        setShowStudentModal(true)
        setId(student.id)
        setName(student.name)
        setNumberOfPresencies(student.numberOfPresencies)
        setStudentModalButtonName("Salvar")
    }

    const updateStudent = (e) => {
        e.preventDefault()

        setStudentModalSubimitButtonDisabled(true)

        axios
            .put(updateStudentUrl, {name, numberOfPresencies, classId}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setStudentModalSubimitButtonDisabled(false)
                    setShowStudentModal(false)
                    getStudents()
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setStudentModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const deleteStudentButtonClicked = (student) => {
        setId(student.id)
        setShowConfirmModal(true)
    }

    const deleteStudent = (e) => {
        e.preventDefault()

        setConfirmModalSubimitButtonDisabled(true)

        axios
            .delete(deleteStudentUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setConfirmModalSubimitButtonDisabled(false)
                    setShowConfirmModal(false)
                    getStudents()
                    return
                }

                else if (res.response.status === 401) {
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

    const orderingStudents = () => {
        const studentsName = []
        
        students.map((student) => studentsName.push(student.name))
        
        const orderedStudentsName = studentsName.sort()

        const orderedStudents = []

        orderedStudentsName.map((name) => (
            students.map((student) => (
                name === student.name ? orderedStudents.push({id: student.id, name: student.name}) : null
            ))
        ))

        setOrderedStudents(orderedStudents)
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

    const orderedStudentsList = orderedStudents.map((student) => 
        <div key={student.id} className="flex justify-between items-center w-5/6 h-16 mb-4 border-2 border-gray-300 shadow-md rounded-xl">
            <div className="ml-6">
                <span className="">
                    {student.name}
                </span>
            </div>

            <div className="flex items-center mr-6">
                <button className="mr-2 text-green-600 rounded-full hover:bg-green-100 p-2" type="button" onClick={() => editStudentButtonClicked(student)}>
                    <HiOutlinePencilAlt size="24"/>
                </button>

                <button className="text-red-500 rounded-full hover:bg-red-100 p-2" type="button" onClick={() => deleteStudentButtonClicked(student)}>
                    <HiOutlineTrash size="24"/>
                </button>
            </div>
        </div>
    )

    return (
        <PrivateRoute url={getMyClassUrl}>
            <SideBar/>

            <Main>
                <Header>
                    {navbar}
                </Header>

                <Section>
                    <div className="flex flex-grow flex-col items-center w-5/6">
                        <div className="flex flex-col items-center w-5/6 my-24 border-2 border-gray-300 shadow-md rounded-xl">
                            <div className="flex justify-end items-center w-5/6 mt-12">
                                <button className="py-2 px-4 bg-green-500 text-gray-50 shadow-md rounded-md" type="button" onClick={newStudentButtonClicked}>
                                    Novo Aluno
                                </button>
                            </div>

                            <div className="w-5/6 mt-6 mb-4">
                                <span>Alunos</span>
                            </div>

                            {students.length < 1 ? (
                                <div className="my-12">
                                    <span>Nenhum Aluno Adicionado</span>
                                </div>
                            ) : (
                                orderedStudentsList
                            )}
                        </div>

                        {studentModalButtonName === "Adicionar" ? (
                            <StudentModal
                                openModal={showStudentModal}
                                closeModal={() => setShowStudentModal(false)}
                                onSubimit={createStudent}
                                title="Novo Aluno"
                                onChangeName={setName}
                                buttonBg="bg-green-500"
                                nameButton={studentModalButtonName}
                                disabled={studentModalSubimitButtonDisabled}
                            />
                        ): (
                            <StudentModal
                                openModal={showStudentModal}
                                closeModal={() => setShowStudentModal(false)}
                                onSubimit={updateStudent}
                                title="Editar Aluno"
                                name={name}
                                onChangeName={setName}
                                buttonBg="bg-blue-500"
                                nameButton={studentModalButtonName}
                                disabled={studentModalSubimitButtonDisabled}
                            />
                        )}

                        {showConfirmModal ? (
                            <ConfirmModal
                                openModal={showConfirmModal}
                                closeModal={() => setShowConfirmModal(false)}
                                title="Excluir Aluno?"
                                onSubimit={deleteStudent}
                                disabled={confirmModalSubimitButtonDisabled}
                            />
                        ) : (
                            null
                        )}
                    </div>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
