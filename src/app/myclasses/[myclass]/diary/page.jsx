import AuthProvider from "@/contexts/AuthContext"
import Diary from "@/components/Diary"

export default function DiaryPage({params}) {
    return (
        <AuthProvider>
            <Diary myClassDescription={params.myclass}/>
        </AuthProvider>
    )
}
