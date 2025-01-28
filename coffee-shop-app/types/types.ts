export interface Product {
    id: string;
    category: string;
    description: string;
    image_url: string;
    name: string;
    price: number;
    rating: number;
};

export interface ProductCategory {
    id: string;
    selected: boolean;
};

// Message Interface
export interface MessageInterface {
    role: string;
    content: string;
    memory?: any;
};

export type CartItems = {
    [key: string]: number,
}

export interface CartContextType {
    cartItems: CartItems;
    addToCart: (itemKey: string, quantity: number) => void;
    setQuantity: (itemKey: string, delta: number) => void;
    clearCart: () => void;
};

export interface HeaderProps {
    title: string;
    showHeaderRight: boolean;
    bgColor: string;
};
