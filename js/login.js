$(document).ready(() => {

  SDK.User.loadNav();

  $("#login-button").click((e) => {
      e.preventDefault();

    const username = $("#inputLoginUsername").val();
    const password = $("#inputLoginPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        console.log("Login error")
      } else {
          console.log(data);
          window.location.href = "my-page.html";
      }
    });

  });

    $("#signup-button").click((e) => {
        e.preventDefault();

        const username = $("#inputSignupUsername").val();
        const password = $("#inputSignupPassword").val();

        SDK.User.signup(username, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");
            }
            else if (err){
                console.log("Sign up error")
            } else {
                window.location.href = "login.html";

         }
      });

    });
});