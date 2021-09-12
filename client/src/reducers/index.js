const initialState = {
    sneakers: [],
    loading: true,
    error: false,
    items: [],
    filter: '',
    filteredSneakers: [],
    sizeCart: 0,
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SNEAKERS_LOADED':
            return {
                ...state,
                sneakers: action.payload,
                filteredSneakers: action.payload,
                loading: false
            };
        case 'SNEAKERS_REQUESTED':
            return {
                ...state,
                sneakers: state.sneakers,
                loading: true
            };
        case 'SNEAKERS_ERROR':
            return {
                ...state,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.sneakers.find(item => item.id === id)
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                sizes: item.sizes,
                id: item.id,
                brand: item.brand,
                size: state.sizeCart
                
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            }
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const price = state.items[itemIndex]['price'];

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price

            };
        case 'FILTER_SNEAKERS':
            const term = action.payload; // Получаем то что мы ввели в строку поиска

            const newSneakers = state.sneakers.filter((item) => {
                return item.title.indexOf(term) > -1;
            })
            console.log(newSneakers);
            if (term.length === 0) {
                return {
                    ...state,
                    filteredSneakers: state.sneakers
                }
            }
            return {
                ...state,
                filteredSneakers: [...newSneakers]
            };
        case 'SET_SIZE':
            const temp = action.payload;
            return {
                ...state,
                sizeCart: temp
                
            };
            
        default:
            return state;
    }
}

export default reducer;