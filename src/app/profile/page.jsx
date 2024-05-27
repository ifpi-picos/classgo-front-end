import AuthProvider from "@/contexts/AuthContext"
import Profile from "@/components/Profile"

export default function ProfilePage() {
    return (
        <AuthProvider>
            <Profile/>
        </AuthProvider>
    )
}
