import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Paths, ServerPaths } from "../utils/paths";
import axios from "axios";
import AuthContext from "../AuthContext";
/**
 * A UI component that shows important links to the user
 */

export default function Header() {
    const isAuthenticated = useContext(AuthContext);
    const logout = () => {
        axios.post(ServerPaths.Logout, {withCredential: true});
    }
    return (
        <div>
            <div>Blogger Alternative</div>
            <ul>
                <li>
                    <Link to={Paths.PostsList}>Posts</Link>
                </li>
                <li>{
                    isAuthenticated
                        ? <a onClick={logout}>Logout</a>
                        : <a href={ServerPaths.Login}>Login to Google</a>
                }</li>
            </ul>
        </div>
    )
}