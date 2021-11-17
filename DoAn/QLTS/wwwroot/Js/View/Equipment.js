
$(document).ready(function () {
    //Define dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        modal: true
    });

    equipmentJS = new EquipmentJS();
})

class EquipmentJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadPracticalLaboratory();
    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/Equipment/";
        this.getCode = "EquipmentCode";
    }

    /**
     * Load data from Pratical Laboratory table
     * Created By NTHung (17/11/2021)
     * */
    loadPracticalLaboratory() {
        try {
            let id = window.location.href;
            id = id.split("=")[1];
            $.ajax({
                url: "/api/v1/practicallaboratory/find?id=" + id,
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                $('.txt-PracticalLaboratoryID').attr('placeholder', response['PracticalLaboratoryCode']);
                $('.txt-PracticalLaboratoryID').attr('value', response['PracticalLaboratoryID']);
                var spans = $('.grid-infor span[fieldName]');
                $.each(spans, function (index, item) {
                    var fieldName = $(this).attr('fieldName');
                    if (fieldName == "Status") {
                        $(this).text(formatMaintainance(response[fieldName]));
                    }
                    else
                        $(this).text(response[fieldName]);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Events in page
     * Created By NTHung (16/11/2021)
     * */
    initEventsPage() {
        //Filter
        $('#txt-search').keypress(function (e) {
            if (e.which == 13) {
                this.filterData();
            }
        }.bind(this));
        $('.btn-search').click(function (e) {
            this.filterData();
        }.bind(this));

        //Option add or edit
        $('.dialog__content').keypress(function (e) {
            if (formModel == "Add" && e.which == 13) {
                $('#btn-save').trigger('click');
            }
            if (formModel == "Edit" && e.which == 13) {
                $('#btn-update').trigger('click');
            }
        });

        //save
        $('#btn-save').click(this.btnSaveOnClick);
        $('#btn-no-warring, #btn-yes-warring, #btn-ok-warring').click(closeWarring);
        //Update
        $('#btn-update').click(this.btnUpdateOnClick);
        //Delete
        $('#btn-yes-warring').click(this.btnDeleteOnClick);
        //Row Selected
        $('#tbListData tbody').on('click', 'tr', this.rowSelected);
        $('#btn-remove').click(this.messengerDelete);
        //Refresh

        //Import file
        $('#import').click(this.importFile);

    }

    /**
     * Filter Function
     * Created by NTHung (15/11/2021)
     * */
    filterData() {
        try {
            var value = $('#txt-search').val();
            listData = cacheData.filter(function (item) {
                return (
                    (item["EquipmentCode"].toLowerCase()).includes(value.toLowerCase()) ||
                    (item["EquipmentName"].toLowerCase()).includes(value.toLowerCase())
                );
            });
            $('.loading').show();
            $('#tbListData tbody').empty();
            generateTable(listData);
            setTimeout(function () {
                $('.loading').hide();
            }, 300);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Save function
     * Created By NTHung (15/11/2021)
     * )
     * */
    btnSaveOnClick() {
        var object = getObject();
        var isValidate = $('input[validate="false"]');
        try {
            if (isValidate.length == 0) {
                $.ajax({
                    url: "/api/v1/Equipment",
                    method: "POST",
                    data: JSON.stringify(object),
                    dataType: 'json',
                    contentType: 'application/json',
                    async: true
                }).done(function (response) {
                    if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                        showAlertWarring(response.Messenger);
                        displaynone(3000);
                    }
                    else if (response.Code = Enum.StatusResponse.Success) {
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        equipmentJS.loadData();

                    }
                }).fail(function (response) {
                    var msg = response.responseJSON.Data;
                    showAlertWarring("", msg);
                    displaynone(3000);
                })
            }

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Select row in table
     * Created by NTHung (16/11/2021)
     * */
    rowSelected() {
        try {
            $(this).addClass('row-selected');
            $(this).siblings().removeClass('row-selected');
            $('#btnUpdate, #btnDelete').removeAttr('disabled');
            recordId = $(this).data('recordId');
            recordTitle = $(this).data('recordTitle');
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Delete messenger
     * Created by NTHung (16/11/2021)
     * */
    messengerDelete() {
        var tr = $('#tbListData tbody .row-selected');
        if (tr.length == 0)
            showAlertWarring("Bạn chưa chọn phần tử muốn xóa", "");
        else {
            var msg = "Bạn chắc chắn muốn xóa " + recordTitle + " không?";
            showAlertConfirm(msg);
        }
    }

    /**
     * Delete data from database
     * Created by NTHung (16/11/2021)
     * */
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/Equipment/" + recordId,
                method: "DELETE",
                data: null,
                dataType: 'json',
                contentType: 'application/json',
                async: true
            }).done(function (response) {
                if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                    showAlertWarring(response.Messenger);
                    displaynone(3000);
                }
                else if (response.Code == Enum.StatusResponse.Success) {
                    equipmentJS.loadData();
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                    setDisabled();
                }
            }).fail(function (response) {
                console.log(response)
            });
        } catch (e) {
            alert(e);
        }
    }

    /**
     * Update data in database
     * Created by NTHung (16/11/2021)
     * */
    btnUpdateOnClick() {
        var object = getObject(recordId);
        console.log(object);
        var isValidate = $('input[validate="false"]');
        console.log(isValidate);
        try {
            if (isValidate.length == 0) {
                $.ajax({
                    url: "/api/v1/Equipment",
                    method: "PUT",
                    data: JSON.stringify(object),
                    dataType: 'json',
                    contentType: 'application/json',
                    async: true
                }).done(function (response) {
                    if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                        showAlertWarring(response.Messenger);
                        displaynone(3000);
                    }
                    else if (response.Code == Enum.StatusResponse.Success) {
                        dialog.dialog('close');
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        equipmentJS.loadData();
                        setDisabled();
                    }
                }).fail(function (response) {
                    var msg = response.Messenger;
                    //var msgLength = response.responseJSON.Data.length;
                    showAlertWarring("", msg);
                    displaynone(3000);
                })
            }
        } catch (e) {
            console.log(e);
        }
    }


    /** 
     * Import data from excel file
     * Created by NTHung (16/11/2021)
     * */
    importFile() {
        var file = document.getElementById('file_import');
        var files = file.files;
        console.log(files);
        if (files.length != 0) {
            var extensions = files[0].name;
            console.log(extensions.split('.')[1].trim());
            if (extensions.split('.')[1].trim() === 'xlsx') {
                var formData = new FormData();
                if (file.files.length) {
                    formData.append('file', files[0]);
                    $.ajax({
                        url: "/api/v1/equipment/UpLoadFile",
                        method: "POST",
                        data: formData,
                        contentType: false,
                        processData: false,
                        async: true
                    }).done(function (response) {
                        if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                            showAlertWarring(response.Messenger);
                            displaynone(3000);
                        }
                        else if (response.Code == Enum.StatusResponse.Success) {
                            showMessengerSuccess(response.Messenger);
                            equipment.loadData();
                            $('#file_import').val('');
                        }
                        else if (response.Code = Enum.StatusResponse.NotValid) {
                            setTimeout(function () {
                                showAlertWarring(response.Messenger, response.Data)
                            }, 1000);
                            $('#file_import').val('');
                        }
                    }).fail(function (response) {
                        showAlertWarring("Vui lòng kiểm tra lại file dữ liệu!");
                        $('#file_import').val('');
                        displaynone(3000);
                    })
                }
            }
            else {
                showAlertWarring("Vui lòng nhập đúng định dạng file Excel!");
                $('#file_import').val('');
                displaynone(3000);
                return;
            }
        }
        else {
            showAlertWarring("Vui lòng chọn file dữ liệu!", "");
        }
    }
}

/**
 * Lấy dữ liệu từ input qua dialog
 * @param {any} id
 * Created By NTHung (15/11/2021)
 */
function getObject(id) {
    var object = {};
    object["PracticalLaboratoryID"] = $('.txt-PracticalLaboratoryID').attr('value');
    object["EquipmentCode"] = $('.txt-EquipmentCode').val();
    object["EquipmentName"] = $('.txt-EquipmentName').val();
    object["Description"] = $('.txt-Description').val();
    object["Quantity"] = parseInt($('.txt-Quantity').val());
    object["EquipmentStatus"] = parseInt($('.cbx_status').val());
    object["EquipmentID"] = id;
    return object;
}


var recordId = null;
var recordTitle = null;
var listData = [];
var cacheData = [];
var equipment = true;
var setDisabled = true;