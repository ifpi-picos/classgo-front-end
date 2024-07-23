import AuthProvider from "@/contexts/AuthContext"
import Diary from "@/components/Diary"
import MyClassProvider from "@/contexts/MyClassContext"

export const metadata = {
    title: "Diário"
}

export default function DiaryPage({params}) {
    return (
        <AuthProvider>
            <MyClassProvider myClassDescription={params.myclass}>
                <Diary/>
            </MyClassProvider>
        </AuthProvider>
    )
}
