import AuthProvider from "@/contexts/AuthContext"
import Progress from "@/components/Progress"
import MyClassProvider from "@/contexts/MyClassContext"

export const metadata = {
    title: "Progresso"
}

export default function ProgressPage({params}) {
    return (
        <AuthProvider>
            <MyClassProvider myClassDescription={params.myclass}>
                <Progress/>
            </MyClassProvider>
        </AuthProvider>
    )
}
