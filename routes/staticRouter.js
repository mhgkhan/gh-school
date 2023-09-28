import express from 'express'
const staticPagesRouter = express.Router();

import staticPagesHandler from '../controllers/staticpagesHandler.js';
import userAuth from '../middlewares/userAuth.js';


staticPagesRouter.get("/", staticPagesHandler.handleIndex)
    .get("/ourmission", staticPagesHandler.handleOurmissionPage)
    .get("/ourstory", staticPagesHandler.handleOurstory)
    .get("/ourgallery", staticPagesHandler.handleOurgallery)
    .get("/addmissions", staticPagesHandler.handleAdmissionspage)
    .get("/contactus", staticPagesHandler.handleContactuspage)

    // to get student create form 
staticPagesRouter.get("/student/create", staticPagesHandler.handleStudentAddmisionPage);

export default staticPagesRouter