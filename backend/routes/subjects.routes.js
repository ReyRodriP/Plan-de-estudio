import { Router } from "express";
import { getSubject, getByIdSubject, readySubject, Register, logIn/*, addSubject, updSubject, delSubject*/ } from "../controllers/subjectsController.js"

const router = Router();

router.post('/login', logIn)

router.post('/register', Register)

// router.post('/logout', )

// router.get('/protected', )

//Rutas de las materias
router.get('/subject', getSubject)

router.get('/subject/:id', getByIdSubject)

router.put('/subject/:id', readySubject)

// router.post('/subject', addSubject)

// router.put('/subject/:id', updSubject)

// router.delete('/subject/:id', delSubject)

export default router;