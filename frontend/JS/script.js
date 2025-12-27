const subjects = document.getElementById('data_subjects')
const apiUrl = "http://localhost:3000/subject"

const options = {
    method: "GET"
}

fetch(apiUrl, options)
.then(res => res.json())
.then(response => showInfo(response))


function showInfo(response) {
    subjects.innerText = "" //Para vaciar contenido

    response.map((a) => {
        //Filas a generar
        const row = document.createElement('tr')

        const code = document.createElement('td')
        code.innerText = a.codigo

        const name = document.createElement('td')
        name.innerText = a.nombre

        const teoricHours = document.createElement('td')
        teoricHours.innerText = a.horas_teoricas 

        const practicHours = document.createElement('td')
        practicHours.innerText = a.horas_practicas

        const credits = document.createElement('td')
        credits.innerText = a.creditos

        const grades = document.createElement('td')
        grades.innerText = a.calificacion 
        if(grades.innerText.trim() !== '') row.classList.add('finished') //Para cambiar estilo al tener nota

        //Seccion de opciones
        const options = document.createElement('td')
        const button1 = document.createElement('button')
        button1.classList.add('bx', 'bx-pencil-sparkles')
        button1.title = "Inscribir"

        const button2 = document.createElement('button')
        button2.classList.add('bx', 'bx-seal-check')
        button2.title = `Publicar`
        button2.addEventListener('click', () => { showGrades(a.id)}) 

        const button3 = document.createElement('button')
        button3.classList.add('bx', 'bx-rotate-ccw')  
        button3.title = "Reiniciar"

        options.appendChild(button1)
        options.appendChild(button2)
        options.appendChild(button3)

        //Agregamos todo a la tabla
        row.appendChild(code)
        row.appendChild(name)
        row.appendChild(teoricHours)
        row.appendChild(practicHours)
        row.appendChild(credits)
        row.appendChild(grades)
        row.append(options)

        subjects.appendChild(row)
    })     
}

async function showGrades(id) {
    let cal = prompt('Ingresa la calificacion final')
    if(!cal) return;

    await fetch(apiUrl+`/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "completada": 1, "calificacion": `${parseFloat(cal)}`})
    })
    .then(res => res.json())
    .then(response => console.log(response)) //Llamada a la api para el PUT

    location.reload()
}