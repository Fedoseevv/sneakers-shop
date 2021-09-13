import './cartPage.css'

const CartPage = ({items, deleteFromCart, sizeCart, totalPrice}) => {
    return (
        <>
            <div className="content_wrap">
                <div className="form_side">
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
                </div>

                <div className="shop_list_side">
                    {
                        items.map(item => {
                            const {title, price, url, id, brand, size} = item;
                            console.log(`cartTable: ${sizeCart}`)
                            return (
                                <div key={id} className="shop_item_wrap">
                                    <div className="img_wrap">
                                        <img className="shop_item_img" src={url} alt={brand}></img>
                                    </div>
                                    <div className="shop_item_descr">
                                        <div className="shop_item_title">{title}</div>
                                        <div className="shop_item_size">Size: <span>{size}</span></div>
                                        <div className="shop_item_price">₽ {price}</div>
                                        <div 
                                            onClick={() => deleteFromCart(id)}
                                            className="delete_item">&times;
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="total_sum">Total: {totalPrice} ₽</div>

                </div>
            </div>

        </>

    )
}

export default CartPage;