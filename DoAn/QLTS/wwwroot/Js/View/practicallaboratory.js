
$(document).ready(function () {
    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        width: 666,
        //height: auto,
        modal: true,


    });
    practicallaboratoryJS = new PracticalLaboratoryJS();
})

class PracticalLaboratoryJS extends BaseJS {
    constructor() {
        super();
        this.initEventsPage();
        this.loadBuilding()
        this.loadsubject();
        this.loadOlogy();
    }

    setDataUrl() {
        this.getDataUrl = "/api/v1/practicallaboratory/";
        this.getCode = "PracticalLaboratoryCode";
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

        $('#cbx_building').on('change', function () {
            this.filterData();
        }.bind(this));
        $('#cbx_subject').on('change', function () {
            this.filterData();
        }.bind(this));
        $('#cbx_ology').on('change', function () {
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


    }


    /**
    * Load dữ liệu bảng Department lên trang
    * Author: Nguyen Dang Tung(27/12/2020)
    */
    loadBuilding() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Building",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['BuildingID'] + `>` + item['BuildingName'] + `</option>`);
                    $('.cbx_building ').append(option);
                })
            }).fail(function (response) {
                console.log(response);
            })
        } catch (e) {
            console.log(e);
        }
    }
    loadsubject() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Subject",
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
    loadOlogy() {
        try {
            //$('#cbxDepartmentr option').empty();
            $.ajax({
                url: "/api/v1/Ology",
                method: "GET",
                async: true,
                //data: null,
                dataType: 'json',
                connectType: 'application/json'
            }).done(function (response) {
                // console.log(response);
                $.each(response, function (index, item) {
                    var option = $(`<option value=` + item['OlogyID'] + `>` + item['OlogyName'] + `</option>`);
                    $('.cbx_ology').append(option);
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
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/practicallaboratory",
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
                        practicallaboratoryJS.loadData();
                    }
                }).fail(function (response) {
                    console.log(response);
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
                url: "/api/v1/practicallaboratory/" + recordId,
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
                    practicallaboratoryJS.loadData();
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
        var isvalidate = $('input[validate="false"]');
        try {
            if (isvalidate.length == 0) {
                $.ajax({
                    url: "/api/v1/practicallaboratory",
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
                        practicallaboratoryJS.loadData();
                    }
                }).fail(function (response) {
                    console.log(response);
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
            var buildingId = $('#cbx_building option:selected ').val();
            var subjectId = $('#cbx_subject option:selected ').val();
            var ologyId = $('#cbx_ology option:selected ').val();
            listData = cacheData.filter(function (item) {
                return ((item["PracticalLaboratoryCode"].toLowerCase()).includes(value.toLowerCase())
                    || (item["PracticalLaboratoryName"].toLowerCase()).includes(value.toLowerCase()))
                    && (buildingId ? item["BuildingID"] === buildingId : item["BuildingID"] != buildingId)
                    && (subjectId ? item["SubjectID"] === subjectId : item["SubjectID"] != subjectId)
                    && (ologyId ? item["OlogyID"] === ologyId : item["OlogyID"] != ologyId);
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

