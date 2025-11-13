# Checklist de Despliegue a Producción

## ✅ Configuración Completada

- [x] Adaptador de Netlify configurado en `astro.config.mjs`
- [x] Archivo `netlify.toml` creado con configuración de build
- [x] Archivo `_redirects` en carpeta public para manejo de rutas
- [x] `.gitignore` configurado correctamente
- [x] `.env.example` creado para documentar variables de entorno

## 📋 Antes de Desplegar

### 1. Optimización de Imágenes
- [ ] Verifica que las imágenes en `/public/img/` estén optimizadas
- [ ] Considera usar formatos modernos (WebP, AVIF)
- [ ] Comprime videos en `/public/videos/` si son muy pesados

### 2. Variables de Entorno
- [ ] Si usas variables de entorno, configúralas en Netlify:
  - Site settings > Environment variables
  - Agrega todas las variables necesarias

### 3. Dominio Personalizado (Opcional)
- [ ] En Netlify: Site settings > Domain management
- [ ] Agrega tu dominio personalizado
- [ ] Configura los DNS según las instrucciones de Netlify

### 4. Configuración de Seguridad
- [ ] Habilita HTTPS (automático en Netlify)
- [ ] Configura headers de seguridad si es necesario

## 🚀 Proceso de Despliegue

### Desde Git (Recomendado)
1. Haz commit de todos los cambios
2. Push a tu repositorio
3. Netlify desplegará automáticamente

### Manual con CLI
```sh
pnpm build
netlify deploy --prod
```

## 🔍 Después del Despliegue

- [ ] Verifica que el sitio cargue correctamente
- [ ] Prueba todas las rutas (/, /gallery)
- [ ] Verifica que las imágenes y videos carguen
- [ ] Prueba en diferentes dispositivos y navegadores
- [ ] Verifica la consola del navegador para errores

## 📊 Monitoreo

- Netlify Analytics: Site settings > Analytics
- Logs de build: Deploys > [último deploy] > Deploy log
- Logs de funciones: Functions (si usas funciones serverless)

## 🐛 Solución de Problemas Comunes

### Build falla
- Revisa el log de build en Netlify
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el comando de build sea correcto

### Rutas 404
- Verifica que `_redirects` esté en `/public/`
- Verifica la configuración en `netlify.toml`

### Imágenes no cargan
- Verifica las rutas de las imágenes
- Asegúrate de que estén en `/public/`
- Usa rutas absolutas desde la raíz: `/img/foto.jpg`
