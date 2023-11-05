import express from 'express'
import path from "path"

import contactApiHandler from '../controllers/contactApiHandler.js';


const contactRouter = express.Router();


contactRouter.route("/")
.post(contactApiHandler.handleContactPost);

export default contactRouter