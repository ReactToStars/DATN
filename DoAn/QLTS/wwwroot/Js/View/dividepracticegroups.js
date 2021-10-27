
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        //height: 198,
        modal: true,


    });

    dividepracticegroupsJS = new DividePracticeGroupsJS();


})

class DividePracticeGroupsJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadModuleClass();
        this.loadTeacher();
        this.getMaxCode();


    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/practicegroup/";
        this.getCode = "";
    }


    /**
    * Các sự kiện cho các button của trang 
     * Author: Nguyen Dang Tung(27/12/2020)
     * */
    initEventsPage() {

        $('#txt-search').keypress(function (e) {
            if (e.which == 13 && $('#txt-search').val()) {
                this.filterData();
            }
        }.bind(this));

        $('.btn-search').click(function (e) {
            if ($('#txt-search').val()) {
                {
                    this.filterData();
                }
            }
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

    }
    /**
   * Load dữ liệu bảng Department lên trang
   * Author: Nguyen Dang Tung(27/12/2020)
   */
    loadModuleClass() {
        try {
            let id = window.location.href;
            id = id.split("=")[1];
            $('.Back_To_Page').attr('href', '/view/DetailModuleClass.html?ID=' + id + '')

            $.ajax({
                url: "/api/v1/moduleclass/find?id=" + id,
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $('.txt_module_class').attr('value', response['ModuleClassID']);
                $('.txt_module_class').attr('placeholder', response['ModuleClassCode']);

                var td = $('.grid-infor table td[fieldName]');
                $.each(td, function (index, item) {
                    var fieldName = $(this).attr('fieldName');
                    $(this).text(response[fieldName]);
                });

                Teacher = response['TeacherID'];
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    //loadTeacher() {
    //    try {
    //        let id = window.location.href;
    //        id = id.split("=")[1];
    //        $.ajax({
    //            url: "/api/v1/teacher/filter?id=" + id,
    //            method: "GET",
    //            async: true,
    //            //data: null,
    //            dataType: 'json',
    //            connectType: 'application/json'
    //        }).done(function (response) {
    //            $.each(response, function (index, item) {
    //                var option = $(`<option value=\"` + item['FullName'] + `\">` + item['FullName'] + `</option>`);
    //                $('.cbx_teacher ').append(option);
    //            })
    //        }).fail(function (response) {
    //            console.log(response);
    //        })
    //    } catch (e) {
    //        console.log(e);
    //    }
    //}
    loadTeacher() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/teacher",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['TeacherID'] + `>` + item['FullName'] + `</option>`);
                    $('.cbx_teacher').append(option);
                })

                var option = $('.cbx_teacher option');
                $.each(option, function (index, item) {
                    if ($(this).val() == Teacher) {
                        $(this).attr('selected', 'selected');
                    }

                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    getMaxCode() {
        $.ajax({
            url: this.getDataUrl, //Địa chỉ API lấy dữ liệu
            method: "GET",//Phương thức Get, Set, Put, Delete...
            async: true,
            //data: null,
            dataType: 'json',
            connectType: 'application/json'
        }).done(function (response) {
            if (getCode != null) {
                $.each(response, function (index, item) {
                    var code = parseInt(item[getCode].split("-")[1]);
                    if (maxCode < code) {
                        maxCode = code;
                    }
                    //console.log(maxCode);
                })
                maxCode = maxCode + 1;
            }

        }).fail(function (response) {
            console.log(response);
        });
    }

    /**
     * Lưu dữ liệu 
     * Author: Nguyen Dang Tung(31/12/2020)
     */
    btnSaveOnClick() {
        var object = getObject();
        listData = cacheData.filter(function (item) {
            return (item["PracticeGroupName"] === object['PracticeGroupName']);
        });
        if (listData.length != 0) {
            showAlertWarring('Đã tồn tại ' + object['PracticeGroupName'] + ' trong lớp học phần!', '');
            $('input[fieldname="PracticeGroupName"]').focus();
            displaynone(3000);
        }
        else {
            var isvalidate = $('input[validate="false"]');
            try {
                if (isvalidate.length == 0) {
                    $.ajax({
                        url: "/api/v1/practicegroup",
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
                            dividepracticegroupsJS.loadData();
                            getMaxCode("/api/v1/practicegroup")
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
            showAlertConfirm(msg)
        }
    }

    /**
     * Xóa data khỏi hệ thống
     * Author: Nguyen Dang Tung(1/1/2021)
     * */
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/practicegroup/" + recordId,
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
                    dividepracticegroupsJS.loadData();
                    var msg = response.Messenger;
                    showMessengerSuccess(msg);
                    getMaxCode("/api/v1/practicegroup")
                }
            }).fail(function (response) {
                console.log(response);
            })

        } catch (e) {
            alert(e);
        }
    }


    /**
     * Cập nhật lại thông tin dữ liệu trên hệ thống
     * Author: Nguyen Dang Tung(2/1/2021)
     */
    btnUpdateOnClick() {
        var object = getObject(recordId);
        listData = cacheData.filter(function (item) {
            return (item["PracticeGroupName"] === object['PracticeGroupName']);
        });
        if (listData.length != 0) {
            showAlertWarring('Đã tồn tại ' + object['PracticeGroupName'] + ' trong lớp học phần!', '');
            $('input[fieldname="PracticeGroupName"]').focus();
            displaynone(3000);
        }
        else {
            var isvalidate = $('input[validate="false"]');
            try {
                if (isvalidate.length == 0) {
                    $.ajax({
                        url: "/api/v1/practicegroup",
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
                            dividepracticegroupsJS.loadData();
                            getMaxCode("/api/v1/practicegroup")
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
    }
    /**
     * Hàm tìm kiếm dữ liệu
     * Author: Nguyen Dang Tung(15/12/2020)
     * */
    filterData() {
        try {

            var value = $('#txt-search').val();
            listData = cacheData.filter(function (item) {
                return (item["PracticeGroupCode"].toLowerCase()).includes(value.toLowerCase()) || (item["PracticeGroupName"].toLowerCase()).includes(value.toLowerCase());
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
function getObject(id) {
    var object = {};
    object["ModuleClassID"] = $('.txt_module_class').attr('value');
    object["PracticeGroupCode"] = $('input[fieldName="PracticeGroupCode"]').val();
    object["PracticeGroupName"] = $('input[fieldName="PracticeGroupName"]').val().trim();
    object["TeacherID"] = $('select[fieldName="TeacherID"]').val();
    object["Note"] = $('textarea[fieldName="Note"]').val();
    object["PracticeGroupID"] = id;
    return object;
}
function resetDialog() {
    $('input[dataType="text"]').val("");
    $('input[dataType="number"]').val("");
    $('textarea').val("");
    $('input[dataType="date"]').val("mm/dd/yyyy");
    $('input').removeClass('border-red');
}

function getMaxCode(getDataUrl) {
    $.ajax({
        url: getDataUrl, //Địa chỉ API lấy dữ liệu
        method: "GET",//Phương thức Get, Set, Put, Delete...
        async: true,
        //data: null,
        dataType: 'json',
        connectType: 'application/json'
    }).done(function (response) {
        if (getCode != null) {
            $.each(response, function (index, item) {
                var code = parseInt(item[getCode].split("-")[1]);
                if (maxCode < code) {
                    maxCode = code;
                }
                //console.log(maxCode);
            })
            maxCode = maxCode + 1;
        }

    }).fail(function (response) {
        console.log(response);
    });
}

var Teacher = "";
var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];
var dividePracticeGroups = true;
var getCode = "PracticeGroupCode";