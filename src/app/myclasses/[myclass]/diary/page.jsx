import AuthProvider from "@/contexts/AuthContext"
import Diary from "@/components/Diary"

export const metadata = {
    title: "Diário"
}

export default function DiaryPage({params}) {
    return (
        <AuthProvider>
            <Diary myClassDescription={params.myclass}/>
        </AuthProvider>
    )
}
