import express from 'express'
const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'
import userAuth from '../middlewares/userAuth.js'

studentRouter.post("/signup",studentApiHandler.handleSignupPost)

export default studentRouter