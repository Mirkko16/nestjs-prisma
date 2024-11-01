# Usa una imagen base adecuada para Node.js (ajusta la versión según tus necesidades)
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de configuración de la aplicación (como package.json y package-lock.json)
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Generate Prisma Client code
RUN npx prisma generate

# Compila la aplicación si estás usando TypeScript o cualquier otra configuración de build
RUN npm run build

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Command to run the app
CMD [  "npm", "run", "start:migrate:prod" ]
