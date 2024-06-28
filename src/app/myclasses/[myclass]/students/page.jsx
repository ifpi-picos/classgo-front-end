import AuthProvider from "@/contexts/AuthContext"
import Students from "@/components/Students"

export default function StudentsPage({params}) {
    return (
        <AuthProvider>
            <Students myClassDescription={params.myclass}/>
        </AuthProvider>
    )
}
