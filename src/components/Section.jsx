import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiOutlinePlusCircle } from "react-icons/hi"

export default function Section() {
    const [position, setPosition] = useState("fixed")
    const [verifyTurma, setVerifyTurma] = useState(false)
    const [title, setTitle] = useState("Bem-vindo, Professor!")
    const [newClass, setNewClass] = useState(false)

    const router = useRouter()

    const newClassButtonActive = () => {
        setNewClass(true)
    }

    const createClass = () => {

    }

    const newClassButtonNotActive = () => {
        setNewClass(false)
    }

    return (
        
        <div className="w-4/5 h-screen bg-gray-100 text-gray-800 flex flex-col">
            {!verifyTurma ? (
                <>
                    <div className="w-full h-32 border-2 border-gray-300 flex justify-center items-center">
                        <div className="w-1/3 flex justify-center items-center">
                            <span className="text-xl text-center">{title}</span>
                        </div>
                    </div>

                        {!newClass ? (
                            <div className="flex flex-grow justify-end items-end">
                                <HiOutlinePlusCircle
                                    className="mb-20 mr-20 text-6xl text-gray-500 cursor-pointer"
                                    onClick={newClassButtonActive}
                                />
                            </div>
                        ): (
                            <div className="w-full flex flex-grow flex-col justify-center items-center">
                                 <form className={`w-1/4  h-72 ${position} bg-white border rounded shadow-xl flex justify-center items-center`}>
                                    <fieldset className="w-11/12 h-64 rounded-xl flex flex-col items-center justify-evenly">
                                        <div className="w-5/6 flex border-b-2 border-gray-300 justify-center items-center">
                                            <input
                                                className="w-full p-2 text-gray-800 rounded-xl"
                                                id="className"
                                                name="className"
                                                type="text"
                                                placeholder="Nome da Turma"
                                                minLength="3"
                                                maxLength="25"
                                                required
                                            />
                                        </div>
                        
                                        <div className="w-5/6 flex justify-evenly">
                                            <button className="px-6 py-3 border rounded-xl bg-green-500 text-gray-100" type="button" onClick={createClass}>Criar</button>
                                            <button className="px-6 py-3 border rounded-xl bg-red-500 text-gray-100" type="button" onClick={newClassButtonNotActive}>Cancelar</button>
                                        </div>
                                    </fieldset>
                                </form>

                                <div className="w-full flex flex-grow justify-end items-end">
                                    <HiOutlinePlusCircle
                                        className="mb-20 mr-20 text-6xl text-gray-500 cursor-pointer"
                                        onClick={newClassButtonNotActive}
                                    />
                                </div>
                            </div>
                        )}
                </>
            ): (
                <>
                    <div className="w-full h-32 border-2 border-gray-300 flex justify-center items-center">
                        <div className="w-1/3 flex justify-center items-center">
                            <span className="text-xl text-center">{title}</span>
                        </div>
                    </div>

                    <div className="flex flex-grow justify-center items-center">
                        <div className="flex justify-center items-center">
                            <span>Turmas</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
