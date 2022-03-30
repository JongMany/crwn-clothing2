import { createContext, useEffect, useState } from "react";

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
}

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearItem(cartItems, cartItemToClear));
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem, i) => {
      return total + cartItem.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(()=>{
    const newTotalPrice = cartItems.reduce((totalPrice, cartItems) => {
      return totalPrice + (cartItems.price * cartItems.quantity);
    },0);
    
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
