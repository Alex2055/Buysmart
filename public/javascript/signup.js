
const signupFormHandler = async function (event) {
  event.preventDefault();
  showSpinner($(this));
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  if (password.value === "" || email.value === ""){
    window.alert('Some fields are empty. Please enter email and password')
    document.location.replace('/signin');
  }
  else{
  fetch("/api/users", {
    method: "post",
    body: JSON.stringify({
      email: email.value,
      password: password.value
    }),
    headers: { "Content-Type": "application/json" }

  })
    .then(function () {
      document.location.replace("/home");
    })
    .catch(err => {
      $.mobile.loading("hide");
      console.log(err)
    });
};
}
document
  .querySelector("#signupSubmit")
  .addEventListener("click", signupFormHandler);