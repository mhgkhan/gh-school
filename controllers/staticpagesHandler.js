
const pageRender = (ejsfile, title) => {
    return (req, res) => {
        try {
            
            res.status(200).render(ejsfile, {title: title})
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}

class staticPagesHandler {
    // home (index) page 
    static handleIndex = pageRender("index", "HOME-SMS school management system")
    // for our mission page 
    static handleOurmissionPage = pageRender("ourmission", "Our Mission GHSMS");
    // for our story page 
    static handleOurstory = pageRender("ourstory", "Our Story GHSMS");
    // for our gallery page 
    static handleOurgallery = pageRender("ourgallery", "Our Gallery GHSMS");
    // for our addmission page 
    static handleAdmissionspage = pageRender("addmissions", "Addmissions || GHSMS");
    // for our contactus page 
    static handleContactuspage = pageRender("contactus", "Contactus || GHSMS");
    // for our student addmission page 
    static handleStudentAddmisionPage = pageRender("./student/create.ejs", "Student Addmision ")
}

export default staticPagesHandler
