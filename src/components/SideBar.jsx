"use client"

import Aside from "./Aside"
import Button from "./Button"
import ButtonName from "./ButtonName"
import ButtonIcon from "./ButtonIcon"
import DivAside from "./DivAside"
import DivButtons from "./DivButtons"
import DivTitle from "./DivTitle"
import Title from "./Title"
import { HiHome, HiOutlineLogin, HiUser } from "react-icons/hi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SideBar() {
    const router = useRouter()
    
    const homeButtonClicked = (e) => {
        router.push("/home")
    }
    
    const profileButtonClicked = () => {
        router.push("/profile")
    }

    const logoutButtonClicked = () => {
        localStorage.clear()
        router.replace("/")
    }

    return (
        <Aside>
            <DivTitle className="w-full h-32 text-xl text-gray-50 flex justify-center items-center">
                <Title>
                    idCurso
                </Title>
            </DivTitle>

            <DivAside>
                <DivTitle className="ml-4 mb-4">
                    <Title>
                        Início
                    </Title>
                </DivTitle>

                <DivButtons className="flex justify-center items-center">
                    <Button
                        className={`w-11/12 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500 flex items-center`}
                        type="button"
                        onClick={homeButtonClicked}
                    >
                        <ButtonIcon className="mr-2 mb-1 text-2xl">
                            <HiHome/>
                        </ButtonIcon>

                        <ButtonName>
                            Home
                        </ButtonName>
                    </Button>
                </DivButtons>
            </DivAside>

            <DivAside>
                <DivTitle className="ml-4 mb-4">
                    <Title>
                        Configuraçoes
                    </Title>
                </DivTitle>

                <DivButtons className="flex flex-col justify-center items-center">
                    <Button
                        className={`w-11/12 mb-2 p-4 rounded-xl hover:bg-blue-400 active:bg-blue-500 flex items-center`}
                        type="button"
                        onClick={profileButtonClicked}
                    >
                        <ButtonIcon className="mr-2 mb-1 text-2xl">
                            <HiUser/>
                        </ButtonIcon>

                        <ButtonName>
                            Perfil
                        </ButtonName>
                    </Button>

                    <Button
                        className={`w-11/12 p-4 rounded-xl hover:bg-red-400 active:bg-blue-500 flex items-center`}
                        type="button"
                        onClick={logoutButtonClicked}
                    >
                        <ButtonIcon className="mr-2 text-2xl">
                            <HiOutlineLogin/>
                        </ButtonIcon>

                        <ButtonName>
                            Sair
                        </ButtonName>
                    </Button>
                </DivButtons>
            </DivAside>
        </Aside>
    )
}
