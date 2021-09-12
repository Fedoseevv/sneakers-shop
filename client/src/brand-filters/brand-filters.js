import './brand-filters.css'

const BrandFilters = () => {
    return (
        <div className="filter_wrap">
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="brand_item" name="brand_item" value="yes"/>
                <label for="brand_item">Adidas</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="Nike" name="Nike" value="yes"/>
                <label for="Nike">Nike</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="New_Balance" name="New_Balance" value="yes"/>
                <label for="New_Balance">New Balance</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="Puma" name="Puma" value="yes"/>
                <label for="Puma">Puma</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="Reebok" name="Reebok" value="yes"/>
                <label for="Reebok">Reebok</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="The_North_Face" name="The_North_Face" value="yes"/>
                <label for="The_North_Face">The North Face</label>
            </div>
            <div className="brand_filter__item">
                <input type="checkbox" class="custom-checkbox" id="Filla" name="Filla" value="yes"/>
                <label for="Filla">Filla</label>
            </div>

        </div>
    )
}
export default BrandFilters;