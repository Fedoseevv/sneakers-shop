import React, {Component} from 'react';
import SneakersItem from '../sneakers-item'
import AppHeader from '../app-header'
import CustomPanel from '../custom-panel'
import {connect} from 'react-redux';
import WithSneakersService from '../hoc'
import {sneakersLoaded, sneakersRequested, sneakersError, addedToCart,filterSneakers} from '../actions'
import store from '../store'
import Spinner from '../spinner'


class ItemsPage extends Component {

    componentDidMount() {
        this.props.sneakersRequested();

        const {SneakersService} = this.props;
        SneakersService.getItems()
        .then(res => this.props.sneakersLoaded(res))
        .catch(error => this.props.sneakersError());
    }

    
    onUpdateSearch = (event) => {
        const {filterSneakers} = this.props;
        const term = event.target.value;
        console.log(term);
    }

    changeBrand = (event) => {
        const isChecked = event.target.checked;
        console.log(event.target.checked)
    }

    render() {
        const {sneakersItems, loading, addedToCart, filterSneakers, filteredSneakers} = this.props;

        if(loading) {
            return <Spinner/>
        }
        
        return (
            <>
            <div className="custom_panel__wrap">
                {/* <div className="filter_wrap">
                    <div className="brand_filter__item">
                        <input type="checkbox" 
                            class="custom-checkbox" 
                            id="brand_item" 
                            name="brand_item" value="yes"
                            onChange={this.changeBrand}/>
                        <label for="brand_item">Adidas</label>
                    </div>
                    
                </div> */}
                <form className="search_item"> 
                        <input 
                            type="text" 
                            name="text" 
                            className="search" 
                            placeholder="Search here!" 
                            onChange={(event) => {filterSneakers(event.target.value)}}
                            />
                        <input type="submit" name="submit" class="submit" value="Go"/>
                </form>
            </div>

                {/* <CustomPanel/> */}
                <div className="items-wrap">
                    {
                        filteredSneakers.map(item => {
                            return <SneakersItem 
                                key={item.id} 
                                item={item}
                                onAddtoCart={() => addedToCart(item.id)}/>
                        })
                    }
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sneakersItems: state.sneakers,
        // sneakersItems придет в виде пропса в ItemsPage
        loading: state.loading,
        error: state.error,
        items: state.items,
        filteredSneakers: state.filteredSneakers

    }
}
const mapDispatchToProps = {
    sneakersLoaded: sneakersLoaded,
    sneakersRequested,
    sneakersError,
    addedToCart,
    filterSneakers
};

export default WithSneakersService()( connect(mapStateToProps, mapDispatchToProps)(ItemsPage) );