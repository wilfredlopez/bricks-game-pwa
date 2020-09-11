import React from 'react'
import GameComponent from '../components/GameComponent'
import { Menu } from '../components/Menu'

interface Props {

}

export const Bricks = (props: Props) => {
    return (
        <div>
            <Menu />
            <div className='game-container'>
                <GameComponent />
            </div>
            <div className="footer-info">
                <p>By Wilfred Lopez</p>
                <a href="https://github.com/wilfredlopez/">Github @WilfredLopez</a>
            </div>
        </div>
    )
}
