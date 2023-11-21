"use client"

import PrivateRoute from "@/components/PrivateRoute"
import RedefinePasswordForm from "@/components/RedefinePasswordForm"

export default function RedefinePasswordPage() {
    return (
        <PrivateRoute>
            <main className="h-screen w-full bg-blue-100 flex items-center justify-center">
                <RedefinePasswordForm/>
            </main>
        </PrivateRoute>
    )
}
