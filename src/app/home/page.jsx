"use client"

import Section from "@/components/Section"
import PrivateRoute from "@/components/PrivateRoute"
import SideBar from "@/components/SideBar"

export default function HomePage() {
    return (
        <PrivateRoute>
            <main className="w-full h-screen flex">
                <SideBar/>
                <Section/>
            </main>
        </PrivateRoute>
    )
}
