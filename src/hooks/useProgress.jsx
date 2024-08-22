import { useCallback, useContext, useEffect, useState } from "react"
import useLesson from "./useLesson"
import useStudent from "./useStudent"
import { MyClassContext } from "@/contexts/MyClassContext"

export default function useProgress() {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState([])

    const {numberOfLessons} = useContext(MyClassContext)

    const {lessons} = useLesson()
    const {students} = useStudent()

    const createProgress = useCallback(() => {
        const newProgress = []

        students.map((student) => {
            newProgress.push({
                studentName: student.name,
                frequency: ((student.numberOfPresences / numberOfLessons) * 100).toFixed(0) + "%",
                width: `w-[${((student.numberOfPresences / numberOfLessons) * 100).toFixed(0).toString()}%]`
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
