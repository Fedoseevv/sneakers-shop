import React, { useContext } from 'react'
import {AuthContext} from './authContext/authContext'
import {ItemPage, PromoPage} from './pages'
import {AboutUs} from './pages'
import {CartPage} from './pages'
import {ItemsPage} from './pages'
import {RegisterPage} from './pages/registerPage'
import {AddPage} from './pages/AddPage'
import {SneakersItem} from './pages/sneakersItem'
import {SneakersEdit} from './pages/SneakersEdit'

import { Switch, Route, Redirect } from 'react-router-dom'
import { SneakersPage } from './pages/SneakersPage'


export const  useRoutes = (isAuthenticated, role) => {
    const auth = useContext(AuthContext);
    
    if (isAuthenticated) {
        console.log(`role from routes: ${role}`)
        if (role === 'ADMIN') {
            return (
                <Switch>

                    <Route path="/items" exact>
                        <SneakersPage/>
                    </Route>

                    <Route path="/about">
                        <AboutUs/>
                    </Route>
    
                    <Route path="/add">
                        <AddPage/>
                    </Route>

                    <Route path="/edit/:id">
                        <SneakersEdit />
                    </Route>
                    
                    <Route path="/cart">
                        <CartPage/>
                    </Route>

                    <Route path="/sneakers/:id">
                        <SneakersItem />
                    </Route>

                    <Redirect to="/items"/>

                </Switch>
            )
        }
        return (
            <Switch>
                <Route path="/items" exact>
                    <SneakersPage/>
                </Route>
                <Route path="/about">
                    <AboutUs/>
                </Route>
                <Route path="/cart">
                    <CartPage/>
                </Route>
                <Route path="/sneakers/:id">
                    <SneakersItem />
                </Route>
                <Redirect to="/items"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

    
}
