"use client"

import Body from "@/components/Body"
import PrivateRoute from "@/components/PrivateRoute"
import RedefinePasswordForm from "@/components/RedefinePasswordForm"

export default function RedefinePasswordPage() {
    return (
        <PrivateRoute>
            <Body>
                <RedefinePasswordForm/>
            </Body>
        </PrivateRoute>
    )
}
