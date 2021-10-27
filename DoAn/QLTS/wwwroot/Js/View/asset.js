$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $("#asset_dialog").dialog({
        autoOpen: false,
        height: 483,
        width: 700,
        modal: true,
    });
    AssetCategory = new assetCategory();
    //loadData();
})

class assetCategory extends BaseJS {
    constructor() {
        super();
    }
}