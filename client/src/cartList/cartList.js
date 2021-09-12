import '../pages/cartPage.css'
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../authContext/authContext'
import {useHttp} from '../hooks/http.hook'


export const CartList = ({ sneakers, total }) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [sneakersCart, setSneakersCart] = useState([...sneakers])


    const onDelete = async (id) => {
        const sneakerId = id
        const userId = auth.userId
        try {
            
            const data = await request(`/api/cart/remove/${sneakerId}`, 'DELETE', {userId: userId}, {
                Authorization: `Bearer ${auth.token}`
            }) 
            setSneakersCart(data)

        } catch(e) {}
    }

    return (
        <>
            <div className="content_wrap">
                {/* <div className="form_side">
                    <form class="decor">
                        <div class="form-left-decoration"></div>
                        <div class="form-right-decoration"></div>
                        <div class="circle"></div>
                        <div class="form-inner">
                        <h3>Place your order</h3>
                        <input type="text" placeholder="Full name"/>
                        <input type="email" placeholder="E-mail"/>
                        <input type="phone" placeholder="Phone number"/>
                        <textarea placeholder="Comment" rows="3"></textarea>
                        <input className="send_button"type="submit" value="Send"/>
                        </div>
                    </form>
                </div> */}

                <div className="shop_list_side">
                    {
                        sneakersCart.map(item => {
                            const {title, price, img, id, brand, count, size} = item;
                            return (
                                <div key={id} className="shop_item_wrap">
                                    <div className="img_wrap">
                                        <img className="shop_item_img" src={img} alt={brand}></img>
                                    </div>
                                    <div className="shop_item_descr">
                                        <div className="shop_item_title">{title} --- {size} size</div>
                                        {/* <div className="shop_item_size">Size: {size}</div> */}
                                        <div className="shop_item_price">₽ {price} &#215; {count}</div>
                                        <div value={id}
                                            onClick={() => {onDelete(id)}}
                                            className="delete_item"><i class="far fa-times-circle"></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="total_sum">Total: {total} ₽</div>

                </div>
            </div>

        </>
    )
}