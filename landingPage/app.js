const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

//for toggle navigation
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

//show the modal
open.addEventListener("click", () => modal.classList.add("show-modal"));

//hide the modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
