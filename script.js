const subjects = document.getElementById('subjects')
const apiUrl = "http://localhost:3000/subject"

const options = {
    method: "GET"
}

fetch(apiUrl, options)
.then(res => res.json())
.then(response => console.log(response))