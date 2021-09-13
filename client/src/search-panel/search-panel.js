import React, {Component} from 'react'

import './search-panel.css'

class SearchPanel extends Component{

    render () {
        return (
            <>

                <form className="search_item"> 
                    <input 
                        type="text" 
                        name="text" 
                        className="search" 
                        placeholder="Search here!" 
                         />
                    <input type="submit" name="submit" class="submit" value="Go"/>
                </form>
            </>
        );
    }
}

export default SearchPanel;