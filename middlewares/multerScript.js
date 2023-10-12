import multer from "multer"
import path from 'path'

// multer middleware 
const multersScript = (fieldnameofile,foldernameoffile) =>{
    return multer({
        storage: multer.diskStorage({
            
            destination: (req, file, collback) => {
                collback(null, path.join(process.cwd(),`./public/assets/media/images/students/${foldernameoffile}`))
            },
            filename: (req, file, collback) => {
                collback(null, `GSMS_${file.fieldname}_${Math.floor(Math.random() * 12000230)}_${Date.now()}_${path.extname(file.originalname)}`)
            }
        })
    }).single(fieldnameofile)
}

export default multersScript