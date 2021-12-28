$(document).ready(function () {

    $('#ctl00_butSubmit').click(function () {
        checkInputLength();
        validateInput();
    });

    $('.txt_userCodeWarning, .txt_nameWarning, .txt_phoneWarning').hide();
    $('#btn-ok-warring,#btn-no-warring,#btn-yes-warring,.close').click(function () {
        closeWarring();
    });

    
});

function checkInputLength() {
    var userCode = $('#ctl00_txtUserCode').val();
    var name = $('#ctl00_txtFullName').val();
    var phone = $('#ctl00_txtPhone').val();

    if (userCode.length == 0) {
        $('.txt_userCodeWarning').show();
    }
    else {
        $('.txt_userCodeWarning').hide();
    }
    if (name.length == 0) {
        $('.txt_nameWarning').show();
    }
    else {
        $('.txt_nameWarning').hide();
    }
    if (phone.length == 0) {
        $('.txt_phoneWarning').show();
    }
    else {
        $('.txt_phoneWarning').hide();
    }
}

function validateInput() {
    var userCode = $('#ctl00_txtUserCode').val();
    var name = $('#ctl00_txtFullName').val();
    var phone = $('#ctl00_txtPhone').val();

    var regCode = /^[a-zA-Z0-9-]{1,10}$/;
    var regName = /^[^`~!@#$%^&*()_\-+=\/.\d]{6,50}$/;
    var regPhone = /^[0-9+-]{9,12}$/;

    if (regCode.test(userCode) && regName.test(name) && regPhone.test(phone)) {
        $('.warring_icon').hide();
        $('.success_icon').show();
        $('.warring-notify').text('Yêu cầu của bạn đã được gửi đi, vui lòng chờ quản trị viên xác nhận');
        $('.warring').show();
        $('#ctl00_txtUserCode, #ctl00_txtFullName, #ctl00_txtPhone').val('');
    }
    else {
        $('.warring_icon').show();
        $('.success_icon').hide();
        $('.warring-notify').text('Dữ liệu bạn vừa nhập không hợp lệ, vui lòng kiểm tra lại');
        $('.warring').show();
    }
}

