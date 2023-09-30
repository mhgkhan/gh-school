import express from 'express'
const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'

studentRouter.post("/signup",studentApiHandler.handleSignupPost);
studentRouter.post("/login", studentApiHandler.handleLoginPost);
studentRouter.post("/personaldetails", studentApiHandler.HandlePersonalDetailsPost)


export default studentRouter