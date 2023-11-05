import { config } from 'dotenv'
config();
import express from 'express'
import path from 'path'
import session from 'express-session';
import cookieParser from 'cookie-parser';


import connectDB from './connectdb.js'
// import routes 
import staticPagesRouter from './routes/staticRouter.js';
import contactRouter from './routes/contactRouter.js';
import studentRouter from './routes/studentRouter.js';
import AdminRouter from './routes/AdminRoutes.js';

import teacherRouter from './routes/TeacherRouter.js';

const app = express();

connectDB(app.get("env")=="development"?process.env.MONGO_URI:process.env.MONGO_URI_PROD).then(() => console.log("MONGODB CONNECTED."))

// connect with public folder 
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser())

// default route 
app.use("/", staticPagesRouter);
// contact route 
app.use("/api/contact", contactRouter);

// student route 
app.use("/api/student/",studentRouter)

// teacher route 
app.use("/api/teacher", teacherRouter)

// for administrator of this webiste 
app.use("/a/ad/admin/", AdminRouter)

app.get("*", (req, res) => res.status(404).render("404.ejs", {title:"404 Page Not Found",url:req.url}))

// session middleware 
// app.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true
// }))

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./views"))

export default app