import { useCallback, useEffect, useState } from "react"
import useLesson from "./useLesson"
import useStudent from "./useStudent"

export default function useProgress() {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState([])

    const bgColor = []

    const {lessons} = useLesson()
    const {students} = useStudent()

    const createProgress = useCallback(() => {
        const newProgress = []

        students.map((student) => {
            newProgress.push({
                studentName: student.name,
                frequency: ((student.numberOfPresences / lessons.length) * 100).toFixed(0) + "%",
                width: ((student.numberOfPresences / lessons.length) * 100).toFixed(0) >= 70 ? `w-[${((student.numberOfPresences / lessons.length) * 100).toFixed(0).toString()}%]` : `w-[${((student.numberOfPresences / lessons.length) * 100).toFixed(0).toString()}%]`
            })
        })
        
        setProgress(newProgress)
        setLoading(false)
    }, [students, lessons])

    useEffect(() => {
        createProgress()
    }, [createProgress])
    
    return {
        loading,
        progress
    }
}
