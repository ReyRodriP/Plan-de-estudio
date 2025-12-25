import { pool } from '../models/connection.js'
import { ListarAsignaturas, ListarAsignaturasPorId, CompletarAsignatura } from '../models/subjectsModel.js'

export const getSubject = async (req, res) => {
    try {
        const asignaturas = await ListarAsignaturas()
        res.json(asignaturas)
    } catch (err) {
        console.log(err)
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

        res.json({"Mensaje": `Mision cumplida, se altero la fila ${id}`})

    } catch (err) {
        res.status(500).json({'Mensaje': err})
        console.log(err)
    }
}
//Funciones para usar a futuro

// export const addSubject = async (req, res) => {
//     try {
//         const { Id, Codigo, Nombre, Creditos, Semestre } = req.body
//         const result = await pool.query('INSERT INTO asignaturas (Id, Codigo, Nombre, Creditos, Semestre) values (?, ?, ?, ?, ?)', [Id, Codigo, Nombre, Creditos, Semestre]);

//         res.json("Insertado correctamente")
//     } catch (err) {
//         console.log(err)
//     }
// }


// export const updSubject = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { Codigo, Nombre, Creditos, Semestre } = req.body
//         const [result] = await pool.query('UPDATE asignaturas SET Codigo = ?, Nombre = ?, Creditos = ?, Semestre = ? WHERE id = ?', [ Codigo, Nombre, Creditos, Semestre, id])

//        if (result.affectedRows === 0) {
//              return res.status(404).json({"Mensaje": "No fue encontrado"})
//         }

//         res.json({"Mensaje": `Mision cumplida, se altero la fila ${id}`})
//     } catch (err) {
//         res.status(500).json({"Mensaje": err})
//     }
// }

// export const delSubject = async (req, res) => {
//     try {
//         const { id } = req.params
//         const [result] = await pool.query("DELETE FROM asignaturas WHERE id = ?", [id])

//         if (result.affectedRows === 0) {
//              return res.status(404).json({"Mensaje": "No fue encontrado"})
//         }

//         res.json({"Mensaje": "Elemento eliminado correctamente"})
         
//     } catch (err) {
//         res.status(500).json({"Mensaje": err})
//     }
// }