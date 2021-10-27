﻿
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        //height: auto,
        modal: true,


    });

    moduleJS = new ModuleJS();

})

class ModuleJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadSubject()
        this.creditcheck();
        //this.loadPosition();
        //this.loadDerpartment();
    }
    /**
     * Kiểm tra số tín chỉ đầu vào
     * */
    creditcheck() {
        $('#btn-save,#btn-update').click(function () {
            //Validate dữ liệu
            var inputValadate = $('input[number]');
            $.each(inputValadate, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValidate = $('input[Validate="false"]')
            if (inputValadate && inputNotValidate.length > 0) {
                showAlertWarring("Vui lòng nhập đầy đủ các trường dữ liệu thông tin bắt buôc!");
                displaynone(3000);
                inputNotValidate[0].focus();
                return;
            }



        });

        $('input[type="number"]').blur(function () {
            checkSchoolCredits(this);

        });

        $('input[type="number"]').keyup(function () {
            checkSchoolCredits(this);
        });


    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/module/";
        this.getCode = "ModuleCode";
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

    /**Import dữ liệu vào db */
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
                        url: "/api/v1/module/UploadFile",
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
                            moduleJS.loadData();
                            $('#file_import').val('');

                        }
                        else if (response.Code == Enum.StatusResponse.NotValid) {
                            setTimeout(function () {
                                showAlertWarring(response.Messenger, response.Data);
                            }, 1000);
                            moduleJS.loadData();
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
    * Load dữ liệu bảng Department lên trang
    * Author: Nguyen Dang Tung(27/12/2020)
    */
    loadSubject() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/subject",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['SubjectID'] + `>` + item['SubjectName'] + `</option>`);
                    $('.cbx_subject ').append(option);
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
        listData = cacheData.filter(function (item) {
            return (item["ModuleCode"] === object['ModuleCode'].trim()) && (item["SubjectID"] === object['SubjectID'].trim());
        });
        if (listData.length != 0) {
            showAlertWarring('Học phần đã tồn tại trong hệ thống!', '');
            displaynone(3000);
        }
        else {
            //console.log(object);
            var isvalidate = $('input[validate="false"]');
            try {
                if (isvalidate.length == 0) {
                    $.ajax({
                        url: "/api/v1/module",
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
                            moduleJS.loadData();
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
                url: "/api/v1/module/" + recordId,
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
                    moduleJS.loadData();
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
                    url: "/api/v1/module",
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
                        moduleJS.loadData();
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
            var subjectId = $('#cbx_subject option:selected ').val();
            listData = cacheData.filter(function (item) {
                return ((item["ModuleCode"].toLowerCase()).includes(value.toLowerCase()) || (item["ModuleName"].toLowerCase()).includes(value.toLowerCase())) && (subjectId ? item["SubjectID"] === subjectId : item["SubjectID"] != subjectId);
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
 * Kiểm tra tín chỉ
 * @param {any} input
 */
function checkSchoolCredits(input) {
    //Kiểm tra dữ liệu đã được nhập , nếu trống thì cảnh báo
    var value = $(input).val();
    //if (!value) {
    //    $(this).addClass('border-red');
    //    $(this).attr('title', 'Trường này không được để trống');
    //    $(this).attr('Validate', false);

    //}
    //else {
    var val = parseFloat(value);
    if (val > 15) {
        $(input).addClass('border-red');
        $(input).attr('title', 'Tổng số tín chỉ tối đa là 15 tín chỉ!');
        $(input).attr('Validate', false);
    }
    else if (val < 0) {
        $(input).addClass('border-red');
        $(input).attr('title', 'Số tín chỉ không thể nhỏ hơn 0!');
        $(input).attr('Validate', false);
    }
    else if (!val) {
        if ($(input).attr("fieldName") == "NumberOfModule") {
            $(input).addClass('border-red');
            $(input).attr('title', 'Trường này không được để trống!');
            $(input).attr('Validate', false);
        }
    }
    else if (val && val >= 0 && val <= 15) {
        $(input).removeClass('border-red');
        $(input).removeAttr('title');
        $(input).attr('Validate', true);
    }

    /*}*/
}
var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];

