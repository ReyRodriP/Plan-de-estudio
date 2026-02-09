import { pool } from '../models/connection.js'
import bcrypt, { hash } from 'bcrypt'
import JsonWebToken from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ListarAsignaturas, ListarAsignaturasPorId, CompletarAsignatura, registrarEstudiantes, loginEstudiantes, inscribirMaterias, checkrequirement, checkSubjects } from '../models/subjectsModel.js'

dotenv.config();

export const Register = async (req, res) => {
  try {
    const { nombre, matricula, correo, contrasena } = req.body;
    const salt = await bcrypt.genSalt(5);

    if (!nombre || !matricula || !correo || !contrasena) {
      return res.status(400).json({ Mensaje: "Llena todos los campos" });
    }

    if (nombre.length < 3) {
      return res.status(400).json({ Mensaje: "Nombre demasiado corto" });
    }
    //Recordar el manejo de que no se repitan correos o matriculas
    const hashcontrasena = await bcrypt.hash(contrasena, salt);
    const insertarEstudiante = await registrarEstudiantes(nombre, matricula, correo, hashcontrasena);
  
    res.json({ Mensaje: "Estudiante nuevo registrado", IdInsertado: insertarEstudiante.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Error al registrar estudiante" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { correo, contrasena } = req.body
    const logear = await loginEstudiantes(correo)

    if(logear == '') return res.status(500).json({Mensaje: 'Correo o contraseña incorrecta'});

    const validPassword = await bcrypt.compare(contrasena, logear[0].contrasena)
    if(!validPassword) return res.status(500).json({Mensaje: 'Correo o contraseña incorrecta'});

    const token = JsonWebToken.sign(
      {user:logear[0].nombre}, //Declaramos el usuario
      process.env.JWT_SECRET, //Pasamos la clave del .env
      {expiresIn: process.env.JWT_EXPIRETIME})//EL tiempo para que expire el token 
      
    const cookieOptions = {
      expires: new Date (Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), //Para conversion en dias
      path: "/"
    } 
    res.cookie("jwt", token, cookieOptions)
    res.status(200).json({
      Mensaje: "Usuario logeado", 
      usuario: {id: logear[0].id, nombre: logear[0].nombre, correo: logear[0].correo},
      redirect:`/subjects/${logear[0].id}`})

  } catch(err) {
    res.status(500).json({Mensaje: err})
    console.log(err)
  }
}

export const getSubject = async (req, res) => {
  try {
    const { id } = req.params
    const asignaturas = await ListarAsignaturas(id);
    res.json(asignaturas);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: "Error al obtener asignaturas" });
  }
}

export const getByIdSubject = async (req, res) => {
    try {
        const { id } = req.params
        const asignaturasId = await ListarAsignaturasPorId(id)

    if(asignaturasId.length == 0) {
       return res.status(404).json({ Mensaje: 'No encontrado' })
    } else { 
        return res.json(asignaturasId[0])
    }  

    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

export const readySubject = async (req, res) => {
    try { 
        const { id } = req.params
        const { completada, calificacion } = req.body
        const result = await CompletarAsignatura(completada, calificacion, id )

        // if (result.affectedRows === 0) {
        //      return res.status(404).json({"Mensaje": "No fue encontrado"})
        // }

        res.json({Mensaje: `Mision cumplida, se altero la fila ${id}`})

    } catch (err) {
        res.status(500).json({Mensaje: err})
        console.log(err)
    }
}

// ---Manejo de las asignaturas inscritas---
export const addSubject = async (req, res) => {
  const { estudianteId, asignaturaId } = req.body
  const checksubjects = await checkrequirement(estudianteId, asignaturaId)
  const subjectOk = await checkSubjects(estudianteId, asignaturaId)

  if(checksubjects.length == 0 && subjectOk.length == 0){
    const newSubject = await inscribirMaterias(estudianteId, asignaturaId)
    return res.status(200).json({Message: "Asignatura inscrita"})
  }

  let nombres = checksubjects.map((nombre) => {
    if(nombre.completada == null) {
      return `Debe completar la asignatura ${nombre.codigo}`
    }

  })
  res.status(500).json({nombres})
}