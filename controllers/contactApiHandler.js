import ContactModel from '../Models/Contactus.js'



class contactApiHandler {


    static handleContactPost = async (req, res) => {
        try {

            const { name, email, message } = req.body


            if (!name || name.length < 4 || !email || email.length < 6 || !message || message.length < 10) {
                return res.status(400).json({
                    success:false,
                    error:"All fields are required for contact try again"
                });
            }

            else {

                // checking the length of this user contactus messages if the user contactus messages length is grater than 8 so i not save to database else next()

                let messagesUser
                try {
                    messagesUser = await ContactModel.find({ email });
                } catch (error) {
                    return res.status(500).json({success:false,error:error})
                }

                if (messagesUser.length < 9) {
                    ContactModel.create({
                        email,
                        name,
                        message
                    })
                    return res.status(201).json({success:true,msg:"Your message has been submit sucessfully.."})
                }

                else {
                    res.status(400).json({
                        success:false,
                        error:"you completed your contactus messages trail"
                    })
                }
            }


        } catch (error) {
            // please after complete this portion 
            // remove json response and replace to the redirect("/")
            res.status(500).json({ error: error })
        }
    }


}


export default contactApiHandler

