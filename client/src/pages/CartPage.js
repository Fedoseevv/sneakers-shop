import './cartPage.css'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../authContext/authContext'
import { useHttp } from '../hooks/http.hook'
import Spinner from '../spinner'
import { Link } from 'react-router-dom'


const CartPage = () => {
    const [sneakers, setSneakers] = useState([])
    const [total, setTotal] = useState(0)
    const {loading, request} = useHttp()
    const {token, userId} = useContext(AuthContext)

    const fetchSneakers = useCallback(async () => {
        try {
            const fetched = await request('/api/cart', 'POST', {id: userId}, {
                Authorization: `Bearer ${token}`
            })
            console.log(`fetched: ${fetched.totalPrice}`)
            setSneakers(fetched.sneakers)
            setTotal(fetched.totalPrice)
        } catch(e) {}

    }, [token, request])

    useEffect(() => {
        fetchSneakers()
    }, [fetchSneakers])

    const onDelete = async (id) => {
        const sneakerId = id
        try {
            
            const data = await request(`/api/cart/remove/${sneakerId}`, 'DELETE', {userId: userId}, {
                Authorization: `Bearer ${token}`
            }) 
            setSneakers(data.sneakers)
            setTotal(data.price)

        } catch(e) {}
    }


    if (loading) {
        return <Spinner/>
    } else {
        console.log(sneakers)
    }


    return (
        <>
            <div className="content_wrap">

                <div className="shop_list_side">
                    {
                        sneakers.map(item => {
                            const {title, price, img, id, brand, count, size} = item;
                            return (
                                <div key={id} className="shop_item_wrap">
                                    <div className="img_wrap">
                                        <img className="shop_item_img" src={img} alt={brand}></img>
                                    </div>
                                    <div className="shop_item_descr">
                                        <Link to={`/sneakers/${id}`}>
                                        <div className="shop_item_title">{title} --- {size} size</div>
                                        </Link>
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
export default CartPage