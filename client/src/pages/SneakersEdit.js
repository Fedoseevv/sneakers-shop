import React, {useCallback, useState, useContext, useEffect} from 'react'
import {Redirect, Link, useHistory, useParams} from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'
// import { SneakerCard } from '../sneakerCard/sneakerCard'
import Spinner from '../spinner'

export const SneakersEdit = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [sneaker, setSneaker] = useState(null)
    const sneakerId = useParams().id // ключ берем из роутов, мы сами его так назвали
    
    const getSneaker = useCallback(async () => {
        try {
            const fetched = await request(`/api/sneakers/${sneakerId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setSneaker(fetched)
        } catch(e) {}   

    }, [token, sneakerId, request])

    useEffect(() => {
        getSneaker()
    }, [getSneaker])

    if (loading) {
        return <Spinner/>
    }


    return (
        <>
            { !loading && sneaker && <EditCart sneaker={sneaker} /> }
        </>
        )
}

const EditCart = ({ sneaker }) => {
    const {title, price, img, sizes, descr} = sneaker;
    const auth = useContext(AuthContext)
    const history = useHistory()
    const historyRem = useHistory()

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const sneakerId = useParams().id // ключ берем из роутов, мы сами его так назвали


    const [form, setForm] = useState({
        id: sneaker._id,
        title: sneaker.title,
        price: sneaker.price,
        img: sneaker.img,
        sizes: sneaker.sizes,
        descr: sneaker.descr
    })

    console.log(form)
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        
    }

    const EditHandler = async event => {
        try {
            const data = await request(`/api/sneakers/edit`, 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            }) // тут нам вернулся уже готовый json объект с сервера с нашей парой кроссовок
            history.push('/items')

        } catch(e) {}
    }
    const DeleteHandler = async event => {
        try {
            const data = await request(`/api/sneakers/remove`, 'POST', {id: form.id}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.replace('/items')
           
        }
        catch(e) {}
    }

    useEffect(() => {
        window.M.updateTextFields()
    })

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
                        onChange={changeHandler} />
                    <label style={{color:"yellow"}} htmlFor="title">Title</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter price" 
                        id="price" 
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={changeHandler} />
                    <label style={{color:"yellow"}} htmlFor="price">Price</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter url image" 
                        id="img" 
                        type="text"
                        name="img"
                        value={form.img}
                        onChange={changeHandler} />
                    <label style={{color:"yellow"}} htmlFor="img">Image url</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter available sizes" 
                        id="sizes" 
                        type="text"
                        name="sizes"
                        value={form.sizes}
                        onChange={changeHandler} />
                    <label style={{color:"yellow"}} htmlFor="sizes">Sizes</label>
                </div>

                <div className="input-field">
                    <input 
                        placeholder="Enter description" 
                        id="descr" 
                        type="text"
                        name="descr"
                        value={form.descr}
                        onChange={changeHandler} />
                    <label style={{color:"yellow"}} htmlFor="descr">Description</label>
                </div>



                <div className="card-action">

                        <button 
                            style={{marginRight: "1rem"}}
                            className="btn blue lighten-1 black-text"
                            onClick={EditHandler} >Edit Sneakers
                        </button>

                        <button 
                            className="btn red"
                            onClick={DeleteHandler} >Delete Sneakers
                        </button>

                </div>
            </div>
        </div>
    )
}