$(document).ready(() => {

  SDK.User.loadNav();
  const currentUser = SDK.User.current();
  const $basketTbody = $("#basket-tbody");
  const $nothingInBasketContainer = $("#nothing-in-basket-container");
  const $checkoutTableContainer = $("#checkout-table-container");

  if(currentUser) {
      if (!SDK.User.current().isPersonel) {

     function loadBasket() {
         const basket = SDK.Storage.load("basket") || [];
         let total = 0;

         $nothingInBasketContainer.show();

         if (!basket.length) {
             $("#checkout-table-container").hide();
         } else {
             $nothingInBasketContainer.hide();
         }

         basket.forEach(entry => {
             let subtotal = entry.item.itemPrice * entry.count;
             total += subtotal;

             $basketTbody.append(`
        <tr>
            <td>
               <img src="${entry.item.itemImage}" height="120"/>
            </td>
            <td>${entry.item.itemName}</td>
            <td>
            <button class="btn btn-default removeOne-icon" data-item-id="${entry.item.itemId}">
            <span class="glyphicon glyphicon-minus"></span>
            </button>
            ${entry.count}
            <button class="btn btn-default add-icon" data-item-id="${entry.item.itemId}">
            <span class="glyphicon glyphicon-plus"></span>
            </button>
            </td>
            <td>${entry.item.itemPrice} kr.</td>
            <td>${subtotal} kr.</td>
        <td>
        <button class="btn btn-default removeLength-icon" data-item-id="${entry.item.itemId}">
            <span class="glyphicon glyphicon-remove"></span>
         </button>
            </td>
        </td>
      `);
           });

    $basketTbody.append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Total</b></td>
        <td>${total} kr.</td>
        <td></td>
      </tr>
    `);

      }

      loadBasket();

      $(".add-icon").click(function () {
          const itemId = $(this).data("item-id");
          SDK.Item.addOneToBasket(itemId);
          location.reload();
      });

      $(".removeOne-icon").click(function () {
           const itemId = $(this).data("item-id");
           SDK.Item.removeFromBasket(itemId);
           location.reload();
          });

          $(".removeLength-icon").click(function () {
              const itemId = $(this).data("item-id");
              SDK.Item.removeBasketLength(itemId);
              location.reload();
          });

      $("#clear-basket-button").click(() => {
          SDK.Storage.remove("basket");
          loadBasket();
      });

      $("#checkout-button").click(() => {
          const basket = SDK.Storage.load("basket");
          const selectedItems = [];
          for(let i = 0; i < basket.length; i++){
              for(let j = 0; j < basket [i].count; j++){
                 selectedItems.push(basket[i].item);
              }
          }

    SDK.Order.create(selectedItems, err => {
      if (err) throw err;
      $("#order-alert-container").find(".alert-success").show();
      SDK.Storage.remove("basket");
      loadBasket();
      $nothingInBasketContainer.hide();
    });
  });

  } else {
      window.location.href = "staff.html";
  }
} else {
    window.location.href = "login.html";
}

});