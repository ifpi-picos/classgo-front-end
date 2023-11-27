import axios from "axios"
import { useRouter } from "next/navigation"
export default function Main({children}) {
    return (
        <main className="w-4/5 h-screen flex flex-col">
            {children}
        </main>
    )
}
