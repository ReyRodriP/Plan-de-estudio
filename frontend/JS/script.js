const subjects = document.getElementById('data_subjects');
const user = JSON.parse(localStorage.getItem('usuario'));
const apiUrl = `http://localhost:3000/subjects/${user.id}`; 
const modal = document.getElementById('modal-background');
const profileBtn = document.getElementById('profile-image');
const closeBtn = document.getElementById('close-btn');
const closeAccount = document.getElementById('logout');

const options = { method: "GET" };

fetch(apiUrl, options)
  .then(res => res.json())
  .then(response => showInfo(response));


let lastSemester = null;
let currentSemesterRows = [];

function showInfo(response) {
  subjects.innerHTML = "";

  // Asegurar que esté ordenado por semestre
  response.sort((a, b) => a.semestre - b.semestre);

  response.forEach((a, index) => {
    // Si cambia el semestre, crear encabezado
    if (a.semestre !== lastSemester) {
      lastSemester = a.semestre;

      // Si hay filas acumuladas del semestre anterior, limpiarlas
      currentSemesterRows = [];

      // Crear encabezado de semestre
      const semesterRow = document.createElement('tr');
      const semesterHeader = document.createElement('th');
      semesterHeader.colSpan = 7;
      semesterHeader.innerText = `Semestre ${a.semestre}`;
      semesterHeader.classList.add('semester-header');
      semesterRow.appendChild(semesterHeader);

      // Asignar dataset con el número del semestre
      semesterRow.dataset.semestre = a.semestre;
      subjects.appendChild(semesterRow);
      semesterRow.classList.add('semester-header-row');

    }

    // Crear fila de asignatura
    const row = document.createElement('tr');
    row.dataset.semestre = a.semestre; // para agrupar visualmente

    const code = document.createElement('td');
    code.innerText = a.codigo;

    const name = document.createElement('td');
    name.innerText = a.nombre_asignatura;

    const teoricHours = document.createElement('td');
    teoricHours.innerText = a.horas_teoricas;

    const practicHours = document.createElement('td');
    practicHours.innerText = a.horas_practicas;

    const credits = document.createElement('td');
    credits.innerText = a.creditos;

    const grades = document.createElement('td');
    grades.innerText = a.calificacion;
    if (grades.innerText.trim() !== "") row.classList.add('finished');

    const options = document.createElement('td');
    const button1 = document.createElement('button');
    button1.classList.add('bx', 'bx-pencil-sparkles');
    button1.title = "Inscribir";

    const button2 = document.createElement('button');
    button2.classList.add('bx', 'bx-seal-check');
    button2.title = "Publicar";
    button2.addEventListener('click', () => showGrades(a.id));

    const button3 = document.createElement('button');
    button3.classList.add('bx', 'bx-rotate-ccw');
    button3.title = "Reiniciar";

    options.append(button1, button2, button3);
    row.append(code, name, teoricHours, practicHours, credits, grades, options);

    subjects.appendChild(row);
  });
}

// --- Fila retráctil ---
document.addEventListener('click', (e) => {
  // Si el clic fue sobre un encabezado de semestre
  if (e.target.classList.contains('semester-header')) {
    const header = e.target;
    const semestre = header.parentElement.dataset.semestre;

    // Buscar todas las filas con ese semestre, excepto la del encabezado
    const rows = document.querySelectorAll(
      `tr[data-semestre="${semestre}"]:not(.semester-header-row)`
    );

    // Ver si las filas ya están ocultas
    const isHidden = rows[0]?.classList.contains('hidden');

    // Alternar visibilidad
    rows.forEach(row => row.classList.toggle('hidden', !isHidden));
    header.classList.toggle('open', !isHidden);
  }
});

// --- Publicar calificaciones ---
async function showGrades(id) {
  const cal = prompt('Ingresa la calificación final');
  if (!cal) return;

  await fetch(apiUrl + `${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completada: 1, calificacion: parseFloat(cal) })
  });

  location.reload();
}

//Manejo del modal
profileBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function openModal() {
  modal.classList.remove('modal-close');
}

function closeModal() {
  modal.classList.add('modal-close');
}

//Cerrar sesion
closeAccount.addEventListener('click', sesionClosed)
function sesionClosed() {
  document.cookie = 'jwt=; path=/; Expires=Mon, 01 Jan 2000 00:00:01 GMT;';
  window.location.href = '/';
}