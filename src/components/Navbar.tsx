import { NavLink } from "react-router-dom"

import Button from "./Button"
import '../css/Navbar.css'
export default function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <NavLink to='/' end >TraitLock</NavLink>
            </div>
            <div className="navbar-links">
                <NavLink className="nav-links" to="/">Home</NavLink>
                <NavLink className="nav-links" to="/personalities">Personalities</NavLink>
                <NavLink className="nav-links" to="/about">About</NavLink>
            </div>
            <NavLink to="/questions">
                <Button text="Take Test" className="btn get-started-btn" />
            </NavLink>
        </div>
    )
}