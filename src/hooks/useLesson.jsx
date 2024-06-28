import { useCallback, useState } from "react"

export default function useLesson() {
    const [showLessonModal, setShowLessonModal] = useState(false)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [lessons, setLessons] = useState([
        {
            date: "00/00/0000",
            description: "Aula 01"
        }
    ])

    console.log(date)

    const openLessonModal = useCallback(() => {
        setShowLessonModal(true)
    }, [])

    const closeLessonModal = useCallback(() => {
        setShowLessonModal(false)
    }, [])

    return {
        showLessonModal,
        openLessonModal,
        closeLessonModal,
        lessons
    }
}
