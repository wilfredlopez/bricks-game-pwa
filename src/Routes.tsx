import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Bricks } from './Pages/Bricks'
import { Home } from './Pages/Home'
import { Paint } from './Pages/Paint'
interface Props {

}

export const Routes = (props: Props) => {
    return (
        <BrowserRouter basename="/">
            <Switch>

                <Route path='/' component={Home} exact />
                <Route path='/bricks' component={Bricks} />
                <Route path='/paint' component={Paint} />

            </Switch>

        </BrowserRouter>
    )
}
