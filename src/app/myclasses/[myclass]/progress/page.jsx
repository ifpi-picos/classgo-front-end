import AuthProvider from "@/contexts/AuthContext"
import Progress from "@/components/Progress"

export const metadata = {
    title: "Progresso"
}

export default function ProgressPage({params}) {
    return (
        <AuthProvider>
            <Progress myClassDescription={params.myclass}/>
        </AuthProvider>
    )
}
