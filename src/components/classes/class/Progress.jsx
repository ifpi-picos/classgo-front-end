"use client"

import axios from "axios"
import Header from "@/components/tags/Header"
import { HiChartBar, HiClipboardList, HiUsers } from "react-icons/hi"
import Link from "next/link"
import Main from "@/components/tags/Main"
import PrivateRoute from "@/components/user/PrivateRoute"
import Section from "@/components/tags/Section"
import SideBar from "@/components/tags/SideBar"
import { useEffect, useState } from "react"

export default function Progress({myClassDescription}) {
    const classDescription = myClassDescription.split("%20").join(" ")

    const [classId, setClassId] = useState(0)
    const [totalNumberOfLessons, setTotalNumberOfLessons] = useState(0)

    const [progress, setProgress] = useState([])
    const [progressTailwindcssDynamicClass, setProgressTailwindcssDynamicClass] = useState([])

    const [students, setStudents] = useState([])
    const [orderedStudents, setOrderedStudents] = useState([])

    const readMyClassUrl = `https://idcurso-back-end.vercel.app/classes/findOne/${classDescription}`

    const readStudentsUrl = `https://idcurso-back-end.vercel.app/students/findAll/${classId}`

    const readMyClass = () => {
        axios
            .get(readMyClassUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    setClassId(res.data.id)
                    setTotalNumberOfLessons(res.data.totalNumberOfLessons)
                    return
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    useEffect(() => {
        readMyClass()
    }, [])

    const readStudents = () => {
        axios
            .get(readStudentsUrl, {headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length < 1) {
                        return
                    }

                    return setStudents(res.data)
                }

                else if (res.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    return router.replace("/")
                }
            })
    }

    useEffect(() => {
        readStudents()
    }, [classId])

    const orderingStudents = () => {
        const studentsName = []
        
        students.map((student) => studentsName.push(student.name))
        
        const orderedStudentsName = studentsName.sort()

        const orderedStudents = []

        orderedStudentsName.map((name) => (
            students.map((student) => (
                name === student.name ? orderedStudents.push({id: student.id, name: student.name, numberOfPresencies: student.numberOfPresencies}) : null
            ))
        ))

        setOrderedStudents(orderedStudents)
    }

    useEffect(() => {
        orderingStudents()
    }, [students])

    useEffect(() => {
        createProgress()
    }, [orderedStudents])

    const createProgress = () => {
        const progress = []
        const progressTailwindcssDynamicClass = []
        

        orderedStudents.map((student) => (
            progress.push({studentName: student.name, presencePercentage: parseInt((student.numberOfPresencies / totalNumberOfLessons) * 100)})
        ))

        setProgress(progress)

        progress.map((student) => (progressTailwindcssDynamicClass.push(`w-[${(student.presencePercentage).toString()}%]`)))

        setProgressTailwindcssDynamicClass(progressTailwindcssDynamicClass)
    }

    const navbar = (
        <nav className="flex justify-evenly items-center w-11/12 h-16 text-base text-gray-950">
            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/diary`}>
                <HiClipboardList className="mr-2 mb-1" size="24"/> <span>Diário</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/progress`}>
                <HiChartBar className="mr-2 mb-1" size="24"/> <span>Progresso</span>
            </Link>

            <Link className="flex justify-center items-center w-1/5 py-4 hover:border-2 rounded-xl" href={`/classes/${myClassDescription}/students`}>
                <HiUsers className="mr-2 mb-1" size="24"/> <span>Alunos</span>
            </Link>
        </nav>
    )
    
    const progressList = progress.map((progress, index) => (
        <div key={progress.studentName} className="w-5/6 mb-4">
            <div>
                <span>
                    {progress.studentName}
                </span>
            </div>

            <div className="flex items-center w-full mt-2 mb-4">
                <div className="flex items-center w-5/6 h-8 mr-6 border-2 border-gray-300 shadow-md rounded-xl">
                    {progress.presencePercentage < 70 ? (
                        <div className={`${progressTailwindcssDynamicClass[index]} h-full bg-red-500 rounded-s-xl`}></div>
                    ): (
                        <div className={`${progressTailwindcssDynamicClass[index]} h-full bg-green-500 ${progress.presencePercentage === 100 ? "rounded-xl" : "rounded-s-xl"}`}></div>
                    )}
                </div>

                <div>
                    <span>
                        {progress.presencePercentage}%
                    </span>
                </div>
            </div>
        </div>
    ))

    return (
        <PrivateRoute url={readMyClassUrl}>
            <SideBar/>

            <Main>
                <Header>
                    {navbar}
                </Header>

                <Section>
                    <div className="flex flex-grow flex-col items-center w-5/6">
                        <div className="flex flex-col items-center w-5/6 my-24 border-2 border-gray-300 shadow-md rounded-xl">
                            <div className="flex justify-center items-center w-5/6 mt-12 mb-16">
                                <span>Progresso da Turma</span>
                            </div>

                            {students.length < 1 ? (
                                null
                            ) : (
                               progressList
                            )}
                        </div>
                    </div>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
