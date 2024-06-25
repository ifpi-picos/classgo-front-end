import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function useMyClass() {
    const [confirmModalIsOpen, setConfirmMoadlIsOpen] = useState(false)
    const [classModalIsOpen, setClassMoadlIsOpen] = useState(false)
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

    const openClassModal = useCallback(() => {
        setClassMoadlIsOpen(true)
    }, [])

    const closeClassModal = useCallback(() => {
        setClassMoadlIsOpen(false)
    }, [])

    const openConfirmModal = useCallback(() => {
        setConfirmMoadlIsOpen(true)
    }, [])

    const closeConfirmModal = useCallback(() => {
        setConfirmMoadlIsOpen(false)
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

                            if (myClasses.length === 0) {
                                setCreateFirstClass(true)
                                return
                            }

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
    }, [readMyClassesUrl, myClasses, router])

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
    }, [])

    const createButtonClicked = useCallback((myClass) => {
        setClassModalAction("Create")
        openClassModal()
    }, [openClassModal])

    const editButtonClicked = useCallback((myClass) => {
        setClassModalAction("Update")
        openClassModal()
        setId(myClass.id)
        setDescription(myClass.description)
    }, [closeClassModal])

    const deleteButtonClicked = useCallback((myClass) => {
        openConfirmModal()
        setId(myClass.id)
    }, [openConfirmModal])

    return {
        createFirstClass,
        confirmModalIsOpen,
        closeConfirmModal,
        classModalIsOpen,
        classModalAction,
        openClassModal,
        closeClassModal,
        myClasses,
        description,
        setDescription,
        createMyClass,
        updateMyClass,
        deleteMyClass,
        createButtonClicked,
        editButtonClicked,
        deleteButtonClicked,
        submitButtonDisabled
    }
}
