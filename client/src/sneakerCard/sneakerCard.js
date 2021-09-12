import React, { useContext, useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import './sneakerCard.css'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'

export const SneakerCard = ({sneaker}) => {
    const {title, price, img, descr, sizes, _id} = sneaker
    const auth = useContext(AuthContext)
    const token = {auth}
    const {request} = useHttp()
    const historyCart = useHistory()

    const [size, setSize] = useState(null)

    const userId = auth.userId
    const sneakerId = _id
    const addToCart = async () => {
        try {
            const data = await request('/api/cart/add', 'POST', {sneakerId, userId, size}, {
                Authorization: `Bearer ${auth.token}`
            }) 
            console.log(data)
            // historyCart.push('/cart')
        } catch(e) {}
    }


    return (
        <>
            <div className="content_wrap">
                <div className="img_side">
                    <img className="cart_photo" src={img} alt='brand'></img>
                </div>
                <div className="descr_side">
                        <div className="item_title">{title}</div>

                    <div className="item_price">{price} ₽</div>
                    <div className="descr_text">
                        {descr}
                    </div>
                    {/* <div className="item_in_stoke__wrap">
                        <i class="fas fa-check-square icon_stock"></i>
                        <div className="item_in_stoke__text">in stock</div>
                    </div> */}

                    <div className="item_size__wrap">
                        {
                            sizes.map(size => {
                                return (
                                    <div className="radio" key={size}>
                                        <input className="custom-radio" 
                                               type="radio" 
                                               key={size}
                                               id={`size-${size}`} 
                                            
                                               name="size"
                                               onChange={(event) => {setSize(event.target.value)}}
                                               value={size}/>
                                        <label htmlFor={`size-${size}`} >{size}</label>
                                    </div>
                                    
                                )
                            })
                        }
                        
                    </div>
                    <button type="submit" className="add_to__cart">
                        <div 
                            className="add_to_cart_text"
                            onClick={addToCart} >Add to shopping cart</div>
                    </button>
                </div>
            </div>
        
        </> 
    )
}