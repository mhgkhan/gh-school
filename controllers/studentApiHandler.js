
import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";
import studentPersonalInformationModel from '../Models/schoolstudents/StudentsignupDetails.js'
import StudentPreviusSchoolDetails from "../Models/schoolstudents/StudentPreviusSchoolData.js";


import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


// function to handle extra responses that generate from error 
// const handleResponseError = (req,res,message,status) =>{
//     return res.status(status).json(message)
// }

class studentApiHandler {

    static handleSignupPost = async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password, cpassword } = req.body
            const fullname = `${firstname} ${lastname}`

            if (password === cpassword) {

                // checking if user is exists or not 
                let exists
                try {
                    exists = await studentSignupModel.findOne({ email: email });
                } catch (error) {
                    res.status(500).json(error)
                }

                if (!exists) {

                    const passwordToHash = await bcrypt.hash(password, 10);

                    const createUser = new studentSignupModel({
                        fullname,
                        email,
                        phone,
                        password: passwordToHash
                    })

                    try {
                        const created = await createUser.save()
                        const data = {
                            id: created._id
                        }
                        const token = JWT.sign(data, process.env.SECRET)
                        res.cookie("MPS", token, {
                            httpOnly: true
                        })
                        res.redirect("/student/signupinformation")
                    } catch (error) {
                        res.status(500).json(error)
                    }
                }
                else {
                    res.status(401).render("./student/create.ejs", {
                        title: "Signup Studnet ",
                        errMsg: "User already exists try to login"
                    })
                }



            }
            else {
                res.redirect("/student/create")
            }


        } catch (error) {
            res.status(500).json({ error: error.message })
        }


    }




    static handleLoginPost = async (req, res) => {
        try {
            const { phone, password } = req.body

            // checking if user is exists or not 
            let exists
            try {
                exists = await studentSignupModel.findOne({ phone: phone });
            } catch (error) {
                console.log(error);
                res.status(500).json(error)
            }

            if (exists) {
                const comparePassword = await bcrypt.compare(password, exists.password);
                if (comparePassword) {

                    const data = {
                        id: exists._id
                    }
                    const token = JWT.sign(data, process.env.SECRET)
                    res.cookie("MPS", token, {
                        httpOnly: true
                    })
                    res.redirect("/student/signupinformation")
                }
                else {
                    res.status(400).render("./student/login.ejs", {
                        title: "Login Account Student Addmission",
                        errMsg: "Invilid credientials "
                    })
                }

            }
            else {
                res.redirect("/student/create");
            }



        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }



    



    static HandlePersonalDetailsPost =  async (req, res) => {
        try {
            
            if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
                // console.log(req.file)
                // console.log(req.body)
                // console.log("cookies is exists ")
                const verfication = JWT.verify(req.cookies.MPS, process.env.SECRET)
                const id = verfication.id
                // console.log(verfication);

                // checking if user is exists or not 
                let exists
                try {
                    exists = await studentSignupModel.findOne({ _id:id });
                    // console.log(exists);
                } catch (error) {
                    console.log(error);
                    res.status(500).json(error)
                }

                if (exists) {
                    // console.log("user is exists ")
                    // checking if this user data is already exists or not 
                    const existSignupDetails = await studentPersonalInformationModel.findOne({ user: exists._id })

                    if (existSignupDetails) {
                        // console.log("already avalaible data of student personal ")
                        await studentPersonalInformationModel.findOneAndUpdate({
                            user: exists._id
                        }, {
                            $set: {
                                ...req.body
                            }
                        })
                    }

                    else {

                        // console.log("trying to adding new student persoanl data ")
                        // console.log(req.file)
                        if (!req.file) {
                            return res.status(400).render("./student/studentinformationform.ejs",{title: "Please Image is required", errMsg:"Image are required!"})
                        }
                        else {
                            await studentPersonalInformationModel.create({
                                ...req.body,
                                image: req.file.filename,
                                user: exists._id,
                            })
                            // console.log("new student personal data has been added. ")

                            return res.redirect("/student/previusschooldata")
                        }
                    }


                }
                else {
                    // console.log("user is not exists  ")
                    res.redirect("/student/create")
                }


            }
            else {
                // console.log("cookie is not exits user is unothorize. ")
                res.redirect("/student/login")
            }



        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }









    static handlePreviusSchoolDataPost = async (req,res)=>{
        try {
         
            const {schoolname,subject,classname,rollno,obtmarks,totalmarks,schooladdress,schoolphone} = req.body

            if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
                // console.log(req.file)
                // console.log(req.body)
                // console.log("cookies is exists ")
                const verfication = JWT.verify(req.cookies.MPS, process.env.SECRET)
                const id = verfication.id
                // console.log(verfication);

                // checking if user is exists or not 
                let exists
                try {
                    exists = await studentSignupModel.findOne({ _id:id });
                    // console.log(exists);
                } catch (error) {
                    console.log(error);
                    return res.status(500).json(error)
                }

                if (exists) {
                    // console.log("user is exists ")
                    // checking if this user data is already exists or not 
                    const existSignupDetails = await studentPersonalInformationModel.findOne({ user: exists._id })

                    if (existSignupDetails) {
                        // console.log("already avalaible data of student personal ")
                        
                      if(!req.file){
                        return res.redirect("/student/previusschooldata");
                      }

                      else{

                          // checking if this user the previus school data is already exists or not 
                        const exitsPreviusSchooldata  = await StudentPreviusSchoolDetails.findOne({user:exists._id})

                        if(exitsPreviusSchooldata){
                            return res.json({
                                user:exists.email,
                                name:existSignupDetails.fullname,
                                applicationform:"pending",
                                data:"Submited verified processing. ",
                            })

                        }
                        else{

                            const savingPreviusSchoolData = new StudentPreviusSchoolDetails({
                                schoolname,schooladdress,rollno,obtmarks,totalmarks,schoolphone,subject,classname,
                                schoolcertificate:req.file.filename,
                                usrer:exists._id
                            })

                            const savedPSdata = await savingPreviusSchoolData.save();

                            return res.status(200).render("student/dashboard/index.ejs",{
                                title:"Student Dashboard",
                                student:existSignupDetails,
                                personal:exists
                            })


                        }

                      }


                    }

                    else {
                        return res.redirect("/student/signupinformation")
                    }


                }
                else {
                    // console.log("user is not exists  ")
                    return res.redirect("/student/create")
                }


            }
            else {
                // console.log("cookie is not exits user is unothorize. ")
                return res.redirect("/student/login")
            }




        } catch (error) {
            console.log(error)
            return res.status(500).json({error})
        }
    }




}



export default studentApiHandler