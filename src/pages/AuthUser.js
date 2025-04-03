import Login from "../components/Authentication/Login"
import Signin from "../components/Authentication/Signin"
import logo from "../utils/images/logo.svg"
import "../utils/css/AuthUser.css"
import { useLocation } from "react-router-dom"

export default function AuthUser(){
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const authValue = params.get("auth");
    
    return (
        <>
            <main className="container m-0 p-0">
                <div id="authpage" className="row">
                    <div id="login-logo" className="col-12 col-lg-6">       
                        <div className="login-logo-img">
                            <img src={logo} alt="" />
                        </div>
                        <div>
                            <h1>Welcome To</h1>
                            <h1 className="login-logo-text"><span>V</span>Cart</h1>
                        </div>       
                    </div>
                    
                    {
                        (authValue === "signin")? <Signin/> : <Login/>
                    }
                </div>
            </main>
        </>
    )
}