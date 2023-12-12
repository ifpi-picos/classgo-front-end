"use client"

import axios from "axios"
import Header from "./Header"
import {  HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"
import Main from "./Main"
import ClassModal from "./ClassModal"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ConfirmModal from "./ConfirmModal"
import Link from "next/link"

export default function Home() {
    const [createClassNow, setCreateClassNow] = useState(false)
    const [id, setId] = useState()
    const [description, setDescription] = useState("")
    const [totalLessons, setTotalLessons] = useState(0)
    const [myClasses, setMyClasses] = useState([])
    const [showClassModal, setShowClassModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [classModalButtonName, setClassModalButtonName] = useState("")
    const [classModalSubimitButtonDisabled, setClassModalSubimitButtonDisabled] = useState(false)
    const [confirmModalSubimitButtonDisabled, setConfirmModalSubimitButtonDisabled] = useState(false)

    const router = useRouter()

    const getMyClassesUrl = "https://idcurso-back-end.vercel.app/classes"
    const createMyClassUrl = "https://idcurso-back-end.vercel.app/classes/create"
    const updateMyClassUrl = `https://idcurso-back-end.vercel.app/classes/update/${id}`
    const deleteMyClassUrl = `https://idcurso-back-end.vercel.app/classes/delete/${id}`

    const getMyClasses = () => {
        axios
            .get(getMyClassesUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length < 1) {
                        return setCreateClassNow(true)
                    }

                    setMyClasses(res.data)
                    return
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
        getMyClasses()
    }, [])

    const newMyClassButtonClicked = () => {
        setShowClassModal(true)
        setClassModalButtonName("Criar")
    }

    const createMyClass = (e) => {
        e.preventDefault()

        setClassModalSubimitButtonDisabled(true)

        axios
            .post(createMyClassUrl, {description, totalLessons}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 201) {
                    setShowClassModal(false)
                    setClassModalSubimitButtonDisabled(false)
                    setCreateClassNow(false)
                    getMyClasses()
                    return
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }

                return
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setClassModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const editMyClassButtonClicked = (myClass) => {
        setId(myClass.id)
        setDescription(myClass.description)
        setTotalLessons(myClass.totalLessons)
        setShowClassModal(true)
        setClassModalButtonName("Salvar")
    }

    const updateMyClass = (e) => {
        e.preventDefault()

        setClassModalSubimitButtonDisabled(true)

        axios
            .put(updateMyClassUrl, {description, totalLessons}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setClassModalSubimitButtonDisabled(false)
                    setShowClassModal(false)
                    getMyClasses()
                    return
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }

                return
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert(err.response.data)
                    setClassModalSubimitButtonDisabled(false)
                    return
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    const deleteMyClassButtonClicked = (myClass) => {
        setId(myClass.id)
        setShowConfirmModal(true)
    }

    const deleteMyClass = (e) => {
        e.preventDefault()

        setConfirmModalSubimitButtonDisabled(true)

        axios
            .delete(deleteMyClassUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setConfirmModalSubimitButtonDisabled(false)
                    setShowConfirmModal(false)

                    axios
                        .get(getMyClassesUrl, {headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("token")
                        }})
                        .then((res) => {
                            if (res.status === 200) {
                                if (res.data.length < 1) {
                                    return setCreateClassNow(true)
                                }

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
                    
                    return
                }
            })
            .catch((err) => {
                return console.log(err.response.data)
            })
    }

    const myClassesList = myClasses.map((myClass) => 
        <div key={myClass.id} className="flex flex-col justify-between w-1/4 h-64 m-8 border-2 border-gray-300 rounded-xl shadow-md break-all">
            <div className="flex justify-center items-center w-full h-16 border-b-2 border-gray-300">
                <Link className="px-4 hover:underline break-words" href={`/${myClass.id}`}>
                    {myClass.description}
                </Link>
            </div>

            <div className="flex justify-end items-center w-full">
                <button className="mr-2 mb-2 text-green-600 rounded-full hover:bg-green-100 p-3" type="button" onClick={() => editMyClassButtonClicked(myClass)}>
                    <HiOutlinePencilAlt size="28"/>
                </button>

                <button className="mr-4 mb-2 text-red-500 rounded-full hover:bg-red-100 p-3" type="button" onClick={()  => deleteMyClassButtonClicked(myClass)}>
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
                                <button className="my-6 mr-8 py-3 px-6 bg-green-500 text-gray-50 rounded-lg shadow-gray-300 shadow-md" type="button" onClick={newMyClassButtonClicked}>
                                    Nova Turma
                                </button>
                            </div>

                            <div className="flex flex-wrap w-full">
                                {myClassesList}
                            </div>

                            {classModalButtonName === "Criar" ? (

                                <ClassModal
                                    openModal={showClassModal}
                                    closeModal={() => setShowClassModal(false)}
                                    title="Nova Turma"
                                    buttonBg="bg-green-500"
                                    nameButton={classModalButtonName}
                                    onChangeDescription={setDescription}
                                    onChangeLessons={setTotalLessons}
                                    onSubimit={createMyClass}
                                    disabled={classModalSubimitButtonDisabled}
                                />
                            ) : (
                                <ClassModal
                                    openModal={showClassModal}
                                    closeModal={() => setShowClassModal(false)}
                                    title="Editar Turma"
                                    description={description}
                                    totalLessons={totalLessons}
                                    buttonBg="bg-blue-500"
                                    nameButton={classModalButtonName}
                                    onChangeDescription={setDescription}
                                    onChangeLessons={setTotalLessons}
                                    onSubimit={updateMyClass}
                                    disabled={classModalSubimitButtonDisabled}
                                />
                            )}

                            {showConfirmModal ? (
                                <ConfirmModal
                                    openModal={showConfirmModal}
                                    closeModal={() => setShowConfirmModal(false)}
                                    title="Deseja Excluir Essa Turma?"
                                    onSubimit={deleteMyClass}
                                    disabled={confirmModalSubimitButtonDisabled}
                                />
                            ): (
                                null
                            )}
                        </div>
                    ) : (
                        <>
                            {!createClassNow ? (
                                null
                            ) : (
                                <>
                                    {showModal ? (
                                        <ClassModal
                                            openModal={showClassModal}
                                            closeModal={() => setShowClassModal(false)}
                                            title="Nova Turma"
                                            buttonBg="bg-green-500"
                                            nameButton="Criar"
                                            onChangeDescription={setDescription}
                                            onChangeLessons={setTotalLessons}
                                            onSubimit={createMyClass}
                                            disabled={classModalSubimitButtonDisabled}
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
                        </>
                    )}
                </Section>
            </Main>
        </PrivateRoute>
    )
}
