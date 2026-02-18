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

export const ListarAsignaturas = async (id) => {
    const [result] = await pool.query(' SELECT a.id AS id_asignatura, a.codigo, a.nombre AS nombre_asignatura, a.semestre, a.horas_teoricas, a.horas_practicas, a.creditos, c.calificacion, c.completada, c.estado AS estado FROM asignaturas a LEFT JOIN calificaciones c ON a.id = c.asignatura_id AND c.estudiante_id = ? ORDER BY a.semestre, a.codigo;', [id])
    return result
}

export const ListarAsignaturasPorId = async (id) => {
    const [result] = await pool.query(`SELECT * FROM asignaturas WHERE Id = ?`, [id])
    return result
}

export const CompletarAsignatura = async (completada, calificacion, id) => {
    const [result] = await pool.query('UPDATE asignaturas SET completada = ?, calificacion = ? WHERE id = ?', [ completada, calificacion, id ]) 
}
   
// ---Manejo de inscripciones---

export const inscribirMaterias = async (estudianteId, asignaturaId) => {
    const [result] = await pool.
    query('INSERT INTO calificaciones (estudiante_id, asignatura_id, estado) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE estado = 1;', [estudianteId, asignaturaId])
    return result
}

// export const inscribirMateriasExistentes = async () => {
//     const [result] = await pool.query('')
// }

export const checkSubjects = async (estudianteId, asignaturaId) => {
    const [result] = await pool.query('SELECT * FROM calificaciones WHERE estudiante_id = ? AND asignatura_id = ?', [estudianteId, asignaturaId])
    return result
}

export const checkrequirement = async (estudianteId, asignatura_id) => {
    const [result] = await pool.query('SELECT a.id AS requisito_id, a.codigo, a.nombre, a.semestre, c.calificacion, c.completada FROM requisitos r JOIN asignaturas a ON r.requisito_id = a.id LEFT JOIN calificaciones c ON c.asignatura_id = a.id AND c.estudiante_id = ? WHERE r.asignatura_id = ?;', [estudianteId, asignatura_id])
    return result
}

// ---Reinicio de los valores de las asignaturas--- //

export const rebootSubjects = async (estudianteId, asignatura_id) => {
    const [result] = await pool.query('UPDATE calificaciones SET calificacion = NULL, completada = 0, estado = 0 WHERE estudiante_id = ? AND asignatura_id = ?;', [estudianteId, asignatura_id])
    return result
}