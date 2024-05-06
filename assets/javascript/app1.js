// Responsive coding for website

// Set the starting image to be the "middle image" of a list of 3
let slideIndex = 1;

// Set variable names for buttons
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("ul");
const checkbox = document.querySelector("#theme-button");
const navCheckbox = document.querySelector("#theme-nav-button");
try {
  const blogNew = document.querySelector("#blogNew");
  const blogAll = document.querySelector("#blogAll");

  (function () {
    if (localStorage.getItem("blog") === "blogNew") {
      blogNew.classList.add("active");
      blogAll.classList.remove("active");
    } else {
      blogAll.classList.add("active");
      blogNew.classList.remove("active");
    }
  }) ();

  // Blog responsiveness

  blogNew.addEventListener("click", () => {
    console.log("New clicked");
    if (blogNew.classList.contains("active")) {
    } else { 
      blogNew.classList.add("active");
      blogAll.classList.remove("active");
      localStorage.setItem("blog", "blogNew");
    }
  })

  blogAll.addEventListener("click", () => {
    console.log("All clicked");
    if (blogAll.classList.contains("active")) {
      } else {
      blogAll.classList.add("active");
      blogNew.classList.remove("active");
      localStorage.setItem("blog", "blogAll");
    }
  })
  
} catch(error) {
  console.log("No Blog on this page");
}


// Set transition properties for theme switching
const transitionManager = () => {
  // create HTML style element with CSS selector that targets all
  // elements and applies CSS to disable transitions 
  const style = document.createElement("style");
  const css = document.createTextNode(`* {
    transition: none !important;
  }`);
  style.appendChild(css);

  // create functions for adding and removing the style element from
  // the page <head> tag

  const enable = () => document.head.removeChild(style);
  const disable = () => document.head.appendChild(style);
  return {enable, disable, style};
};

// Function to check the preferred/active theme of the user 
// Call this every time the website is reloaded to ensure continuity across the website

(function () {
  if (localStorage.getItem("theme") === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}) ();

// Hamburger menu listener

hamburger.addEventListener("click", openMenu);

// Try catch to avoid errors throw and code breaking
// Not ever page has a slideshow so this will throw an error if unchecked

try {
  showSlide(slideIndex);
} catch(error) {
  console.log("No Slides on this page");
}

// Navigation bar theme switch listener

navCheckbox.addEventListener("click", () => {
  // ensure the correct transition properties have been set
  const transitions = transitionManager();
  transitions.disable();

  // Call the toggle them function
  toggleTheme();

  // Check which fa-icon is active and switch correspondingly
  // Do this for both the hamburger menu theme switcher and the nav bar switcher
  // Else they will be out of sync (important if screen size changes)

  if (navCheckbox.classList.contains("fa-moon")) {
    navCheckbox.classList.replace("fa-moon", "fa-bolt-lightning");
    checkbox.classList.replace("fa-moon", "fa-bolt-lightning");
  } else {
    navCheckbox.classList.replace("fa-bolt-lightning", "fa-moon");
    checkbox.classList.replace("fa-bolt-lightning", "fa-moon");
  }

  window.getComputedStyle(transitions.style).opacity;
  transitions.enable();
})



// hamburger theme switch listener

checkbox.addEventListener("click", () => {
  // ensure the correct transition properties have been set
  const transitions = transitionManager();
  transitions.disable();

  // Call the toggle them function
  toggleTheme();

  // Check which fa-icon is active and switch correspondingly
  // Do this for both the hamburger menu theme switcher and the nav bar switcher
  // Else they will be out of sync (important if screen size changes)

  if (checkbox.classList.contains("fa-moon")) {
    checkbox.classList.replace("fa-moon", "fa-bolt-lightning");
    navCheckbox.classList.replace("fa-moon", "fa-bolt-lightning");
  } else {
    checkbox.classList.replace("fa-bolt-lightning", "fa-moon");
    navCheckbox.classList.replace("fa-bolt-lightning", "fa-moon");
  }

  window.getComputedStyle(transitions.style).opacity;
  transitions.enable();
})

// translates the hamburger menu into a cross

function openMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// function to support slideshow

function showSlide(n){
  let j = 0;
  slideIndex = n;
  let visuals = document.getElementsByClassName("visual");
  let dots = document.getElementsByClassName("dot");
  for (j=0; j < dots.length; j++) {
    visuals[j].style.display = "none";
    dots[j].className = dots[j].className.replace(" active", "");
  }
  visuals[n].style.display = "block";
  dots[n].className += (" active");
}

// allows you to incramentally flip between images/videos in slideshow

function changeSlide(m) {
  slideIndex += m;
  slideIndex %= 3;
  if (slideIndex < 0) {
    slideIndex = 2;
  }
  showSlide(slideIndex);
}

// scroll up functionality

function scrollUp() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Sets theme to that of your choosing

function setTheme(themeName) {
  document.body.className = themeName;
  localStorage.setItem("theme", themeName);
}

// Toggles theme based on your current theme

function toggleTheme(){
  if (localStorage.getItem("theme") === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

// Toggles blog category based on current category
