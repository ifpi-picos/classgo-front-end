import Body from "@/components/tags/Body"
import Students from "@/components/classes/class/Students"

export default function ParticipantsPage({params}) {
    return (
        <Body>
            <Students myClassDescription={params.class}/>
        </Body>
    )
}
