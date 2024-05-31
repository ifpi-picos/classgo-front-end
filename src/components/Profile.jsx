"use client"

import Header from "@/containers/Header"
import { HiMail, HiUser } from "react-icons/hi"
import Main from "@/containers/Main"
import Section from "@/containers/Section"
import SideBar from "./SideBar"
import useSideBar from "@/hooks/useSideBar"
import useUser from "@/hooks/useUser"

export default function Profile() {
    const {pageActive} = useSideBar()
    const {name, email, editUser, submitButtonDisabled, setName, setEmail, editButtonClicked, cancelButtonClicked, updateUser} = useUser()

    return (
        <Main>
            <SideBar profilePage={pageActive}/>

            <Section>
                <Header>
                    Meu Perfil
                </Header>

                <form className="flex flex-col justify-evenly items-center w-[35%] h-[500px] mt-[120px] border rounded-xl shadow-xl xl:w-[40%] lg:w-1/2 md:w-3/5 sm:w-4/5 sm:text-xs xs:w-[90%] xs:h-[450px]" onSubmit={updateUser}>
                    <HiUser className="text-8xl"/>

                    <div className="flex flex-col items-center w-[90%]">
                        <div className="flex items-center w-[90%] mb-4 border-b border-neutral-800">
                            <HiUser className="w-[10%] text-lg"/>

                            <input
                                className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="30"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                readOnly={editUser ? false : true}
                                required
                            />
                        </div>

                        <div className="flex items-center w-[90%] border-b border-neutral-800">
                            <HiMail className="w-[10%] text-lg"/>

                            <input
                                className="w-full bg-transparent placeholder:text-neutral-500 p-1 outline-none"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                minLength="12"
                                maxLength="60"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly={editUser ? false : true}
                                required
                            />
                        </div>
                    </div>

                    <button className={editUser ? "hidden" : "w-[35%] bg-green-600 text-white font-semibold py-1 rounded-md"} type="button" onClick={editButtonClicked}>
                        <span>Editar</span>
                    </button>

                    <div className={`${editUser ? "w-[35%]" : "hidden"}`}>
                        <button className="w-full bg-blue-500 text-white font-semibold mb-4 py-1 rounded-md" disabled={submitButtonDisabled}>
                            <span>Salvar</span>
                        </button>

                        <button className="w-full bg-red-500 text-white font-semibold py-1 rounded-md" type="button" onClick={cancelButtonClicked}>
                            <span>Cancelar</span>
                        </button>
                    </div>
                </form>
            </Section>
        </Main>
    )
}
