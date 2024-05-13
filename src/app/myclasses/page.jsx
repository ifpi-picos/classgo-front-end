import MyClasses from "@/components/MyClasses"
import AuthProvider from "@/contexts/AuthContext"

export default function MyClassesPage(params) {
    return (
        <AuthProvider>
            <MyClasses/>
        </AuthProvider>
    )
}