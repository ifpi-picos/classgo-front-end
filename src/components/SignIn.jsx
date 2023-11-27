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
import Input from "./Input"
import Link from "next/link"
import Title from "./Title"
import VisiblePassword from "./VisiblePassword"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [visiblePassoword, setVisiblePassword] = useState(false)

    const router = useRouter()

    const signInUrl = "https://reverse-time-back-end.vercel.app"

    const signIn = (e) => {
        e.preventDefault()

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)

                    if (res.data.userType === "administrador") {
                        return router.replace("/users")
                    }
                    
                    return router.replace("/home")
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <Form className="w-1/3 bg-blue-500 rounded-xl shadow-md flex justify-center items-center" onSubimit={signIn}>
            <Fieldset className="w-5/6 my-10 border border-gray-50 flex flex-col items-center rounded-xl">
                <DivTitle className="my-10 text-xl text-gray-50 flex justify-center items-center">
                    <Title>
                        Login
                    </Title>
                </DivTitle>

                <DivInputs>
                    <DivInput>
                        <Input
                            className="w-full px-3 py-2 rounded-xl"
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
                            className="w-full pl-3 pr-12 py-2 rounded-xl"
                            id="password"
                            name="password"
                            placeholder="Senha"
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

                    <div className="w-full flex justify-end">
                        <Link className="underline text-gray-50" href="forgotpassword">
                            esqueceu senha?
                        </Link>
                    </div>

                    <DivButtons className="my-5 flex text-gray-50 flex-col items-center">
                        <Button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl">
                            <ButtonName>
                                Entrar
                            </ButtonName>
                        </Button>

                        <Link className="underline" href="/signup">
                            Cadastrar-se
                        </Link>
                    </DivButtons>
                </DivInputs>
            </Fieldset>
        </Form>
    )
}
