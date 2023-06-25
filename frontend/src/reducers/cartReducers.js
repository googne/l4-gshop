import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currentItem = action.payload
      const existItem = state.cartItems.find(
        (x) => x.product === currentItem.product
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? currentItem : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currentItem],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    default:
      return state
  }
}
