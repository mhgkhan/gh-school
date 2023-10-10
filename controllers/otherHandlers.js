

export const gotoErrorPage = (res, error,status)=>{
    console.log("the status is ", status)
    console.log("form gotoerrpage the err is ", error)
    return res.status(status).render("error.ejs",{
        title:"ERROR IN PAGE",
        error:error
    })
}

