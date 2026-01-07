const userName = document.getElementById('userName')
const studentCode = document.getElementById('studentCode')
const email = document.getElementById('email')
const password = document.getElementById('password')
const register = document.getElementById('register')
const apiUrl = "http://localhost:3000/register"
const options = {
    method: "POST"
}

fetch(apiUrl, options)
.then(res => res.json())
.then(response => console.log(response))

const login = () => {
    console.log(userName.value)
}

register.addEventListener('click', login)