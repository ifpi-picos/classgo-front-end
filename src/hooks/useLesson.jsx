import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function useLesson({classDescription}) {
    const [classId, setClassId] = useState(0)
    const [showLessonModal, setShowLessonModal] = useState(false)
    const [lessonModalAction, setLessonModalAction] = useState("")
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [lessons, setLessons] = useState([])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const readMyClassUrl = `https://idcurso-back-end.vercel.app/classes/${classDescription}`

    const readLessonsUrl = `https://idcurso-back-end.vercel.app/lessons/${classId}`
    const createLessonUrl = `https://idcurso-back-end.vercel.app/lessons`
    const updateLessonUrl = `https://idcurso-back-end.vercel.app/lessons/${id}`

    const openLessonModal = useCallback(() => {
        setShowLessonModal(true)
    }, [])

    const closeLessonModal = useCallback(() => {
        setShowLessonModal(false)
    }, [])

    const readMyClass = useCallback(async () => {
        await axios
                    .get(readMyClassUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setClassId(res.data.id)
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
    },  [readMyClassUrl, router])

    const readLessons = useCallback(async () => {
        await axios
                    .get(readLessonsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            setLessons(res.data)
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
                    .post(createLessonUrl, {description, date, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setSubmitButtonDisabled(false)
                            closeLessonModal()
                            readLessons()
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
    }, [createLessonUrl, description, date, classId, closeLessonModal, readLessons, router])

    const updateLesson = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateLessonUrl, {description, date, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            closeLessonModal()
                            readLessons()
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
    }, [updateLessonUrl, description, date, classId, closeLessonModal, readLessons, router])

    useEffect(() => {
        readMyClass()
    }, [readMyClass])

    useEffect(() => {
        readLessons()
    }, [readLessons, classId])

    const createButtonClicked = useCallback(() => {
        setLessonModalAction("Create")
        openLessonModal()
    }, [openLessonModal])

    const editButtonClicked = useCallback((lesson) => {
        setLessonModalAction("Update")
        openLessonModal()
        setId(lesson.id)
        setDescription(lesson.description)
        setDate(lesson.date)
    }, [openLessonModal])

    return {
        showLessonModal,
        closeLessonModal,
        lessonModalAction,
        description,
        setDescription,
        date,
        setDate,
        lessons,
        createLesson,
        updateLesson,
        createButtonClicked,
        editButtonClicked,
        submitButtonDisabled
    }
}
