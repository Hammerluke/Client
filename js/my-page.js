$(document).ready(() => {

  SDK.User.loadNav()
  const currentUser = SDK.User.current();
  const $basketTbody = $("#basket-tbody");

    if(currentUser) {

  $(".page-header").html(`
    <h1>Hi, ${currentUser.username}</h1>
  `);

  SDK.Order.findMine((err, orders) => {
    if(err) throw err;
    orders.forEach(order => {

        for (let i = 0; i < order.items.length; i++) {

            let orderStatus = "";
            if (order.isReady === true) {
                orderStatus = "Ready for pickup";
            } else {
                orderStatus = "Not ready"
        }

            $basketTbody.append(`
            <tr>
            <td>${order.orderId}</td>
            <td>${order.items[i].itemName}</td>
            <td>${order.items[i].itemPrice + " kr."}</td>
            <td>${orderStatus}</td>
            </tr>
          `);
        }
    });
  });

    } else {
        window.location.href = "login.html";
    }

});