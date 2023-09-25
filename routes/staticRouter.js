import express from 'express'
const staticPagesRouter = express.Router();

import staticPagesHandler from '../controllers/staticpagesHandler.js';


staticPagesRouter.get("/", staticPagesHandler.handleIndex)
    .get("/ourmission", staticPagesHandler.handleOurmissionPage)
    .get("/ourstory", staticPagesHandler.handleOurstory)
    .get("/ourgallery", staticPagesHandler.handleOurgallery)
    .get("/addmissions", staticPagesHandler.handleAdmissionspage)
    .get("/contactus", staticPagesHandler.handleContactuspage)

export default staticPagesRouter