import express from 'express'
const teacherRouter = express.Router()

import { idFromToken } from '../middlewares/userAuthorization.js'

import TeacherApihandler from '../controllers/TeacherApiHandler.js'
import multersScript from '../middlewares/multerScript.js'

teacherRouter.post("/signin", TeacherApihandler.handleLoginPost);
teacherRouter.post("/signup", TeacherApihandler.handleSignupPost);
teacherRouter.post("/pdata",multersScript("image","profiles"), TeacherApihandler.handlePersonalPost);
teacherRouter.put("/edit/personalinfo", idFromToken, TeacherApihandler.updatePersonalinfo )
teacherRouter.put("/update/password", idFromToken, TeacherApihandler.updatePassword )



export default teacherRouter