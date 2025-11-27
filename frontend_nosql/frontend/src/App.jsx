import React, { useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import EventList from "./components/EventList";
import FiltrosRecomendacion from "./components/FiltrosRecomendacion";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";

export default function App() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState({});
  const [eventos, setEvents] = useState({});
  const [filtros, setFiltros] = useState(false);
  const [estado, setEstado] = useState(null);
  const [menu, setMenu] = useState(1);
  const [tiempo, setTiempo] = useState(null);

  const [nuevo, setNuevo] = useState({});
  const [editar, setEditar] = useState({});

  // Obtener todos los productos
  const fetchProducts = async () => {
    try {
      const inicio = performance.now();
      const res = await fetch(`http://localhost:8000/productos`);
      const data = await res.json();
      const fin = performance.now();
      setTiempo((fin - inicio).toFixed(2)); // ms
      setEvents({});
      setProducts(data);
      setEstado(null);
      setFiltros(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener un producto por ID
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`);
      
      if (!res.ok) {   // 404, 500, etc.
        setEstado("Producto no encontrado");
        setProduct(null);
        return;
      }

      const data = await res.json();
      console.log(data);
      setProduct(data);
      setEstado(null);
    } catch (error) {
      console.error(error);
      setProduct(null);
    }
  };

  // Crear producto
  const crearProducto = async (obj) => {
    try {
      const res = await fetch(`http://localhost:8000/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      await res.json();
      setEstado("Producto creado");
      fetchProducts();

    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar producto
  const actualizarProducto = async (obj) => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      await res.json();
      setEstado("Producto actualizado");
      fetchProduct();

    } catch (error) {
      console.error(error);
    }
  };

  // Borrar uno
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

  // Borrar todos
  const deleteProducts = async () => {
    try {
      const res = await fetch(`http://localhost:8000/productos`, {
        method: "DELETE",
      });

      const data = await res.json();
      setEstado(data.msg);
      setProducts({});
      setProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener todos los eventos
  const fetchEventos = async () => {
    try {
      const inicio = performance.now();
      const res = await fetch(`http://localhost:8000/eventos`);
      const data = await res.json();
      const fin = performance.now();
      setTiempo((fin - inicio).toFixed(2)); // ms
      setEvents(data);
      setProducts({});
      setFiltros(false);
      setProduct(null);
      setEstado(null);
      
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrar por vistas
  const seccionFiltros = () => {
    try {
      setEvents({});
      setProducts({});
      setFiltros(true);
      setProduct(null);
      setEstado(null);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="containerPrincipal">
      <h1>NoSQL (MongoDB/Redis/Riak)</h1>

      <div className="menu">
        <button className={`btn ${menu === 1 ? "activo" : ""}`} onClick={() => setMenu(1)}>Lista de Productos</button>
        <button className={`btn ${menu === 2 ? "activo" : ""}`} onClick={() => setMenu(2)}>Buscar por ID</button>
        <button className={`btn ${menu === 3 ? "activo" : ""}`} onClick={() => setMenu(3)}>Crear Producto</button>
        <button className={`btn ${menu === 4 ? "activo" : ""}`} onClick={() => setMenu(4)}>Actualizar Producto</button>
      </div>

      <div className="divider"></div>

      {menu == 1 && (
        <>
          <h2>Lista completa</h2>
          <div className="row">
            <button className="btn" onClick={fetchProducts}>Cargar lista</button>
            <button className="btn evento" onClick={fetchEventos}>Cargar Eventos</button>
            <button className="btn filtro" onClick={seccionFiltros}>Abrir Filtros</button>
            <button className="btn delete" onClick={deleteProducts}>Eliminar Todo</button>
          </div>

          {Object.keys(products).length > 0 && (
            <ProductList products={products} tiempo={tiempo} />
          )}

          {Object.keys(eventos).length > 0 && (
            <EventList events={eventos} tiempo={tiempo} />
          )}

          {filtros && (
            <FiltrosRecomendacion/>
          )}
        </>
      )}

      {menu == 2 && (
        <>
          <h2>Buscar producto por ID</h2>

          <div className="row">
            <input className="input" placeholder="ID producto" value={id} onChange={(e) => setId(e.target.value)} minLength="1" required/>
            <button className="btn" onClick={fetchProduct}>Buscar</button>
          </div>

          {product && (
            <ProductDetail product={product} deleteProduct={deleteProduct} />
          )}
        </>
      )}

      {menu == 3 && (
        <>
          <h2>Crear nuevo producto</h2>
          <CreateProduct nuevo={nuevo} setNuevo={setNuevo} crearProducto={crearProducto} />
        </>
      )}

      {menu == 4 && (
        <>
          <h2>Actualizar producto</h2>
          <UpdateProduct id={id} setId={setId} editar={editar} setEditar={setEditar} actualizarProducto={actualizarProducto} />
        </>
      )}

    </div>
  );

}
