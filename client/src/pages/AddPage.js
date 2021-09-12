import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import {useHttp} from '../hooks/http.hook'
import './AddPage.css'

export const AddPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [form, setForm] = useState({
        title: '',
        price: '',
        img: '',
        sizes: '',
        descr: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        
    }

    const registerHandler = async event => {
        try {
            
            const data = await request('/api/sneakers/add', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            }) // тут нам вернулся уже готовый json объект с сервера с нашей парой кроссовок
            console.log(`id from registerHandler: ${data.sneaker._id}`)
            console.log(data) // 
            history.push(`/sneakers/${data.sneaker._id}`)
        } catch(e) {}
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder="Enter title" 
                        id="title" 
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={changeHandler}/>
                    <label style={{color: 'yellow'}} htmlFor="title">Title</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter price" 
                        id="price" 
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={changeHandler}/>
                    <label style={{color: 'yellow'}} htmlFor="price">Price</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter url image" 
                        id="img" 
                        type="text"
                        name="img"
                        value={form.img}
                        onChange={changeHandler}/>
                    <label style={{color: 'yellow'}} htmlFor="img">Image</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter available sizes" 
                        id="sizes" 
                        type="text"
                        name="sizes"
                        value={form.sizes}
                        onChange={changeHandler}/>
                    <label style={{color: 'yellow'}} htmlFor="sizes">Sizes</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter description" 
                        id="descr" 
                        type="text"
                        name="descr"
                        value={form.descr}
                        onChange={changeHandler}/>
                    <label style={{color: 'yellow'}} htmlFor="descr">Description</label>
                </div>



                <div className="card-action">
                    <button 
                        onClick={registerHandler} 
                        className="btn grey lighten-1 black-text"

                        >Add Sneakers</button>
                </div>
            </div>
        </div>
    )
}