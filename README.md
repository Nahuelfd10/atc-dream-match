# ATC Dream Match

## Descripción

**ATC Dream Match** es una aplicación web que permite a los usuarios crear un partido de fútbol 5 con sus jugadores favoritos, seleccionando jugadores sin restricciones de posición, presupuesto o contrato.

## Características

- Crear dos equipos con hasta 5 jugadores cada uno.
- Nombrar y editar los nombres de los equipos.
- Vincular jugadores a equipos desde un listado de jugadores.
- Visualizar cuándo los equipos están completos.
- Simular el partido obteniendo un ganador y sus estadísticas.

## Tecnologías Usadas

- **Next.js**: Framework para React que permite la creación de aplicaciones web modernas.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **Tailwind CSS**: Framework de CSS para el diseño de interfaces.
- **Docker**: Para contenedores de aplicaciones.

## Requisitos Previos

- **Node.js** v16 o superior
- **Docker** (opcional para ejecutar en contenedor)

## Instalación

1. **Clona el repositorio:**

   git clone https://github.com/Nahuelfd10/atc-dream-match.git
   cd atc-dream-match

2. **Instalar las dependencias:**
   npm install

## Uso

# Ejecutar Localmente

**Para iniciar la aplicación en modo desarrollo, ejecuta:**
npm run dev

- Luego, abre tu navegador y accede a la aplicación en: http://localhost:3000.

# Ejecutar con Docker

**Para construir la imagen Docker, ejecuta:**
docker-compose build

**Para iniciar el contenedor Docker, ejecuta:**
docker-compose up

- Luego, abre tu navegador y accede a la aplicación en: http://localhost:3000.

## Testing

**Ejecuta los tests usando Jest con:**
npm test
