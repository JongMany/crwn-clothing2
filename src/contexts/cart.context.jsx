/* import { createContext, useEffect, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  isCartOpen: true,
  setIsCartOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  totalPrice: 0,
});

const clearItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  //check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity <= 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === cartItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  //return new array with modified cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// cart Reducer
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN : 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const { SET_CART_ITEMS, SET_IS_CART_OPEN } = CART_ACTION_TYPES;
  switch (type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  //   const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  const [{ isCartOpen, cartItems, cartCount, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  //업데이트된 cart를 기반으로 payload를 만들어서 action객체를 dispatch하는 함수
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem, i) => {
      return total + cartItem.quantity;
    }, 0);
    const newTotalPrice = newCartItems.reduce((totalPrice, cartItems) => {
      return totalPrice + cartItems.price * cartItems.quantity;
    }, 0);
  
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      totalPrice: newTotalPrice,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload ));
  };

  //cart 업데이트 후 action dispatch하는 함수 호출!
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  //   useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem, i) => {
  //     return total + cartItem.quantity;
  //   }, 0);

  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(()=>{
  //   const newTotalPrice = cartItems.reduce((totalPrice, cartItems) => {
  //     return totalPrice + (cartItems.price * cartItems.quantity);
  //   },0);
    
  //   setTotalPrice(newTotalPrice);
  // }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
 */