import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useEcommerceData } from "./components/hooks/useEcommerceData";
import QuantitySelector from "./components/QuantitySelector";
import { useAddToCart } from "./components/hooks/useAddToCart";
import "./index.css";
import Hero from "./components/hero/Hero";
import { useAuth } from "react-oidc-context";


function App() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [productsCart, setProductsCart] = useState([]);

  const { products } = useEcommerceData();

  const [cartItem, setCartItem] = useState(null);

  const auth = useAuth();


  const onClickAdd = async (cart, productsCart) => {

    if (!auth.isAuthenticated) {


      sessionStorage.setItem(
        "PENDING_ACTION",
        JSON.stringify({
          type: "ADD_TO_CART",
          cart,
          productsCart
        })
      )

      navigate("/login");
      return;
    }


    const valueCart = await useAddToCart(cart);

    navigate("/cart", {
      state: {
        productsCart,
        valueCart: valueCart.value,
      },
    });



  }

  useEffect(() => {
    if (!auth.isAuthenticated) return;

    const pending = sessionStorage.getItem("PENDING_ACTION");

    if (pending) {
      const { type, cart, productsCart } = JSON.parse(pending);

      sessionStorage.removeItem("PENDING_ACTION");

      if (type === "ADD_TO_CART") {
        onClickAdd(cart, productsCart);
      }
    }
  }, [auth.isAuthenticated]);

  if (!products) {
    return <div>Carregando...</div>;
  }


  const handleSetQuantity = (product, qtd) => {
    setCart(prevCart => {
      const exist = prevCart.find(item => item.sku === product.sku);

      if (exist) {
        return prevCart.map(item =>
          item.sku === product.sku ? { ...item, quantity: qtd } : item
        );
      } else {
        return [...prevCart, { sku: product.sku, quantity: qtd }];
      }
    });

    setProductsCart(prevProducts => {
      const exist = prevProducts.find(item => item.sku === product.sku);

      if (exist) {
        return prevProducts.map(item =>
          item.sku === product.sku ? { ...item, quantity: qtd } : item
        );
      } else {
        return [
          ...prevProducts,
          {
            productName: product.name,
            productImage: product.image_url,
            productDescription: product.description,
            quantity: qtd,
            sku: product.sku,
            price: product.unit_amount_product.value
          }
        ];
      }
    });


  };





  return (
    <>
      <Hero />
      <div className="products-container">
        {products.length === 0 ? (
          <div>Carregando produtos...</div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.sku} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <div className="product-info">
                  <p>
                    <strong>Preço:</strong> R$ {product.unit_amount_product.value}
                  </p>
                  <p>
                    <strong>SKU:</strong> {product.sku}
                  </p>
                </div>
                <QuantitySelector
                  quantity={cart.find(item => item.sku === product.sku)?.quantity || 0}
                  setQuantity={(newCartQuantity) => handleSetQuantity(product, newCartQuantity)}
                />
              </div>
            ))}
            <div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
              <button
                className="add-cart"
                onClick={() => onClickAdd(cart, productsCart)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );

}

export default App;
