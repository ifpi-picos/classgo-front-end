import axios from "axios"
import { useRouter } from "next/navigation"
export default function Main({children}) {
    return (
        <main className="flex flex-col items-center w-4/5 h-screen bg-gray-50 text-gray-950 border-gray-300">
            {children}
        </main>
    )
}
