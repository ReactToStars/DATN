$(document).ready(function () {

    //Define Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        //height: auto,
        modal: true,


    });

    technicalStaffJS = new TechnicalStaffJS();

})

class TechnicalStaffJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/technicalstaff/";
        this.getCode = "TechnicalStaffCode";
    }

    /**
    * Events in webpage
    * Created By NTHung (19/11/2021)
     * */
    initEventsPage() {

        $('#txt-search').keypress(function (e) {
            if (e.which == 13) {
                this.filterData();
            }
        }.bind(this));
        $('.btn-search').click(function (e) {
            this.filterData();
        }.bind(this));

        $('#cbx_subject').on('change', function () {
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
     * Import data to database
     * Create by NTHung (19/11/2021)
     * */
    importFile() {
        var file = document.getElementById('file_import');
        var files = file.files;
        if (files.length != 0) {
            var extensions = files[0].name;
            if (extensions.split('.')[1].trim() === "xlsx") {
                var formData = new FormData();
                if (file.files.length) {
                    formData.append("file", files[0]);
                    $.ajax({
                        url: "/api/v1/technicalstaff/UploadFile",
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
                            technicalStaffJS.loadData();
                            $('#file_import').val('');

                        }
                        else if (response.Code == Enum.StatusResponse.NotValid) {
                            setTimeout(function () {
                                showAlertWarring(response.Messenger, response.Data);
                            }, 1000);
                            teacherJS.loadData();
                            $('#file_import').val('');

                        }

                    }).fail(function (response) {
                        $('#file_import').val('');
                        showAlertWarring('Vui lòng kiểm tra lại file dữ liệu!');
                        displaynone(3000);
                        console.log(response);
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

    /**
     * Save data
     * Created by NTHung (19/11/2021)
     */
    btnSaveOnClick() {
        var object = getObject();
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/technicalstaff",
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
                        technicalStaffJS.loadData();
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
     * Sự kiện khi click vào một dòng tr trong table
     * Author: Nguyen Dang Tung(31/12/2020)
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
    * Lấy ra câu thông báo khi nhấn nút Xóa
    * Author: Nguyen Dang Tung(31/12/2020)
    * */
    messengerDelete() {
        var tr = $('#tbListData tbody .row-selected');
        if (tr.length == 0) {
            showAlertWarring("Bạn chưa chọn phần tử muốn xóa!", "")
        }
        else {
            var msg = "Bạn có chắc chắn muốn xóa " + recordTitle + " không?";
            showAlertConfirm(msg);
        }
    }

    /**
     * Delete data from database
     * created By NTHung (19/11/2021)
     * */
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/technicalstaff/" + recordId,
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
                    technicalStaffJS.loadData();
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                }
            }).fail(function (response) {
                console.log(response);
            });

        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Update data to database
     * Created By NTHung (19/11/2021)
     */
    btnUpdateOnClick() {
        var object = getObject(recordId);
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/technicalstaff",
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
                        technicalStaffJS.loadData();
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
     * Created By NTHung (19/11/2021)
     * */
    filterData() {
        try {

            var value = $('#txt-search').val();
            listData = cacheData.filter(function (item) {
                return item["TechnicalStaffCode"].toLowerCase().includes(value.toLowerCase())
                    || item["FullName"].toLowerCase().includes(value.toLowerCase())
                    || item["PhoneNumber"].toLowerCase().includes(value.toLowerCase());
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

