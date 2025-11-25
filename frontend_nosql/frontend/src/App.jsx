import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [estado, setEstado] = useState(null);

  const [nuevo, setNuevo] = useState({});
  const [editar, setEditar] = useState({});

  // Obtener todos los productos
  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos`);
      const data = await res.json();
      setProducts(data);
      setEstado(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener un producto por ID
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`);
      const data = await res.json();

      if (!data) {
        setEstado("Producto no encontrado");
        setProduct(null);
      } else {
        setProduct(data);
        setEstado(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Crear un producto
  const crearProducto = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      const data = await res.json();
      setEstado("Producto creado");
      setNuevo({});
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar un producto
  const actualizarProducto = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editar),
      });

      const data = await res.json();
      setEstado("Producto actualizado");
      setEditar({});
      fetchProduct();
    } catch (error) {
      console.error(error);
    }
  };

  // Borrar un producto por ID
  const deleteProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      setEstado(data.msg);
      setProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Borrar todos los productos del catálogo
  const deleteProducts = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos`, {
        method: "DELETE",
      });

      const data = await res.json();
      setEstado(data.msg);
      setProducts([]);
      setProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="containerPrincipal">
      <h1>NoSQL Microservices Frontend</h1>

      {/* LISTAR Y BORRAR TODO */}
      <div className="row">
        <button className="btn" onClick={fetchProducts}>
          LISTA DE PRODUCTOS
        </button>

        <button className="btn delete" onClick={deleteProducts}>
          ELIMINAR TODO
        </button>
      </div>

      {products.length > 0 && (
        <div className="resultado">
          <h2>Lista de productos</h2>

          <ul className="lista-secciones">
            {products.map((p, index) => (
              <li key={index} className="seccion">

                <h3>🛒 Producto {index + 1}</h3>

                {/* CATALOG */}
                {p.catalog && (
                  <div className="bloque">
                    <h4>📦 Catalog</h4>
                    <pre className="json">{JSON.stringify(p.catalog.producto, null, 2)}</pre>

                    <div className="operacion">
                      <span>{p.catalog.operacion}</span>
                      <button className="copiar"
                        onClick={() => navigator.clipboard.writeText(p.catalog.operacion)}
                      >📄</button>
                    </div>
                  </div>
                )}

                {/* RECOMMENDATION */}
                {p.recommendation && (
                  <div className="bloque">
                    <h4>⭐ Recommendation</h4>
                    <pre className="json">{JSON.stringify(p.recommendation, null, 2)}</pre>

                    <div className="operacion">
                      <span>{p.recommendation.operacion}</span>
                      <button className="copiar"
                        onClick={() => navigator.clipboard.writeText(p.recommendation.operacion)}
                      >📄</button>
                    </div>
                  </div>
                )}

                {/* ANALYTICS */}
                {p.analytics && (
                  <div className="bloque">
                    <h4>📊 Analytics</h4>
                    <pre className="json">
                      {JSON.stringify(p.analytics.evento, null, 2)}
                    </pre>

                    <div className="operacion">
                      <span>{p.analytics.operacion}</span>
                      <button className="copiar"
                        onClick={() => navigator.clipboard.writeText(p.analytics.operacion)}
                      >📄</button>
                    </div>
                  </div>
                )}

                {/* PRODUCTO FINAL */}
                {p.producto && (
                  <div className="bloque">
                    <h4>🛒 Producto (resultado final)</h4>
                    <pre className="json">{JSON.stringify(p.producto, null, 2)}</pre>
                  </div>
                )}

              </li>
            ))}
          </ul>
        </div>
      )}


      <div className="divider"></div>

      {/* BUSCAR POR ID */}
      <div className="row">
        <input
          className="input"
          placeholder="ID producto"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn" onClick={fetchProduct}>
          Buscar
        </button>
      </div>

      {product && (
        <div className="resultado">
          <h2>Resultado</h2>
          <ul className="lista-secciones">

            {/* ----- CATALOGO ----- */}
            {product.catalog && (
              <li className="seccion">
                <h3>📦 Catalog</h3>

                <pre className="json">
                  {JSON.stringify(product.catalog.producto, null, 2)}
                </pre>

                <div className="operacion">
                  <span>{product.catalog.operacion}</span>
                  <button
                    className="copiar"
                    onClick={() => navigator.clipboard.writeText(product.catalog.operacion)}
                  >
                    📄 Copiar
                  </button>
                </div>
              </li>
            )}

            {/* ----- RECOMMENDATION ----- */}
            {product.recommendation && (
              <li className="seccion">
                <h3>⭐ Recommendation</h3>

                <pre className="json">
                  {JSON.stringify(product.recommendation, null, 2)}
                </pre>

                <div className="operacion">
                  <span>{product.recommendation.operacion}</span>
                  <button
                    className="copiar"
                    onClick={() =>
                      navigator.clipboard.writeText(product.recommendation.operacion)
                    }
                  >
                    📄 Copiar
                  </button>
                </div>
              </li>
            )}

            {/* ----- ANALYTICS ----- */}
            {product.analytics && (
              <li className="seccion">
                <h3>📊 Analytics</h3>

                <pre className="json">
                  {JSON.stringify(product.analytics.evento, null, 2)}
                </pre>

                <div className="operacion">
                  <span>{product.analytics.operacion}</span>
                  <button
                    className="copiar"
                    onClick={() =>
                      navigator.clipboard.writeText(product.analytics.operacion)
                    }
                  >
                    📄 Copiar
                  </button>
                </div>
              </li>
            )}

            {/* ----- PRODUCTO FINAL ----- */}
            {product.producto && (
              <li className="seccion">
                <h3>🛒 Producto Final</h3>

                <pre className="json">
                  {JSON.stringify(product.producto, null, 2)}
                </pre>

                <div className="operacion">
                  <span>(No hay operación aquí, este es el resultado final)</span>
                </div>
              </li>
            )}

          </ul>

          <button className="btn delete" onClick={deleteProduct}>
            ELIMINAR
          </button>
        </div>
      )}


      <div className="divider"></div>

      {/* CREAR PRODUCTO */}
      <div className="card">
        <h3>Crear producto</h3>

        <textarea
          className="input"
          placeholder='{"_id":"p1","nombre":"Camiseta","precio":19.99}'
          value={JSON.stringify(nuevo, null, 2)}
          onChange={(e) => {
            try {
              setNuevo(JSON.parse(e.target.value));
            } catch {}
          }}
        />

        <button className="btn" onClick={crearProducto}>
          CREAR
        </button>
      </div>

      <div className="divider"></div>

      {/* ACTUALIZAR PRODUCTO */}
      <div className="card">
        <h3>Actualizar producto</h3>

        <input
          className="input"
          placeholder="ID a actualizar"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <textarea
          className="input"
          placeholder='{"precio": 99.99}'
          value={JSON.stringify(editar, null, 2)}
          onChange={(e) => {
            try {
              setEditar(JSON.parse(e.target.value));
            } catch {}
          }}
        />

        <button className="btn" onClick={actualizarProducto}>
          ACTUALIZAR
        </button>
      </div>

      {estado && <p className="estado">{estado}</p>}
    </div>
  );
}
