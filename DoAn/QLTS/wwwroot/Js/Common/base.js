
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.getCode = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }
    /**
     * Lấy địa chỉ API dữ liệu
     * Author: Nguyen Dang Tung(15/12/2020)
     * */
    setDataUrl() {

    }
    /**
     * Load dữ liệu
     * Author: Nguyen Dang Tung(15/12/2020)
     * */
    loadData() {
        try {
            $('.loading').show();

            let getDataUrl = this.getDataUrl;
            var getCode = this.getCode;
            if (detailModuleClass != undefined) {
                let id = window.location.href;
                id = id.split("=")[1];
                getDataUrl = "/api/v1/DetailModuleClass/filter?Id=" + id;
            }
            else if (dividePracticeGroups != undefined) {
                let id = window.location.href;
                id = id.split("=")[1];
                getDataUrl = "/api/v1/practicegroup/filter?Id=" + id;
            }
            else if (detailPracticeGroup != undefined) {
                let id = window.location.href;
                let url = id.split("&&")[1];
                id = url.split("=")[1];
                getDataUrl = "/api/v1/detailPracticeGroup/filter?Id=" + id;
            }
            else if (equipment != undefined) {
                let id = window.location.href;
                id = id.split("=")[1];
                getDataUrl = "/api/v1/equipment/filter?Id=" + id;
            }
            maxCode = 0;
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
                    cacheData = responses;
                    //console.log(cacheData);
                    if (getCode) {
                        $.each(responses, function (index, item) {
                            var code = parseInt(item[getCode].split('-')[1]);
                            if (maxCode < code) {
                                maxCode = code;
                            }
                            //console.log(maxCode);
                        });
                        maxCode = maxCode + 1;
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
    /**
     * Các sự kiện cho các button của trang
     * Author: Nguyen Dang Tung(20/12/2020)
     * */
    initEvents() {

        $('input[dataType="number"]').keypress(function (event) {
            if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                event.preventDefault();
            }
        });


        $('#logout').off('click').on('click', function () {
            try {
                $.ajax({
                    url: "/api/v1/Account/Logout",
                    method: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    async: true
                }).done(function (response) {
                    if (response.Code == Enum.StatusResponse.Success) {
                        window.location.href = response.Data;
                    }

                }).fail(function (response) {
                    //console.log(response);
                    var msg = response.responseJSON.Data;
                    showAlertWarring("", msg);
                    displaynone(3000);
                })

            } catch (e) {
                console.log(e);
            }
        });

        var getDataUrl = this.getDataUrl;
        //Sự kiện click khi ấn Thêm mới
        $('#btn-add').off('click').on('click', function () {
            $('#tbListData tbody tr').removeClass("row-selected");
            //Hiển thị dialog
            resetDialog();
            let name_Code = $('#txt-code').attr('name-code');
            $('#txt-code').val(name_Code + "-" + maxCode);
            $('#btn-save').show();
            $('#btn-update').hide();
            //setDisabled();
            if (setDisabled != undefined) {
                $(".set_disabled").removeAttr("disabled")
                $(".set_update").hide();
                $(".set_add").show();

            }
            dialog.dialog('open');
            formModel = "Add";

            //maintainance request
            $('.set_request').hide();
            $('.set_equipment').show();
        });

        //Sự kiện load lại dữ liệu khi nhấn refresh
        $('#btn-refresh').click(function () {

            //alert("Load lại dữ liệu");
            //setDisabled();
            this.loadData();
        }.bind(this));

        //Ấn form chi tiết khi nhấn hủy
        $('#btn-cancel').off('click').on('click', function () {
            resetDialog();
            dialog.dialog('close');
        });

        ////Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn một bản ghi trên danh sách dữ liệu
        $("#tbListData").on('dblclick', 'tr', function () {

            $('#tbListData tbody tr').removeClass("row-selected");
            $('#btn-update').show();
            $('#btn-save').hide();
            if (setDisabled != undefined) {
                $(".set_disabled").attr("disabled", 'disabled');
                $(".set_update").show();
                $(".set_add").hide();
                $(".set_add").removeAttr('required');


            }
            resetDialog();
            dialog.dialog('open');
            formModel = "Edit";

            //maintainance request
            $('.set_request').hide();
            $('.set_equipment').show();

            try {
                $.ajax({
                    url: getDataUrl + recordId,
                    method: "get",
                    //data: null,
                    datatype: 'json',
                    contenttype: 'application/json',
                    async: true
                }).done(function (response) {
                    //console.log(response);
                    var res = response;
                    if ($(".txt_student_id").length != 0) {
                        $(".txt_student_id").attr('value', res["StudentID"]);

                    }

                    var inputs = $('.dialog__content input[fieldname],.dialog__content select[fieldname],.dialog__content textarea[fieldname]');
                    $.each(inputs, function (index, item) {
                        var propertyname = $(item).attr('fieldname');
                        var propertyvalue = res[propertyname];
                        if ($(this).attr('type') == 'date') {
                            propertyvalue = formatStringDate(propertyvalue);
                        }
                        if ($(this).attr('fieldname') == "salary") {
                            var money = formatMoney(propertyvalue);
                            propertyvalue = money;
                        }

                        if ($(item).attr('type') == 'checkbox') {
                            if (propertyvalue == 1) {
                                $(this).prop('checked', true);
                                $(this).val('1');
                            }
                            else {
                                $(this).prop('checked', false);
                                $(this).val('0');
                            }
                        }

                        this.value = propertyvalue;
                    })
                }).fail(function (response) {
                    console.log(response);
                })
            }
            catch (e) {
                console.log(e);
            }

        });

        //Thực hiện lưu dữ liệu khi nhấn button lưu trên form chi tiết
        $('#btn-save,#btn-update').click(function () {
            //Validate dữ liệu
            var inputValadate = $('input[required],input[type="email"], input[dataType="date"], select[required]');
            $.each(inputValadate, function (index, input) {
                $(input).trigger('blur');
            });
            var inputNotValidate = $('input[Validate="false"],select[Validate="false"]')
            if (inputValadate && inputNotValidate.length > 0) {
                showAlertWarring("Vui lòng kiểm tra lại dữ liệu đã nhập!");
                displaynone(3000);
                inputNotValidate[0].focus();
                return;
            }



        });

        /**
         * Validate bắt buốc nhập
         * Author: Nguyen Dang Tung(20/12/2020)
         */
        $('input[required],select[required]').blur(function () {
            //Kiểm tra dữ liệu đã được nhập , nếu trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');
                $(this).attr('Validate', false);

            }
            else {
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
                $(this).attr('Validate', true);

            }
        });

        /**
         * Validate email đúng định dạng
         * Author: Nguyen Dang Tung(20/12/2020)
         */
        $('input[type="email"]').blur(function () {
            var testEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.]+[A-Z]{2,4}$/i;
            if (!testEmail.test($(this).val())) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('Validate', false);

            }
            else {
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
                $(this).attr('Validate', true);

            }
        });
        /**
         * Validate đúng thời gian
         * Author: Nguyen Dang Tung(20/12/2020)
         */
        $('input[type="date"]').blur(function () {
            var startTime = $('#StartTime'), endTime = $('#EndTime'), d1, d2;
            d1 = startTime.val();
            d2 = endTime.val();
            if (d1 && d2 == "") {
                d1 = new Date(d1)
                let endYear = d1.getFullYear() + 4;
                d1.setFullYear(endYear);
                $('#EndTime').val(formatStringDate(d1));
            }
            else if (d1 == "" && d2) {
                d2 = new Date(d2)
                let startYear = d2.getFullYear() - 4;
                d2.setFullYear(startYear);

                $('#StartTime').val(formatStringDate(d2));
            }
            else if (d1 && d2) {
                if (new Date(d1) > new Date(d2)) {
                    $(this).addClass('border-red');
                    $(this).attr('title', 'Thời gian không hợp lệ!');
                    $(this).attr('Validate', false);
                }
                else {
                    $(startTime).removeClass('border-red');
                    $(startTime).removeAttr('title');
                    $(startTime).attr('Validate', true);
                    $(endTime).removeClass('border-red');
                    $(endTime).removeAttr('title');
                    $(endTime).attr('Validate', true);
                }
            }
        });
        /**
         * Validate phone đúng định dạng
         * Author: Nguyen Dang Tung(20/12/2020)
         */
        $('input[type="tel"]').blur(function () {
            var testphone = /^[0-9-+() ]+$/i;
            if (!testphone.test($(this).val())) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Số điện thoại không đúng định dạng');
                $(this).attr('Validate', false);

            }
            else {
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
                $(this).attr('Validate', true);

            }
        });
    }
}
var maxCode = null;
var formModel = null;
var detailModuleClass = null;
var detailPracticeGroup = null;
var dividePracticeGroups = null;
var setDisabled = null;
var equipment = null;
