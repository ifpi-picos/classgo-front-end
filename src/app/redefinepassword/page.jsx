import AuthProvider from "@/contexts/AuthContext"
import RedefinePassword from "@/components/RedefinePassword"

export default function RedefinePasswordPage() {
    return (
        <AuthProvider>
            <RedefinePassword/>
        </AuthProvider>
    )
}
