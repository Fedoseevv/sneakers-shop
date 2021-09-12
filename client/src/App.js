import React from 'react'
import './App.css';
import Background from './background_promo.png'
import AppHeader from './app-header';
// import MainPromo from './main-promo';
// import {ItemPage, PromoPage} from './pages'
// import SearchPanel from './search-panel'
// import SneakersItem from './sneakers-item';
// import {ItemsPage} from './pages'
// import BrandFilters from './brand-filters'
// import CustomPanel from './custom-panel'
// import {AboutUs} from './pages'
// import {CartPage} from './pages'
// import {Route, Switch} from 'react-router-dom';
// import WithSneakersService from './hoc';
// import registerPage from './pages/registerPage'

import {useRoutes} from './routes'
import {useAuth} from './hooks/auth-hook'
import {AuthContext} from './authContext/authContext'
import Spinner from './spinner';

const App = () => {
  const {token, login, logout, userId, role, ready} = useAuth()
  const isAuthenticated = !!token // Приводим к bool
  const routes = useRoutes(isAuthenticated, role)

  
  if (!ready) {
    return <Spinner/>
  }
  return (
    <AuthContext.Provider value ={{
      token, login, logout, userId, role, isAuthenticated
    }}>
      <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">

        <AppHeader isAuth={isAuthenticated} role={role}/>
        {routes}

      </div>
    </AuthContext.Provider>
  );
}

export default App;
