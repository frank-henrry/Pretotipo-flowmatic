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

# Credencial para proteger solo /test-coexistencia.html (no afecta el resto del sitio)
RUN apk add --no-cache apache2-utils \
    && if [ -z "$COEXISTENCIA_USER" ] || [ -z "$COEXISTENCIA_PASS" ]; then \
        echo "ERROR: define COEXISTENCIA_USER y COEXISTENCIA_PASS en .env antes de construir" >&2; \
        exit 1; \
    fi \
    && htpasswd -cb /etc/nginx/.htpasswd "$COEXISTENCIA_USER" "$COEXISTENCIA_PASS" \
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
    location = /test-coexistencia.html {\n\
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
