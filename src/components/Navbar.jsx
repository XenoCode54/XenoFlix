import React, {useEffect, useState} from 'react';
import "./Navbar.css";

function Navbar(props) {
    const [show, setShow] = useState();
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false)
            }
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, [])

    return (
        <div className={`navbar ${show && "navbar-black"}`}>
            <img className="navbar-logo" src="./logo.png" alt="Xenoflix logo"/>
            <img className="navbar-avatar" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                 alt="Avatar"/>
        </div>
    )
        ;
}

export default Navbar;
