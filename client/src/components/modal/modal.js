import modal from "./modal.hbs";
import "./modal.scss";

const modalWrapper = document.querySelector(".modal__wrapper");
modalWrapper.innerHTML = modal();

const burgerMenuButton = document.querySelector(".burgermenu__button");
const burgerMenuIcon = document.querySelector(".burgermenu__lines");
const popupContainer = document.querySelector(".modal__container");
const popupButton = document.querySelector(".modal__button");

const popBurgerMenu = () => {
  burgerMenuIcon.classList.toggle("burgermenu__lines_active");
  popupContainer.classList.toggle("modal__container_active");
  document.querySelector(".body").classList.toggle("body_scroll-disabled");
};

const closePopupWindow = () => {
  const withinBoundaries = event.composedPath().includes(popupContainer);
  const popupIsActive = popupContainer.classList.contains(
    "modal__container_active"
  );

  if (!withinBoundaries && popupIsActive) popBurgerMenu();
};

burgerMenuButton.addEventListener("click", (event) => {
  event.stopPropagation();
  popBurgerMenu();
});

document.addEventListener("click", closePopupWindow);

popupButton.addEventListener("click", popBurgerMenu);
