// ===============================
// 1) HOME - PERSONAJES (index.html)
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("personajes");
  if (!contenedor) return; // Solo corre en index.html

  // Mostrar loading mientras carga la API
  contenedor.innerHTML = "<p>Cargando personajes...</p>";

  try {
    // Traer personajes de la API
    const resp = await fetch("https://thronesapi.com/api/v2/Characters");
    const apiData = await resp.json();

    // Traer personajes locales
    const locales = JSON.parse(localStorage.getItem("personajes")) || [];

    // Combinar API + locales
    const todos = [...locales, ...apiData];


    console.log("Personajes totales:", todos); // Para verificar en consola

    // Renderizar cards
    contenedor.innerHTML = todos.map(p => `
      <div class="personaje">
        <img 
      src="${p.imageUrl && p.imageUrl.startsWith('http') ? p.imageUrl : 'img/default.jpg'}" 
      alt="${p.fullName}"
    >
        <h3>${p.fullName}</h3>
        <p>${p.title || "Sin título"}</p>
        ${p.house ? `<p>Casa: ${p.house}</p>` : ""}
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<p>Error al cargar los personajes.</p>";
  }
});


// ===============================
// 2) FORMULARIO DE CONTACTO (contacto.html)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const casa = document.getElementById("casa").value.trim();
    const noticias = document.querySelector('input[name="noticias"]:checked');
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !casa || !noticias || !mensaje) {
      alert("⚠️ Completá todos los campos obligatorios.");
      return;
    }

    alert(`Gracias por contactarnos, ${nombre}!`);
    form.reset();
  });
});


// ===============================
// 3) CARGAR PERSONAJE (cargar-personaje.html)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPersonaje");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const imagen = document.getElementById("imagen").value.trim();
    const casa = document.getElementById("casa").value.trim();

    if (!nombre || !titulo || !imagen || !casa) {
      alert("⚠️ Completá todos los campos.");
      return;
    }

    // Validación de URL de imagen
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(imagen)) {
      alert("⚠️ Ingresá una URL válida de imagen (jpg, jpeg, png, gif, webp).");
      return;
    }

    // Crear objeto con clave 'house' consistente con la API
    const nuevo = {
      fullName: nombre,
      title: titulo,
      imageUrl: imagen,
      house: casa
    };

    // Guardar en localStorage
    const locales = JSON.parse(localStorage.getItem("personajes")) || [];
    locales.push(nuevo);
    localStorage.setItem("personajes", JSON.stringify(locales));

    alert(`✔ ${nombre} se agregó correctamente.`);
    window.location.href = "index.html";
  });
});
