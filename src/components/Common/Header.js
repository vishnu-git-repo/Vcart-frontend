    import "../../utils/css/main.css"
    import logo from "../../utils/images/logo.svg"
    import profile from "../../utils/images/icons/user.svg"
    import { Link } from "react-router-dom"
    import { useState } from "react"
    export default function Header(props){

        const [profileDropdown,setProfileDropdown] = useState(false)
        function handleProfileDropdown(e){
            e.stopPropagation()
            setProfileDropdown(!profileDropdown)
            document.addEventListener("click",()=>{
                setProfileDropdown(false)
            })
        }
        function logOut(){
            localStorage.clear();
        }

        return(
            <>
                <header className="container">
                    <div id="header" className="row">
                        <div id="logo" className="col-lg-6">
                            <div id="logo-pic">
                                <img src={logo} alt="logo-pic" />
                            </div>
                            <div id="logo-text">
                                <h1><span id="logo-text-first">V</span>Cart</h1>
                            </div>
                        </div>
                        <nav id="navbar" className="col-lg-5 navbar">
                            <ul className="nav">
                                <li className="nav-items">
                                    <Link to="/" className={`nav-link ${props.component === "Home"?"nav-checked" : ""}`}>Home</Link>
                                </li>
                                <li className="nav-items">
                                    <Link to="/cart" className={`nav-link ${props.component === "Cart"?"nav-checked" : ""}`}>Cart</Link>
                                </li>
                                <li className="nav-items">
                                    <Link to="/orders" className={`nav-link ${props.component === "Orders"?"nav-checked" : ""}`}>Orders</Link>
                                </li>
                                <li className="nav-items">
                                    <Link to="/about" className={`nav-link ${props.component === "About"?"nav-checked" : ""}`}>About</Link>
                                </li>
                            </ul>
                        </nav>

                        <div id="profile" className="col-lg-1">
                            <div id="profile-pic" onClick={handleProfileDropdown}>
                                <img src={profile} alt="profile"/>
                            </div>
                            <div id="profile-dropdown" style={{display: profileDropdown?"block":"none"}}>
                                <b>Product</b>
                                <Link className="profile-dropdown-item" to="/product/create">Create</Link>
                                <del>
                                <Link className="profile-dropdown-item" to="">Update</Link>
                                </del>
                                <hr/>
                                <b>User</b>
                                <del>
                                <Link className="profile-dropdown-item" to="">Create</Link>
                                <Link className="profile-dropdown-item" to="">Update</Link>
                                </del>

                                <hr/>
                                <del>
                                <Link className="profile-dropdown-item" to="">Details</Link>
                                <Link className="profile-dropdown-item" to="">Change Password</Link>
                                </del>
                                <Link className="profile-dropdown-item" to="/" onClick={logOut}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </header>
                <script src="../utils/main.js"></script> 
            </>
        )
    }
