import express from 'express'
const studentRouter = express.Router()

studentRouter.post("/signup", (req,res)=>{
    res.status(200).json(req.body)
})

export default studentRouter