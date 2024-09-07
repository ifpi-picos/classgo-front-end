import AuthProvider from "@/contexts/AuthContext"
import Lessons from "@/components/Lessons"
import MyClassProvider from "@/contexts/MyClassContext"

export const metadata = {
    title: "Aulas"
}

export default function DiaryPage({params}) {
    return (
        <AuthProvider>
            <MyClassProvider myClassDescription={params.myclass}>
                <Lessons/>
            </MyClassProvider>
        </AuthProvider>
    )
}
