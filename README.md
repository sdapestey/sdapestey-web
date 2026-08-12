# sdapestey-web

Portfolio profesional de [Sebastián Apestey](https://sdapestey.com.ar) — Analista NOC / IT / Seguridad Informática.

Sitio **estático** (HTML/CSS/JS). No requiere Docker ni build step.

## Arquitectura en el VPS

```
Internet → nginx :80/:443 (TLS) → lighttpd 127.0.0.1:8080 → ./web
```

Nginx ya escucha en 80/443. **No** pongas lighttpd en el puerto 80.

## Stack

- HTML + CSS propio
- i18n ES/EN
- Tema light / dark / system
- lighttpd (archivos) + nginx (HTTPS)

## Arranque en el servidor

```bash
cd ~/sdapestey-web
git pull

# Backend (sin sudo)
lighttpd -D -f lighttpd.conf
```

Si nginx ya hacía `proxy_pass` a `127.0.0.1:8080` (Docker viejo), listo.

Si no, hay un ejemplo en `deploy/nginx-sdapestey.conf.example`.

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Local (lab)

```bash
# Sin pelear con nginx del host: editá temporalmente server.port o:
cd web && python3 -m http.server 8080
```

## Licencia

Contenido personal. Código del sitio libre para uso propio.
