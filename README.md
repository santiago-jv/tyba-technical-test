# Prueba Técnica - Tyba

Este proyecto está desarrollado con NestJS y utiliza PostgreSQL como base de datos. La arquitectura del proyecto sigue el patrón Hexagonal y se han implementado algunos patrones de diseño como el Factory.

## Requisitos

- Node.js & npm
- Docker
- Un archivo `.env` con las mismas propiedades que el archivo `.env.example`.

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_GEOCODE_API_KEY`

Estas API keys deben estar presentes en tu archivo `.env`. El valor de los secrets mencionados se encuentran adjuntos en un archivo txt en el siguiente Drive [Enlace](https://drive.google.com/file/d/1phHddFj0RIhHzdO4ZjZbl0eYtvixUABL/view?usp=sharing).

## Documentación de Endpoints

La documentación de los endpoints está disponible en Swagger. Puedes acceder a ella en la ruta `/docs` una vez que la aplicación esté en ejecución.
http://localhost:3000/docs

## Levantar la Aplicación con Docker

Para levantar la aplicación utilizando Docker, asegúrate de tener un archivo `.env` en la raíz del proyecto con las configuraciones necesarias. Luego, ejecuta el siguiente comando:

```sh
docker compose up
```

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```sh
npm run test
```

Para ejecutar las pruebas end-to-end (e2e), utiliza el siguiente comando:

```sh
npm run test:e2e
```

## Descripción Adicional

- ***APIs Utilizadas:*** Se ha utilizado la API de Google Place y Google Geocode para la búsqueda de lugares y geocodificación cuando se pasa solo el nombre de la ciudad.
- ***Encriptación del Token:*** Se ha utilizado encriptación RSA con llave pública y privada para los tokens.
- ***Arquitectura Hexagonal:*** El proyecto está estructurado siguiendo la arquitectura hexagonal para mejorar la separación de preocupaciones y la facilidad de mantenimiento.
