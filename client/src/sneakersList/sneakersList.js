import React, {useState} from 'react'
// import {Link} from 'react-router-dom'
import SneakersItem from '../sneakers-item/'
import '../pages/itemsPage.css'


export const SneakersList = ({ sneakers }) => {
    
    const [value, setValue] = useState('')
    const [filter, setFilter] = useState('')


    const filteredSneakers = sneakers.filter(sneaker => {
        return (sneaker.title.toLowerCase().includes(value.toLocaleLowerCase()) && sneaker.title.toLowerCase().includes(filter.toLocaleLowerCase()))
    })
    

    return (
        <>
        
            <div className="custom_panel__wrap">
                <div className="filter_wrap">
                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="All" name="All" 
                            value=""
                            key={1}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="All">All Sneakers</label>
                    </div>
                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="Adidas" name="All" 
                            value="Adidas"
                            key={2}
                            onChange={(event) => {setFilter(event.target.value)}}/>                        
                        <label htmlFor="Adidas">Adidas</label>
                    </div>

                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="Nike" name="All" 
                            value="Nike"
                            key={3}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="Nike">Nike</label>
                    </div>

                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="New_Balance" name="All" 
                            value="New Balance"
                            key={4}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="New_Balance">New Balance</label>
                    </div>

                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="Reebok" name="All" 
                            value="Reebok"
                            key={5}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="Reebok">Reebok</label>
                    </div>

                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="Vans" name="All" 
                            value="Vans"
                            key={6}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="Vans">Vans</label>
                    </div>

                    <div className="radio">
                        <input 
                            className="custom-radio" 
                            type="radio" id="Puma" name="All" 
                            value="Puma"
                            key={7}
                            onChange={(event) => {setFilter(event.target.value)}}/>
                        <label htmlFor="Puma">Puma</label>
                    </div>

                </div>


                <form className="search_item"> 
                        <input 
                            type="text" 
                            name="text" 
                            className="search" 
                            placeholder="Search here!" 
                            onChange={e => setValue(e.target.value)}
                            />
                        {/* <input type="submit" name="submit" class="submit" value="Go"/> */}
                </form>
            </div>

                <div className="items-wrap">
                    {
                        filteredSneakers.map(item => {
                            return <SneakersItem 
                                key={item._id} 
                                item={item}
                                />
                        })
                    }
                </div>
            </>
    )
}

