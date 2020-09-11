const signupFormHandler = async function(event) {
    event.preventDefault();
    const username = document.querySelector("#userName");
    const password = document.querySelector("#passWord");
    fetch("/api/user", {
        method: "post",
        body: JSON.stringify({
          email: email.value,
          password: password.value
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(function() {
          document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
    };

    document
  .querySelector("#signupSubmit")
  .addEventListener("submit", signupFormHandler);