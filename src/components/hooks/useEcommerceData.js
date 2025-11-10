import { useEffect, useState } from "react";
import axios from "axios";

export function useEcommerceData() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("https://d2r5x5vu7be00b.cloudfront.net/allProducts");
                const products = await Promise.all(
                    response.data.map(async (product) => {
                        const imageResponse = await axios.get(product.image_url, { responseType: "blob" });
                        const imageObjectUrl = URL.createObjectURL(imageResponse.data);
                        return { ...product, imageSrc: imageObjectUrl };
                    })
                );
                setProducts(products);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }
        fetchProducts();
    }, []);
    return { products };
}