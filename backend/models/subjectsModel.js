import { pool } from "./connection.js"    

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
   

