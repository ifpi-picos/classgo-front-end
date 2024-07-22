import AuthProvider from "@/contexts/AuthContext"
import Profile from "@/components/Profile"

export const metadata = {
    title: "Meu Perfil"
}

export default function ProfilePage() {
    return (
        <AuthProvider>
            <Profile/>
        </AuthProvider>
    )
}
