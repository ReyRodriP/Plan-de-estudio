//Configuracion para enviar las vistas, necesario en caso de usar type module
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Vistas
export const viewLogin = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/HTML/login.html'));
}

export const viewSubjects = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/HTML/index.html'))
}

export const viewRegister = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/HTML/register.html'))
}
