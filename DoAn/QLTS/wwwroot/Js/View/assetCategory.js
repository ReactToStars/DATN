$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $("#assetCategory_dialog").dialog({
        autoOpen: false,
        height:408,
        width: 350,
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