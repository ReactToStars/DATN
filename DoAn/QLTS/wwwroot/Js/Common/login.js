$(document).ready(function () {
    new Login();
});

/**
 * Class dùng để login
 * NDTUNG 24.02.2021
 * */
class Login {

    /**
    * Hàm khởi tạo
    * CreatedBy: NDTUNG (24/2/2021)
    * */
    constructor() {
        var me = this;

        // Khởi tạo các sự kiện cho form 
        me.initEvents();
    }

    /**
     * Hàm các sự kiện form Login
     * CreatedBy: NDTUNG (24/2/2021)
     * */
    initEvents() {
        var me = this;

        // Khởi tạo sự kiện khi click button login
        $('#btn-login').off('click');
        $('#btn-login').on('click', me.loginOnClick.bind(me));

        // Sự kiện khi blur qua input
        $('input[required]').on("blur", function () {
            me.checkInput($(this));
        });

        //Sự kiện khi nhập tại input
        $('input[required]').on("keyup", function () {
            me.inputEventOnKeyUp($(this))
        });

        //Sự kiện khi click qua input
        $('input').click(function () { $(this).select(); });

        // Sự kiện khi nhấn qua enter
        $('.login').keypress(function (event) {
            if (event.which == 13) {
                $('[required]').trigger('blur');
                $('#btn-login').trigger('click');
            }
        });

        $('.view_pass').on("click", function () {
            let type = $("#txtPassword").attr("type");
            if (type === "password") {
                $("#txtPassword").attr('type', 'text');
            }
            else {
                $("#txtPassword").attr('type', 'password');
            }
        });

        $('#btn-ok-warring,#btn-no-warring,#btn-yes-warring,.close').click(closeWarring);

    }

    /**
    * Sự kiện khi nhập tại input
    * CreatedBy: NDTUNG (24/2/2021)
    * */
    inputEventOnKeyUp(input) {
        if (input.val().trim() != "") {
            input.removeClass('border-red');
            input.removeAttr('title');
            input.tooltip({
                items: $(this),
                disabled: true,
            })
        }
    }

    /**
    * Hàm kiểm tra bắt buộc nhập và độ dài input
    * CreatedBy: NDTUNG (18/2/2021)
    */
    checkInput(input) {

        var maxLength,
            val = input.val().trim();

        maxLength = parseInt(input.attr('maxlength'));

        if (val == "") {

            input.addClass('border-red');
            input.attr('title', 'Trường này không được để trống');

            this.showTooltip(input);
            input.tooltip("close");
        }
        else if (val.length > maxLength) {

            this.showTooltip(input);
            $(this).tooltip("close");
        }

        else {
            this.hideTooltip(input);
        }
    }
    /**
     * Hàm kiểm tra bắt buộc nhập các trường input
     * CreatedBy: NDTUNG (18/2/2021)
     */
    checkRequired() {
        var me = this,
            isValid = true;

        $("input[required]").each(function () {

            var val = $(this).val().trim();

            if (val == "") {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');

                me.showTooltip($(this));

                isValid = false;
            }
            else {
                me.hideTooltip($(this))
            }
        });

        var inputRequire = $(".border-red");

        inputRequire.first().focus();
        return isValid;
    }

    /**
     * Hàm kiểm tra độ dài các trường input
     * CreatedBy: NDTUNG (18/2/2021)
     */
    checkLength() {

        var me = this,
            isValid = true;

        $("input[maxlength]").each(function () {

            var maxlength = parseInt($(this).attr('maxlength')),
                val = $(this).val().trim();

            if (val.length > maxlength) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Không được dài quá ' + maxlength + ' ký tự');

                me.showTooltip($(this));
                isValid = false;
            }
            else {
                me.hideTooltip($(this))
            }
        });
        var inputRequire = $(".border-red");

        inputRequire.first().focus();
        return isValid;
    }

    /**
    * Reset lại Login
    * CreatedBy : NDTUNG (18/2/2021)
    */
    resetLogin() {
        $("[fieldName]").each(function () {
            $(this).val("");
        });
        $(".border-red").removeClass("border-red");
    }

    /**
    * Kiểm tra form Login
    * CreatedBy : NDTUNG (17/2/2021)
    */
    validateLogin() {
        var isValid = this.checkRequired();

        if (isValid) { isValid = this.checkLength() }
        return isValid;
    }

    /**
     * Sự kiện kích nút đăng nhập
     * CreatedBy: NDTUNG (18/2/2021)
     */
    loginOnClick() {
        var obj = getObject();
        var isValid = this.validateLogin();
        if (isValid) {
            try {
                $.ajax({
                    url: "/api/v1/Account/Login",
                    method: "POST",
                    data: JSON.stringify(obj)
                    ,
                    dataType: 'json',
                    contentType: 'application/json',
                    async: true
                }).done(function (response) {
                    if (response.Code == Enum.StatusResponse.Success) {
                        var msg = response.Messenger;
                        //showMessengerSuccess(msg);
                        window.location.href = response.Data;
                    }
                    else if (response.Code == Enum.StatusResponse.NotValid) {
                        var msg = response.Messenger;
                        showAlertWarring(msg);
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
        }
    }

    /**
    * Hiển thị Tooltip
    * CreatedBy: NDTUNG (22/2/2021)
    */
    showTooltip(input) {
        input.tooltip({
            items: input,
            content: input.attr('title'),
            track: true,
            position: {
                my: "left+10 top",
                at: "right+5 top",
                collision: "none"
            },
            disabled: false
        })
    }

    /**
     * Ẩn Tooltip
     * CreatedBy: NDTUNG (22/2/2021)
     */
    hideTooltip(input) {
        input.removeClass('border-red');
        input.removeAttr('title');
        input.tooltip({
            items: input,
            disabled: true
        });
    }
}