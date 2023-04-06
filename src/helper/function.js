const shorten = (name) => {
    const splitedName = name.split(' ');
    const newName = `${splitedName[0]} ${splitedName[1]}`
    return newName
}

const isInCart = (state, id) => {
    const result = !!state.selectedItems.find((item) => item._id === id)
    return result
}

const quantityCount = (state, id) => {
    const index = state.selectedItems.findIndex((item) => item._id === id)
    if (index === -1) {
        return false
    } else {
        return state.selectedItems[index].quantity
    }
}

export {shorten, isInCart, quantityCount}