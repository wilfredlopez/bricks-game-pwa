import React from 'react'
import { Menu } from '../components/Menu'
import { useHistory } from 'react-router'
interface Props {

}

export const Home = (props: Props) => {
    const history = useHistory()
    return (
        <div>
            <Menu />
            <div className="container">

                <h1 className="text-center">PICK YOUR TOOL</h1>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-orange"
                        onClick={() => history.replace('/bricks')}
                    >Bricks Game</button>
                    <button className="btn btn-orange"
                        onClick={() => history.replace('/paint')}
                    >Painter</button>
                </div>
            </div>

        </div>
    )
}
