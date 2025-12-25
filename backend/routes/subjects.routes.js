import { Router } from "express";
import { getSubject, getByIdSubject, readySubject/*, addSubject, updSubject, delSubject*/ } from "../controllers/subjectsController.js"

const router = Router();

router.get('/subject', getSubject)

router.get('/subject/:id', getByIdSubject)

router.put('/subject/:id', readySubject)

// router.post('/subject', addSubject)

// router.put('/subject/:id', updSubject)

// router.delete('/subject/:id', delSubject)

export default router;