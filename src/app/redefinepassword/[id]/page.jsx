import Body from "@/components/tags/Body"
import RedefinePasswordForm from "@/components/user/RedefinePasswordForm"

export default function RedefinePasswordPage({params}) {
    return (
        <Body>
            <RedefinePasswordForm id={params.id}/>
        </Body>
    )
}
