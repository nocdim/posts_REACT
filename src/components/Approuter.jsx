import React, { useContext } from "react";
import '../styles/App.css'
import About from "../pages/About";
import Error from "../pages/Error"
import Posts from "../pages/Posts.jsx"
import { Route, Routes, Navigate} from 'react-router-dom'
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import { AuthContext } from "../context/index.js";
import Loader from "./UI/Loader/Loader";



const AppRouter = () => {
    const {isAuthorizated, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader />
    }

    if (isAuthorizated){
        return (
            <Routes>
                <Route path="/about" element={<About />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/posts/:id" element={<PostIdPage />} />
                <Route path="/error" element={<Error />} />
                <Route exact path="/" element={<Navigate to="/posts" />} />
                <Route exact path="/login" element={<Navigate to="/posts" />} />
                <Route path="*" element={<Navigate to="/error" />} />
            </Routes>
        )
    }
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )
}

export default AppRouter