import JsonBlock from "./JsonBlock";
import OperationBlock from "./OperationBlock";
import React from "react";
import { useState } from "react";

export default function ProductDetail({ product, deleteProduct }) {
  return (
    <div className="resultado">
      <h2>Resultado</h2>
      <ul className="lista-secciones">

        {product.catalog && (
          <li className="seccion">
            <JsonBlock title="📦 Catalog" data={product.catalog.producto} />
            <OperationBlock operacion={product.catalog.operacion} />
          </li>
        )}

        {product.recommendation && (
          <li className="seccion">
            <JsonBlock title="⭐ Recommendation" data={product.recommendation} />
            <OperationBlock operacion={product.recommendation.operacion} />
          </li>
        )}

        {product.analytics && (
          <li className="seccion">
            <JsonBlock title="📊 Analytics" data={product.analytics.evento} />
            <OperationBlock operacion={product.analytics.operacion} />
          </li>
        )}

        {product.producto && (
          <li className="seccion">
            <JsonBlock title="🛒 Producto Final" data={product.producto} />
            <div className="operacion">(No hay operación aquí)</div>
          </li>
        )}
      </ul>

      <button className="btn delete" onClick={deleteProduct}>ELIMINAR</button>
    </div>
  );
}
