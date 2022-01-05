
$(document).ready(function () {

    //Define Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 355,
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
        //$('#txt-search').keypress(function (e) {
        //    if (e.which == 13) {
        //        this.filterData();
        //    }
        //}.bind(this));

        $('.btn-search').click(function (e) {
            this.filterData();
        }.bind(this));

        $('.cbx_header').on('change', function () {
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

        //checkbox
        $('#request').change(function (e) {
            if ($(this).attr('value') == '1') {
                $(this).val('0');
                $(this).prop('checked', false);
            }
            else {
                $(this).prop('checked', true);
                $(this).val('1');
            }
        });

        //submit all request
        $('#btn-request').click(function () {

            //resetDialog();
            $('#updateTable tbody').empty();
            generateUpdateTable(cacheData);
            dialog.dialog('open');
            $('#btn-save').hide();
            $('#btn-update').show();
            //maintainance request
            $('.set_request').show();
            $('.set_maintainance').hide();

            formModel = "submitAll";

            //all checkbox from updateTable
            var checkAll = $('#checkAll');
            var checkboxs = $('#updateTable tbody tr td input[type="checkbox"]');
            if (checkboxs.length === $('#updateTable tbody tr td input[type="checkbox"]:checked').length) {
                checkAll.prop('checked', true);
            }
            //checkAll changed
            checkAll.change(function () {
                var isCheckedAll = $(checkAll).prop('checked');
                checkboxs.prop('checked', isCheckedAll);
                if (isCheckedAll) {
                    checkboxs.val('1');
                }
                else {
                    checkboxs.val('0');
                }
            });

            //checkboxs changed
            checkboxs.change(function () {
                var isCheckedAll = checkboxs.length === $('#updateTable tbody tr td input[type="checkbox"]:checked').length;
                checkAll.prop('checked', isCheckedAll);
            });

            $.each(checkboxs, function (index, item) {
                $(item).change(function (e) {
                    if ($(this).attr('value') == '1') {
                        $(this).val('0');
                        $(this).prop('checked', false);
                    }
                    else {
                        $(this).prop('checked', true);
                        $(this).val('1');
                    }
                });
            });
        });
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
                    var option = `<option value=` + item['PracticalLaboratoryID'] + `>` + item['PracticalLaboratoryName'] + `</option>`;
                    $('.cbx_practicalLaboratory').append(option);
                    $('#cbx_practicalLaboratory').append(option);
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
                    var option = `<option value=` + item['TechnicalStaffID'] + `>` + item['FullName'] + `</option>`;
                    $('.cbx_technicalStaff').append(option);
                    $('#cbx_technicalStaff').append(option);
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
        try {
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
                //var msg = response.responseJSON.Data;
                showAlertWarring("Vui lòng kiểm tra lại dữ liệu đã nhập!", );
                displaynone(3000);
            });
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
            var msg = "Bạn có chắc chắn muốn xóa bản ghi này không?";
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
        if (formModel == "submitAll") {
            var listObjects = getObject(recordId);
            try {
                $.each(listObjects, function (index, object) {
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
                    });
                });
            } catch (e) {
                console.log(e);
            }
        }
        else {
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
        
    }
    /**
     * Filter function
     * Created by NTHung (20/11/2021)
     * */
    filterData() {
        try {
            var value = $('#txt-search').val();
            var practicalLaboratoryId = $('#cbx_practicalLaboratory option:selected ').val();
            var technicalStaffId = $('#cbx_technicalStaff option:selected ').val();
            var maintainanceStatus = $('#cbx_maintainanceStatus option:selected ').val();
            console.log(maintainanceStatus);
            listData = cacheData.filter(function (item) {
                return (item["PracticalLaboratoryCode"].toLowerCase().includes(value.toLowerCase())
                    || item["PracticalLaboratoryName"].toLowerCase().includes(value.toLowerCase())
                    || item["TechnicalStaffCode"].toLowerCase().includes(value.toLowerCase())
                    || item["FullName"].toLowerCase().includes(value.toLowerCase()))
                    && (practicalLaboratoryId ? item["PracticalLaboratoryID"] === practicalLaboratoryId : item["PracticalLaboratoryID"] != practicalLaboratoryId)
                    && (technicalStaffId ? item["TechnicalStaffID"] === technicalStaffId : item["TechnicalStaffID"] != technicalStaffId)
                    && (maintainanceStatus ? item["MaintainanceStatus"] === parseInt(maintainanceStatus) : item["MaintainanceStatus"] != parseInt(maintainanceStatus));
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

/**
 * Lấy dữ liệu từ input qua dialog
 * Created by HTHang (26/11/2021)
 * @param {any} id
 */
function getObject(id) {
    if (formModel == "submitAll") {
        var listObject = [];
        $.each(cacheData, function (index, item) {
            var object = {};
            object['PracticalLaboratoryID'] = item['PracticalLaboratoryID'];
            object['StartedDate'] = item['StartedDate'];
            object['EndedDate'] = item['EndedDate'];
            object['TechnicalStaffID'] = item['TechnicalStaffID'];
            object['MaintainanceStatus'] = item['MaintainanceStatus'];
            object['Description'] = item['Description'];
            object['MaintainanceID'] = item['MaintainanceID'];
            object["Request"] = parseInt($(`#updateTable tbody tr td input[type="checkbox"]:eq(${index})`).val());
            listObject.push(object);
        });
        return listObject;
    }
    else {
        var object = {};
        var startedDate = $('input[fieldName="StartedDate"]').val();
        var endedDate = $('input[fieldName="EndedDate"]').val();
        if (startedDate == "") {
            startedDate = "0001-01-01";
        }
        if (endedDate == "") {
            endedDate = "0001-01-01";
        }
        object['PracticalLaboratoryID'] = $('.cbx_practicalLaboratory').val();
        object['StartedDate'] = startedDate;
        object['EndedDate'] = endedDate;
        object['TechnicalStaffID'] = $('.cbx_technicalStaff').val();
        object['MaintainanceStatus'] = parseInt($('.cbx_status').val());
        object['Request'] = parseInt($('#request').val());
        object['Description'] = $('textarea[fieldName="Description"]').val();
        object['MaintainanceID'] = id;
        return object;
    }
}

var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];

