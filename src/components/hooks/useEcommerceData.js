import { useEffect, useState } from "react";
import axios from "axios";

export function useEcommerceData() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get("http://ec2-35-175-186-217.compute-1.amazonaws.com:8080/allProducts");
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