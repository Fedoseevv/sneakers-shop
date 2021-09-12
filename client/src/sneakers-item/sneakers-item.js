import './sneakers-item.css';
import test_sneakers from './test_sneakers.jpg'
import {Link} from 'react-router-dom';

const SneakersItem = ({item, onAddtoCart}) => {
    const {title, price, img, brand} = item;
    return ( 
        <div className="sneakers-item">
            <div className="product-inner">
                <div className="product-wrap">
                    <img className="item_img" src={img} alt={brand}/>
                    <div className="actions">
                        <Link to={`/sneakers/${item._id}`}>
                            <button style={{color: 'grey'}} className="add-to-cart"></button>
                        </Link>
                        <Link to={`/sneakers/${item._id}`}>
                            <button style={{color: 'grey'}} className="quickview"></button>
                        </Link>
                        <Link to={`/edit/${item._id}`}>
                            <button className="wishlist" style={{color: 'grey'}}><i className="far fa-edit"></i></button>
                        </Link>
                    </div>
                </div>
                <div className="product-info">
                    <Link to={`/sneakers/${item._id}`}>
                        <h3 className="product-title"><div>{title}</div></h3>
                    </Link>
                    <Link to={`/sneakers/${item._id}`}>
                        <span className="price">₽ {price}</span>
                    </Link>
                </div>
            </div>
        </div>    
    )
}
export default SneakersItem;
