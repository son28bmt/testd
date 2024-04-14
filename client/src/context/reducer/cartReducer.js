export const cartReducer = (state, action) => {

    switch (action.type) {
        case "SET_COUNT_CART":
            return {
                countCart: action.payload.countCart,
            };

        default:
            return state;
    }
};
