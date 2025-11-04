import { stringify } from "postcss";

export async function callPaypal(productsCartv2) {

  const response = await fetch("http://ec2-35-175-186-217.compute-1.amazonaws.com:8080/order", {
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