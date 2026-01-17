import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userSesion } from '../models/subjectsModel.js'


export const onlyPublic = async (req, res, next) => {
    if(await userValidation(req) == false) return next()
    res.redirect('index') 
}

export const onlyAdmin = async (req, res, next) => {
    if(await userValidation(req) == true) return next()
    res.redirect('/')
}

const userValidation = async (req) => {
     try {
        const cookie = req.headers.cookie
        if(!cookie) return false
        const cleanCookie = cookie.substring(4)
        
        const preCookie = jwt.verify(cleanCookie, process.env.JWT_SECRET)
        const result = await userSesion(preCookie.user)

        if(result[0].nombre === preCookie.user) {
            return true
        } 
    } catch(err) {
        console.log({"Mensaje:": err})
    }
}

