import React, { useEffect, useState, useContext } from 'react'
import './registerPage.css'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message-hook'
import { AuthContext } from '../authContext/authContext'

const RegisterPage = () => {
    const auth = useContext(AuthContext) // Здесь есть все данные из провайдера
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/user/registration', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        } catch(e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/user/login', 'POST', {...form})
            // console.log(data)
            auth.login(data.token, data.userId, data.role)
            console.log('Data', data)
        } catch(e) {}
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Sneaker Shop</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                        <div>

                        <div className="input-field">
                            <input 
                                placeholder="Enter email" 
                                id="email" 
                                type="email"
                                className="yellow-input"
                                name="email"
                                value={form.email}
                                onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input 
                                placeholder="Enter password" 
                                id="password" 
                                type="password"
                                className="yellow-input"
                                name="password"
                                value={form.password}
                                onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            onClick={loginHandler} 
                            className="btn yellow darken-4 " 
                            style={{marginRight: 10}}
                            disabled={loading}>Войти</button>
                        <button 
                            onClick={registerHandler} 
                            className="btn grey lighten-1 black-text"
                            disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {RegisterPage}