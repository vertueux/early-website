const hamburgerToggler = document.querySelector(".hamburger")
const navLinksContainer = document.querySelector(".navlinks-container")
const search = document.querySelector('.input-group input');
const table_rows = document.querySelectorAll('tbody tr');
const navbar = document.querySelector("nav");
const footer = document.querySelector("footer");
const page = document.querySelector(".page");
const logo = document.getElementById("logo");
const onHomePage = document.querySelector(".on-home-page");

var navOpen = false;
var isOverlapping = false;
var preventReopening = false;

const toggleNav = () => {
    // Stop scrolling.
    document.body.classList.add("stop-scrolling");

    hamburgerToggler.classList.toggle("open")
    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle)
    if (navOpen == true) {
        // Closing the navbar.
        navOpen = false;
    } else if (preventReopening == false) {
        navOpen = true;
    }
    if (navOpen == false) {
        checkOverlap();
        document.body.classList.remove("stop-scrolling");
    }
    if (ariaToggle == "true") {
        // Prevent from clicking.
        page.style.setProperty('pointer-events', "none");
        page.style.setProperty('filter', "brightness(0.3)");
        footer.style.setProperty('filter', "brightness(0.3)");
        logo.style.setProperty('filter', "brightness(0.3)");
    } else {
        page.style.setProperty('pointer-events', "auto");
        page.style.setProperty('filter', "brightness(1.0)");
        footer.style.setProperty('filter', "brightness(1.0)");
        logo.style.setProperty('filter', "brightness(1.0)");
    }
    navLinksContainer.classList.toggle("open");
}

hamburgerToggler.addEventListener("click", toggleNav);

function closeNav() {
    preventReopening = true;
    navOpen = false;
    toggleNav();
    preventReopening = false;
}

document.addEventListener("click", (evt) => {
    var w = window.innerWidth;
    if (w <= 1300) {
        let targetEl = evt.target;    
        do {
            if(targetEl == navLinksContainer || targetEl == hamburgerToggler) {
                return;
            }
            targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.      
        if (navOpen == true) {
            closeNav();
        }
    }
});
new ResizeObserver(entries => {
    if (entries[0].contentRect.width <= 1300) {
        navLinksContainer.style.transition = "transform 0.1s ease-out";
        if (navOpen == true) {
            navLinksContainer.style.setProperty('display', "block");
            page.style.setProperty('pointer-events', "none");
            document.body.classList.add("stop-scrolling");
            page.style.setProperty('filter', "brightness(0.3)");
            footer.style.setProperty('filter', "brightness(0.3)");
            logo.style.setProperty('filter', "brightness(0.3)");
        }
    } else {
        navLinksContainer.style.transition = "none";
        if (navOpen == true) {
            navLinksContainer.style.setProperty('display', "none");
            document.body.classList.remove("stop-scrolling");
            page.style.setProperty('pointer-events', "auto");
            page.style.setProperty('filter', "brightness(1.0)");
            footer.style.setProperty('filter', "brightness(1.0)");
            logo.style.setProperty('filter', "brightness(1.0)");
        }
    }
}).observe(document.body)

search.addEventListener('input', searchTable)

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();
            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
            row.style.setProperty('--delay', i/25 + 's');
    })
}

function searchTableEnter(event) {
    if (event.keyCode === 13) { 
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();
                row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
                row.style.setProperty('--delay', i/25 + 's');
        })
    }
}