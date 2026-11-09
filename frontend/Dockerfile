# Etapa 1: Construcción
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG NEXT_PUBLIC_ADMIN_SECRET
ENV NEXT_PUBLIC_ADMIN_SECRET=$NEXT_PUBLIC_ADMIN_SECRET
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine
ARG COEXISTENCIA_USER
ARG COEXISTENCIA_PASS
COPY --from=build /app/out /usr/share/nginx/html

# Credencial para proteger solo /whatsapp-cliente (no afecta el resto del sitio).
# Si falta en el .env, NUNCA se cae el build de todo el sitio por esto: se genera
# una clave aleatoria y queda impresa en el log de build para poder recuperarla.
RUN apk add --no-cache apache2-utils \
    && WA_USER="${COEXISTENCIA_USER:-equipo}" \
    && WA_PASS="${COEXISTENCIA_PASS:-$(head -c 32 /dev/urandom | tr -dc 'A-Za-z0-9' | head -c 24)}" \
    && if [ -z "$COEXISTENCIA_PASS" ]; then \
        echo "AVISO: COEXISTENCIA_PASS no estaba en .env." \
             "Clave generada para /whatsapp-cliente -> usuario: $WA_USER  clave: $WA_PASS" \
             "(agrega COEXISTENCIA_USER/COEXISTENCIA_PASS al .env para que no cambie en cada build)"; \
    fi \
    && htpasswd -cb /etc/nginx/.htpasswd "$WA_USER" "$WA_PASS" \
    && apk del apache2-utils

# Config de Nginx: sirve la SPA + hace proxy del backend en /api/
RUN printf 'server {\n\
    listen 80;\n\
    absolute_redirect off;\n\
    port_in_redirect off;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Proxy inverso hacia el backend\n\
    location /api/ {\n\
        proxy_pass http://backend:8000/;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
    }\n\
\n\
    # Acceso restringido: solo esta página pide usuario/clave, el resto del sitio queda libre\n\
    location = /whatsapp-cliente {\n\
        auth_basic "Acceso restringido";\n\
        auth_basic_user_file /etc/nginx/.htpasswd;\n\
        try_files /whatsapp-cliente.html =404;\n\
    }\n\
    location = /whatsapp-cliente.html {\n\
        auth_basic "Acceso restringido";\n\
        auth_basic_user_file /etc/nginx/.htpasswd;\n\
        try_files $uri =404;\n\
    }\n\
\n\
    # Rutas estáticas de Next.js - intenta archivo, luego .html, luego fallback\n\
    location / {\n\
        try_files $uri $uri.html $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
