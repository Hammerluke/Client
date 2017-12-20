
$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.current();

    if(currentUser) {
        if (SDK.User.current().isPersonel) {

        $("#createItemBtn").click(() => {
            const $itemName = $("#itemName").val();
            const $itemDesc = $("#itemDescription").val();
            const $itemPrice = $("#itemPrice").val();
            const $itemImage = $("#itemImage").val();

            SDK.Item.create($itemName, $itemDesc, $itemPrice, $itemImage, (err, data) =>{
                if (err && err.xhr.status !== 200){
                    console.log("Could not create item")
                }
                else{
                    console.log("Item created");
                    window.alert("Item created.");
                    window.location.reload();
                }
            });
        });

    } else {
    window.location.href = "mypage.html";
    }

    } else {
     window.location.href = "login.html";
    }
});


