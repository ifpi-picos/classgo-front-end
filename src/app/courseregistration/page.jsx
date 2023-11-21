"use client"

import CourseRegistrationForm from "@/components/CourseRegistrationForm"
import PrivateRoute from "@/components/PrivateRoute"

export default function CourseRegistrationPage() {
    return (
        <PrivateRoute>
            <main className="h-screen w-full bg-blue-100 flex items-center justify-center">
                <CourseRegistrationForm/>
            </main>
        </PrivateRoute>
    )
}
