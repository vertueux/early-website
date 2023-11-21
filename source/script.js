const hamburgerToggler = document.querySelector(".hamburger")
const navLinksContainer = document.querySelector(".navlinks-container")
let root = document.documentElement;

const toggleNav = () => {
    hamburgerToggler.classList.toggle("open")
    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle)
    if (ariaToggle == "true") {
        root.style.setProperty('--blurred-background', "blur(4px)");
    } else {
        root.style.setProperty('--blurred-background', "blur(0px)");
    }
    navLinksContainer.classList.toggle("open")
}

hamburgerToggler.addEventListener("click", toggleNav)

new ResizeObserver(entries => {
    if (entries[0].contentRect.width <= 1200) {
        navLinksContainer.style.transition = "transform 0.2s ease-out"
    } else {
        navLinksContainer.style.transition = "none";
        root.style.setProperty('--blurred-background', "blur(0px)");
    }
}).observe(document.body)