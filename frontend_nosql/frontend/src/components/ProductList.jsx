import ProductItem from "./ProductItem";
import React from "react";
import { useState } from "react";

export default function ProductList({ products }) {
  return (
    <div className="resultado">
      <h2>Lista de productos</h2>

      <ul className="lista-secciones">
        {products.map((p, index) => (
          <ProductItem key={index} p={p} index={index} />
        ))}
      </ul>
    </div>
  );
}
