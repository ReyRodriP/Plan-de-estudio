import express from 'express'
import subjectRoutes from './routes/subjects.routes.js'

const app = express();

app.use(express.json()) //Para poder recibir un Json, quitar al final
app.use(subjectRoutes)
export default app; 
