"use client"

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
import VisiblePassword from "./VisiblePassword"
import { HiUser } from "react-icons/hi"
import { useState } from "react"

export default function Profile() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [visiblePassoword, setVisiblePassword] = useState(false)
    const [visibleButtonEdit, setVisibleButtonEdit] = useState(true)

    const usersUrl = "https://reverse-time-back-end.vercel.app/redefinepassword"

    return (
        <PrivateRoute url={usersUrl}>
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

                    <Form className="w-2/5 border border-t-0 shadow-md rounded-t-none rounded-xl flex justify-center items-center">
                        <Fieldset className="w-5/6 my-10 flex flex-col items-center">
                            <DivInputs>
                                <DivInput>
                                    <Input
                                        className="w-full px-3 py-2 border-b-2 border-b-gray-300"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Nome"
                                        minLength="3"
                                        maxLength="30"
                                        onChange={setName}
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
                                        onChange={setEmail}
                                        required
                                    />
                                </DivInput>

                                <DivInput>
                                    <Input
                                        className="w-full pl-3 pr-12 py-2 border-b-2 border-b-gray-300"
                                        id="password"
                                        name="password"
                                        placeholder="Senha"
                                        minLength="6"
                                        maxLength="15"
                                        type={!visiblePassoword ? "password" : "text"}
                                        onChange={setPassword}
                                        required
                                    />

                                    <VisiblePassword
                                        visiblePassoword={visiblePassoword}
                                        setVisiblePassword={setVisiblePassword}
                                    />
                                </DivInput>
                            </DivInputs>

                            {visibleButtonEdit ? (
                                    <DivButtons className="w-full my-5 text-gray-50 flex justify-center items-center">
                                        <Button className="px-6 py-3 bg-blue-500 rounded-lg" onClick={() => setVisibleButtonEdit(false)}>
                                            <ButtonName>
                                                Editar
                                            </ButtonName>
                                        </Button>
                                    </DivButtons>
                                ) : (
                                    <DivButtons className="w-4/5 my-5 text-gray-50 flex justify-evenly items-center">
                                        <Button className="px-6 py-3 bg-blue-500 rounded-xl" onClick={() => setVisibleButtonEdit(true)}>
                                            <ButtonName>
                                                Salvar
                                            </ButtonName>
                                        </Button>

                                        <Button className="px-6 py-3 bg-red-500 rounded-xl" onClick={() => setVisibleButtonEdit(true)}>
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
