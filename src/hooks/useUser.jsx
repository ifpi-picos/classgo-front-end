import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function useUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [editUser, setEditUser] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const signUpUrl = `https://idcurso-back-end.vercel.app/users`
    const signInUrl = `https://idcurso-back-end.vercel.app/users/signin`
    const readUserUrl = `https://idcurso-back-end.vercel.app/users`
    const forgotPasswordUrl = `https://idcurso-back-end.vercel.app/users/forgotpassword`
    const redefinePasswordUrl = `https://idcurso-back-end.vercel.app/users/redefinepassword`
    const updateUserUrl = `https://idcurso-back-end.vercel.app/users`

    const verifyToken = useCallback(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            return router.replace("/")
        }

        return token
    }, [router])

    const signUp = useCallback(async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return alert("Campo senha e confirmar senha distintos!")
        }

        setSubmitButtonDisabled(true)

        await axios
                    .post(signUpUrl, {name, email, password, confirmPassword})
                    .then((res) => {
                        if (res.status === 201) {
                            alert(res.data)
                            router.push("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [router, signUpUrl, name, email, password, confirmPassword])

    const signIn = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(signInUrl, {email, password})
                    .then((res) => {
                        if (res.status === 200) {
                            localStorage.setItem("token", res.data)
                            router.replace("/myclasses")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [router, signInUrl, email, password])

    const readUser = useCallback(async () => {
        await axios
                    .get(readUserUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setName(res.data.name)
                            setEmail(res.data.email)
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
    },  [readUserUrl, router])

    const forgotPassword = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .post(forgotPasswordUrl, {email})
                    .then((res) => {
                        if (res.status === 200) {
                            alert("Pedido de solicitação enviado para seu email!")
                            localStorage.setItem("token", res.data)
                            setSubmitButtonDisabled(false)
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [forgotPasswordUrl, email])

    const redefinePassword = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(redefinePasswordUrl, {password, confirmPassword}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
                            localStorage.clear()
                            router.replace("/")
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
    }, [router, redefinePasswordUrl, password, confirmPassword])

    const updateUser = useCallback(async (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        await axios
                    .put(updateUserUrl, {name, email}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
                            setSubmitButtonDisabled(false)
                            setEditUser(false)
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            return router.replace("/")
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            setSubmitButtonDisabled(false)
                        }
        
                        else if (res.status === 401) {
                            localStorage.clear()
                            return router.replace("/")
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateUserUrl, name, email, router])

    const editButtonClicked = useCallback(() => {
        setEditUser(true)
    }, [])

    const cancelButtonClicked = useCallback(async () => {
        await readUser()
        setEditUser(false)
    }, [readUser])

    useEffect(() => {
        readUser()
    }, [readUser, verifyToken])

    return {
        name,
        email,
        submitButtonDisabled,
        editUser,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        verifyToken,
        signUp,
        signIn,
        forgotPassword,
        redefinePassword,
        updateUser,
        editButtonClicked,
        cancelButtonClicked
    }
}
