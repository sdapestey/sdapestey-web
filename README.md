# sdapestey-web

Portfolio de [Sebastián Apestey](https://sdapestey.com.ar).

Sitio estático servido **solo con lighttpd** (sin Docker, sin nginx).

## Puertos

| Puerto | Uso |
|--------|-----|
| 80 | redirect → HTTPS |
| 443 | sitio (TLS Let's Encrypt) |

## En el VPS (una vez)

```bash
cd ~/sdapestey-web
git pull

# 1) Parar nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

# 2) Permisos de lectura a certs y web
sudo usermod -aG ssl-cert www-data 2>/dev/null || true
sudo chmod o+x /home/sdapestey /home/sdapestey/sdapestey-web
sudo chown -R sdapestey:www-data ~/sdapestey-web/web

# 3) Servicio
sudo cp deploy/lighttpd-sdapestey.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now lighttpd-sdapestey
sudo systemctl status lighttpd-sdapestey
```

Prueba: https://sdapestey.com.ar

## Nota

Los vhosts `status.` / `monitor.` que iban a Uptime Kuma (puerto 3001) dejan de existir al quitar nginx. Si los necesitás después, se pueden agregar en lighttpd.

## Licencia

Contenido personal.
