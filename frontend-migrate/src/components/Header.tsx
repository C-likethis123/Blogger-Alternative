import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Paths, ServerPaths } from "../utils/paths";
import AuthContext from "../contexts/AuthContext";
/**
 * A UI component that shows important links to the user
 */

export default function Header() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    return (
        <div>
            <div>Blogger Alternative</div>
            <ul>
                <li>
                    <Link to={Paths.PostsList}>Posts</Link>
                </li>
                <li>{
                    isAuthenticated
                        ? <button onClick={logout}>Logout</button>
                        : <a href={ServerPaths.Login}>Login to Google</a>
                }</li>
            </ul>
        </div>
    )
}