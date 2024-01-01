import Body from "@/components/tags/Body"
import Diary from "@/components/classes/class/Diary"

export default function DiaryPage({params}) {
    return (
       <Body>
            <Diary myClassDescription={params.class}/>
       </Body>
    )
}
