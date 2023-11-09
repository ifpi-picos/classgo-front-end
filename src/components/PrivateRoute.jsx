import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PrivateRoute({children}) {
    const [redirecting, setRedirecting] = useState(true)
    
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        
        if (!token) {
            return router.push("/")
        }

        return setRedirecting(false)
        
    }, []);

    if (redirecting) {
        return null
    }
        
    return children
}
