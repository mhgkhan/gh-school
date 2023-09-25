import { config } from 'dotenv'
config();
import express from 'express'
import path from 'path'
import staticPagesRouter from './routes/staticRouter.js';
import fs from 'fs/promises'

const app = express();

// default route 
app.use("/", staticPagesRouter);

// connect with public folder 
app.use(express.static(path.join(process.cwd(), "./public")));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./views"))



app.listen(process.env.PORT || 80, ()=> console.log("SERVER ARE LISTENNING ON PORT " + process.env.PORT || 80))