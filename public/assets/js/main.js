const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const closeMenu = document.getElementById("closeMenu")


let open = true
menuBtn.addEventListener("click", e => {
    
    if (!open) {
        navMenu.style.height = "0px"
        open = true
    }
    else {
        navMenu.style.height = "auto"
        open = false
    }
})

closeMenu.addEventListener("click", e => {
    navMenu.style.height = "0px"
    open = true
})
