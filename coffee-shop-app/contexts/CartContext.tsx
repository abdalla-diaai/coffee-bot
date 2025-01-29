import { CartItems, CartContextType } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItems>({});
    
    const addToCart = (itemKey: string, quantity: number) => {
      if (quantity <= 0) {
        return;
      };
      setCartItems((prevItems) => {
        const existingQuantity = prevItems[itemKey] || 0;
        return {
          ...prevItems,
          [itemKey]: existingQuantity + quantity,
        };
      });
    };

    const setQuantity = (itemKey: string, delta: number) => {
        setCartItems((prevItems) => ({
          ...prevItems,
          [itemKey]:  Math.max((prevItems[itemKey] || 0) + delta, 0),
        }));
      };

    const clearCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, setQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using cart context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };