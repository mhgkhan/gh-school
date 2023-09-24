import { config } from 'dotenv'
config();
import express from 'express'
import path from 'path'
import Server from './routes/server.js';
import fs from 'fs/promises'

const app = express();

// app.use((req, res, next) => {
//     fs.appendFile(`user.txt`, `[DATE: ${Date.now()}]\t [IP: ${req.ip}]  \t [METHOD: ${req.method}] \t [PATH: ${req.path}] \n `, (err, data) => {
//         next();
//     })
// })

// default route 
app.use("/", Server);

// connect with public folder 
app.use(express.static(path.join(process.cwd(), "./public")));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./views"))



app.listen(process.env.PORT || 80, ()=> console.log("SERVER ARE LISTENNING ON PORT " + process.env.PORT || 80))