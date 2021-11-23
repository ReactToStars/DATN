
$(document).ready(function () {

    //Define Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        modal: true,
    });

    maintainanceJS = new MaintainanceJS();

})

class MaintainanceJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadPracticalLaboratory();
        this.loadTechnicalStaff();
    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/maintainance/";
        this.getCode = "";
    }

    /**
    *   Events for web page
     *  Created by NTHung (20/11/2021)
     * */
    initEventsPage() {

        $('#cbx_practicalLaboratory').on('change', function () {
            this.filterData();
        }.bind(this));

        $('#cbx_technicalStaff').on('change', function () {
            this.filterData();
        }.bind(this));

        $('.dialog__content').keypress(function (e) {
            if (formModel == "Add" && e.which == 13) {
                $('#btn-save').trigger('click');
            }
            if (formModel == "Edit" && e.which == 13) {
                $('#btn-update').trigger('click');
            }
        });
        $('#btn-save').click(this.btnSaveOnClick);
        $('#btn-ok-warring,#btn-no-warring,#btn-yes-warring,.close').click(closeWarring);
        $("#tbListData tbody ").on('click', 'tr', this.rowSelected);
        $('#btn-remove').click(this.messengerDelete);

        $('#btn-yes-warring').click(this.btnDeleteOnClick);
        $('#btn-update').click(this.btnUpdateOnClick);
        $('#import').click(this.importFile);

    }

    /**
     * Import data from excel
     * */
    importFile() {
        var file = document.getElementById('file_import');
        var files = file.files;
        var formData = new FormData();
        if (file.files.length) {
            for (var i = 0; i <= file.files.length - 1; i++) {
                formData.append("file", files[i]);
            }
            $.ajax({
                url: "/api/v1/maintainance/UploadFile",
                method: "Post",
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
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                    maintainanceJS.loadData();
                    $('#file_import').val('');

                }
                else if (response.Code == Enum.StatusResponse.NotValid) {
                    setTimeout(function () {
                        showAlertWarring(response.Messenger, response.Data);
                    }, 1000);
                    moduleclassJS.loadData();
                    $('#file_import').val('');

                }

            }).fail(function (response) {
                $('#file_import').val('');
                showAlertWarring('Vui lòng kiểm tra lại file dữ liệu!');
                displaynone(3000);
                console.log(response);
            })
        }
        else {
            showAlertWarring("Vui lòng nhập đúng định dạng file Excel!");
            $('#file_import').val('');
            displaynone(3000);
            return;
        }
    }

    /**
    * Load data from Practical Laboratory Table
    * Created by NTHung (20/11/2021)
    */
    loadPracticalLaboratory() {
        try {
            $.ajax({
                url: "/api/v1/practicallaboratory",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['PracticalLaboratoryID'] + `>` + item['PracticalLaboratoryName'] + `</option>`);
                    $('.cbx_practicalLaboratory ').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Load data from Technical Staff Table
     * Created by NTHung (20/11/2021)
     * */
    loadTechnicalStaff() {
        try {
            $.ajax({
                url: "/api/v1/technicalstaff",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['TechnicalStaffID'] + `>` + item['FullName'] + `</option>`);
                    $('.cbx_technicalStaff').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    

    /**
     * Save data 
     * Created by NTHung (20/11/2021)
     */
    btnSaveOnClick() {
        var object = getObject();
        console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/maintainance",
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
                    else if (response.Code == Enum.StatusResponse.Success) {
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        maintainanceJS.loadData();
                    }
                }).fail(function (response) {
                    //console.log(response);
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
     * tr selected function
     * Created by NTHung (20/11/2021)
     * */
    rowSelected() {
        try {
            $(this).addClass('row-selected');
            $(this).siblings().removeClass("row-selected");
            //$("#btnUpdate,#btnDelete").removeAttr("disabled");
            recordId = $(this).data('recordId');
            recordTitle = $(this).data('recordTitle');
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * Get message when delete a record
    * Created by NTHung (20/11/2021)
    * */
    messengerDelete() {
        var tr = $('#tbListData tbody .row-selected');
        if (tr.length == 0) {
            showAlertWarring("Bạn chưa chọn phần tử muốn xóa!", "")
        }
        else {
            var msg = "Bạn có chắc chắn muốn xóa " + recordTitle + " không?";
            showAlertConfirm(msg)
        }
    }

    /**
     * Delete data from database
     * Created by NTHung (20/11/2021)
     * */
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/maintainance/" + recordId,
                method: "DELETE",
                //data: null,
                dataType: 'json',
                contentType: 'application/json',
                async: true
            }).done(function (response) {
                if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                    showAlertWarring(response.Messenger);
                    displaynone(3000);
                }
                else if (response.Code == Enum.StatusResponse.Success) {
                    maintainanceJS.loadData();
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                }
            }).fail(function (response) {
                console.log(response);
            })

        } catch (e) {
            alert(e);
        }
    }


    /**
     * Update data to database
     * Created by NTHung (20/11/2021)
     */
    btnUpdateOnClick() {
        var object = getObject(recordId);
        console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/maintainance",
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
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        maintainanceJS.loadData();
                    }
                }).fail(function (response) {
                    //console.log(response);
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
     * Filter function
     * Created by NTHung (20/11/2021)
     * */
    filterData() {
        try {
            var practicalLaboratoryId = $('#cbx_practicalLaboratory option:selected ').val();
            var technicalStaffId = $('#cbx_technicalStaff option:selected ').val();

            listData = cacheData.filter(function (item) {
                return item["MaintainanceID"]
                &&(practicalLaboratoryId ? item["PracticalLaboratoryID"] === practicalLaboratoryId : item["PracticalLaboratoryID"] != practicalLaboratoryId)
                && (technicalStaffId ? item["TechnicalStaffID"] === technicalStaffId : item["TechnicalStaffID"] != technicalStaffId);
            });

            $('.loading').show();
            $('#tbListData tbody').empty();
            generateTable(listData);
            setTimeout(function () {
                $('.loading').hide();
            }, 300)

        } catch (e) {
            console.log(e);
        }
    }
}
var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];

