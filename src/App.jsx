import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useEcommerceData } from "./components/hooks/useEcommerceData";
import QuantitySelector from "./components/QuantitySelector";
import { useAddToCart } from "./components/hooks/useAddToCart";
import Cart from "./Cart";

function App() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [productsCart, setProductsCart] = useState([]);

  const { products } = useEcommerceData();

  const [cartItem, setCartItem] = useState(null);

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



  const onClickAdd = async (cart, productsCart) => {



    const valueCart = await useAddToCart(cart);

    console.log(valueCart.value)

    navigate("/cart", {
      state: {
        productsCart: productsCart,
        valueCart: valueCart.value,
      },
    });
  }

  return (
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
  );
}

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
