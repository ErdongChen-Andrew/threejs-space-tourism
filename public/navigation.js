const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const allLinks = document.querySelectorAll(".primary-navigation>li")

// Adding click event in order to change the active bar at the bottom
navToggle.addEventListener("click", () => {
  const navVisibility = nav.getAttribute("data-visible");

  if (navVisibility === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Adding click event to each li to trigger the inside link
[...allLinks].forEach(item => {
  item.addEventListener("click", ()=>{
    item.children.item(0).click();
  })
});