# sdapestey-web

Portfolio profesional de [Sebastián Apestey](https://sdapestey.com.ar) — Analista NOC / IT / Seguridad Informática.

Sitio **estático** (HTML/CSS/JS). No requiere Docker, Node ni build step.

## Stack

- HTML semántico + CSS propio
- i18n ES/EN
- Tema light / dark / system
- Servido con **lighttpd**

## Estructura

```
web/                 # document root
  index.html
  css/styles.css
  js/i18n.js
  js/scripts.js
  assets/
lighttpd.conf        # config local
```

## Desarrollo / servidor

```bash
# Debian/Ubuntu
sudo apt install lighttpd

# Desde la raíz del repo (puerto 80 → requiere sudo)
sudo lighttpd -D -f lighttpd.conf
```

Abrí [http://TU_IP_O_DOMINIO](http://sdapestey.com.ar).

Alternativa rápida sin privilegios (solo lab):

```bash
cd web && python3 -m http.server 8080
```

## Deploy

1. `git pull` en el servidor
2. Detener stacks viejos de Docker si aún existen (`docker stop` / `docker rm`)
3. `sudo lighttpd -D -f lighttpd.conf` (o servicio systemd)
4. TLS con Let's Encrypt delante o con `mod_openssl`

## Licencia

Contenido personal. Código del sitio libre para uso propio.
