$(document).ready(() => {

  SDK.User.loadNav();

  $("#login-button").click((e) => {
      e.preventDefault();

    const username = $("#inputLoginUsername").val();
    const password = $("#inputLoginPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        console.log("Login error")

      } else {
          loadUser();
      }
    });

  });

  loadUser = () => {
    if(SDK.User.current().isPersonel) {
        window.location.href = "staff.html";
    } else {
        window.location.href = "shop.html";

    }

  }

    $("#createUser-button").click((e) => {

        e.preventDefault();

        const username = $("#newInputUsername").val();
        const password = $("#newInputPassword").val();
        const verifyPassword = $("#verifyPassword").val();

        if(password !== verifyPassword) {
            alert(" The passwords do not match!");

        } else {

            SDK.User.create(username, password, (err, data) => {
                if (err) {
                    $(".form-group").addClass("has-error");
                }
                else if (err){
                    console.log("Error")

                } else {
                    window.location.href = "my-page.html";
                }
            });

        }

    });

});