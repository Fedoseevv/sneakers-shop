const sneakersLoaded = (newSneakers) => {
    return {
        type: 'SNEAKERS_LOADED',
        payload: newSneakers
    }
}
const sneakersRequested = () => {
    return {
        type: 'SNEAKERS_REQUESTED'
    }
}
const sneakersError = () => {
    return {
        type: 'SNEAKERS_ERROR'
    }
}

const addedToCart = (id, setSize) => {
    console.log(`from action: ${setSize}`)
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}
const filterSneakers = (term) => {
    console.log(term);
    return {
        type: 'FILTER_SNEAKERS',
        payload: term // term - это данные из строки поиска
    }
}

const setSize = (size) => {
    console.log(`from action: ${size}`)
    return {
        type: 'SET_SIZE',
        payload: size
    }
}

// const getSize = () => {
//     return {
//         type: 'GET_SIZE',
//     }
// }

export {
    sneakersLoaded,
    sneakersRequested,
    sneakersError,
    addedToCart,
    deleteFromCart,
    filterSneakers,
    setSize
};