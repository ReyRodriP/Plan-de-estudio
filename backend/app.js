import express from 'express'
import cors from 'cors'
import subjectRoutes from './routes/subjects.routes.js'

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500"
}))//Para resolver el problema del acceso y dar acceso a las rutas
app.use(express.json()) //Para poder recibir un Json, quitar al final
app.use(subjectRoutes)

export default app; 