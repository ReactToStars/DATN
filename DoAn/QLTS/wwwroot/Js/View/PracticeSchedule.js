
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 700,
        //height: 198,
        modal: true,


    });

    practiceScheduleJS = new PracticeScheduleJS();


})

class PracticeScheduleJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadPracticeShift();
        this.loadPracticalLaboratory();
        this.loadSemester();
        this.loadSchoolYear();
        this.loadPracticeGroup();

    }

    setDataUrl() {
        this.getDataUrl = `/api/v1/PracticeSchedule/`;
        this.getCode = "";
    }

    loadData() {
        try {
            $('.loading').show();
            let id = window.location.href;
            id = id.split("=")[1];
            let getDataUrl = `/api/v1/PracticeSchedule/filter?Id=${id}`;
            $.ajax({
                url: getDataUrl, //Địa chỉ API lấy dữ liệu
                method: "GET",//Phương thức Get, Set, Put, Delete...
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //console.log(response);
                let responses = [];
                if (response.Code === Enum.StatusResponse.NotImplemented) {
                    window.location.href = response.Data;
                }
                else {
                    if (!Array.isArray(response)) {
                        responses.push(response);
                        if ($('.cbx_permission').length != 0) {
                            $(".cbx_permission").attr("disabled", 'disabled');
                        }
                    }
                    else {
                        responses = response;
                    }
                    $('#tbListData tbody').empty();
                    generateTable(responses);
                    setTimeout(function () {
                        $('.loading').hide();
                    }, 500)
                }
            }).fail(function (response) {
                console.log(response);
                $('.loading').hide();
            })
        } catch (e) {
            console.log(e);
        }
    }

    //*
    //* Các sự kiện cho các button của trang
    //* Author: Nguyen Dang Tung(27/12/2020)
    // *
    initEventsPage() {

        //$('#txt-search').keypress(function (e) {
        //    if (e.which == 13 && $('#txt-search').val()) {
        //        this.filterData();
        //    }
        //}.bind(this));

        //$('.btn-search').click(function (e) {
        //    if ($('#txt-search').val()) {
        //        this.filterData();
        //    }
        //}.bind(this));

        //$('.cbx_header').on('change', function () {
        //    this.filterData();
        //}.bind(this));


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

    }

    /**
     * Load practice shift to combobox
     * Created By HTHang (22/11/2021)
     * */
    loadPracticeShift() {
        try {
            $.ajax({
                url: "/api/v1/PracticeShift",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['PracticeShiftID'] + `>` + item['PracticeShiftName'] + `</option>`);
                    $('.cbx_practiceShift ').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Load practical laboratory to combobox
     * Created by HTHang (22/11/2021)
     * */
    loadPracticalLaboratory() {
        try {
            $.ajax({
                url: "/api/v1/PracticalLaboratory",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['PracticalLaboratoryID'] + `>` + item['PracticalLaboratoryName'] + `</option>`);
                    $('.cbx_practicalLaboratory').append(option);
                    //$('#cbx-practicalLaboratory').append(option);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Load semester to combobox
     * Created by HTHang (22/11/2021)
     * */
    loadSemester() {
        try {

            $.ajax({
                url: "/api/v1/Semester",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //listClass = response;
                $.each(response, function (index, item) {
                    var option = `<option value = "${item['SemesterID']}"> ${item['SemesterName']} </option>`;
                    $('.cbx_semester').append(option);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Load school year to combobox
     * Created by HTHang (22/11/2021)
     * */
    loadSchoolYear() {
        try {
            $.ajax({
                url: "/api/v1/SchoolYear",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //listStudent = response;
                $.each(response, function (index, item) {
                    var option = `<option value ="${item['SchoolYearID']}"> ${item['SchoolYearName']} </option>`;
                    $('.cbx_schoolYear').append(option);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Load Practice group to combobox
     * Created by HTHang (22/11/2021)
     * */
    loadPracticeGroup() {
        try {
            let id = window.location.href;
            id = id.split("=")[1];
            $.ajax({
                url: "/api/v1/PracticeGroup/find?id=" + id,
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //console.log(response);
                $('.txt_practiceGroup').attr('value', response['PracticeGroupID']);
                $('.txt_practiceGroup').attr('placeholder', response['PracticeGroupName']);
                $('.txt-practiceGroup').text(`${response['PracticeGroupName']}`);
                $('.txt-teacherName').text(`${response['FullName']}`);
                var td = $('.grid-infor table td[fieldName]');
                $.each(td, function (index, item) {
                    var fieldName = $(this).attr('fieldName');
                    $(this).text(response[fieldName]);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }


    //*
    // * Lưu dữ liệu
    //* Created by HTHang (26/11/2021)

    btnSaveOnClick() {
        var object = getObject();
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/PracticeSchedule",
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
                        //console.log(response);
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        practiceScheduleJS.loadData();
                    }
                }).fail(function (response) {
                    //console.log(response);
                    var msg = response.responseJSON.Data;
                    //var msgLength = response.responseJSON.Data.length;
                    showAlertWarring(msg, "");
                    displaynone(3000);
                });

            }
        } catch (e) {
            console.log(e);
        }
    }

    //*
    // * Sự kiện khi click vào một dòng tr trong table
    //* Created by HTHang (26/11/2021)
    //    *
    rowSelected() {
        try {
            $(this).addClass('row-selected');
            $(this).siblings().removeClass("row-selected");
            $("#btnUpdate,#btnDelete").removeAttr("disabled");
            recordId = $(this).data('recordId');
            recordTitle = $(this).data('recordTitle');
        } catch (e) {
            console.log(e);
        }
    }

    //*
    //* Lấy ra câu thông báo khi nhấn nút Xóa
    //* Created by HTHang (26/11/2021)
    //    *
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

    //*
    // * Xóa data khỏi hệ thống
    //* Created by HTHang (26/11/2021)
    //    *
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/PracticeSchedule/" + recordId,
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
                    practiceScheduleJS.loadData();
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                    //setDisabled();
                }
            }).fail(function (response) {
                console.log(response);
            })

        } catch (e) {
            alert(e);
        }
    }


    //*
    // * Cập nhật lại thông tin dữ liệu trên hệ thống
    //* Created by HTHang (26/11/2021)

    btnUpdateOnClick() {
        var object = getObject(recordId);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/PracticeSchedule",
                    method: "PUT",
                    data: JSON.stringify(object),
                    dataType: 'json',
                    contentType: 'application/json',
                    async: true
                }).done(function (response) {
                    //console.log(response);
                    if (response.Code == Enum.StatusResponse.MethodNotAllowed) {
                        showAlertWarring(response.Messenger);
                        displaynone(3000);
                    }
                    else if (response.Code == Enum.StatusResponse.Success) {
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        practiceScheduleJS.loadData();
                        //setDisabled();
                    }
                }).fail(function (response) {
                    //console.log(response);
                    var msg = response.responseJSON.Data;
                    var msgLength = response.responseJSON.Data.length;
                    showAlertWarring(msg, msgLength);
                    displaynone(3000);
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    //*
    // * Hàm tìm kiếm dữ liệu
    //* Created by HTHang (26/11/2021)
    //    *
    //filterData() {
    //    try {
    //        //var value = $('#txt-search').val();
    //        var practicalLaboratoryID = $('#cbx-practicalLaboratory').val();
    //        var date = $('#cbx-date').val();
    //        console.log(practicalLaboratoryID);
    //        console.log(date);
    //        listData = cacheData.filter(function (item) {
    //            return 
    //                //item["PracticalLaboratoryName"].toLowerCase()).includes(value.toLowerCase())
    //                (practicalLaboratoryID ? item["PracticalLaboratoryID"] === practicalLaboratoryID : item["PracticalLaboratoryID"] !== practicalLaboratoryID)
    //                && (date ? item["Date"] === parseInt(date) : item["Date"] !== "");
    //        });
    //        $('.loading').show();
    //        $('#tbListData tbody').empty();
    //        generateTable(listData);
    //        setTimeout(function () {
    //            $('.loading').hide();
    //        }, 300)

    //    } catch (e) {
    //        console.log(e);
    //    }
    //}
}

/**
 * Lấy dữ liệu từ input qua dialog
 * Created by HTHang (26/11/2021)
 * @param {any} id
 */
function getObject(id) {
    var object = {};
    object["PracticeGroupID"] = $('.txt_practiceGroup').attr('value');
    object['PracticeShiftID'] = $('.cbx_practiceShift').val();
    object['PracticalLaboratoryID'] = $('.cbx_practicalLaboratory').val();
    object['Date'] = parseInt($('.cbx_date').val());
    object['SemesterID'] = $('.cbx_semester').val();
    object['SchoolYearID'] = $('.cbx_schoolYear').val();
    object['StartTime'] = $('input[fieldName="StartTime"]').val();
    object['EndTime'] = $('input[fieldName="EndTime"]').val();
    object['Status'] = parseInt($('.cbx_status').val());
    object['Description'] = $('textarea[fieldName="Description"]').val();
    object['PracticeScheduleID'] = id;
    return object;
}

/**
 * Reset dialog
 * Created by HTHang (26/11/2021)
 * */
function resetDialog() {
    $('input[fieldName], textarea').val("");
    $(".txt_practiceGroup ").find('option:eq(0)').prop('selected', true);
    $(".cbx_practiceShift ").find('option:eq(0)').prop('selected', true);
    $(".cbx_practicalLaboratory ").find('option:eq(0)').prop('selected', true);
    $(".cbx_date ").find('option:eq(0)').prop('selected', true);
    $(".cbx_schoolYear ").find('option:eq(0)').prop('selected', true);
    $(".cbx_semester").find('option:eq(0)').prop('selected', true);
    $(".cbx_status ").find('option:eq(0)').prop('selected', true);
    //$(".cbx_class option,.cbx_student option").remove();
    //$('.cbx_class,.cbx_student ').attr("disabled", "disabled");
    $('input,select,textarea').removeClass('border-red');
}

var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];
var setDisabled = true;