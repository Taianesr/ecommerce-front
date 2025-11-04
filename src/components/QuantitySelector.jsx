import React, { useState } from "react";

function QuantitySelector({ quantity, setQuantity }) {

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
      <button onClick={decrease}>-</button>
      <span>{quantity}</span>
      <button onClick={increase}>+</button>
    </div>
  );
}

export default QuantitySelector;
