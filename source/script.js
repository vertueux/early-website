const hamburgerToggler = document.querySelector(".hamburger")
const navLinksContainer = document.querySelector(".navlinks-container")
const search = document.querySelector('.input-group input');
const search_button = document.querySelector('.search__button');
const table_rows = document.querySelectorAll('tbody tr');
const welcome = document.querySelector('.welcome');
const navbar = document.querySelector("nav");
const footer = document.querySelector("footer");
const page = document.querySelector(".page");
const logo = document.getElementById("logo");

var navOpen = false;
var isOverlapping = false;
var preventReopening = false;

var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  welcome.innerHTML = "Good morning.";
  welcome.style.setProperty('--steps', "13");
} else if (curHr < 18) {
    welcome.innerHTML = "Good afternoon.";
    welcome.style.setProperty('--steps', "15");
} else {
    welcome.innerHTML = "Good evening.";
    welcome.style.setProperty('--steps', "13");
}


const toggleNav = () => {
    // Stop scrolling.
    document.body.classList.add("stop-scrolling");

    hamburgerToggler.classList.toggle("open")
    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle)
    if (isOverlapping == true) navbar.style.setProperty('background-color', "rgb(76, 76, 76)");
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
    let targetEl = evt.target; // clicked element      
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
});

new ResizeObserver(entries => {
    if (entries[0].contentRect.width <= 1600) {
        navLinksContainer.style.transition = "transform 0.1s ease-out";
    } else {
        navLinksContainer.style.transition = "none";
    }
}).observe(document.body)

if (search_button || search) {
    search_button.addEventListener('click', searchTable)
    search.addEventListener('keypress', searchTableEnter);
}

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

// For the animation. 
if (welcome) {
    welcome.addEventListener("animationend", () => {
        welcome.classList.toggle('cursor');
    });
}

function checkOverlap() {
    const navrect = navbar.getBoundingClientRect();
    const footrect = footer.getBoundingClientRect();
    if (navrect.top <= footrect.top + footrect.height && navrect.top + navrect.height > footrect.top
        && (search || search_button)) { 
        // Touching or overlapping.
        isOverlapping = true;
        if (navOpen == false) navbar.style.setProperty('background-color', "white");
    } else { 
        if (search || search_button) {
            navbar.style.setProperty('background-color', "transparent");
            isOverlapping = false;
        }
    } 
}

window.addEventListener('scroll', checkOverlap);