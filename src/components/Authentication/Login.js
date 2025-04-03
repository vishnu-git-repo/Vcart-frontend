import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [status, setStatus] = useState({
        message: "",
        type: ""
    });
    const navigate = useNavigate();

    function validateForm() {
        if (!user.email || !user.password) {
            setStatus({
                message: "All fields are required",
                type: "error"
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

        if (!emailRegex.test(user.email)) {
            setStatus({
                message: "Invalid email format",
                type: "error"
            })
            return false;
        }

        if (!passwordRegex.test(user.password)) {
            setStatus({
                message: "Password must be at least 8 characters long and contain, at least, one uppercase letter, one lowercase letter, one number and one special character",
                type: "error"
            })
            return false;
        }
        setStatus({
            message: "Checking Credentials ...",
            type: "success" 
        })
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = process.env.REACT_APP_API_URI + "/login";
        if (validateForm()) {
            try {
                const res = await axios.post(url, user);
                if (res.data.status === true) {
                    setStatus({
                        message: "Redirecting to Home page ...",
                        type: "success"
                    });
                    setTimeout(() => {
                        localStorage.setItem("user", JSON.stringify(res.data.message));
                        localStorage.setItem("cart",JSON.stringify([]))
                        navigate("/");
                    }, 1000);
                } else {
                    setStatus({
                        message: res.data.message,
                        type: "error"
                    });
                }
            } catch (err) {
                setStatus({
                    message: err.response?.data || "An error occurred",
                    type: "error"
                });
            }
        }
    }

    function handleChange(e) {
        setStatus({
            message: "",
            type: ""
        });
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <div id="login" className="login col-12 col-lg-6">
                <div className="login-form bg-dark">
                    <h2>Welcome back!</h2>
                    <form onSubmit={handleSubmit} className="d-flex flex-column" id="login-form" autoComplete="off">
                        <label htmlFor="login-name">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="login-name" 
                            onChange={handleChange} 
                            value={user.email || ""}
                        />
                        <label htmlFor="login-password">Password</label>
                        <input 
                            type={passwordVisibility ? "text" : "password"}
                            name="password" 
                            id="login-password" 
                            onChange={handleChange} 
                            value={user.password || ""}
                        />
                        <p>
                            <input 
                                type="checkbox" 
                                name="showPassword" 
                                onChange={() => setPasswordVisibility(!passwordVisibility)}
                            />
                            <span>Show Password</span>
                        </p>
                        <button className="btn btn-primary">Login</button>
                        <Link className="nav-link" to="/auth?auth=signin">New User?</Link>
                    </form>
                    <p style={{color: status.type === "error" ? "red" : "green"}}>
                        {(status.message)? status.message : ""}
                    </p>
                </div>
            </div>
        </>
    );
}