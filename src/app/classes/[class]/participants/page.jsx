import Body from "@/components/tags/Body"
import Participants from "@/components/classes/class/Participants"

export default function ParticipantsPage({params}) {
    return (
        <Body>
            <Participants myClassDescription={params.class}/>
        </Body>
    )
}
