const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const closeMenu = document.getElementById("closeMenu")


let open = true
menuBtn.addEventListener("click", e => {
    if (!open) {
        navMenu.style.transform = "translateY(-500px)"
        navMenu.style.zIndex = "-1"
        open = true
    }
    else {
        navMenu.style.transform = "translateY(0px)"
        navMenu.style.zIndex = "1"
        open = false
    }
})

closeMenu.addEventListener("click", e=>{
    navMenu.style.transform = "translateY(-500px)"
    navMenu.style.zIndex = "-1"
    open = true
})