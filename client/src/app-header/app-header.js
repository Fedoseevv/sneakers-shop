import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { AuthContext } from '../authContext/authContext';
import './app-header.css'
import logo from './sneaker-logo.svg';



const AppHeader = (props) => {
    const auth = useContext(AuthContext)
    const {isAuth, role} = props; // Авторизован пользователь или нет
    const history = useHistory()
    const logoutHandler = (event) => {
      event.preventDefault();
      auth.logout()
      history.push('/')
    }

    let elem = ""
    if (isAuth && role === 'ADMIN') {
    
      elem = 
      <div className="header_container">
            <Link to={'/items'}>
              <img className="sneaker_logo" src={logo} alt="cart"></img>
            </Link>
            <div className="link_container">
              
              <Link to={'/items'} className="link_item">Products</Link>
              <Link to={'/about'} className="link_item">About Us</Link>
              <Link to={'/cart'} className="link_item">Cart</Link>
              <Link to={'/add'} className="link_item">Add sneakers</Link>
              <a className="link_item" href="/" onClick={logoutHandler}>Logout</a>
            </div>
      </div>

      
    } else if (isAuth && role === 'USER') {
      elem = 
      <div className="header_container">
            <Link to={'/items'}>
              <img className="sneaker_logo" src={logo} alt="cart"></img>
            </Link>
            <div className="link_container">
              
              <Link to={'/items'} className="link_item">Products</Link>
              <Link to={'/about'} className="link_item">About Us</Link>
              <Link to={'/cart'} className="link_item">Cart</Link>
              <a className="link_item" href="/" onClick={logoutHandler}>Logout</a>
            </div>
      </div>

    } 
    else {
      
      elem = 
      <div className="header_container">
            <Link to={'/'} className="link_item">Authorization</Link>     
      </div>
      
    }
    return (
      <>{elem}</>
    )

}

export default AppHeader;