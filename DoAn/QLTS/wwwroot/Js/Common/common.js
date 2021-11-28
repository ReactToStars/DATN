function formatPracticeSchedule(status) {
    switch (status) {
        case 0:
            status = "Chưa dạy";
            break;
        case 1:
            status = "Đã dạy";
            break;
    }
    return status;
}

/**
 * Format day function
 * Created by NTHung (25/11/2021)
 * 
 * @param {any} status
 */
function formatDay(status) {
    switch (status) {
        case 0:
            status = "Thứ 2";
            break;
        case 1:
            status = "Thứ 3";
            break;
        case 2:
            status = "Thứ 4";
            break;
        case 3:
            status = "Thứ 5";
            break;
        case 4:
            status = "Thứ 6";
            break;
        case 5:
            status = "Thứ 7";
            break;
        case 6:
            status = "Chủ nhật";
            break;
    }
    return status;
}

/**
 * Hàm định dạng trạng thái bảo trì
 * @param {any} status dữ liệu dạng số
 * Created By NTHung (14/11/2021)
 */
function formatMaintainance(status) {
    if (status == 0)
        return status = "Bình thường";
    else
        return status = "Bảo trì";
}

/**------------------------------------------------------
 *Hàm định dạng Ngày/Tháng/Năm
 *Author: Nguyen Dang Tung(9/12/2020)
 **@param {dob} date dữ liệu dạng date
 */

function formatDate(date) {
    try {
        if (!date) {
            return "";
        }
        else {
            var date = new Date(date);

            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return day + '/' + month + '/' + year;
        }
    } catch (e) {
        console.log(e);
    }
}

/**-----------------------------------------------------
 *Hàm định dạng số thành tiền
 *Author: Nguyen Dang Tung(9/12/2020)
 **@param {any} number số tiền
 */
function formatMoney(number) {
    try {
        if (number != null) {
            return number.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
        }
        return 0;
    } catch (e) {
        console.log(e);
    }

}
/**
  *Hàm định dạng trạng thái: 0 là chưa học, 1 là đang học họ, 2 là đã kết thúc
 *Author: Nguyen Dang Tung(24/12/2020)
 **@param {any} number:1,2,0
 */
function formatStatus(status) {

    if (status == 1) {
        return status = "Đang học";
    }
    else if (status == 0) {
        return status = "Chưa học";
    }
    else {
        return status = "Đâ kết thúc";
    }

}


/* Hàm định dạng giói tính: 0 là nữ, 1 là nam
 *Author: Nguyen Dang Tung(24/12/2020)
 **@param {any} number:1,2,0
 */
function formatGender(status) {

    if (status == 1) {
        return status = "Nam";
    }
    else {
        return status = "Nữ";
    }
}
/**
  *Hàm định dạng tình trạng công việc: 1 Là đang làm việc, 2 là đang thử việc, 3 là đã nghỉ việc, 0 là đã nghỉ hưu
 *Author: Nguyen Dang Tung(27/12/2020)
 *@param {any} number
 */
function formatStatusJob(statusJob) {
    if (statusJob == 1) {
        return statusJob = "Đang làm việc";
    }
    else if (statusJob == 2) {
        return statusJob = "Đang thử việc";
    }
    else if (statusJob == 3) {
        return statusJob = "Đã nghỉ việc";
    }
    else {
        return statusJob = "Đã nghỉ hưu";
    }
}
/**
 * Lấy dữ liệu từ input qua Dialog
 * Author: Nguyen Dang Tung(1/1/2021)
 * */
function getObject(objectId) {
    try {
        var inputs = $("input[fieldName], .dialog__content select[fieldName],textarea[fieldname]");
        var object = {};
        $.each(inputs, function (index, item) {
            var param = $(this).attr('fieldName');
            var value = $(this).val();
            if ($(this).attr("type") == "number" || $(this).attr("dataType") == "number") {
                value = parseFloat(value);
                if (!value) {
                    if ($(this).attr("fomatType") == "SchoolCredits") {
                        value = 0;
                    }
                }
            }
            if (typeof (value) === "string") {
                object[param] = value.trim();
            }
            else {
                object[param] = value;
            }
        });
        object[objectID] = objectId;
        return object;

    } catch (e) {
        alert(e);
    }
}
/**
 * Làm trắng ô input trong Diolag
 * Author: Nguyen Dang Tung(1/1/2021)
 * */
function resetDialog() {
    $('input[dataType="text"]').val("");
    $('input[dataType="number"]').val("");
    $('textarea').val("");
    $('input[dataType="date"]').val("mm/dd/yyyy");
    $('input').removeClass('border-red');
    $('input[fieldname="PassWord"]').attr("type", 'password');
}

/**
 * Hiển thị dữ liệu ra Table
 * Author: Nguyen Dang Tung(27/12/2020)
 * @param {any} res
 */
function generateTable(response) {
    try {
        //Lấy thông tin các cột dữ liệu
        var ths = $('#tbListData thead th');
        $.each(response, function (index, obj) {
            var tr = $(`<tr> </tr>`);
            objectID = $('#objectID').val();
            var objectTitle = $('#objectTitle').val();
            var ind = index + 1;
            $(tr).data("recordId", obj[objectID]);
            $(tr).data("recordTitle", obj[objectTitle]);
            $.each(ths, function (index, th) {
                //Lấy thông tin dữ liệu sẽ Map tương ứng với các cột 
                var fieldName = $(th).attr('fieldName')
                var value = obj[fieldName];
                var fomatType = $(th).attr('fomatType')
                if (fomatType == "SchoolCredits") {
                    if (!value || value == 0) {
                        value = "0";
                    }
                }
                else {
                    if (!value && value != 0) {
                        value = "";
                    }
                }
                var td = $(`<td title="` + value + `"></td>`);
                switch (fomatType) {
                    case "ddmmyyyy":
                        value = formatDate(value);
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "gender":
                        value = formatGender(value);
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "number":
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "SchoolCredits":
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "status":
                        value = formatStatus(value);
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "detailmodule":
                        var td = $(`<td> <a href="/view/DetailModuleClass.html?ID=` + obj[objectID] + `" >Xem chi tiết</a></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "detailgroup":
                        let moduleclassid = $('#moduleClassID').val();
                        var td = $(`<td> <a href="/view/DetailPracticeGroup.html?moduleClassId=` + obj[moduleclassid] + `&&practiceGroupId=` + obj[objectID] + `" >Xem chi tiết</a></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "equipment":
                        var td = $(`<td><a href="/view/Equipment.html?ID=` + obj[objectID] + `">Chi tiết</a></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "maintainance":
                        value = formatMaintainance(value);
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "day":
                        value = formatDay(value);
                        var td = $(`<td title="${value}"></td>`);
                        td.addClass("text-align-center");
                        break;
                    case "practiceScheduleStatus":
                        value = formatPracticeSchedule(value);
                        var td = $(`<td title="${value}"></td>`);
                        td.addClass('text-align-center');
                        break;
                    //case "statusjob":
                    //    value = formatStatusJob(value);
                    //    var td = $(`<td title="` + value + `"></td>`);
                    //    break;
                    case "STT":
                        value = ind;
                        var td = $(`<td title="` + value + `"></td>`);
                        td.addClass("text-align-center");
                        break;
                    default:
                        break;
                }
                td.append(value);
                $(tr).append(td);
            });
            $('#tbListData tbody ').append(tr);
        })
        var trs = $('#tbListData tbody tr');
        formatGenerateTable(trs)
    } catch (e) {
        console.log(e);
    }
}
/**
 * Hàm tự động đóng hộp thông báo
 * Author: Nguyen Dang Tung (21/1/2021)
 * */
function displaynone(time) {
    setTimeout(function () {
        $('.warring').hide();
    }, time)
}

/**
 * Hiển thị hộp thoại cảnh báo
 * Author: Nguyen Dang Tung(31/12/2020)
 * */
function showAlertWarring(msg, msgLength) {
    $('.warring').show();
    $('.warring-notify').empty();
    if (!msgLength)
        $('.warring-notify').text(msg);
    else
        $.each(msgLength, function (index, item) {
            var div = $(`<div> - ` + item + `</div>`);
            $('.warring-notify').append(div);
        });

    $('#btn-yes-warring,#btn-no-warring').hide();
    $('#btn-ok-warring').show();
}
/**
 * Hiển thị hộp thoại xác nhận
 * Author: Nguyen Dang Tung(31/12/2020)
 * */
function showAlertConfirm(Messenget) {
    $('.warring').show();
    $('.warring-notify').text(Messenget);
    $('#btn-ok-warring').hide();
    $('#btn-yes-warring, #btn-no-warring').show();

}
/**
 * Đóng hộp thoại cảnh báo
 * Author: Nguyen Dang Tung(31/12/2020)
 * */
function closeWarring() {
    $('.warring').hide();
    $('#tbListData tbody tr').removeClass("row-selected");
    //    setDisabled();
}
/**
 * Đặt lại disabled cho nút sửa và xóa
 * Author: Nguyen Dang Tung(1/1/2021)
 */
//function setDisabled() {
//    $('#btnUpdate,#btnDelete').attr("disabled", "disabled")
//}

/**
 * Chuyển đổi dữ liệu từ date lên form
 * Author: Nguyen Dang Tung(23/1/2021)
*/
function formatStringDate(date) {
    try {
        if (!date) {
            return "";
        }
        else {
            var date = new Date(date);

            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return year + "-" + month + "-" + day;
        }
    } catch (e) {
        console.log(e);
    }
}


/**
 * Hiển thị hộp thoại thành công
 * Author: Nguyen Dang Tung(23/1/2020)
 */
function showMessengerSuccess(msg) {
    $('.success_content').text(msg);
    $('.success').show(2000, async function () {
        await setTimeout(async function () {
            await $('.success').hide(1000);
        }, 1500);
    });
    $('.success').css('display', 'flex');
};
/**
 * Đóng hộp thoại thành công
 * Author: Nguyen Dang Tung(23/1/2020)
 */
function hideMessengerSuccess() {
    $('.success').hide();
};

function formatGenerateTable(trs) {
    $.each(trs, function (index, item) {
        let tb = $(this).find("td").eq(5).text();
        tx1 = $(this).find("td").eq(3);
        tx2 = $(this).find("td").eq(4);
        if (parseFloat(tb)) {
            if (!tx1.text()) {
                tx1.text(0);
            }
            if (!tx2.text()) {
                tx2.text(0);
            }
        }
    });
}

var objectID;
var Enum = Enum || {};
Enum = {
    StatusResponse: {
        IsValid: 100,
        NotValid: 400,
        Success: 200,
        NotImplemented: 501,
        MethodNotAllowed : 405
    }
}