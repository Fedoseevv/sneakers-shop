import React from 'react'
import './App.css';
import Background from './background_promo.png'
import AppHeader from './app-header';

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
