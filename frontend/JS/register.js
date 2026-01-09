const userName = document.getElementById('userName')
const studentCode = document.getElementById('studentCode')
const email = document.getElementById('email')
const password = document.getElementById('password')
const register = document.getElementById('register')
const apiUrl = "http://localhost:3000/register"

const registerStudent = async (event) => { 
    event.preventDefault() //Para evitar que recargue

    //Validaciones. Recuerda ponerlo bonito a futuro 
    if(userName.value.length < 3) return alert('El nombre de usuario debe tener 3 caracteres minimos') 
    if(studentCode.value.length != 9) return alert('Matricula invalida') 
    if(password.value.length < 5) return alert('Contraseña demasiado corta') 

    await fetch(apiUrl, options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "nombre": userName.value, 
            "matricula": parseFloat(studentCode.value), 
            "correo": email.value, 
            "contrasena": password.value})
    })
    .then(res => res.json())
    .then(response => response)

    window.location.href = 'login.html'
}

register.addEventListener('click', registerStudent)