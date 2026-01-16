import { pool } from "./connection.js"    

export const registrarEstudiantes = async (nombre, matricula, correo, contrasena) => {
    const [result] = await pool.query('INSERT INTO estudiantes (nombre, matricula, correo, contrasena) VALUES (?, ?, ?, ?)', [nombre, matricula, correo, contrasena])
    return result
}

export const loginEstudiantes = async (correo) => {
    const [result] = await pool.query('SELECT * FROM estudiantes WHERE correo = ?', [correo])
    return result 
}

export const userSesion = async (nombre) => {
    const [result] = await pool.query('SELECT * FROM estudiantes WHERE nombre = ?', [nombre])
    return result
}

export const ListarAsignaturas = async () => {
    const [result] = await pool.query('SELECT * FROM asignaturas')
    return result
}

export const ListarAsignaturasPorId = async (id) => {
    const [result] = await pool.query(`SELECT * FROM asignaturas WHERE Id = ?`, [id])
    return result
}

export const CompletarAsignatura = async (completada, calificacion, id) => {
    const [result] = await pool.query('UPDATE asignaturas SET completada = ?, calificacion = ? WHERE id = ?', [ completada, calificacion, id ]) 
}
   

