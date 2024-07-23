import { useCallback, useEffect, useState } from "react"
import useLesson from "./useLesson"
import useStudent from "./useStudent"

export default function useProgress() {
    const [progress, setProgress] = useState([])

    const {lessons} = useLesson()
    const {students} = useStudent()

    const createProgress = useCallback(() => {
        const newProgress = []

        students.map((student) => {
            newProgress.push({
                name: student.name,
                absences: lessons.length - student.numberOfPresences,
                lessons: lessons.length

            })
        })

        setProgress(newProgress)
    }, [students, lessons])

    useEffect(() => {
        createProgress()
    }, [createProgress])
    
    return {
        progress
    }
}
