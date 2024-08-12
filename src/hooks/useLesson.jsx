import axios from "axios"
import { MyClassContext } from "@/contexts/MyClassContext"
import { useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useStudent from "./useStudent"

export default function useLesson() {
    const [loading, setLoading] = useState(true)
    const [showLessonModal, setShowLessonModal] = useState(false)
    const [lessonModalAction, setLessonModalAction] = useState("")
    const [showFrequencyModal, setShowFrequencyModal] = useState(false)
    const [frequencyModalAction, setFrequencyModalAction] = useState("")
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [lessons, setLessons] = useState([])
    const [frequency, setFrequency] = useState([])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
    
    const {classId} = useContext(MyClassContext)

    const {students} = useStudent()

    const router = useRouter()

    const readLessonsUrl = `https://idcurso-back-end.vercel.app/lessons/${classId}`
    const createLessonUrl = `https://idcurso-back-end.vercel.app/lessons`
    const updateLessonUrl = `https://idcurso-back-end.vercel.app/lessons/${id}`

    const createNewFrequency = useCallback(() => {
        const newFrequency = []

        students.map((student) => {
            newFrequency.push({
                studentName: student.name,
                presence: false
            })
        })
        
        setFrequency(newFrequency)
    }, [students])

    const openLessonModal = useCallback(() => {
        setShowLessonModal(true)
    }, [])

    const closeLessonModal = useCallback(() => {
        setShowLessonModal(false)
        createNewFrequency()
    }, [createNewFrequency])

    const closeFrequencyModal = useCallback(() => {
        setShowFrequencyModal(false)
        setShowLessonModal(false)
        createNewFrequency()
    }, [createNewFrequency])

    const nextModal = useCallback(() => {
        setShowLessonModal(false)
        setShowFrequencyModal(true)
    }, [])

    const backModal = useCallback(() => {
        setShowFrequencyModal(false)
        setShowLessonModal(true)
    }, [])

    const onChangeFrequency = useCallback((studentName) => {
        frequency.map((data, index) => {
            studentName === data.studentName ? frequency.splice(index, 1, {studentName: data.studentName, presence: !data.presence}) : null
        })

        setFrequency(frequency)
    }, [frequency])

    const readLessons = useCallback(async () => {
        await axios
                    .get(readLessonsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setLessons(res.data)
                            setLoading(false)
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [readLessonsUrl, router])

    const createLesson = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(createLessonUrl, {description, date, frequency, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setSubmitButtonDisabled(false)
                            closeFrequencyModal()
                            readLessons()
                            createNewFrequency()
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createLessonUrl, description, date, frequency, classId, closeFrequencyModal, readLessons, createNewFrequency, router])

    const updateLesson = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateLessonUrl, {description, date, frequency, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            alert(res.data)
                            closeFrequencyModal()
                            readLessons()
                            createNewFrequency()
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateLessonUrl, description, date, frequency, classId, closeFrequencyModal, readLessons, createNewFrequency, router])

    const createButtonClicked = useCallback(() => {
        setLessonModalAction("Create")
        setFrequencyModalAction("Create")
        openLessonModal()
    }, [openLessonModal])

    const editButtonClicked = useCallback((lesson) => {
        setLessonModalAction("Update")
        setFrequencyModalAction("Update")
        openLessonModal()
        setId(lesson.id)
        setDescription(lesson.description)
        setDate(lesson.date)
        setFrequency(lesson.frequency)
    }, [openLessonModal])

    useEffect(() => {
        createNewFrequency()
    }, [createNewFrequency])

    useEffect(() => {
        readLessons()
    }, [readLessons])

    return {
        loading,
        showLessonModal,
        lessonModalAction,
        closeLessonModal,
        showFrequencyModal,
        frequencyModalAction,
        closeFrequencyModal,
        description,
        setDescription,
        date,
        setDate,
        frequency,
        onChangeFrequency,
        lessons,
        createLesson,
        updateLesson,
        createButtonClicked,
        editButtonClicked,
        nextModal,
        backModal,
        submitButtonDisabled
    }
}
