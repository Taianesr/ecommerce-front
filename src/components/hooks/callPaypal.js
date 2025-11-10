import { stringify } from "postcss";

export async function callPaypal(productsCartv2) {

  const response = await fetch("https://d2r5x5vu7be00b.cloudfront.net/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productsCartv2)
  });

  if (!response.ok) {
    throw new Error("Erro ao chamar Paypal");
  }

  const data = await response.json();
  console.log("Resposta do backend:", data);
  return data;
}