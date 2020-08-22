const formContainer = document.querySelector(".form-container");
const name = document.getElementById("name");
const email = document.getElementById("email");
const college = document.getElementById("college");
const contactNo = document.getElementById("contact-no");
const yearOfStudy = document.getElementById("year-of-study");
const department = document.getElementById("department");
const ieeeSection = document.getElementById("ieee-section");
const ieeeRegion = document.getElementById("ieee-region");
const message = document.getElementById("message");

const scriptURL =
  "https://script.google.com/macros/s/AKfycby7ZTmHh3-1X5d0c63wiimhi6qwZb6OKZBoVjIPR0fbVfEdWyg/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateForm() && confirm("Are You Sure?")) {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(response => {
        // console.log(response);
        hideFormDisplaySuccess();
      })
      .catch(error => console.error("Error!", error.message));
  }
});

function hideFormDisplaySuccess() {
  document.querySelector(".form-container").style.display = "none";
  let div = document.createElement("div");
  div.innerHTML = `
    <i class="fa fa-check-circle fa-3x" aria-hidden="true"></i>
    <h3>Thank You For Registering To SPAAM 20.</h3>
    <br>
    <h5><a href="./index.html" class="text-white">Back to home</a></h5>
  `;
  div.className = "successContainer";
  document.querySelector(".container").appendChild(div);
}

function validateForm() {
  const checked = Array.from(
    document.querySelectorAll("input[name=events]:checked")
  );
  const isMember = document.querySelector("input[name=isMember]:checked");
  if (
    name.value == "" ||
    email.value == "" ||
    college.value == "" ||
    contactNo.value == "" ||
    department.value == "" ||
    ieeeSection.value == "" ||
    ieeeRegion.value == ""
  ) {
    showMessage("alert alert-danger", "Fields shouldn't be empty");
  } else if (!isValidEmail(email.value)) {
    showMessage("alert alert-danger", "Invalid Email Address");
  } else if (!isPhoneValid(contactNo.value)) {
    showMessage("alert alert-danger", "Phone number invalid");
  } else if (checked.length === 0) {
    showMessage("alert alert-danger", "No events selected");
  } else if (yearOfStudy.value === "") {
    showMessage("alert alert-danger", "Year of study not selected");
  } else if (isMember == null) {
    showMessage("alert alert-danger", "Check if you are an IEEE Member");
  } else {
    return true;
  }
}

function showMessage(classes, msg) {
  let div = document.createElement("div");
  div.className = classes;
  div.textContent = msg;
  formContainer.insertBefore(div, form);
  scrollTo(0, 0);

  setTimeout(() => {
    div.remove();
  }, 3000);
}

function isPhoneValid(inputtxt) {
  // var phoneno = /^\d{10}$/;
  var phoneno = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
