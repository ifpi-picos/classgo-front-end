import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function useMyClass() {
    const [loading, setLoading] = useState(true)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showClassModal, setShowClassModal] = useState(false)
    const [classModalAction, setClassModalAction] = useState("")
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [numberOfLessons, setNumberOfLessons] = useState(0)
    const [myClasses, setMyClasses] = useState([])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const readMyClassesUrl = `https://idcurso-back-end.vercel.app/classes`
    const createMyclassesUrl = `https://idcurso-back-end.vercel.app/classes`
    const updateMyClassUrl = `https://idcurso-back-end.vercel.app/classes/${id}`
    const deleteMyClassUrl = `https://idcurso-back-end.vercel.app/classes/${id}`
    
    const openConfirmModal = useCallback(() => {
        setShowConfirmModal(true)
    }, [])

    const closeConfirmModal = useCallback(() => {
        setShowConfirmModal(false)
    }, [])

    const openClassModal = useCallback(() => {
        setShowClassModal(true)
    }, [])

    const closeClassModal = useCallback(() => {
        setShowClassModal(false)
    }, [])

    const readMyClasses = useCallback(async () => {
        await axios
                    .get(readMyClassesUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setMyClasses(res.data)
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
    }, [readMyClassesUrl, router])

    const createMyClass = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(createMyclassesUrl, {description, numberOfLessons}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setSubmitButtonDisabled(false)
                            closeClassModal()
                            readMyClasses()
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
    }, [createMyclassesUrl, description, numberOfLessons, closeClassModal, readMyClasses, router])

    const updateMyClass = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateMyClassUrl, {description, numberOfLessons}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            closeClassModal()
                            readMyClasses()
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
    }, [updateMyClassUrl, description, numberOfLessons, closeClassModal, readMyClasses, router])

    const deleteMyClass = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .delete(deleteMyClassUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setSubmitButtonDisabled(false)
                            closeConfirmModal()
                            readMyClasses()
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
                    
    }, [deleteMyClassUrl, closeConfirmModal, readMyClasses, router])

    useEffect(() => {
        readMyClasses()
    }, [readMyClasses])

    const createButtonClicked = useCallback(() => {
        setClassModalAction("Create")
        openClassModal()
    }, [openClassModal])

    const editButtonClicked = useCallback((myClass) => {
        setClassModalAction("Update")
        openClassModal()
        setId(myClass.id)
        setDescription(myClass.description)
        setNumberOfLessons(myClass.numberOfLessons)
    }, [openClassModal])

    const deleteButtonClicked = useCallback((myClass) => {
        openConfirmModal()
        setId(myClass.id)
    }, [openConfirmModal])

    return {
        loading,
        showConfirmModal,
        closeConfirmModal,
        showClassModal,
        openClassModal,
        closeClassModal,
        classModalAction,
        description,
        setDescription,
        numberOfLessons,
        setNumberOfLessons,
        myClasses,
        createMyClass,
        updateMyClass,
        deleteMyClass,
        createButtonClicked,
        editButtonClicked,
        deleteButtonClicked,
        submitButtonDisabled
    }
}
