import SearchPanel from '../search-panel'
import BrandFilters from '../brand-filters'
import './custom-panel.css'

const CustomPanel = () => {
    return (
        <div className="custom_panel__wrap">
            <BrandFilters/>
            <SearchPanel/>
        </div>
    )
}
export default CustomPanel;