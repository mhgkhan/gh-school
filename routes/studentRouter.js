import express from 'express'
import path from 'path'
import multer from 'multer';

const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'

// multer middleware 
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, collback) => collback(null, `/assets/media/images/students/profiles`),
        filename: (req, file, collback) => collback(null, `GSMS_${Math.floor(Math.random()&1354E1)}_${Date.now()}.${path.extname(file.originalname)}`)
    })
}).single("image")


studentRouter.post("/signup",studentApiHandler.handleSignupPost);
studentRouter.post("/login", studentApiHandler.handleLoginPost);
studentRouter.post("/personaldetails" ,upload,studentApiHandler.HandlePersonalDetailsPost)


export default studentRouter