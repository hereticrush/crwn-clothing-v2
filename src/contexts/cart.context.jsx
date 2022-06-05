import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // if cartItems is empty, return a new array with the product
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
        // if the item is already in the cart, increase the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        { ...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}
// remove the item from the cart
const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // if the item is already in the cart, decrease the quantity
    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        ); 
    }
    // if the quantity is 1, remove the item from the cart
   else if (existingCartItem.quantity === 1) {
       return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
   }
}
// clear the cart completely in checkout page
const clearCartItem = (cartItems, cartItemtoClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemtoClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => { // update cartCount
        const newCartCount = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => { // update cartTotal
        const newCartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemtoRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemtoRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}