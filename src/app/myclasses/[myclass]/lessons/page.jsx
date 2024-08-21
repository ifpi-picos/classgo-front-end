import AuthProvider from "@/contexts/AuthContext"
import Lesson from "@/components/Lesson"
import MyClassProvider from "@/contexts/MyClassContext"

export const metadata = {
    title: "Diário"
}

export default function DiaryPage({params}) {
    return (
        <AuthProvider>
            <MyClassProvider myClassDescription={params.myclass}>
                <Lesson/>
            </MyClassProvider>
        </AuthProvider>
    )
}
