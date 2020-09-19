function logout() {
  showSpinner($(this));
  fetch("/api/users/signout", {
    method: "post",
    headers: { "Content-Type": "application/json" }
  })
    .then(function () {
      document.location.replace("/");
    })
    .catch(err => console.log(err));
}

document.querySelector("#signout").addEventListener("click", logout);