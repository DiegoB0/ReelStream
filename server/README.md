## ReelStream Backend

Este proyecto es un servidor backend para una plataforma de streaming similar a netflix para peliculas construido con Express.js y MongoDB.

### Tabla de Contenidos

- [Descripción](#descripción)
- [Herramientas Requeridas](#herramientas-requeridas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instrucciones de Configuración](#instrucciones-de-configuración)
- [Ejecutar el Servidor](#ejecutar-el-servidor)
- [Detener el Servidor](#detener-el-servidor)
- [Endpoints de la API](#endpoints-de-la-api)
- [Notas Adicionales](#notas-adicionales)

### Descripción

Esta aplicación backend está diseñada para gestionar los datos y la API de una plataforma de streaming. Incluye funciones para gestionar películas, como agregar y recuperar información de películas. El servidor está construido con Express.js y se conecta a una base de datos MongoDB. Toda la aplicación está Dockerizada para simplificar el proceso de desarrollo y despliegue.

### Herramientas Requeridas

Para ejecutar este proyecto, necesitarás las siguientes herramientas instaladas en tu máquina:

- [Node.js](https://nodejs.org/) (v18 o posterior)
- [Docker](https://www.docker.com/) (con Docker Compose)

### Estructura del Proyecto

```lua
server/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ └── Movie.js
│ ├── routes/
│ │ └── movieRoutes.js
│ ├── app.js
│ └── server.js
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── package.json
```

### Instrucciones de Configuración

1. **Clonar el repositorio:**
   Clonar el repositorio a tu maquina

   ```bash
   git clone https://github.com/DiegoB0/ReelStream.git
   cd ReelStream
   ```

   ```powershell
   git clone https://github.com/DiegoB0/ReelStream.git
   cd ReelStream
   ```

2. **Crear un archivo`.env`:**
   Copiar las variables del archivo env_example.txt al nuevo archivo llamado .env al inicio del proyecto

   ```bash
   cat env_example.txt > .env
   ```

   ```powershell
   Get-Content env_example.txt | ForEach-Object { $_ | Out-File -FilePath .env -Append -Encoding utf8 }
   ```

### Ejecutar el Servidor

Construir y ejecutar los contenedores de Docker:

```bash
docker-compose up --build -d
```

```powershell
docker-compose up --build -d
```

### Detener el Servidor

Para detener el servidor:

```bash
docker-compose down
```

```powershell
docker-compose down
```

### Endpoints de la API

### GET /api/movies

- **Descripción:** Recuperar una lista de todas las películas.
- **Ejemplo de uso:**

  ```bash
  curl http://localhost:5000/api/movies
  ```

  ```powershell
  curl http://localhost:5000/api/movies
  ```

### POST /api/movies

- **Descripción:** Agregar una nueva película.
- **Ejemplo de uso:**

  ```bash
  curl -X POST http://localhost:5000/api/movies \
  -H 'Content-Type: application/json' \
  -d '{"title":"Inception","description":"Un thriller que desafía la mente","genre":"Ciencia Ficción","year":2010}'
  ```

  ```powershell
  curl -X POST http://localhost:5000/api/movies `
  -H 'Content-Type: application/json' `
  -d '{"title":"Inception","description":"Un thriller que desafía la mente","genre":"Ciencia Ficción","year":2010}'
  ```

## Notas Adicionales

- Asegúrate de tener Docker instalado y en ejecución en tu máquina antes de ejecutar los comandos.
- Puedes verificar los logs de Docker en caso de problemas usando `docker-compose logs`.
