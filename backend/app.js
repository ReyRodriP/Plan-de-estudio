import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import subjectRoutes from './routes/subjects.routes.js'
import path from 'path'
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cookieParser())
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}))//Para resolver el problema del acceso y dar acceso a las rutas
app.use(express.json()) //Para poder recibir un Json, quitar al final
app.use(express.static(path.join(__dirname, '../frontend')))
app.use(subjectRoutes)

export default app; 