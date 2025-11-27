import React, { useState } from "react";
import JsonBlock from "./JsonBlock";
import OperationBlock from "./OperationBlock";

export default function FiltrosRecomendacion() {
  const [minVistas, setMinVistas] = useState("");
  const [maxVistas, setMaxVistas] = useState("");
  const [top, setTop] = useState("");
  const [resultados, setResultados] = useState(null);
  const [tiempo, setTiempo] = useState(null);

    const fetchTop = async () => {
        if (!top) return;

        const inicio = performance.now();

        const res = await fetch(`http://localhost:8000/top/${top}`);
        const data = await res.json();

        const fin = performance.now();
        setTiempo((fin - inicio).toFixed(2)); // ms

        setResultados(data);
    };

    const fetchVistas = async () => {
        if (minVistas === "" || maxVistas === "") return;

        const inicio = performance.now();

        const res = await fetch( `http://localhost:8000/filtrar?min=${minVistas}&max=${maxVistas}` );
        const data = await res.json();

        const fin = performance.now();
        setTiempo((fin - inicio).toFixed(2));

        setResultados(data);
    };

  return (
    <div className="filtros-container">
      <h3>Filtros de Recomendación</h3>

      <div className="row">
        <input
          className="input"
          placeholder="Top N"
          value={top}
          onChange={(e) => setTop(e.target.value)}
          type="number"
        />
        <button className="btn filtro" onClick={fetchTop}>
          TOP N PRODUCTOS
        </button>
      </div>

      <div className="row">
        <input
          className="input"
          placeholder="Mínimo de vistas"
          value={minVistas}
          onChange={(e) => setMinVistas(e.target.value)}
          type="number"
        />
        <input
          className="input"
          placeholder="Máximo de vistas"
          value={maxVistas}
          onChange={(e) => setMaxVistas(e.target.value)}
          type="number"
        />
        <button className="btn filtro" onClick={fetchVistas}>
          Filtrar por vistas
        </button>
      </div>

      {resultados && resultados.recommendation && (
        <div className="event-resultado">
            <h4> Resultados{" "} {tiempo && <span style={{ fontWeight: "normal" }}>({tiempo} ms)</span>} </h4>

            <ul className="lista-secciones">
            {resultados.recommendation.detalle.resultado?.map((prod, i) => (
                <li key={i} className="seccion">
                    <span>Producto id: {prod[0]}</span>
                    <span>Vistas = {prod[1]}</span>
                </li>
            ))}
          </ul>

          <div className="card">
            <div className="row">
              <OperationBlock operacion={resultados.recommendation.operacion} />
            </div>
            <div className="row">
              <OperationBlock operacion={resultados.analytics.operacion} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
