$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.current();
    const $itemList = $("#item-list");

    if(currentUser) {

    SDK.Item.findAll((err, items) => {
    items.forEach((item) => {

    const itemHtml = `
        <div class="col-lg-4 item-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${item.itemName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                    <img src="${item.itemImage}"/>
                    </div>
                    <div class="col-lg-4">
                      <dl>
                        <dt>Description</dt>
                        <dd>${item.itemDescription}</dd>
                       
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${item.itemPrice}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success basket-button" data-item-id="${item.itemId}">Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

$itemList.append(itemHtml);

});

$(".basket-button").click(function () {
    const itemId = $(this).data("item-id");
    const item = items.find((item) => item.itemId === itemId);
    SDK.Item.addToBasket(item);
    $("#purchase-modal").modal("toggle");

  });
});

$("#purchase-modal").on("shown.bs.modal", () => {
    const basket = SDK.Storage.load("basket");
    const $modalTbody = $("#modal-tbody");
    $modalTbody.empty();
    basket.forEach((entry) => {
        const total = entry.item.itemPrice * entry.count;
        $modalTbody.append(`
      <tr>
          <td>
             <img src="${entry.item.itemImage}" height="60"/>
          </td>
            <td>${entry.item.itemName}</td>
            <td>${entry.count}</td>
            <td>${entry.item.itemPrice} kr.</td>
            <td>${total} kr.</td>
            <td>
            <button class="btn btn-default remove-icon" data-item-id="${entry.item.itemId}">
                <span class="glyphicon glyphicon-remove"></span>
            </button>
            </td>
                
      </tr>
      
    `);

    });

    $(".remove-icon").click(function () {
        const itemId = $(this).data("item-id");
        SDK.Item.removeFromBasket(itemId);
        $("#purchase-modal").modal("toggle");

    });

 });

    } else {
        window.location.href = "login.html";
    }

});