"use client"

import axios from "axios"
import Button from "./Button"
import ButtonName from "./ButtonName"
import DivButtons from "./DivButtons"
import DivInput from "./DivInput"
import DivInputs from "./DivInputs"
import DivTitle from "./DivTitle"
import Fieldset from "./Fieldset"
import Form from "./Form"
import Header from "./Header"
import Input from "./Input"
import Main from "./Main"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import Title from "./Title"
import { HiUser } from "react-icons/hi"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Profile() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [newName, setNewName] = useState()
    const [newEmail, setNewEmail] = useState()
    const [visibleButtonEdit, setVisibleButtonEdit] = useState(true)

    const {id} = jwtDecode(localStorage.getItem("token"))

    const router = useRouter()

    const getUserUrl = `https://reverse-time-back-end.vercel.app/users/${id}`
    const updateUserUrl = `https://reverse-time-back-end.vercel.app/users/update/${id}`

    useEffect(() => {
        axios.get(getUserUrl, { headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }})
        .then((res) => {
            if (res.status === 200) {
                setName(res.data.name)
                setEmail(res.data.email)
                return null
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
    })

    const editButtonClicked = () => {
        setVisibleButtonEdit(false)
    }

    const cancelButtonClicked = () => {
        setVisibleButtonEdit(true)
    }

    const update = (e) => {
        e.preventDefault()

        axios
            .put(updateUserUrl, {newName, newEmail}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setVisibleButtonEdit(true)
                    return alert(res.data)
                }

                if (res.status === 400) {
                    return alert(res.data)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }

                else if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    return (
        <PrivateRoute url={getUserUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <DivTitle>
                        <Title>
                            Perfil do Usuário
                        </Title>
                    </DivTitle>
                </Header>
                
                <Section>
                    <div className="w-2/5 border border-b-0 rounded-b-none rounded-xl flex justify-center items-center">
                        <HiUser className="mt-16" size="135"/>
                    </div>

                    <Form className="w-2/5 border border-t-0 shadow-md rounded-t-none rounded-xl flex justify-center items-center" onSubimit={update}>
                        <Fieldset className="w-5/6 my-10 flex flex-col items-center">
                            <DivInputs>
                                {visibleButtonEdit ? (
                                    <>
                                        <DivInput>
                                            <div className="w-full px-3 py-2 border-b-2 border-b-gray-300">
                                                {name}
                                            </div>
                                        </DivInput>

                                        <DivInput>
                                        <div className="w-full px-3 py-2 border-b-2 border-b-gray-300">
                                                {email}
                                            </div>
                                        </DivInput>
                                    </>
                                ) : (
                                    <>
                                        <DivInput>
                                            <Input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Nome"
                                                maxLength="30"
                                                onChange={setNewName}
                                                required
                                            />
                                        </DivInput>

                                        <DivInput>
                                            <Input
                                                className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                maxLength="60"
                                                onChange={setNewEmail}
                                                required
                                            />
                                        </DivInput>
                                    </>
                                )}                               
                            </DivInputs>

                            {visibleButtonEdit ? (
                                    <DivButtons className="w-full my-5 text-gray-50 flex justify-center items-center">
                                        <Button className="px-6 py-3 bg-blue-500 rounded-lg" onClick={editButtonClicked}>
                                            <ButtonName>
                                                Editar
                                            </ButtonName>
                                        </Button>
                                    </DivButtons>
                                ) : (
                                    <DivButtons className="w-4/5 my-5 text-gray-50 flex justify-evenly items-center">
                                        <Button className="px-6 py-3 bg-blue-500 rounded-xl">
                                            <ButtonName>
                                                Salvar
                                            </ButtonName>
                                        </Button>

                                        <Button className="px-6 py-3 bg-red-500 rounded-xl" type="button" onClick={cancelButtonClicked}>
                                            <ButtonName>
                                                Cancelar
                                            </ButtonName>
                                        </Button>
                                    </DivButtons>
                                )}
                        </Fieldset>
                    </Form>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
