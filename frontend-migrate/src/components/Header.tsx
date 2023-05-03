import React from "react";
import { Link, NavLink } from "react-router-dom";
import Paths, { ServerPaths } from "../utils/paths";

export default function Header() {
    return (
        <div>
            <div>Blogger Alternative</div>
            <ul>
                <li>
                    <Link to={Paths.PostsList}>Posts</Link>      
                </li>
                <li><a href={ServerPaths.Login}>Login to Google</a></li>
            </ul>
        </div>

    )
}