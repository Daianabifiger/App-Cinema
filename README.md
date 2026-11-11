# 🎬 Hollywow Cinema - Web App de Reserva de Entradas y Candy Bar

**Hollywow Cinema** es una aplicación web interactiva diseñada para gestionar la experiencia completa de reserva de entradas de cine y compra de combos de Candy Bar. 
El proyecto simula el flujo real de una cadena de cines moderna: desde la exploración de la cartelera y promociones vigentes hasta la selección personalizada de día, horario y cantidad de tickets, integrando un carrito de compras persistente, autenticación de usuarios y generación de códigos de reserva para pago presencial en boletería.

---

## ✨ Características Principales (Features)

* **Cartelera y Promociones Dinámicas:** Renderizado automático de películas, banners y carrusel de promociones vigentes a partir de estructuras de datos en JavaScript.
* **Carrusel Múltiple Adaptativo:** Visualización inteligente que muestra 1 tarjeta por vez en dispositivos móviles y 3 tarjetas simultáneas en pantallas de escritorio mediante variables CSS y Media Queries.
* **Configurador Interactivo de Funciones (`reserva.html`):**
  * Carga dinámica de la ficha técnica de la película seleccionada (póster, géneros, calificación, idioma y formato).
  * Selector de fechas horizontal deslizable (`scroll-behavior: smooth`) con controles de navegación e indicador visual de día activo.
  * Botonera dinámica según los horarios propios de cada película.
  * Cálculo automático y en tiempo real del subtotal según la cantidad de entradas seleccionadas.
* **Carrito de Compras Unificado (Drawer Lateral):**
  * Combina productos de distintas categorías (`ENTRADA` y `CANDYBAR`) en un mismo listado.
  * Permite modificar cantidades desde un selector desplegable (`1` a `10`), eliminar ítems individuales y visualizar el contador global y el monto total actualizado al instante.
  * Notificaciones flotantes (*Toast*) al agregar productos.
* **Sistema de Autenticación (Login y Registro):**
  * Modal interactivo que alterna entre las vistas de Iniciar Sesión y Crear Cuenta.
  * Validación de formularios en tiempo real mediante Expresiones Regulares (longitud de usuario, formato de email, seguridad de contraseña y confirmación).
* **Persistencia Inteligente y Migración de Almacenamiento:**
  * Navegación como invitado respaldada en `localStorage`.
  * Al iniciar sesión, el carrito migra y se fusiona automáticamente hacia `sessionStorage`, limpiando los datos temporales de invitado.
* **Checkout con Confirmación y Ticket Alfanumérico:**
  * Modal expandido de revisión de compra antes de confirmar.
  * Generador de código único de 6 caracteres (formato `HW-XXXXXX`) para presentar y abonar en el mostrador del cine.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico:** Estructura de páginas, formularios, modales y contenedores accesibles.
* **CSS3:** Diseño *Dark Mode* con acentos en verde neón (`bg-neon`), variables CSS personalizadas (`--bs-carousel-items`), Flexbox, `object-fit` y *Media Queries*.
* **Bootstrap 5 & Bootstrap Icons:** Sistema de grillas responsivo, componentes de carrusel, modales, estados de validación (`is-valid` / `is-invalid`) e iconografía.
* **JavaScript Vanilla (ES6+):** Manipulación del DOM, manejo de eventos con `addEventListener`, *Template Strings*, métodos de arrays (`forEach`, `find`, `findIndex`, `map`, `splice`), inyección dinámica de componentes (`insertAdjacentHTML`), `localStorage` y `sessionStorage`.

---
## 🚀 Flujo de Uso 
* **Exploración:** El usuario ingresa a index.html, recorre las promociones vigentes y puede sumar combos del Candy Bar directamente a su carrito.

* **Selección de Película:** Al presionar "Ver más" en una película de la cartelera, el sistema guarda la selección en localStorage y redirige a reserva.html.

* **Configuración de Reserva:** El usuario elige un día en el carrusel horizontal, selecciona un horario disponible y define la cantidad de tickets. El panel "Resumen de reserva" actualiza los datos en vivo.

* **Validación y Carga:** Al presionar "Añadir al carrito", se verifica que exista fecha y horario seleccionados y se incorpora la entrada al carrito global.

* **Autenticación (Opcional/Integrada):** Desde el ícono de perfil del Navbar, el usuario puede crear una cuenta nueva o iniciar sesión, migrando su carrito actual a sessionStorage.

* **Confirmación y Código:** Desde el carrito lateral, al tocar "Finalizar Compra", se despliega el resumen expandido. Al confirmar en "Confirmar y Reservar", se emite el código HW-XXXXXX y se vacía el carrito.

## 📂 Arquitectura del Proyecto

```text
📦 hollywow-cinema
 ┣ 📜 index.html        # Vista principal: banners, promociones, cartelera y Candy Bar
 ┣ 📜 reserva.html      # Vista de detalle de película, selección de día/hora y resumen
 ┣ 📜 style.css         # Estilos personalizados, paleta neón/oscuro y reglas responsive
 ┣ 📜 script.js         # Lógica de index.html (renderizado de catálogo y redirección)
 ┣ 📜 reserva.js        # Lógica de reserva.html (horarios, fechas, validaciones y subtotal)
 ┣ 📜 carrito.js        # Módulo transversal: estado del carrito, modales, Auth y Checkout
 ┗ 📜 README.md         # Documentación del proyecto
