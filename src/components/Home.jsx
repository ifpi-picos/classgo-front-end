"use client"

import DivTitle from "./DivTitle"
import Header from "./Header"
import Main from "./Main"
import PrivateRoute from "./PrivateRoute"
import Section from "./Section"
import SideBar from "./SideBar"
import Title from "./Title"

export default function Home() {
    const classesUrl = "https://reverse-time-back-end.vercel.app/classes"

    return (
        <PrivateRoute url={classesUrl}>
            <SideBar/>

            <Main>
                <Header>
                    <DivTitle>
                        <Title>
                            Minhas Turmas
                        </Title>
                    </DivTitle>
                </Header>

                <Section>
                    <span>Section</span>
                </Section>
            </Main>
        </PrivateRoute>
    )
}
