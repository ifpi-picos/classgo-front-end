import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Image from "next/image"
import SideBar from "./SideBar"

export default function MyClasses() {
    return (
        <div className="flex justify-end w-full h-screen">
            <SideBar/>

            <main className="flex flex-col w-4/5">
                <header className="flex justify-center items-center w-full h-32 text-neutral-800 text-xl shadow-md">
                    <span>Minhas Turmas</span>
                </header>

                <section className="flex flex-grow flex-col justify-center items-center w-full">
                    <div className="w-1/4">
                        <Image className="w-full h-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                    </div>

                    <div>
                        <button className="px-4 py-2 bg-green-500 text-white font-semibold shadow-md rounded-xl" type="button">
                            <span>Crie uma Turma</span>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}