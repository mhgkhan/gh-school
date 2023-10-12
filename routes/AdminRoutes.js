import express from 'express'

const AdminRouter = express.Router();

AdminRouter.get("/principle", (req,res)=>{
    try {
        res.status(200).render("./admin/index.ejs",{
            title:"Admin MPS"
        })
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})


export default AdminRouter