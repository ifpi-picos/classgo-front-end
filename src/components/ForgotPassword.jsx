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
import Link from "next/link"
import Input from "./Input"
import Title from "./Title"
import { useState } from "react"

export default function ForgotPassword() {
    const [email, setEmail] = useState()

    const forgotPasswordUrl = "https://reverse-time-back-end.vercel.app/forgotpassword"

    const forgotPassword = (e) => {
        e.preventDefault()

        axios
            .post(forgotPasswordUrl, {email})
            .then((res) => {               
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    return alert(res.data.message)
                }
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    return alert(err.response.data)
                }
            })
    }

    return (
        <Form className="w-1/3 bg-blue-500 rounded-xl shadow-md flex justify-center items-center" onSubimit={forgotPassword}>
            <Fieldset className="w-5/6 my-10 border border-gray-50 flex flex-col items-center rounded-xl">
                <DivTitle className="my-10 text-xl text-gray-50">
                    <Title>
                        Solicitar Nova Senha
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
                            maxLength="45"
                            onChange={setEmail}
                            required
                        />
                    </DivInput>
                </DivInputs>

                <DivButtons className="mt-5 mb-10 text-gray-50 flex flex-col items-center">
                    <Button className="mb-5 px-6 py-3 border border-gray-50 rounded-xl">
                        <ButtonName>
                            Solicitar
                        </ButtonName>
                    </Button>

                    <Link className="underline" href="/">Voltar</Link>
                </DivButtons>
            </Fieldset>
        </Form>
    )
}
