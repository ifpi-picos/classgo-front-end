import { MyClassContext } from "@/contexts/MyClassContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useContext, useEffect, useState } from "react"

export default function useStudent() {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showStudentModal, setShowStudentModal] = useState(false)
    const [studentModalAction, setStudentModalAction] = useState("")
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [numberOfPresences, setNumberOfPresences] = useState(0)
    const [students, setStudents] = useState([])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const {classId} = useContext(MyClassContext)

    const router = useRouter()

    const readStudentsUrl = `https://idcurso-back-end.vercel.app/students/${classId}`
    const createStudentUrl = `https://idcurso-back-end.vercel.app/students`
    const updateStudentUrl = `https://idcurso-back-end.vercel.app/students/${id}`
    const deleteStudentUrl = `https://idcurso-back-end.vercel.app/students/${id}`

    const openConfirmModal = useCallback(() => {
        setShowConfirmModal(true)
    }, [])

    const closeConfirmModal = useCallback(() => {
        setShowConfirmModal(false)
    }, [])

    const openStudentModal = useCallback(() => {
        setShowStudentModal(true)
    }, [])

    const closeStudentModal = useCallback(() => {
        setShowStudentModal(false)
    }, [])

    const readStudents = useCallback(async () => {
        await axios
                    .get(readStudentsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            setStudents(res.data)
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
    }, [readStudentsUrl, router])

    const createStudent = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(createStudentUrl, {name, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setSubmitButtonDisabled(false)
                            closeStudentModal()
                            readStudents()
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
    }, [createStudentUrl, name, classId, closeStudentModal, readStudents, router])

    const updateStudent = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateStudentUrl, {name, classId}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            closeStudentModal()
                            readStudents()
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
    }, [updateStudentUrl, name, classId, closeStudentModal, readStudents, router])

    const deleteStudent = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .delete(deleteStudentUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            closeConfirmModal()
                            readStudents()
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
                    
    }, [deleteStudentUrl, closeConfirmModal, readStudents, router])

    useEffect(() => {
        readStudents()
    }, [readStudents, classId])

    const createButtonClicked = useCallback(() => {
        setStudentModalAction("Create")
        openStudentModal()
    }, [openStudentModal])

    const editButtonClicked = useCallback((student) => {
        setStudentModalAction("Update")
        openStudentModal()
        setId(student.id)
        setName(student.name)
    }, [openStudentModal])

    const deleteButtonClicked = useCallback((student) => {
        openConfirmModal()
        setId(student.id)
    }, [openConfirmModal])
    
    return {
        showConfirmModal,
        openConfirmModal,
        closeConfirmModal,
        showStudentModal,
        openStudentModal,
        closeStudentModal,
        studentModalAction,
        name,
        setName,
        numberOfPresences,
        setNumberOfPresences,
        students,
        createStudent,
        updateStudent,
        deleteStudent,
        createButtonClicked,
        deleteButtonClicked,
        editButtonClicked,
        submitButtonDisabled
    }
}
