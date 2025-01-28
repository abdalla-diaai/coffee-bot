import { CartItems, CartContextType } from "@/types/types";
import { createContext, useContext } from "react";
import { useState } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children} : {children: React.ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItems>({});
    const addToCart = (itemKey: string, quantity: number) => {
        setCartItems((prevCartItems) => {
            const newCartItems = {...prevCartItems};
            newCartItems[itemKey] = (newCartItems[itemKey] || 0) + quantity;
            return newCartItems;
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