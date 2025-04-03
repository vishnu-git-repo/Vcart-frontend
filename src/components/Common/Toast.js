import { useEffect, useState } from "react"
import "../../utils/css/main.css"
import close from "../../utils/images/icons/close.svg"
export default function Toast(props){
    const [showToast,setShowToast] = useState()
    useEffect(()=>{
        setShowToast(true);
    },[])
    function closeToast(){
        setShowToast(!showToast)
    }
    return(
        <>
            {   
            
            <div className="toast" style={{display:(showToast)?"flex":"none",backgroundColor:"green"}}>
                <p>{props.message}</p>
                <img src={close} onClick={closeToast} />
            </div>

            }
        </>
    )
}