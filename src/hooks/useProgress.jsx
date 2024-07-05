import { useCallback, useEffect, useState } from "react"
import useStudent from "./useStudent"
import useLesson from "./useLesson"

export default function useProgress({classDescription}) {
    const [progress, setProgress] = useState([])

    const {students} = useStudent({classDescription})
    const {lessons} = useLesson({classDescription})

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

    }, [])

    useEffect(() => {
        createProgress()
    }, [createProgress])
    
    return {
        progress
    }
}
