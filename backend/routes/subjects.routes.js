import { Router } from "express";
import { getSubject, getByIdSubject, readySubject, Register, logIn/*, addSubject, updSubject, delSubject*/ } from "../controllers/subjectsController.js"
import { viewLogin, viewSubjects, viewRegister } from "../controllers/viewsController.js";
import { onlyAdmin, onlyPublic } from "../middlewares/authorization.js";
const router = Router();

//Rutas del proyecto
router.get('/', onlyPublic, viewLogin);

router.get('/index', onlyAdmin, viewSubjects);

router.get('/register', onlyPublic, viewRegister);

//Endpoints del login y register
router.post('/login', logIn)

router.post('/register', Register)

//Endpoints de las materias
router.get('/subjects/:id', getSubject)

router.get('/subject/:id', getByIdSubject)

router.put('/subject/:id', readySubject)

// router.post('/subject', addSubject)

// router.put('/subject/:id', updSubject)

// router.delete('/subject/:id', delSubject)

export default router;