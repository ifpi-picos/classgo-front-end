"use client"

import axios from "axios"
import { createContext, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const MyClassContext = createContext()

export default function MyClassProvider({myClassDescription, children}) {    
    const [classId, setClassId] = useState(0)
    const [classDescription, setClassDescription] = useState("")
    const [numberOfLessons, setNumberOfLessons] = useState(0)
    const [numberOfStudents, setNumberOfStudents] = useState(0)
    
    const router = useRouter()

    const readMyClassUrl = `https://classgo-back-end.vercel.app/classes/${myClassDescription}`

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
                            setClassDescription(res.data.description)
                            setNumberOfLessons(res.data.numberOfLessons)
                            setNumberOfStudents(res.data.numberOfStudents)
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

    useEffect(() => {
        readMyClass()
    }, [readMyClass])

    return (
        <MyClassContext.Provider value={{classId, classDescription, numberOfLessons, numberOfStudents}}>
            {children}
        </MyClassContext.Provider>
    )
}
