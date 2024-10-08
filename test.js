const form = document.getElementById("form");
const firstName = document.getElementById("FIRSTNAME");
const email = document.getElementById("input-EMAIL");
const password = document.getElementById("input-PASSWORD");
const repeatPassword = document.getElementById("repeat-input-PASSWORD");
const error_message = document.getElementById("error-message");
form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstName) {
    errors = getSignUpFormErrors(
      firstName.value,
      email.value,
      password.value,
      repeatPassword.value
    );
  } else {
    errors = getLoginFormErrors(email.value, password.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  } else {
    e.preventDefault();
    const inputsToSave = firstName
      ? [firstName.value, email.value, password.value]
      : [email.value, password.value];

    saveInputs(inputsToSave);

    window.location.href = "dashboard.html";
  }
});
function getSignUpFormErrors(firstname, Email, PassWord, repeatPassWord) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("FirstName is required");
    firstName.parentElement.classList.add("incorrect");
  }
  if (Email === "" || Email == null) {
    errors.push("Email is required");
    email.parentElement.classList.add("incorrect");
  }
  if (PassWord === "" || PassWord == null) {
    errors.push(" Password is required");
    password.parentElement.classList.add("incorrect");
  }
  if (PassWord.length < 8) {
    errors.push("Password must have at least 8 characters");
    password.parentElement.classList.add("incorrect");
  }
  if (PassWord !== repeatPassWord) {
    errors.push("Password does not match repeated password ");
    password.parentElement.classList.add("incorrect");
    repeatPassword.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(Email, PassWord) {
  let errors = [];

  if (Email === "" || Email == null) {
    errors.push("Email is required");
    email.parentElement.classList.add("incorrect");
  }
  if (PassWord === "" || PassWord == null) {
    errors.push(" Password is required");
    password.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [firstName, email, password, repeatPassword].filter(
  (input) => input != null
);
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});
function saveInputs(inputs) {
  localStorage.setItem("savedInputs", JSON.stringify(inputs));
}

// function dashboard() {
//   window.location.href = "dashboard.html";
// }
