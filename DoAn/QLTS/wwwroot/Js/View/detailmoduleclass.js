
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 350,
        //height: 198,
        modal: true,


    });

    detailmoduleclassJS = new DetailModuleClassJS();


})

class DetailModuleClassJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.creditcheck();
        //this.loadCourse();
        //this.loadMajors();
        this.loadClass();
        this.loadStudent();
        this.loadModuleClass();

    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/DetailModuleClass/";
        this.getCode = "";
    }

    creditcheck() {
        var optionTitle, course, majors, itemClass;
        //$('.cbx_course').on("change", function () {
        //    course = $(this).select().val().trim();
        //    if (!course) {
        //        $(".cbx_class option,.cbx_student option").remove();
        //        $('.cbx_class,.cbx_student ').attr("disabled", "disabled");
        //        $('.cbx_class,.cbx_student ').removeClass('border-red');
        //    }
        //    else {
        //        if (course && majors) {
        //            $('.cbx_class ').removeClass('border-red');

        //            $(".cbx_class option").remove();
        //            $('.cbx_class').removeAttr("disabled");
        //            var Classs = listClass.filter(function (item) {
        //                return ((item["CourseID"] === course && item["MajorsID"] === majors));
        //            });
        //            optionTitle = `<option value="">--Vui lòng chọn lớp học--</option>`
        //            $('.cbx_class').prepend(optionTitle);
        //            $.each(Classs, function (index, item) {
        //                var option = $(`<option value=` + item['ClassID'] + `>` + item['ClassName'] + `</option>`);
        //                $('.cbx_class').append(option);
        //            });
        //        }

        //    }
        //});
        //$('.cbx_majors').on("change", function () {
        //    majors = $(this).select().val().trim();
        //    if (!majors) {
        //        $(".cbx_class option,.cbx_student option").remove();
        //        $('.cbx_class,.cbx_student ').attr("disabled", "disabled");
        //        $('.cbx_class,.cbx_student ').removeClass('border-red');
        //    }
        //    else {
        //        if (course && majors) {
        //            $('.cbx_class ').removeClass('border-red');

        //            $(".cbx_class option").remove();
        //            $('.cbx_class').removeAttr("disabled");
        //            var Classs = listClass.filter(function (item) {
        //                return ((item["CourseID"] === course && item["MajorsID"] === majors));
        //            });
        //            optionTitle = `<option value="">--Vui lòng chọn lớp học--</option>`
        //            $('.cbx_class').prepend(optionTitle);
        //            $.each(Classs, function (index, item) {
        //                var option = $(`<option value=` + item['ClassID'] + `>` + item['ClassName'] + `</option>`);
        //                $('.cbx_class').append(option);
        //            });
        //        }

        //    }
        //});
        $('.cbx_class').on("change", function () {
            itemClass = $(this).select().val().trim();
            if (itemClass) {
                $('.cbx_student ').removeClass('border-red');
                $(".cbx_student option").remove();
                $('.cbx_student').removeAttr("disabled");
                var listStu = listStudent.filter(function (item) {
                    return ((item["ClassID"] === itemClass));
                });
                optionTitle = `<option value="">--Vui lòng chọn sinh viên--</option>`
                $('.cbx_student').prepend(optionTitle);
                $.each(listStu, function (index, item) {
                    var option = $(`<option value=` + item['StudentID'] + `>` + item['FullName'] + `</option>`);
                    $('.cbx_student').append(option);
                });
            }
            else {
                $(".cbx_student option").remove();
                $('.cbx_student ').attr("disabled", "disabled");
                $('.cbx_student ').removeClass('border-red');
            }
        });

        $('#btn-save,#btn-update').click(function () {
            //Validate dữ liệu
            var inputValadate = $('input[number]');
            $.each(inputValadate, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValidate = $('input[Validate="false"]')
            if (inputValadate && inputNotValidate.length > 0) {
                showAlertWarring("Vui lòng kiểm tra lại dữ liệu đã nhập!");
                displaynone(3000);
                inputNotValidate[0].focus();
                return;
            }
        });

        $('input[type="number"]').blur(function () {
            //Kiểm tra dữ liệu đã được nhập, nếu trống thì cảnh báo
            checkPoint(this);
        });
        $('input[type="number"]').keyup(function () {
            mediumSore();
            checkPoint(this);

        });


        $('#btn-dividepracticegroups').click(function () {
            let id = window.location.href;
            id = id.split("=")[1];
            window.location.href = "/view/DividePracticeGroups.html?moduleClassId=" + id + "";
        });
    }

    //*
    //* Các sự kiện cho các button của trang
    //* Author: Nguyen Dang Tung(27/12/2020)
    // *
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

        $('input[type="number"]').change(function () {
            mediumSore();
        });
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
                        url: "/api/v1/DetailModuleClass/UploadFile",
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
                            detailmoduleclassJS.loadData();
                            $('#file_import').val('');

                        }
                        else if (response.Code == Enum.StatusResponse.NotValid) {
                            setTimeout(function () {
                                showAlertWarring(response.Messenger, response.Data);
                            }, 1000);
                            detailmoduleclassJS.loadData();
                            $('#file_import').val('');

                        }

                    }).fail(function (response) {
                        $('#file_import').val('');
                        showAlertWarring('Vui lòng kiểm tra lại file dữ liệu!');
                        displaynone(3000);
                    //    console.log(response);
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

    loadCourse() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Course",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['CourseID'] + `>` + item['CourseName'] + `</option>`);
                    $('.cbx_course ').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadMajors() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Majors",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['MajorsID'] + `>` + item['MajorsName'] + `</option>`);
                    $('.cbx_majors').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadClass() {
        try {

            $.ajax({
                url: "/api/v1/Class",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                listClass = response;
                $.each(response, function (index, item) {
                    var option = `<option value = "${item['ClassID']}"> ${item['ClassName']} </option>`;
                    $('.cbx_class').append(option);
                });
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadStudent() {
        try {

            $.ajax({
                url: "/api/v1/Student",
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                listStudent = response;
                //$.each(response, function (index, item) {
                //    var option = `<option value ="${item['StudentID']}"> ${item['StudentName']} </option>`;
                //    $('cbx_student').append(option);
                //});
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadModuleClass() {
        try {
            let id = window.location.href;
            id = id.split("=")[1];
            $.ajax({
                url: "/api/v1/moduleclass/find?id=" + id,
                method: "GET",
                async: true,
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                //console.log(response);
                $('.txt_module_class').attr('value', response['ModuleClassID']);
                $('.txt_module_class').attr('placeholder', response['ModuleClassCode']);
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
    //* Author: Nguyen Dang Tung(31 / 12 / 2020)

    btnSaveOnClick() {
        var object = getObject();
        console.log(object);
        listData = cacheData.filter(function (item) {
            return (item["ModuleClassID"] === object['ModuleClassID']) && (item["StudentID"] === object['StudentID']);
        });
        if (listData.length != 0) {
            showAlertWarring('Sinh viên đã thuộc trong lớp học phần!', '');
            displaynone(3000);
        }
        else {
            var isvalidate = $('input[validate="false"]');
            try {
                if (isvalidate.length == 0) {
                    $.ajax({
                        url: "/api/v1/DetailModuleClass",
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
                            detailmoduleclassJS.loadData();
                            $(".txt_student_id").attr('value', object["StudentID"]);
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
    }

    //*
    // * Sự kiện khi click vào một dòng tr trong table
    //* Author: Nguyen Dang Tung(31 / 12 / 2020)
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
    //* Author: Nguyen Dang Tung(31 / 12 / 2020)
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
    //* Author: Nguyen Dang Tung(1 / 1 / 2021)
    //    *
    btnDeleteOnClick() {
        try {
            $.ajax({
                url: "/api/v1/detailmoduleclass/" + recordId,
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
                    detailmoduleclassJS.loadData();
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
    //* Author: Nguyen Dang Tung(2 / 1 / 2021)

    btnUpdateOnClick() {
        var object = getObject(recordId);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/detailmoduleclass",
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
                        //console.log(response);
                        dialog.dialog("close");
                        var msg = response.Messenger;
                        showMessengerSuccess(msg);
                        detailmoduleclassJS.loadData();
                        setDisabled();
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
    //* Author: Nguyen Dang Tung(15 / 12 / 2020)
    //    *
    filterData() {
        try {

            var value = $('#txt-search').val();
            listData = cacheData.filter(function (item) {
                return (item["StudentCode"].toLowerCase()).includes(value.toLowerCase())
                    || (item["FullName"].toLowerCase()).includes(value.toLowerCase());
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
 * @param {any} id
 */
function getObject(id) {
    var object = {};
    if (formModel === "Edit") {
        object["StudentID"] = $(".txt_student_id").attr('value');
    }
    else {
        object["StudentID"] = $(".cbx_student").val();
    }
    object["ModuleClassID"] = $('.txt_module_class').attr('value');
    object["FrequentPoints1"] = parseFloat($('input[fieldName="FrequentPoints1"]').val());
    object["FrequentPoints2"] = parseFloat($('input[fieldName="FrequentPoints2"]').val());
    object["MediumScore"] = parseFloat($('input[fieldName="MediumScore"]').val());
    object["DetailModuleClassID"] = id;
    return object;
}

//*
// * Tính điểm trung bình
//    *
function mediumSore() {
    let v1, v2, tb;
    v1 = parseFloat($('input[fieldName="FrequentPoints1"]').val());
    v2 = parseFloat($('input[fieldName="FrequentPoints2"]').val());
    if (v1 >= 0 && v2 >= 0 && v1 <= 10 && v2 <= 10) {
        tb = ((v1 + v2) / 2).toFixed(2);
        $('input[fieldName="MediumScore"]').val(tb);
    }
    else {
        $('input[fieldName="MediumScore"]').val("");
    }
}
/* * Check số điểm*/
function checkPoint(input) {
    var value = $(input).val();
    var val = parseFloat(value);
    if (val > 10) {
        $(input).addClass('border-red');
        $(input).attr('title', 'Điểm tối đa là 10 điểm!');
        $(input).attr('Validate', false);
    }
    else if (val < 0) {
        $(input).addClass('border-red');
        $(input).attr('title', 'Điểm thấp nhất là 0 điểm!');
        $(input).attr('Validate', false);
    }
    else if (val && val >= 0 && val <= 10) {
        $(input).removeClass('border-red');
        $(input).removeAttr('title');
        $(input).attr('Validate', true);
    }
}

function resetDialog() {
    $('input[fieldName]').val("");
    $(".cbx_course ").find('option:eq(0)').prop('selected', true)
    $(".cbx_majors ").find('option:eq(0)').prop('selected', true)
    //$(".cbx_class option,.cbx_student option").remove();
    //$('.cbx_class,.cbx_student ').attr("disabled", "disabled");
    $('input,select').removeClass('border-red');
}

var listStudent = [];
var listClass = [];

var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];
var detailModuleClass = true;
var setDisabled = true;