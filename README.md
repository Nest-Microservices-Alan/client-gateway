# Orders Microservice


## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Levanta servidor nats `docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats`
5. Ejecutar con docker `docker compose up 0d`
6. Ejecutar migracion de prisma `npx prisma migrate dev`
7. Ejecutar `npm run start:dev`
