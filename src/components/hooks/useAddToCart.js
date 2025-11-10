export async function useAddToCart(cart) {

    const cartDto = (cart || []).map(item => ({
        sku: item.sku,
        quantity: item.quantity,
    }));

    try {
        const response = await fetch("https://d2r5x5vu7be00b.cloudfront.net/cart/final-price", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartDto),
        });


        if (!response.ok) {
            throw new Error("Erro ao calcular o preço final");
        }
        const data = await response.json();
        console.log("Resposta do servidor:", data);
        return data;

    } catch (error) {
        console.error("Erro:", error);
    }


}