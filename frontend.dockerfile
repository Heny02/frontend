# Utilisation de l'image officielle Node.js
FROM  node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et package-lock.json pour installer les dépendance
COPY  package*.json ./

# Utilise `npm ci` pour installer les dépendances de manière reproductible
RUN npm ci --silent

# Copier tous les fichiers du répertoire local actuel dans le répertoire de travail du conteneur
COPY . .

# Exposer le port 5173 pour permettre les connexions réseau vers ce port (typiquement pour une application web)
EXPOSE  5173

# Définit la commande par défaut à exécuter lorsque le conteneur démarre : lance le script "npm run dev" avec l'option "--host"
CMD ["npm", "run", "dev", "--host"]


# Avec --host, l'application devient accessible via 0.0.0.0:5173, permettant à d'autres machines de s'y connecter.
