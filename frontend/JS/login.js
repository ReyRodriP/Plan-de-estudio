const apiUrl = "http://localhost:3000/login"
const email = document.getElementById("email")
const password = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")

const log = async (event) => {
    event.preventDefault()
    if(password.value.length < 5) return alert('Contraseña invalida') //Poner mas validaciones y mejorar estilo a futuro

    const res = await fetch(apiUrl, options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "correo": email.value, "contrasena": password.value}),
        credentials: "include" 
    })

    const data = await res.json();

     if (!res.ok) {
      alert(data.Mensaje || "Error al iniciar sesión");
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(data.usuario)); //Mejorar seguridad a futuro, comparar id con el token
    
    window.location.href = 'index'
}

loginBtn.addEventListener('click', log)
