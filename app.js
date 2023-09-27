import { config } from 'dotenv'
config();
import express from 'express'
import path from 'path'
import session from 'express-session';


import connectDB from './connectdb.js'


// import routes 
import staticPagesRouter from './routes/staticRouter.js';
import contactRouter from './routes/contactRouter.js';


const app = express();
<<<<<<< HEAD
connectDB(process.env.MONGO_URI).then(() => console.log("MONGODB CONNECTED."))
=======
connectDB("mongodb+srv://ghazna:wpqiEidJVjX39yEw@farhatdb.zejxmeq.mongodb.net/ghsms?retryWrites=true&w=majority").then(()=>console.log("MONGODB CONNECTED."))
>>>>>>> 5be64ab0dba7c1bdf92a3f8f4abfd8895fb9252e


// connect with public folder 
app.use(express.static(path.join(process.cwd(), "public")));


app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// session middleware 
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))


// default route 
app.use("/", staticPagesRouter);
// contact route 
app.use("/api/contact", contactRouter);

app.get("*", (req, res) => res.status(404).json({ error: "404 page not found " }))


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./views"))



<<<<<<< HEAD
app.listen(process.env.PORT || 80, () => console.log("SERVER ARE LISTENNING ON PORT " + process.env.PORT || 80))
=======
app.listen(process.env.PORT || 80, ()=> console.log("SERVER ARE LISTENNING ON PORT " + process.env.PORT || 80))
>>>>>>> 5be64ab0dba7c1bdf92a3f8f4abfd8895fb9252e
