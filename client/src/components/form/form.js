import form from "./form.hbs";
import "./form.scss";
import { validateIsFieldEmpty } from "../../utils/validation/validateIsFieldEmpty";
import { validateIsEmailValid } from "../../utils/validation/validateIsEmailValid";
import { validationIsPhoneValid } from "../../utils/validationIsPhoneValid";
import { validationIsNameValid } from "../../utils/validation/validationIsNameValid";
import { sendUserData } from "../../api/registration";

const wrapper = document.querySelector(".form__wrapper");
wrapper.innerHTML = form();

const formButtonOnclickHandler = () => {
  const name = document.querySelector(".form__inputName");
  const email = document.querySelector(".form__inputEmail");
  const phone = document.querySelector(".form__inputPhone");
  const message = document.querySelector(".form__inputMessage");

  const validationsResults = {
    name: {
      fieldName: "Name",
      isEmpty: validateIsFieldEmpty(name.value),
      isValid: validationIsNameValid(name.value),
      validationMessage:
        "Name must consist of at least three characters and contains no numbers or symbols",
    },
    email: {
      fieldName: "Email",
      isEmpty: validateIsFieldEmpty(email.value),
      isValid: validateIsEmailValid(email.value),
      validationMessage: "Please enter a valid email address",
    },
    phone: {
      fieldName: "Phone",
      isEmpty: validateIsFieldEmpty(phone.value),
      isValid: validationIsPhoneValid(phone.value),
      validationMessage: "Please enter a valid phone number",
    },
    message: {
      fieldName: "Message",
      isEmpty: validateIsFieldEmpty(message.value),
      isValid: !validateIsFieldEmpty(message.value),
    },
  };

  Object.values(validationsResults).forEach((el) => {
    if (!el.isValid) {
      document.querySelector(`.form__message${el.fieldName}`).innerHTML =
        el.validationMessage;
      document
        .querySelector(`.form__input${el.fieldName}`)
        .classList.add("form__input_error");
    } else {
      document.querySelector(`.form__message${el.fieldName}`).innerHTML = "";
      document
        .querySelector(`.form__input${el.fieldName}`)
        .classList.remove("form__input_error");
    }
    if (el.isEmpty) {
      document.querySelector(`.form__message${el.fieldName}`).innerHTML =
        "This field is required";
    }
  });

  const isFormValid =
    validationsResults.name.isValid &&
    validationsResults.email.isValid &&
    validationsResults.phone.isValid &&
    validationsResults.message.isValid;

  if (isFormValid) {
    const userData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };
    const loader = document.querySelector(".form__loader");
    const responseMessage = document.querySelector(".form__responseMessage");

    loader.classList.toggle("loader_hidden");
    responseMessage.innerHTML = "";
    sendUserData(userData)
      .then((res) => {
        responseMessage.innerHTML = res.message;
        if (res.status === "success") {
          Object.values(validationsResults).forEach((el) => {
            document.querySelector(`.form__input${el.fieldName}`).value = "";
          });
        }
      })
      .catch((err) => {
        responseMessage.innerHTML = "Registration failed";
      })
      .finally(() => {
        loader.classList.toggle("loader_hidden");
      });
  }
};

const formButton = document.querySelector(".form__button");
formButton.addEventListener("click", formButtonOnclickHandler);
