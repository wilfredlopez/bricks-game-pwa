import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'
interface Props {

}

export const Menu = (props: Props) => {
    return (
        <header className="header-menu" >
            <div>
                <Link to="/" className="app-menu-title">FUN TOOLS</Link>
            </div>
            <div>
                <Link to="/bricks" className="menu-link">Bricks Game</Link>

            </div>
            <div>

                <Link to="/paint" className="menu-link">Paint</Link>
            </div>
        </header>
    )
}
