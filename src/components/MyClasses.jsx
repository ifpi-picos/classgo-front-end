import FirstClassImg from "../../assets/FirstClassImg.jpg"
import Image from "next/image"
import SideBar from "./SideBar"

export default function MyClasses() {
    return (
        <div className="flex justify-end w-full h-screen select-none">
            <SideBar/>

            <main className="flex flex-col w-4/5 lg:w-[70%] sm:w-[80%]">
                <header className="flex justify-center items-center w-full h-32 text-neutral-800 text-xl shadow-md md:text-base xs:text-sm">
                    <span>Minhas Turmas</span>
                </header>

                <section className="flex flex-grow flex-col justify-center items-center w-full">
                    <div className="w-1/4 lg:w-1/2 sm:w-3/5 xs:w-4/5">
                        <Image className="w-full" src={FirstClassImg} alt="Imagem ilustrativa" priority/>
                    </div>

                    <button className="px-4 py-2 bg-green-500 text-white font-semibold shadow-md rounded-xl md:text-sm xs:text-xs xs:px-8" type="button">
                        <span>Crie uma Turma</span>
                    </button>
                </section>
            </main>
        </div>
    )
}