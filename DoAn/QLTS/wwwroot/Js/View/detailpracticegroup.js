
$(document).ready(function () {
    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 700,
        //height: 198,
        modal: true,
    });

    detailpracticegroupJS = new DetailPracticeGroupJS();


})

class DetailPracticeGroupJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadstudent();
        this.loadPracticeGroup();
        this.creditcheck();

    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/detailpracticegroup/";
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

    }

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

        $('#btn-practiceSchedule').click(function () {
            let id = window.location.href;
            id = id.split("&&")[1];
            id = id.split("=")[1];
            window.location.href = "/view/PracticeSchedule.html?PracticeGroupID=" + id + "";
        });

    }

    /**
    * Load dữ liệu bảng Department lên trang
    * Author: Nguyen Dang Tung(27/12/2020)
    */
    loadstudent() {
        let id = window.location.href, url1 = id.split("&&")[0], url2 = id.split("&&")[1], id1, id2;
        id1 = url1.split("=")[1];
        loadStudentClass(id1)
    }

    loadPracticeGroup() {
        try {
            let id = window.location.href, url1 = id.split("&&")[0], url2 = id.split("&&")[1], id1, id2;
            id1 = url1.split("=")[1];
            id2 = url2.split("=")[1];

            $('.Back_To_Page').attr('href', '/view/DividePracticeGroups.html?moduleClassId=' + id1 + '')

            $.ajax({
                url: "/api/v1/PracticeGroup/find?id=" + id2,
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                $('.txt_Group').attr('value', response['PracticeGroupName']);
                $('.txt_GroupID').attr('value', response['PracticeGroupID']);
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

    /**
     * Lưu dữ liệu 
     * Author: Nguyen Dang Tung(31/12/2020)
     */
    btnSaveOnClick() {
        let id = window.location.href, url1 = id.split("&&")[0], id1;
        id1 = url1.split("=")[1];
        formMode = "Add";
        var listobject = getObject();
        $.each(listobject, function (index, items) {

            listData = cacheData.filter(function (item) {
                return (item["PracticeGroupID"] === items['PracticeGroupID']) && (item["StudentID"] === items['StudentID']);
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
                            url: "/api/v1/detailpracticegroup",
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
                                console.log(response);
                                dialog.dialog("close");
                                var msg = response.Messenger;
                                showMessengerSuccess(msg);
                                detailpracticegroupJS.loadData();
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
                url: "/api/v1/detailpracticegroup/" + recordId,
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
                    detailpracticegroupJS.loadData();
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
                    url: "/api/v1/detailpracticegroup",
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
                        detailpracticegroupJS.loadData();
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
    /**
     * Hàm tìm kiếm dữ liệu
     * Author: Nguyen Dang Tung(15/12/2020)
     * */
    filterData() {
        try {

            var value = $('#txt-search').val();
            listData = cacheData.filter(function (item) {
                return (item["StudentCode"].toLowerCase()).includes(value.toLowerCase()) || (item["FullName"].toLowerCase()).includes(value.toLowerCase());
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
            object["PracticeGroupID"] = $('.txt_GroupID').attr('value');
            object["StudentID"] = $(this).attr("value");
            ListObject.push(object);

        });
        return ListObject;
    }
    else if (formMode === "Edit") {
        var object = {};
        object["PracticeGroupID"] = $('.txt_GroupID').attr('value');
        object["StudentID"] = $(".txt_StudentID").val();
        object["Note"] = $('textarea[fieldName="Note"]').val();
        object["DetailPracticeGroupID"] = id;
        return object;
    }
}
//Load sinh viên trong lớp học phần
//@param {any} id

function loadStudentClass(id) {
    try {
        let ListOfStudentsWithGroups = [];

        $.ajax({
            url: "/api/v1/practicegroup/filter?Id=" + id + "", //Địa chỉ API lấy dữ liệu
            method: "GET",//Phương thức Get, Set, Put, Delete...
            async: false,
            //data: null,
            dataType: 'json',
            connectType: 'application/json'
        }).done(function (response) {
            if (response != null) {
                $.each(response, function (index, item) {
                    $.ajax({
                        url: "/api/v1/detailPracticeGroup/filter?Id=" + item["PracticeGroupID"] + "", //Địa chỉ API lấy dữ liệu
                        method: "GET",//Phương thức Get, Set, Put, Delete...
                        async: false,
                        //data: null,
                        dataType: 'json',
                        connectType: 'application/json'
                    }).done(function (response1) {
                        $.each(response1, function (index, student) {
                            ListOfStudentsWithGroups.push(student);
                        });
                    }).fail(function (response) {
                        console.log(response);
                    })
                });

            }
        }).fail(function (response) {
            console.log(response);
        })

        $.ajax({
            url: "/api/v1/DetailModuleClass/filter?Id=" + id + "",
            method: "GET",
            async: true,
            //data: null,
            dataType: 'json',
            connectType: 'application/json'
        }).done(function (response) {
            // console.log(response);
            var ListStudentOfClass = response;
            var li = "";
            $.each(ListOfStudentsWithGroups, function (index, studentGroup) {
                ListStudentOfClass = ListStudentOfClass.filter(item => item["StudentID"] != studentGroup["StudentID"]);
            });
            $.each(ListStudentOfClass, function (index, item) {

                li = $(`<li value=` + item['StudentID'] + `>` + item['FullName'] + `</li>`);
                $('.student_of_class ul ').append(li);

            });
        }).fail(function (response) {
            console.log(response);
        })
    } catch (e) {
        console.log(e);
    }
}
function resetDialog() {
    $('.student_of_class ul ').find('li').remove();
    $('.student_of_group ul ').find('li').remove();
    let id = window.location.href, url1 = id.split("&&")[0], url2 = id.split("&&")[1], id1, id2;
    id1 = url1.split("=")[1];
    loadStudentClass(id1)
}


var formMode = "";
var recordId = null;
var recordTitle = null;
var cacheData = [];
var listData = [];

var detailPracticeGroup = true;
var setDisabled = true;
