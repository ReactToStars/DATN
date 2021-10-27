
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $("#department_dialog").dialog({
        autoOpen: false,
        height: 347,
        width: 350,
        modal: true,
    });

     department = new Department();
    //loadData();
})

class Department extends BaseJS{
    constructor() {
        super();
    }
}