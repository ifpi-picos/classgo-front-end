"use client"

import Main from "@/components/Main"
import PrivateRoute from "@/components/PrivateRoute"

export default function HomePage() {
    return (
        <PrivateRoute>
            <Main/>
        </PrivateRoute>
    )
}
