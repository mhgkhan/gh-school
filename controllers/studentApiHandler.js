import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


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
                        // req.session.user_id = created._id
                        res.redirect("/")
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
                    res.redirect("/")
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


}



export default studentApiHandler