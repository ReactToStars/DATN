
$(document).ready(function () {
    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 700,
        //height: 198,
        modal: true,
    });

    attendanceJS = new AttendanceJS();
})

class AttendanceJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadstudent();
        this.loadPracticeSchedule();
        this.creditcheck();

    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/attendance/";
        this.getCode = "";
    }

    /**
     * Load attendance from database
     * Created by NTHung (10/12/2021)
     * */
    loadData() {
        try {
            $('.loading').show();
            var id = window.location.href;
            id = id.split("&&")[0];
            id = id.split('=')[1];
            $.ajax({
                url: "/api/v1/attendance/filter?Id=" + id,
                method: "GET",
                data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                cacheData = response;
                $('#tbListData tbody').empty();
                generateTable(response);
                setTimeout(function () {
                    $('.loading').hide();
                }, 500);
            }).fail(function (response) {
                console.log(response);
                $('.loading').hide();
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
    * events in page 
     * Created by NTHung (11/12/2021);
     * */
    initEventsPage() {
        $('#txt-search').keypress(function (e) {
            if (e.which == 13) {
                this.filterData();
            }
        }.bind(this));

        $('.btn-search').click(function () {
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
        $('#btn-refresh').click(function () {
            this.loadData();
            this.loadPracticeSchedule();
        }.bind(this));
        $('#btn-yes-warring').click(this.btnDeleteOnClick);
        $('#btn-update').click(this.btnUpdateOnClick);

        $('.student_of_class ul').off('click').on('click', "li", function () {
            var li = $(`<li value=` + $(this).attr("value") + `>` + $(this).text() + `</li>`)
            $('.student_of_group ul').prepend(li);
            $(this).remove();
        });

        $('.student_of_group ul').off('click').on('click', "li", function () {
            var li = $(`<li value=` + $(this).attr("value") + `>` + $(this).text() + `</li>`)
            $('.student_of_class ul').append(li);
            $(this).remove();
        });

        //checkbox
        $('#txt_attendanceStatus').click(function () {
            if ($(this).attr('class') == 'isChecked') {
                $(this).removeAttr('checked');
                $(this).removeClass('isChecked');
                $(this).val('0');
            }
            else {
                $(this).addClass('isChecked');
                $(this).val('1');
            }
        });
    }

    /**
     * check value when save data
     * Created by NTHung (10/12/2021)
     * */
    creditcheck() {
        $('#btn-save').on('click', function () {
            //Validate dữ liệu
            var studentGroup = $('.student_of_group ul li');
            var studentClass = $('.student_of_class ul li');
            if (studentClass.length == 0 && studentGroup.length == 0) {
                showAlertWarring("Sinh viên trong lớp học phần đều đã có nhóm!");
                displaynone(3000);
                return;
            } if (studentGroup.length == 0) {
                showAlertWarring("Vui lòng chọn sinh viên muốn thêm vào nhóm!");
                displaynone(3000);
                return;
            }

        });

    }

    /**
    * Load students
    * Created by NTHung (10/12/2021)
    */
    loadstudent() {
        let id = window.location.href;
        id = id.split("&&")[1];
        id = id.split("=")[1];
        loadStudentClass(id);
    }

    /**
     * Load practice schedule
     * Created by NTHung (10/12/2021)
     * */
    loadPracticeSchedule() {
        try {
            let id = window.location.href;
            id = id.split("&&")[0];
            id = id.split("=")[1];
            $.ajax({
                url: "/api/v1/PracticeSchedule/find?id=" + id,
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                var count = 0;
                $.each(cacheData, function (index, item) {
                    if (item["AttendanceStatus"] == 0) {
                        count += 1;
                    }
                });
                $('.txt_PracticeScheduleID').attr('value', response['PracticeScheduleID']);
                $('.grid-infor table td[fieldName="PracticeShiftName"]').text(`${response["PracticeShiftName"]}`);
                $('.grid-infor table td[fieldName="PracticeGroupName"]').text(`${response["PracticeGroupName"]}`);
                $('.grid-infor table td[fieldName="PracticalLaboratoryName"]').text(`${response["PracticalLaboratoryName"]}`);
                $('.grid-infor table td[fieldName="FullName"]').text(`${response["FullName"]}`);
                var date = formatDate(response["Date"]);
                $('.grid-infor table td[fieldName="Date"]').text(`${date}`);
                $('#absent').text(`${count}`);
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Save data to database 
     * Created by NTHung (10/12/2021)
     */
    btnSaveOnClick() {
        //let id = window.location.href, url1 = id.split("&&")[0], id1;
        //id1 = url1.split("=")[1];
        formMode = "Add";
        var listobject = getObject();
        $.each(listobject, function (index, items) {

            listData = cacheData.filter(function (item) {
                return (item["PracticeSchedule"] === items['PracticeSchedule']) && (item["StudentID"] === items['StudentID']);
            });
            if (listData.length != 0) {
                $('select[fieldName="StudentID"]').focus();
                showAlertWarring('Sinh viên đã thuộc trong nhóm thực hành!', '');
                displaynone(3000);
            }

            else {
                var isvalidate = $('input[validate="false"]');
                try {
                    if (isvalidate.length == 0) {
                        $.ajax({
                            url: "/api/v1/attendance",
                            method: "POST",
                            data: JSON.stringify(items),
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
                                attendanceJS.loadData();
                                attendanceJS.loadPracticeSchedule();
                            }
                        }).fail(function (response) {
                            //console.log(response);
                            var msg = response.responseJSON.Data;
                            var msgLength = response.responseJSON.Data.length;
                            showAlertWarring(msg, msgLength);
                            displaynone(3000);
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
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
            var msg = "Bạn có chắc chắn muốn xóa sinh viên " + recordTitle+ " không?";
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
                url: "/api/v1/attendance/" + recordId,
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
                    attendanceJS.loadData();
                    attendanceJS.loadPracticeSchedule();
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
        formMode = "Edit";
        var object = getObject(recordId);
        //console.log(object);
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/attendance",
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
                        attendanceJS.loadData();
                        attendanceJS.loadPracticeSchedule();
                    }
                }).fail(function (response) {
                    //console.log(response);
                    var msg = response.responseJSON.Data;
                    //var msgLength = response.responseJSON.Data.length;
                    showAlertWarring(msg, "");
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
            listData = cacheData.filter(function (item) {
                return (item["StudentCode"].toLowerCase().includes(value.toLowerCase())
                    || item["FullName"].toLowerCase().includes(value.toLowerCase()));
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

    if (formMode === "Add") {
        let ListObject = [];
        let listStudent = $(".student_of_group ul li");
        $.each(listStudent, function (index, item) {
            var object = {};
            object["PracticeScheduleID"] = $('.txt_PracticeScheduleID').attr('value');
            object["StudentID"] = $(this).attr("value");
            ListObject.push(object);

        });
        return ListObject;
    }
    else if (formMode === "Edit") {
        var object = {};
        object["PracticeScheduleID"] = $('.txt_PracticeScheduleID').attr('value');
        object["StudentID"] = $(".txt_StudentID").val();
        object["Description"] = $('textarea[fieldName="Description"]').val();
        object["AttendanceStatus"] = parseInt($('.cbx_attendanceStatus').val());
        object["StartTime"] = $('input[fieldName="StartTime"]').val();
        object["EndTime"] = $('input[fieldName="EndTime"]').val();
        
        //object['AttendanceStatus'] = parseInt($('#txt_attendanceStatus').val());
        object["AttendanceID"] = id;
        return object;
    }
}

/**
 * Load Student form detail practice group
 * Created by NTHung (10/12/2021)
 * @param {any} id
 */
function loadStudentClass(id) {
    try {
        let listStudentsFromPracticeGroup = [];

        $.ajax({
            url: "/api/v1/detailPracticeGroup/filter?Id=" + id, //Địa chỉ API lấy dữ liệu
            method: "GET",//Phương thức Get, Set, Put, Delete...
            async: false,
            //data: null,
            dataType: 'json',
            connectType: 'application/json'
        }).done(function (response) {
            $.each(response, function (index, student) {
                listStudentsFromPracticeGroup.push(student);
            });

        }).fail(function (response) {
            console.log(response);
        });
        var practiceScheduleId = window.location.href;
        practiceScheduleId = practiceScheduleId.split("&&")[0];
        practiceScheduleId = practiceScheduleId.split('=')[1];

        $.ajax({
            url: "/api/v1/attendance/filter?Id=" + practiceScheduleId,
            method: "GET",
            async: false,
            data: null,
            dataType: 'json',
            connectType: 'application/json'
        }).done(function (response) {
            var listStudentsFromAttendance = response;
            $.each(listStudentsFromAttendance, function (index, listStudents) {
                listStudentsFromPracticeGroup = listStudentsFromPracticeGroup.filter(item => item["StudentID"] != listStudents["StudentID"]);
            });
            $.each(listStudentsFromPracticeGroup, function (index, item) {
                var li = $(`<li value=` + item['StudentID'] + `>` + item['FullName'] + `</li>`);
                $('.student_of_class ul ').append(li);

            });
        }).fail(function (response) {
            console.log(response);
        });
    } catch (e) {
        console.log(e);
    }
}


function resetDialog() {
    $('.student_of_class ul ').find('li').remove();
    $('.student_of_group ul ').find('li').remove();
    if ($('#txt_attendanceStatus').val() == '1') {
        $('#txt_attendanceStatus').attr('checked', '');
    }
    else {
        $('#txt_attendanceStatus').removeAttr('checked');
    }
    let id = window.location.href;
    id = id.split("&&")[1];
    id = id.split("=")[1];
    loadStudentClass(id);
}


var formMode = "";
var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];

var detailPracticeGroup = true;
var setDisabled = true;
