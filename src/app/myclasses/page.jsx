import AuthProvider from "@/contexts/AuthContext"
import MyClasses from "@/components/MyClasses"

export const metadata = {
    title: "Minhas Turmas"
}

export default function MyClassesPage() {
    return (
        <AuthProvider>
            <MyClasses/>
        </AuthProvider>
    )
}
