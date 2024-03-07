"use client"

import axios from "axios"
import Header from "../tags/Header"
import { HiUser } from "react-icons/hi"
import Main from "../tags/Main"
import PrivateRoute from "./PrivateRoute"
import Section from "../tags/Section"
import SideBar from "../tags/SideBar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [visibleEditButton, setVisibleEditButton] = useState(true)
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(false)

    const router = useRouter()

    const getUserUrl = `https://idcurso-back-end.vercel.app/users/findOne`
    const updateUserUrl = `https://idcurso-back-end.vercel.app/users/update/${id}`

    const getUser = () => {
        axios.get(getUserUrl, { headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
        .then((res) => {
            if (res.status === 200) {
                setId(res.data.id)
                setName(res.data.name)
                setEmail(res.data.email)
                setVisibleEditButton(true)
                return
            }

            if (res.status === 401) {
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
        getUser()
    }, [])

    const editButtonClicked = (e) => {
        e.preventDefault()
        setVisibleEditButton(false)
        setSaveButtonDisabled(false)
    }

    const cancelButtonClicked = () => {
        getUser()
    }

    const updateUser = (e) => {
        e.preventDefault()

        setSaveButtonDisabled(true)

        axios
            .put(updateUserUrl, {name, email}, {headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
            .then((res) => {
                if (res.status === 200) {
                    alert(res.data)
                    setVisibleEditButton(false)
                    setVisibleEditButton(true)
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
                    setSaveButtonDisabled(false)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    router.replace("/")
                    return
                }
            })
    }

    return (
        <PrivateRoute url={getUserUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <div className="flex justify-center items-center">
                        <span>Perfil do Usuário</span>
                    </div>
                </Header>
                
                <Section>

                    {name === "" && email === "" ? (
                        null
                    ) : (
                        <>
                            <div className="flex justify-center items-center w-2/5 border border-b-0 rounded-b-none rounded-xl">
                                <HiUser className="mt-16" size="135"/>
                            </div>
                            <form className="flex justify-center items-center w-2/5 border border-t-0 shadow-md rounded-t-none rounded-xl" onSubmit={updateUser}>
                                <fieldset className="flex flex-col items-center w-5/6 my-10">
                                    <div className="flex flex-col items-center w-5/6 my-5">
                                        {visibleEditButton ? (
                                            <>
                                                <div className="flex justify-center items-center w-full mb-5">
                                                    <input
                                                        className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="Nome"
                                                        minLength="3"
                                                        maxLength="30"
                                                        value={name}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="flex justify-center items-center w-full mb-5">
                                                    <input
                                                        className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        maxLength="60"
                                                        value={email}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="flex justify-center items-center w-full my-5 text-gray-50">
                                                    <button className="px-6 py-3 bg-green-600 rounded-lg" type="button" onClick={editButtonClicked}>
                                                        Editar
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-center items-center w-full mb-5">
                                                    <input
                                                        className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                        id="name"
                                                        name="name"
                                                        minLength="3"
                                                        maxLength="30"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="flex justify-center items-center w-full mb-5">
                                                    <input
                                                        className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        maxLength="60"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="flex justify-evenly items-center w-4/5 my-5 text-gray-50">
                                                    <button className="px-6 py-3 bg-blue-500 rounded-xl" disabled={saveButtonDisabled}>
                                                        Salvar
                                                    </button>

                                                    <button className="px-6 py-3 bg-red-500 rounded-xl" type="button" onClick={cancelButtonClicked}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </>
                                        )}                               
                                    </div>
                                </fieldset>
                            </form>
                        </>
                    )}

                </Section>
            </Main>
        </PrivateRoute>
    )
}
