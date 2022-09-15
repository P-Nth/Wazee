const recent = document.querySelector("#recent");
const recentc = document.querySelector(".recent");
const browse = document.querySelector("#browse");
const browsec = document.querySelector(".browse");
const special = document.querySelector("#special");
const specialc = document.querySelector(".special");

recent.addEventListener("click", (e) => {
  recent.classList.add("active");
  browse.classList.remove("active");
  special.classList.remove("active");
  recentc.classList.remove("hide");
  browsec.classList.add("hide");
  specialc.classList.add("hide");
});

browse.addEventListener("click", (e) => {
  browse.classList.add("active");
  recent.classList.remove("active");
  special.classList.remove("active");
  recentc.classList.add("hide");
  browsec.classList.remove("hide");
  specialc.classList.add("hide");
});

special.addEventListener("click", (e) => {
  special.classList.add("active");
  browse.classList.remove("active");
  recent.classList.remove("active");
  recentc.classList.add("hide");
  browsec.classList.add("hide");
  specialc.classList.remove("hide");
});
