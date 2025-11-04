import { stringify } from "postcss";

export async function placeOrder(order) {

    const response = await fetch("http://ec2-35-175-186-217.compute-1.amazonaws.com:8080/order", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON; stringify(pedido),

    })
    if (!response.ok) {
        throw new Error("Erro ao fechar o pedido");
    }

    return await response.json();


}