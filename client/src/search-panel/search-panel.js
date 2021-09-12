import React, {Component} from 'react'

import './search-panel.css'

class SearchPanel extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         term: ''
    //     }

    // }
    // onUpdateSearch(event) {
    //     const term = event.target.value;
    //     this.setState({term:term});
    //     this.props.onUpdateSearch(term);
    // }

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