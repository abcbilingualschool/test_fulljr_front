// Frontend ya resuelto para la prueba técnica. No requiere modificaciones.
// Si su backend corre en un puerto distinto, cambie API_BASE aquí.
const API_BASE = "http://localhost:5000/api/tareas";

const listEl = document.getElementById("task-list");
const formEl = document.getElementById("task-form");
const inputEl = document.getElementById("task-input");
const statusEl = document.getElementById("status");
const apiUrlEl = document.getElementById("api-url");

apiUrlEl.textContent = API_BASE;

function setStatus(msg, isError = false) {
  statusEl.textContent = msg || "";
  statusEl.className = isError ? "error" : "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderTareas(tareas) {
  listEl.innerHTML = "";
  if (!tareas || tareas.length === 0) {
    listEl.innerHTML = '<li class="empty">No hay tareas todavía.</li>';
    return;
  }
  tareas.forEach((t) => {
    const li = document.createElement("li");
    li.className = t.completada ? "completed" : "";
    li.innerHTML = `
      <label>
        <input type="checkbox" ${t.completada ? "checked" : ""} data-id="${t.id}" class="toggle" />
        <span>${escapeHtml(t.titulo)}</span>
      </label>
      <button class="delete" data-id="${t.id}" title="Eliminar">&times;</button>
    `;
    listEl.appendChild(li);
  });
}

async function fetchTareas() {
  setStatus("Cargando...");
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const tareas = await res.json();
    renderTareas(tareas);
    setStatus("");
  } catch (err) {
    renderTareas([]);
    setStatus(
      `No se pudo conectar con el backend en ${API_BASE}. Verifique que esté corriendo y que CORS esté habilitado. (${err.message})`,
      true
    );
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = inputEl.value.trim();
  if (!titulo) return;
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    inputEl.value = "";
    await fetchTareas();
  } catch (err) {
    setStatus(`Error al crear la tarea: ${err.message}`, true);
  }
});

listEl.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete")) return;
  const id = e.target.dataset.id;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
    await fetchTareas();
  } catch (err) {
    setStatus(`Error al eliminar la tarea: ${err.message}`, true);
  }
});

listEl.addEventListener("change", async (e) => {
  if (!e.target.classList.contains("toggle")) return;
  const id = e.target.dataset.id;
  try {
    const res = await fetch(`${API_BASE}/${id}/completar`, { method: "PUT" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await fetchTareas();
  } catch (err) {
    setStatus(`Error al actualizar la tarea: ${err.message}`, true);
  }
});

fetchTareas();
