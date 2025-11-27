import React from "react";
import JsonBlock from "./JsonBlock";
import OperationBlock from "./OperationBlock";

export default function EventList({ events, tiempo }) {
  if (!events || !events.analytics) {
    return <p>No hay eventos para mostrar</p>;
  }

  const lista = events.analytics.evento || [];

  return (
    <div className="event-resultado">
        <h2>Eventos en Riak {tiempo && <span style={{ fontWeight: "normal" }}>({tiempo} ms)</span>}</h2>

        <ul className="lista-secciones">
            {lista.map((evento, index) => (
                <li key={index} className="seccion">
                    <span>{evento.key}</span>
                    <span>{evento.evento}</span>
                </li>
            ))}
        </ul>
        
        <div className="card">
            <div className="row">
                <OperationBlock operacion={events.analytics.operacion} />
            </div>
        </div>
    </div>
  );
}
