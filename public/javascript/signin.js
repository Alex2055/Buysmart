
const loginFormHandler = async function(event) {
    event.preventDefault();
    showSpinner($(this));
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    fetch("/api/users/signin", {
      method: "post",
      body: JSON.stringify({
        email: email.value,
        password: password.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
         document.location.replace("/home");
      })
      .catch(err => {
          $.mobile.loading( "hide" );
        console.log(err)
      });
  };
  
  document
    .querySelector("#signinSubmit")
    .addEventListener("click", loginFormHandler);
  