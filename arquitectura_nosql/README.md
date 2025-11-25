
# Arquitectura completa NoSQL (sin JWT ni colas)

Incluye:
- API Gateway
- Catalog Service (MongoDB) con CRUD completo
- Recommendation Service (Redis)
- Analytics Service (Riak)
- Comunicación interna entre servicios

## Ejecutar:
```
docker-compose up -d --build
```

Gateway: http://localhost:8000  
