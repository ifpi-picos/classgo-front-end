import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function useMyClass() {
    const [createFirstClass, setCreateFirstClass] = useState(false)
    const [description, setDescription] = useState("")
    const [numberOfStudents, setNumberOfStudents] = useState(0)
    const [myClasses, setMyClasses] = useState([])
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const readMyClassesUrl = `https://idcurso-back-end.vercel.app/classes`
    const createMyclassesUrl = `https://idcurso-back-end.vercel.app/classes`

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

    useEffect(() => {
        readMyClasses()
    }, [readMyClasses])

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
                            readMyClasses()
                            window.location.reload(true)
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
    }, [createMyclassesUrl, description, readMyClasses, router])

    return {
        createFirstClass,
        myClasses,
        setDescription,
        createMyClass,
        submitButtonDisabled
    }
}
