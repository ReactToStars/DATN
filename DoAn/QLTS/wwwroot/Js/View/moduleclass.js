
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 666,
        //height: auto,
        modal: true,


    });

    moduleclassJS = new ModuleClassJS();

})

class ModuleClassJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadModule()
        this.loadSemester();
        this.loadSchoolYear();
        this.loadTeacher();
        //this.loadDerpartment();
    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/moduleclass/";
        this.getCode = "ModuleClassCode";
    }

    /**
    * Các sự kiện cho các button của trang 
     * Author: Nguyen Dang Tung(27/12/2020)
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

        $('#cbx_module').on('change', function () {
            this.filterData();
        }.bind(this));

        $('#cbx_status').on('change', function () {
            this.filterData();
        }.bind(this));

        $('#cbx_schoolyear').on('change', function () {
            this.filterData();
        }.bind(this));
        $('#cbx_semester').on('change', function () {
            this.filterData();
        }.bind(this));
        $('#cbx_teacher').on('change', function () {
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

    /**Import dữ liệu vào db */
    importFile() {
        var file = document.getElementById('file_import');
        var files = file.files;
        var formData = new FormData();
        if (file.files.length) {
            for (var i = 0; i <= file.files.length - 1; i++) {
                formData.append("file", files[i]);
            }
            $.ajax({
                url: "/api/v1/moduleclass/UploadFile",
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
                    moduleclassJS.loadData();
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
    * Load dữ liệu bảng Department lên trang
    * Author: Nguyen Dang Tung(27/12/2020)
    */
    loadModule() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/module",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['ModuleID'] + `>` + item['ModuleName'] + `</option>`);
                    var option1 = $(`<option value=` + item['ModuleID'] + `>` + item['ModuleCode'] + `</option>`);
                    $('.cbx_module ').append(option);
                    $('#cbx_module ').append(option1);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    loadSchoolYear() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/schoolyear",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['SchoolYearID'] + `>` + item['SchoolYearName'] + `</option>`);
                    $('.cbx_schoolyear').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadSemester() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Semester",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['SemesterID'] + `>` + item['SemesterName'] + `</option>`);
                    $('.cbx_semester').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
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
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Lưu dữ liệu 
     * Author: Nguyen Dang Tung(31/12/2020)
     */
    btnSaveOnClick() {
        var object = getObject();
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/moduleclass",
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
                        moduleclassJS.loadData();
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
                url: "/api/v1/moduleclass/" + recordId,
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
                    moduleclassJS.loadData();
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
     * Cập nhật lại thông tin dữ liệu trên hệ thống
     * Author: Nguyen Dang Tung(2/1/2021)
     */
    btnUpdateOnClick() {
        var object = getObject(recordId);
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/moduleclass",
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
                        moduleclassJS.loadData();
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
     * Hàm tìm kiếm dữ liệu
     * Author: Nguyen Dang Tung(15/12/2020)
     * */
    filterData() {
        try {

            var value = $('#txt-search').val();
            //var moduletId = $('#cbx_module option:selected ').val();
            var statusId = $('#cbx_status option:selected ').val();
            var schoolyearId = $('#cbx_schoolyear option:selected ').val();
            var semesterId = $('#cbx_semester option:selected ').val();
            var teacherId = $('#cbx_teacher option:selected ').val();
            //if (statustId!="") {
            //    statustId = parseInt(statustId);
            //}
            listData = cacheData.filter(function (item) {
                return ((item["ModuleClassCode"].toLowerCase()).includes(value.toLowerCase()))
                    /*&& (moduletId ? item["ModuleID"] === moduletId : item["ModuleID"] != moduletId)*/
                    && (statusId ? item["Status"] === parseInt(statusId) : item["Status"] !== "")
                    && (schoolyearId ? item["SchoolYearID"] === schoolyearId : item["SchoolYearID"] != schoolyearId)
                    && (semesterId ? item["SemesterID"] === semesterId : item["SemesterID"] != semesterId)
                    && (teacherId ? item["TeacherID"] === teacherId : item["TeacherID"] != teacherId);
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

