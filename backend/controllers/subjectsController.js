import { pool } from '../models/connection.js'

const getSubject = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM asignaturas')
        res.json(result.recordset)
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

const getByIdSubject = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query(`SELECT * FROM asignaturas WHERE Id = ?`, [id])

        if(result.length == 0) {
            res.status(404).json('No encontrado')
        } else{ 
           return res.json(result[0])
        }      
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

const addSubject = async (req, res) => {
    try {
        const { Id, Codigo, Nombre, Creditos, Semestre } = req.body
        const result = await pool.query('INSERT INTO asignaturas (Id, Codigo, Nombre, Creditos, Semestre) values (?, ?, ?, ?, ?)', [Id, Codigo, Nombre, Creditos, Semestre]);

        res.json("Insertado correctamente")
    } catch (err) {
        console.log(err)
    }
}

const updSubject = async (req, res) => {
    try {
        const { id } = req.params
        const { Codigo, Nombre, Creditos, Semestre } = req.body
        const [result] = await pool.query('UPDATE asignaturas SET Codigo = ?, Nombre = ?, Creditos = ?, Semestre = ? WHERE id = ?', [ Codigo, Nombre, Creditos, Semestre, id])

       if (result.affectedRows === 0) {
             return res.status(404).json({"Mensaje": "No fue encontrado"})
        }

        res.json({"Mensaje": `Mision cumplida, se altero la fila ${id}`})
    } catch (err) {
        res.status(500).json({"Mensaje": err})
    }
}

const delSubject = async (req, res) => {
    try {
        const { id } = req.params
        const [result] = await pool.query("DELETE FROM asignaturas WHERE id = ?", [id])

        if (result.affectedRows === 0) {
             return res.status(404).json({"Mensaje": "No fue encontrado"})
        }

        res.json({"Mensaje": "Elemento eliminado correctamente"})
         
    } catch (err) {
        res.status(500).json({"Mensaje": err})
    }
}

export { getSubject, getByIdSubject, addSubject, updSubject, delSubject }


