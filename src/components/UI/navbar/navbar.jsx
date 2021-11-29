import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {

    const {isAuthorizated, setIsAuthorizated} = useContext(AuthContext)

    const logout = () => {
        setIsAuthorizated(false)
        localStorage.removeItem('auth')
    }


    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link className="navbar__link" to="/About">О сайте</Link>
                <Link className="navbar__link" to="/Posts">Посты</Link>
            </div>
        </div>
    )
}

export default Navbar