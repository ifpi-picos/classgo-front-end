import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function useMyClass() {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showClassModal, setShowClassModal] = useState(false)
    const [classModalAction, setClassModalAction] = useState("")
    const [createFirstClass, setCreateFirstClass] = useState(false)
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
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
                            if (res.data.length === 0) {
                                setCreateFirstClass(true)
                                return
                            }

                            setMyClasses(res.data)
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
                    .post(createMyclassesUrl, {description}, {headers: {
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
    }, [createMyclassesUrl, description, closeClassModal, readMyClasses, router])

    const updateMyClass = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateMyClassUrl, {description}, {headers: {
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
    }, [updateMyClassUrl, description, closeClassModal, readMyClasses, router])

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
    }, [openClassModal])

    const deleteButtonClicked = useCallback((myClass) => {
        openConfirmModal()
        setId(myClass.id)
    }, [openConfirmModal])

    return {
        createFirstClass,
        showConfirmModal,
        closeConfirmModal,
        showClassModal,
        openClassModal,
        closeClassModal,
        classModalAction,
        description,
        setDescription,
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
