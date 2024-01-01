import Body from "@/components/tags/Body"
import Progress from "@/components/classes/class/Progress"

export default function ProgressPage({params}) {
    return (
        <Body>
            <Progress myClassDescription={params.class}/>
        </Body>
    )
}
