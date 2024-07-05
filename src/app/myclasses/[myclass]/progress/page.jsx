import AuthProvider from "@/contexts/AuthContext"
import Progress from "@/components/Progress"

export default function ProgressPage({params}) {
    return (
        <AuthProvider>
            <Progress myClassDescription={params.myclass}/>
        </AuthProvider>
    )
}
