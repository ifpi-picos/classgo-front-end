"use client"

import Main from "@/components/Main"
import PrivateRoute from "@/components/PrivateRoute"
import SideBar from "@/components/SideBar"

export default function HomePage() {
    return (
        <PrivateRoute>
            <div className="h-screen w-full flex">
                <SideBar/>
                <Main/>
            </div>
        </PrivateRoute>
    )
}
