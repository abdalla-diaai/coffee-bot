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

export type CartItems = {
    [key: string]: number;
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

export interface DetailsHeaderProps {
    image_url: string;
    name: string;
    type: string;
    rating: string;
};

export interface DescriptionProps {
    description: string;
};

export interface ProductListProps {
    products: Product[];
    quantities: {[key: string]: number};
    setQuantities: (itemKey: string, quantity: number) => void;
    totalPrice: number;
};

export interface OrdersFooterProps {
    totalPrice: number;
};

// Message Interface
export interface MessageInterface {
    content: string;
    memory?: any;
    role: string;
};

export interface MessagesListProps {
    messages: MessageInterface[];
    isTyping: boolean;
};

export interface Message {
    message: MessageInterface;
};