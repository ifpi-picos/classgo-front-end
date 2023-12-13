import Body from "@/components/Body"
import Class from "@/components/Class"

export default function ClassPage({params}) {
    return (
       <Body>
            <Class params={params.class}/>
       </Body>
    )
}
