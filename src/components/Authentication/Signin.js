import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
    const [user, setUser] = useState({
        email: "",
        password1: "",
        password2: ""
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [status, setStatus] = useState({
        message: "",
        type: ""
    });
    const navigate = useNavigate();

    function validateForm() {
        if (!user.email || !user.password1 || !user.password2) {
            setStatus({
                message: "All fields are required",
                type: "error"
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailRegex.test(user.email)) {
            setStatus({
                message: "Invalid email format",
                type: "error"
            });
            return false;
        }

        if (!passwordRegex.test(user.password1)) {
            setStatus({
                message: "Password must be at least 8 characters long and contain, at least, one uppercase letter, one lowercase letter, one number and one special character",
                type: "error"
            });
            return false;
        }

        if (user.password1 !== user.password2) {
            setStatus({
                message: "Passwords do not match",
                type: "error"
            });
            return false;
        }

        setStatus({
            message: "Creating account ...",
            type: "success"
        });
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = process.env.REACT_APP_API_URI + "/signin";
        if (validateForm()) {
            try {
                const res = await axios.post(url, { email: user.email, password: user.password1 });
                if (res.data.status === true) {
                    setStatus({
                        message: "Redirecting to login page ...",
                        type: "success"
                    });
                    setTimeout(() => {
                        navigate("/auth?auth=login");
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
            <div id="signin" className="login col-12 col-lg-6">
                <div className="login-form bg-dark">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit} className="d-flex flex-column" id="signin-form">
                        <label htmlFor="signin-email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="signin-email" 
                            onChange={handleChange}
                            value={user.email || ""}
                        />
                        <label htmlFor="signin-password1">Password</label>
                        <input 
                            type={passwordVisibility ? "text" : "password"}
                            name="password1" 
                            id="signin-password1" 
                            onChange={handleChange}
                            value={user.password1 || ""}
                        />
                        <label htmlFor="signin-password2">Confirm Password</label>
                        <input 
                            type={passwordVisibility ? "text" : "password"} 
                            name="password2" 
                            id="signin-password2" 
                            onChange={handleChange}
                            value={user.password2 || ""}
                        />
                        <p>
                            <input 
                                type="checkbox" 
                                name="showPassword" 
                                onChange={() => setPasswordVisibility(!passwordVisibility)}
                            />
                            <span>Show Password</span>
                        </p>
                        <button className="btn btn-primary">Register</button>
                        <Link to="/auth?auth=login" className="nav-link">Already have Account?</Link>
                        <p style={{color: status.type === "error" ? "red" : "green"}}>
                            {status.message || ""}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}