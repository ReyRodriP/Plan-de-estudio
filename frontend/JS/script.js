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

        //Seccion de opciones
        const options = document.createElement('td')
        const button1 = document.createElement('button')
        const button2 = document.createElement('button')
        const button3 = document.createElement('button')
        options.appendChild(button1)
        options.appendChild(button2)
        options.appendChild(button3)

        //Agregamos todo a la tabla
        row.appendChild(code)
        row.appendChild(name)
        row.appendChild(teoricHours)
        row.appendChild(practicHours)
        row.appendChild(credits)
        row.append(options)


        subjects.appendChild(row)
    })     
}