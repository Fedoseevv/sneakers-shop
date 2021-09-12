import './main-promo.css'
import SneakersPromo from './sneakers_promo.png'
import Shining from './shining_promo.png'
import React from 'react';
import {Link} from 'react-router-dom'


const MainPromo = () => {
    return (
              <div className="main_promo">
                    <div className="shining_container">
                        <img className="shining_promo" src={Shining} alt="cart"></img>
                          <span className="first_word">Big</span>
                          <span className="second_word">Sale</span>
                          <Link to={'/items'} className="shop_now">
                            <span className="shop_now__text">
                              Shop now
                            </span>
                          </Link>
                    </div>  
                    <Link to={'/items'} className="rect_style">
                      <span className="rect_text">
                        Over <br/>
                        250 <br/>
                        styles <br/>
                        available <br/>
                      </span>
                    </Link>
                    
                    <img className="sneakers_promo" src={SneakersPromo} alt="cart"></img>
              </div>

    )
}

export default MainPromo;