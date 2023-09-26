import ContactModel from '../Models/Contactus.js'



class contactApiHandler {


    static handleContactPost = async (req, res) => {
        try {

            const { name, email, message } = req.body


            if (!name || name.length < 4 || !email || email.length < 6 || !message || message.length < 10) {
                return res.status(200).render("contactus", {
                    title: "Please Enter valid data",
                    responseMsg: "Please enter valid data first "
                });
            }

            else {

                // checking the length of this user contactus messages if the user contactus messages length is grater than 8 so i not save to database else next()

                let messagesUser
                try {
                    messagesUser = await ContactModel.find({ email });
                } catch (error) {
                    return res.redirect("/");
                }

                if (messagesUser.length < 9) {
                    ContactModel.create({
                        email,
                        name,
                        message
                    })
                    res.redirect("/")
                }

                else {
                    res.redirect("/")
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

