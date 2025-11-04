import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { callPaypal } from "./components/hooks/callPaypal";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(10);

  const { productsCart, valueCart } = location.state || {};

  const totalValue = parseFloat(
    String(valueCart)
      .replace(/[^\d,.-]/g, "")
      .replace(",", ".")
      .trim()
  );

  const handleSubmitOrder = async (productsCart) => {

    const productsCartv2 = (productsCart || []).map(product => ({
      sku: product.sku,
      quantity: product.quantity
    }));

    try {

      const urlPaypal = await callPaypal(productsCartv2);

      if (!urlPaypal || !urlPaypal.href) {
        console.error("URL do Paypal indefinida");
        return;
      }
      window.location.href = urlPaypal.href;
    } catch (error) {
      console.error("Erro ao fechar pedido:", error);
    }
  };


  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>🛒 Carrinho</h1>

      <div
        style={{
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
        }}
      >

        <div>
          <p style={{ fontSize: "18px" }}>
            <strong>Itens do carrinho:</strong>
          </p>

          {productsCart.map((item, index) => (
            <p key={index} style={{ marginLeft: "10px", fontSize: "16px" }}>
              {item.quantity} × {item.productName} — {Number(item.price.replace(',', '.')).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          ))}

          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            <strong>Frete:</strong> {shipping.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>

        <p style={{ fontSize: "18px" }}>
          <strong>Preço total dos produtos:</strong> R$ {valueCart}
        </p>


        <p style={{ fontSize: "18px" }}>
          <strong>Preço total com frete:</strong>{" "}
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
            .format((totalValue || 0) + shipping)}
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Continuar comprando
        </button>

        <button
          onClick={() => {
            handleSubmitOrder(productsCart);
          }}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fechar pedido
        </button>
      </div>
    </div >
  );

}

export default Cart;