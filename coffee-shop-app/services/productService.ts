import { fireBaseDB } from "@/config/firebaseConfig";
import { ref, get } from "firebase/database";
import { Product } from "@/types/types";

const productsRef = ref(fireBaseDB, 'products');

const fetchProducts = async (): Promise<Product[]> => {
    
    const snapshot = await get(productsRef);

    const data = snapshot.val();
    console.log(`data: ${JSON.stringify(data)}`);
    const products: Product[] = [];
    const productNames = new Set<string>();

    if (data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const product = { ...data[key] };
                if (!productNames.has(product.name)) {
                    products.push(product);
                    productNames.add(product.name);
                }
              };
        };
    };
    return products;
};

export { fetchProducts };