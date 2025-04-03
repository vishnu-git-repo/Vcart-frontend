import { useNavigate } from "react-router-dom"

export default function Auth(){
    const navigate = useNavigate()
    const checkUser = localStorage.getItem("user")
    if(checkUser === null){
        navigate("/auth?auth=login")
    }
    return(
        <>
        </>
    )
}