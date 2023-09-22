import express from 'express'
const Server = express.Router();

Server.get("/", (req,res)=>{
    try {
        res.status(200).render("index", {
            title:"SHOOL MANAGEMENT STSTEM GHsms"
        })
    } catch (error) {
        res.status(500).send(error)
    }
})






export default Server