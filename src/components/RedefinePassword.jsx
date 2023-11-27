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
import PrivateRoute from "./PrivateRoute"
import Title from "./Title"
import VisiblePassword from "./VisiblePassword"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RedefinePassword() {
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()
    const [visibleNewPassoword, setVisibleNewPassword] = useState(false)
    const [visibleConfirmNewPassword, setVisibleConfirmNewPassword] = useState(false)

    const router = useRouter()

    const redefinePasswordUrl = `https://reverse-time-back-end.vercel.app/redefinepassword/${2}`

    const redefinePassword = (e) => {
        e.preventDefault()

        axios
            .put(redefinePasswordUrl, {newPassword, confirmNewPassword}, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.clear()
                    alert("Senha redefinada com sucesso!")
                    return router.replace("/")
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch ((err) => {
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
        <PrivateRoute url={redefinePasswordUrl}>
            <Form className="w-1/3 bg-blue-500 rounded-xl shadow-md flex justify-center items-center" onSubimit={redefinePassword}>
                <Fieldset className="w-5/6 my-10 border border-gray-50 rounded-xl flex flex-col items-center">
                    <DivTitle className="my-10 text-lg text-gray-50">
                        <Title>
                            Alterar Senha
                        </Title>
                    </DivTitle>

                    <DivInputs>
                        <DivInput>
                            <Input
                                className="w-full pl-3 pr-12 py-2 rounded-xl"
                                id="password"
                                name="password"
                                placeholder="Nova Senha"
                                minLength="6"
                                maxLength="15"
                                type={!visibleNewPassoword ? "password" : "text"}
                                onChange={setNewPassword} 
                                required
                            />

                            <VisiblePassword
                                visiblePassoword={visibleNewPassoword}
                                setVisiblePassword={setVisibleNewPassword}
                            />
                        </DivInput>

                        <DivInput>
                            <Input
                                className="w-full pl-3 pr-12 py-2 rounded-xl"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                placeholder="Confirmar Nova Senha"
                                maxLength="15"
                                type={!visibleConfirmNewPassword ? "password" : "text"}
                                onChange={setConfirmNewPassword}
                                required
                            />

                            <VisiblePassword
                                visiblePassoword={visibleConfirmNewPassword}
                                setVisiblePassword={setVisibleConfirmNewPassword}
                            />
                        </DivInput>
                    </DivInputs>

                    <DivButtons className="mt-5 mb-10 text-gray-50 flex justify-center items-center">
                        <Button className="px-6 py-3 border border-gray-50 rounded-xl">
                            <ButtonName>
                                Redefinir
                            </ButtonName>
                        </Button>
                    </DivButtons>
                </Fieldset>
            </Form>
        </PrivateRoute>
    )
}
