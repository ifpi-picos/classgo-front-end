import AuthProvider from "@/contexts/AuthContext"
import Students from "@/components/Students"
import MyClassProvider from "@/contexts/MyClassContext"

export const metadata = {
    title: "Alunos"
}

export default function StudentsPage({params}) {
    return (
        <AuthProvider>
            <MyClassProvider myClassDescription={params.myclass}>
                <Students/>
            </MyClassProvider>
        </AuthProvider>
    )
}
