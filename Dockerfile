# Usa la imagen base oficial de Node.js 18
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación de Next.js
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "start"]
