import AuthProvider from "@/contexts/AuthContext"
import MyClasses from "@/components/MyClasses"

export default function MyClassesPage() {
    return (
        <AuthProvider>
            <MyClasses/>
        </AuthProvider>
    )
}
