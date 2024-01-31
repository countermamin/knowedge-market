import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      const indexToRemove = prev.indexOf(productId);
  
      if (indexToRemove !== -1) {
        const updatedCart = [...prev.slice(0, indexToRemove), ...prev.slice(indexToRemove + 1)];
        ls?.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
  
      return prev;
    });
  }
  
  
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}