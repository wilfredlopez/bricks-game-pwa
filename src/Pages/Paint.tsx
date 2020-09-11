import React from 'react'
import { Menu } from '../components/Menu'
import { PaintComponent } from '../components/paint/PaintComponent'

interface Props {

}

export const Paint = (props: Props) => {
    return (
        <div>
            <Menu />
            <div className="container">
                <PaintComponent />

            </div>
        </div>
    )
}
