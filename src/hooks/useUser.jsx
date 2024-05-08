import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function useUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const router = useRouter()

    const signUpUrl = `https://idcurso-back-end.vercel.app/users`
    const signInUrl = `https://idcurso-back-end.vercel.app/users/signin`

    const signUp = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return alert("Campo senha e confirmar senha distintos!")
        }

        setSubmitButtonDisabled(true)

        axios
            .post(signUpUrl, {name, email, password, confirmPassword})
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data)
                    setSubmitButtonDisabled(false)
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
            })
    }

    const signIn = (e) => {
        e.preventDefault()

        setSubmitButtonDisabled(true)

        axios
            .post(signInUrl, {email, password})
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data)
                    setSubmitButtonDisabled(false)
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
            })
    }

    return {
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        signUp,
        signIn,
        submitButtonDisabled
    }
}