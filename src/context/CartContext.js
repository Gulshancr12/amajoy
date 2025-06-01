import React, { createContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.product.id
      );
      if (existingItemIndex > -1) {
        const updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload.product, quantity: action.payload.quantity }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.productId),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const localData = localStorage.getItem('amaJoyCart');
    return localData ? JSON.parse(localData) : initial;
  });

  useEffect(() => {
    localStorage.setItem('amaJoyCart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
    toast.success(`${product.title.substring(0, 25)}... added to cart!`, {
      position: "top-right", autoClose: 2000, theme: "light",
    });
  };

  const removeFromCart = (productId) => {
    const itemToRemove = state.cartItems.find(item => item.id === productId);
    const productName = itemToRemove ? itemToRemove.title : "Item";
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
    toast.info(`${productName.substring(0, 25)}... removed from cart.`, { autoClose: 2000 });
  };

  const updateQuantity = (productId, quantity) => {
    const itemToUpdate = state.cartItems.find(item => item.id === productId);
    const productName = itemToUpdate ? itemToUpdate.title : "Item";
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
    toast.info(`Quantity updated for ${productName.substring(0, 25)}...`, { autoClose: 2000 });
  };
  
  const clearCart = () => {
    if (state.cartItems.length > 0) {
        dispatch({ type: CLEAR_CART });
        toast.warn("Cart has been cleared!", { autoClose: 2000 });
    } else {
        toast.info("Cart is already empty.", { autoClose: 2000 });
    }
  };

  const cartItemCount = state.cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartSubtotal = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems, addToCart, removeFromCart, updateQuantity,
        clearCart, cartItemCount, cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier consumption (optional, can be defined here or imported)
export const useCart = () => React.useContext(CartContext);