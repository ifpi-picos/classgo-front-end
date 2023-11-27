"use client"

import axios from "axios"
import Button from "./Button"
import ButtonName from "./ButtonName"
import DivButtons from "./DivButtons"
import DivInput from "./DivInput"
import DivInputs from "./DivInputs"
import DivTitle from "./DivTitle"
import Link from "next/link"
import Fieldset from "./Fieldset"
import Form from "./Form"
import Input from "./Input"
import Title from "./Title"
import VisiblePassword from "./VisiblePassword"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [visiblePassoword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    const type = "Professor"
    
    const router = useRouter()

    const signUpUrl = "https://reverse-time-back-end.vercel.app/auth/signup"

    const signUp = (e) => {
        e.preventDefault()

        axios
            .post(signUpUrl, {name, email, type, password, confirmPassword})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <Form className="w-1/3 bg-blue-500 rounded-xl shadow-md flex justify-center items-center" onSubimit={signUp}>
            <Fieldset className="w-5/6 my-10 border border-gray-50 rounded-xl flex flex-col items-center">
                <DivTitle className="my-10 text-xl text-gray-50">
                    <Title>
                        Cadsatro
                    </Title>
                </DivTitle>

                <DivInputs>
                    <DivInput>
                        <Input
                            className="w-full px-3 py-2 rounded-lg"
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
                            className="w-full px-3 py-2 rounded-lg"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            maxLength="45"
                            onChange={setEmail}
                            required
                        />
                    </DivInput>

                    <DivInput>
                        <Input
                            className="w-full pl-3 pr-12 py-2 rounded-lg"
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

                    <DivInput>
                        <Input
                            className="w-full pl-3 pr-12 py-2 rounded-lg"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar Senha"
                            maxLength="15"
                            type={!visibleConfirmPassword ? "password" : "text"}
                            onChange={setConfirmPassword}
                            required
                        />

                        <VisiblePassword
                            visiblePassoword={visibleConfirmPassword}
                            setVisiblePassword={setVisibleConfirmPassword}
                        />
                    </DivInput>

                </DivInputs>

                <DivButtons className="mt-5 mb-10 text-gray-50 flex flex-col items-center">
                    <Button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl">
                        <ButtonName>
                            Cadastrar-se
                        </ButtonName>
                    </Button>
                    <Link className="underline" href="/">
                        Entrar
                    </Link>
                </DivButtons>
            </Fieldset>
        </Form>
    )
}
