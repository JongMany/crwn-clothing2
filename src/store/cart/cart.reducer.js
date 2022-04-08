import { CART_ACTION_TYPES } from "./cart.type";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;
  const { SET_IS_CART_OPEN, SET_CART_ITEMS } = CART_ACTION_TYPES;

  switch (type) {
    case SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
    };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};
