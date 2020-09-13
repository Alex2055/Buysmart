
const signupFormHandler = async function(event) {
  $( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})
.on( "click", ".hide-page-loading-msg", function() {
    $.mobile.loading( "hide" );
});
     event.preventDefault();
     const email = document.querySelector("#email");
     const password = document.querySelector("#password");
    fetch("/api/users", {
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
        .catch(err => console.log(err));
    };

    document
  .querySelector("#signupSubmit")
  .addEventListener("click", signupFormHandler);