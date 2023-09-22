import { config } from 'dotenv'
config();
import express from 'express'
import path from 'path'
import Server from './routes/server.js';

const app = express();
// connect with public folder 
app.use("/", Server);

app.use(express.static(path.join(process.cwd(),"./public")));

app.use(express.urlencoded({extended:false}))
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(),"./views"))



app.listen(process.env.PORT || 80 , e=>console.log("SERVER ARE LISTENNING ON PORT "+process.env.PORT || 80 ))