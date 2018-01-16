 //var baseURL = BaseURL = 'http://localhost/souqplace/code/';
 
//alert(document.location.host);
$(document).ready(function ($) {
    $('.checkboxCon input:checked').parent().css('background-position', '-114px -260px');
    $("#selectallseeker").click(function () {
        $('.caseSeeker').attr('checked', this.checked);
        if (this.checked) {
            $(this).parent().addClass('checked');
            $('.checkboxCon').css('background-position', '-114px -260px');
        } else {
            $(this).parent().removeClass('checked');
            $('.checkboxCon').css('background-position', '-38px -260px');
        }
    });

    // if all checkbox are selected, check the selectall checkbox
    // and viceversa
    $(".caseSeeker").click(function () {

        if ($(".caseSeeker").length == $(".caseSeeker:checked").length) {
            $("#selectallseeker").attr("checked", "checked");
            $("#selectallseeker").parent().addClass("checked");
        } else {
            $("#selectallseeker").removeAttr("checked");
            $("#selectallseeker").parent().removeClass("checked");
        }

    });

    $('.checkboxCon input').click(function () {
        if (this.checked) {
            $(this).parent().css('background-position', '-114px -260px');
        } else {
            $(this).parent().css('background-position', '-38px -260px');
        }
    });

    $(".popup-signup-ajax").click(function ()
    {
        //alert(baseURL);return false;
        $.ajax(
                {
                    type: 'POST',
                    url: baseURL + 'googlelogin/index.php',
                    data: {},
                    success: function (data)
                    {
                        //location.reload();
                        //alert('sss');
                        //$("#popupCheckId").val('1');
                        $("#popup_container").css("display", "block");
                    }

                });
    });

    /**
     * Menu notifications hover
     * 
     */
    $('.gnb-notification').mouseenter(function () {
        if ($(this).hasClass('cntLoading'))
            return;
        $(this).addClass('cntLoading');
        $('.feed-notification').show();
        $('.feed-notification').find('ul').remove();
        $(this).find('.loading').show();
        $.ajax({
            type: 'post',
            url: baseURL + 'site/notify/getlatest',
            dataType: 'json',
            success: function (json) {
                if (json.status_code == 1) {
                    $('.feed-notification').find('.loading').after(json.content);
                    $('.moreFeed').show();
                } else if (json.status_code == 2) {
                    $('.feed-notification').find('.loading').after(json.content);
                    $('.moreFeed').hide();
                }
            },
            complete: function () {
                $('.gnb-notification').find('.loading').hide();
                $('.gnb-notification').removeClass('cntLoading');
            }
        });
    }).mouseleave(function () {
        $('.feed-notification').hide();
    });


    /*************Common validaion function*******************/
    $("#fullname,#username,#email,#user_password,#pass,#confirmpass,#lastname").keypress(function () {
        $("#" + this.id + "Err").html('');
        $("#" + this.id + "Err").hide();
    });

    $("#fullname,#username,#email,#user_password,#pass,#confirmpass,#lastname").blur(function () {
        $("#" + this.id + "Err").html('');
        $("#" + this.id + "Err").hide();
    });




//confirm order status change
    $(".changeShipstatus").change(function () {
        var dealCodeNumber = $(this).attr('data-val-id');
        var shipping_status = $(this).val();
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/order/order_update',
            dataType: 'html',
            data: {'dealCodeNumber': dealCodeNumber, 'shipping_status': shipping_status},
            success: function (response) {
                window.location.reload();
                /*if(response== 'Success'){
                 window.location.reload();
                 }*/
            }
        });
    });

//confirm order status change
    $(".update_serach").click(function () {

        dealCodeNumber = $('#dealCodeNumber').val();
        shipping_status = $('#shipping_status').val();
        pickup_date = $('#pickup_date').val();
        pickup_time = $('#pickup_time').val();
        var err_cnt = 0;

        if (pickup_date == '') {
            $('.pickup_date_err1').addClass('has-error');
            $('.pickup_date_err2').html('This Field is required');
            err_cnt = 1;
        } else {
            $('.pickup_date_err1').removeClass('has-error');
            $('.pickup_date_err2').html('');
        }

        if (pickup_time == '') {
            $('.pickup_time_err1').addClass('has-error');
            $('.pickup_time_err2').html('This Field is required');
            err_cnt = 1;
        } else {
            $('.pickup_time_err1').removeClass('has-error');
            $('.pickup_time_err2').html('');
        }

        if (err_cnt == 0) {

           $(".update_serach").prop('disabled', true);
           $(".update_serach").html('Waiting for response..');
            $.ajax({
                type: 'post',
                url: baseURL + 'site/shop/shoporder_update',
                dataType: 'html',
                data: {'dealCodeNumber': dealCodeNumber, 'shipping_status': shipping_status, 'pickup_date': pickup_date, 'pickup_time': pickup_time},
                success: function (response) {
                   //console.log(response);
                    window.location.reload();
                }
            });
        }
    });


//confirm order status change
    $(".changeShipstatusShop").change(function () {
        shipping_status = $(this).val();
        dealCodeNumber = $(this).attr('data-val-id');
        if (shipping_status == 'Ready to ship') {
            $('#dealCodeNumber').val(dealCodeNumber);
            $('#shipping_status').val($(this).val());
            $('#optpoup').modal('show');
        } else {
            $.ajax({
                type: 'post',
                url: baseURL + 'site/shop/shoporder_update',
                dataType: 'html',
                data: {'dealCodeNumber': dealCodeNumber, 'shipping_status': shipping_status},
                success: function (response) {


                    window.location.reload();
                }
            });
        }
    });
    $(".changePaymentStatusOrder").change(function () {
        var dealCodeNumber = $(this).attr('data-val-id');
        var shipping_status = $(this).val();
        $.ajax({
            type: 'post',
            url: baseURL + 'site/shop/payment_status',
            dataType: 'html',
            data: {'dealCodeNumber': dealCodeNumber, 'payment_status': shipping_status},
            success: function (response) {
                window.location.reload();
            }
        });
    });
    $(".changePaymentStatusOrder1").change(function () {
        var dealCodeNumber = $(this).attr('data-val-id');
        var shipping_status = $(this).val();
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/order/order_payupdate',
            dataType: 'html',
            data: {'dealCodeNumber': dealCodeNumber, 'payment_status': shipping_status},
            success: function (response) {
                window.location.reload();
            }
        });
    });
    $("#postcmt").keypress(function () {
        $("#" + this.id).removeClass('errors');
    });
    $("#postcomment").click(function () {
        var orderid = $(this).attr('data-val-id');
        var post_message = $('#postcmt').val();
        var buyerid = $('#buyerid').val();
        var sellerid = $('#sellerid').val();
        $('#postcmt').removeClass('errors');
        if (post_message == '') {
            $('#postcmt').addClass('errors');
            return false;
        } else {
            $('#postcmt').removeClass('errors');
            $('#postLoading').show();
            $.ajax({
                type: 'post',
                url: baseURL + 'site/order/postcomment',
                dataType: 'html',
                data: {'orderid': orderid, 'post_message': post_message, 'buyerid': buyerid, 'sellerid': sellerid},
                success: function (response) {
                    if (response != '') {
                        //$("#comments tr:first").before(response);
                        $('#postcmt').val('');
                        var arr = response.split('|<^>|');
                        $("#comments").html(arr[0]);
                        $("#totalCmt").html('(' + arr[1] + ')');
                        $('#postLoading').hide();
                    }
                    //alert(response);
                }
            });
        }
    });
    $("#postclaim").click(function () {
        var orderid = $(this).attr('data-val-id');
        var post_message = $('#postcmt').val();
        var buyerid = $('#buyerid').val();
        var sellerid = $('#sellerid').val();
        var grand_total = $('#grand_total').val();
        //alert(grand_total); 
        $('#postcmt').removeClass('errors');
        if (post_message == '') {
            $('#postcmt').addClass('errors');
            return false;
        } else {
            $('#postcmt').removeClass('errors');
            $('#postLoading').show();
            $.ajax({
                type: 'post',
                url: baseURL + 'site/order/postclaim',
                dataType: 'html',
                data: {'orderid': orderid, 'post_message': post_message, 'buyerid': buyerid, 'sellerid': sellerid, 'grand_total': grand_total},
                success: function (response) {
                    if (response != '') {
                        //$("#comments tr:first").before(response);
                        $('#postcmt').val('');
                        var arr = response.split('|<^>|');
                        $("#comments").html(arr[0]);
                        $("#totalCmt").html('(' + arr[1] + ')');
                        $('#postLoading').hide();
                        window.location.reload();
                    }
                    //alert(response); return false;
                }
            });
        }
    });
    /* Dispute Files Upload Starts here*/
    $(document).ready(function (e) {
        $("#file_upload_attach").change(function (e) {
            var filecount = parseInt($('#filecount').html());
            if (filecount > 0) {
                var avatar = $("#file_upload_attach").val();
                var extension = avatar.split('.').pop().toUpperCase();
                if (extension != "PNG" && extension != "JPG" && extension != "GIF" && extension != "JPEG") {
                    avatarok = 0;
                    //alert("invalid extension "+extension);
                    alert("Please upload image files only.");
                    return false;
                }
                $("#loadedFile").css("display", "block");
                var formData = new FormData($(this).parents('form')[0]);
                $.ajax({
                    beforeSend: function () {
                        document.getElementById("loadedFile").src = 'images/loading.gif';
                    },
                    url: 'site/order/ajax_load_Files',
                    type: 'POST',
                    xhr: function () {
                        var myXhr = $.ajaxSettings.xhr();
                        return myXhr;
                    },
                    success: function (datas) {
                        //alert(datas); return false;
                        //load_ajax_DigiFiles_list
                        $.get('site/order/load_ajax_DigiFiles_list/' + datas, function (data) {
                            $("#DigiFiles tr:last").after(data);
                        });
                        $("#loadedFile").css("display", "none");
                        $('#filecount').html(filecount - 1);
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            else
            {
                alert('Maximum five files are Allowed to upload');
            }
        });
        return false;
    });
    /* Dispute Files Upload Ends here*/

    $("#closedclaim").click(function () {
        var orderid = $(this).attr('data-val-id');
        var post_message = $('#postcmt').val();
        var buyerid = $('#buyerid').val();
        var sellerid = $('#sellerid').val();
        var grand_total = $('#grand_total').val();

        $('#postcmt').removeClass('errors');
        if (post_message == '') {
            $('#postcmt').addClass('errors');
            return false;
        } else {
            $('#postcmt').removeClass('errors');
            $('#postLoading').show();
            /* $('input[name="file_upload_attach[]"]').change(function(){
             var fileNames = $('input[name="file_upload_attach[]"]').map(function(){return $(this).val();}).get();
             console.log(fileNames);
             //alert(fileNames); return false;
             }) */
            $.ajax({
                type: 'post',
                url: baseURL + 'site/order/closedclaim',
                dataType: 'html',
                //data:{'orderid':orderid,'post_message':post_message,'buyerid':buyerid,'sellerid':sellerid,'grand_total':grand_total},
                data: {'orderid': orderid, 'post_message': post_message, 'buyerid': buyerid, 'sellerid': sellerid, 'grand_total': grand_total},
                success: function (response) {
                    if (response != '') {
                        //$("#comments tr:first").before(response);
                        $('#postcmt').val('');
                        var arr = response.split('|<^>|');
                        $("#comments").html(arr[0]);
                        $("#totalCmt").html('(' + arr[1] + ')');
                        $('#postLoading').hide();
                        window.location.reload();
                    }
                    //alert(response); return false;
                }
            });
        }
    });



});

function message_validation() {
    if (document.getElementById('postcmt').value == "") {
        alert(enter_ur_cmt);
        document.getElementById('postcmt').focus();
        return false;
    }
}

function checkBoxValidationUser(req, AdmEmail) {

    var tot = 0;
    var chkVal = 'on';
    var frm = $('#seekerActionForm input');
    for (var i = 0; i < frm.length; i++) {
        if (frm[i].type == 'checkbox') {
            if (frm[i].checked) {
                tot = 1;
                if (frm[i].value != 'on') {
                    chkVal = frm[i].value;
                }
            }
        }
    }
    if (tot == 0) {
        alert(sel_checkbox);
        return false;
    } else if (chkVal == 'on') {
        alert(no_records_found);
        return false;

    } else {
        var didConfirm = confirm(u_want_continue_action);
        if (didConfirm == true) {
            $('#statusMode').val(req);
            $('#seekerActionForm').submit();
        } else {
            return false;
        }
    }

}

function checkBoxValidationAdmin(req, AdmEmail) {

    var tot = 0;
    var chkVal = 'on';
    var frm = $('#display_form input');
    for (var i = 0; i < frm.length; i++) {
        if (frm[i].type == 'checkbox') {
            if (frm[i].checked) {
                tot = 1;
                if (frm[i].value != 'on') {
                    chkVal = frm[i].value;
                }
            }
        }
    }
    if (tot == 0) {
        alert(sel_checkbox);
        return false;
    } else if (chkVal == 'on') {
        alert(no_records_found);
        return false;

    } else {
        confirm_global_status(req, AdmEmail);
    }

}
function checkBoxWithSelectValidationAdmin(req, AdmEmail) {
    var templat = $('#mail_contents').val();
    if (templat == '') {
        alert("Please select the mail template");
        return false;
    }
    var tot = 0;
    var chkVal = 'on';
    var frm = $('#display_form input');
    for (var i = 0; i < frm.length; i++) {
        if (frm[i].type == 'checkbox') {
            if (frm[i].checked) {
                tot = 1;
                if (frm[i].value != 'on') {
                    chkVal = frm[i].value;
                }
            }
        }
    }
    if (tot == 0) {
        alert(sel_checkbox);
        return false;
    } else if (chkVal == 'on') {
        alert(no_records_found);
        return false;

    } else {
        confirm_global_status(req, AdmEmail);
    }

}
function SelectValidationAdmin(req, AdmEmail) {
    var templat = $('#mail_contents').val();
    if (templat == '') {
        alert("Please select the mail template");
        return false;
    }

    confirm_global_status(req, AdmEmail);


}
function confirm_global_status(req, AdmEmail) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'Whether you want to continue this action?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    bulk_logs_action(req, AdmEmail);
                    //$('#statusMode').val(req);
                    //$('#display_form').submit();
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}

//Bulk Active, Inactive, Delete Logs created by siva
function bulk_logs_action(req, AdmEmail) {


    var perms = prompt("For Security Purpose, Please Enter Email Id");
    if (perms == '') {
        alert("Please Enter The Email ID");
        return false;
    } else if (perms == null) {
        return false;
    } else {
        if (perms == AdmEmail) {
            $('#statusMode').val(req);
            $('#SubAdminEmail').val(AdmEmail);
            $('#display_form').submit();
        } else {
            alert("Please Enter The Correct Email ID");
            return false;
        }
    }



}
function changeFavouritesearch(pid, type) {

    var ar = location.href;
    var d = ar.split("browse");
    var redirect = "";
    if (d.length == 1)
    {

        var d = ar.split("market");
        if (d.length == 1)
        {
            d = ar.split("products");

            if (d.length > 1)
            {
                redirect = "products" + d[1];
            }
            else
            {
                redirect = "";
            }
        }
        else
        {
            redirect = "market" + d[1];
        }
    }
    else
    {
        redirect = "browse" + d[1];
    }
    status = "status_" + pid;

    typecheck = $('#' + status).val();

    $('#loader_' + pid).css('display', 'inline-block');
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/product_favorite_status_new',
        data: {'pid': pid, 'type': typecheck},
        dataType: 'json',
        success: function (json) {
            if (json.status_code == 2) {
                //$(".ownproductfav-popup").colorbox({width:"350px", height:"auto", open:true,inline:true, href:"#alert_ownproductfav"});
                $('#ownProdFavAlertCommonlink').trigger('click');
            } else if (json.status_code == 1) {
                //window.location.href = window.location.href;
                if (typecheck == 'Fresh')
                {
                    $('#css_' + pid).addClass('red_fav');

                    $('#' + status).val('Old');
                    $('#loader_' + pid).css('display', 'none');

                }
                else
                {
                    $('#css_' + pid).removeClass('red_fav');
                    $('#' + status).val('Fresh');


                    $('#loader_' + pid).css('display', 'none');

                }
            } else {
                window.location.href = baseURL + 'login?action=' + json.next_url + '&redirect=' + redirect;
            }
        }
    });
}

//confirm status change
function confirm_status(path) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'You are about to change the status of this record ! Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    window.location = BaseURL + path;
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}
//confirm mode change
function confirm_mode(path) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'You are about to change the display mode of this record ! Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    window.location = BaseURL + path;
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}
function confirm_delete(path) {
    $.confirm({
        'title': 'Delete Confirmation',
        'message': 'You are about to delete this record. <br />It cannot be restored at a later time! Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    window.location = BaseURL + path;
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}


//Category Add Function By Siva 
function checkBoxCategory() {

    var tot = 0;
    var chkVal = 'on';
    var frm = $('#display_form input');
    for (var i = 0; i < frm.length; i++) {
        if (frm[i].type == 'checkbox') {
            if (frm[i].checked) {
                tot = 1;
                chkVal = frm[i].value;
            }
        }
    }
    if (tot == 0) {
        alert(sel_checkbox);
        return false;
    } else if (tot > 1) {
        alert("Please Select only one CheckBox at a time");
        return false;
    } else if (chkVal == 'on') {
        alert(no_records_found);
        return false;

    } else {
        confirm_category_checkbox(chkVal);
    }

}

//Category Checkbox Confirmation
function confirm_category_checkbox(chkVal) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'Do u want continue action',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    $('#checkboxID').val(chkVal);
                    $('#display_form').submit();
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}

/**
 * 
 * Change the seller request status
 * @param val	-> status
 * @param sid	-> seller request id
 */
function changeSellerStatus(sid, uid) {
    val = $('#seller_status_' + sid).val();
    if (val != '' && sid != '') {
        $.ajax(
                {
                    type: 'POST',
                    url: 'admin/seller/change_seller_request',
                    data: {"id": sid, 'status': val, 'user_id': uid},
                    dataType: 'json',
                    success: function (json)
                    {
                        alert(json);
                    }
                });
    }
}
function ajax_getAPIKey() {
    var username = $('#zoho_email').val();
    var password = $('#zoho_pwd').val();
    if (username != '' && password != '') {
        $.ajax(
                {
                    type: 'POST',
                    url: 'admin/subscriber/getAuth',
                    data: {"username": username, 'password': password},
                    dataType: 'json',
                    success: function (json)
                    {
                        document.getElementById('zoho_api_key').value = json.authtokens;
                    }
                });
    }
    else {
        alert("Please Enter the required field");
    }
}
function disableGiftCards(path, mail) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'You are about to change the mode of giftcards ! Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    var perms = prompt("For Security Purpose, Please Enter Email Id");
                    if (perms == '') {
                        alert("Please Enter The Email ID");
                        return false;
                    } else if (perms == null) {
                        return false;
                    } else {
                        if (perms == mail) {
                            window.location = BaseURL + path;
                        } else {
                            alert("Please Enter The Correct Email ID");
                            return false;
                        }
                    }
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}

function editPictureProducts(val, imgId) {

    var id = 'img_' + val;
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    $.ajax(
            {
                type: 'POST',
                url: BaseURL + 'admin/product/editPictureProducts',
                data: {"id": id, 'cpage': sPage, 'position': val, 'imgId': imgId},
                dataType: 'json',
                success: function (response)
                {
                    if (response == 'No') {
                        alert("You can't delete all the images");
                        return false;
                    } else {
                        $('#img_' + val).remove();
                    }
                }
            });
}

function editPictureProductsUser(val, imgId) {

    var id = 'img_' + val;
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    $.ajax(
            {
                type: 'POST',
                url: BaseURL + '/site/product/editPictureProducts',
                data: {"id": id, 'cpage': sPage, 'position': val, 'imgId': imgId},
                dataType: 'json',
                success: function (response)
                {
                    if (response == 'No') {
                        alert("You can't delete all the images");
                        return false;
                    } else {
                        $('#img_' + val).remove();
                    }
                }
            });
}

function quickSignup() {
    var dlg_signin = $.dialog('signin-overlay'),
            dlg_register = $.dialog('register');
    var email = $('#signin-email').val();
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/user/quickSignup',
        data: {"email": email},
        dataType: 'json',
        success: function (response)
        {
            if (response.success == '0') {
                alert(response.msg);
                return false;
            } else {
                $('.quickSignup2 .username').val(response.user_name);
                $('.quickSignup2 .url b').text(response.user_name);
                $('.quickSignup2 .email').val(response.email);
                $('.quickSignup2 .fullname').val(response.full_name);
                dlg_register.open();
            }
        }
    });
}
function quickSignup2() {
    var username = $('.quickSignup2 .username').val();
    var email = $('.quickSignup2 .email').val();
    var password = $('.quickSignup2 .user_password').val();
    var fullname = $('.quickSignup2 .fullname').val();
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/user/quickSignupUpdate',
        data: {"username": username, "email": email, "password": password, "fullname": fullname},
        dataType: 'json',
        success: function (response)
        {
            if (response.success == '0') {
                alert(response.msg);
                return false;
            } else {
                location.href = baseURL + 'send-confirm-mail';
            }
        }
    });
}


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function ContactSeller() {

    $('#div_question').html('');
    $('#div_name').html('');
    $('#div_emailaddress').html('');
    $('#div_phoneNumber').html('');

    var question = $('.contact_frm #question').val();
    var name = $('.contact_frm #name').val();
    var email = $('.contact_frm #emailaddress').val();
    var phone = $('.contact_frm #phoneNumber').val();
    var selleremail = $('.contact_frm #selleremail').val();
    var sellerid = $('.contact_frm #sellerid').val();
    var product_id = $('.contact_frm #productId').val();

    if (question == '') {
        $('#div_question').html('This field is required');
        return false;
    } else if (name == '') {
        $('#div_name').html('This field is required');
        return false;
    } else if (email == '') {
        $('#div_emailaddress').html('This field is required');
        return false;
    } else if (!IsEmail(email)) {
        $('#div_emailaddress').html('Please Enter Valid Email Address');
        return false;
        /*}else if(phone ==''){
         $('#div_phoneNumber').html('This field is required');
         return false;*/
    } else {
        $('#div_question').html('');
        $('#div_name').html('');
        $('#div_emailaddress').html('');
        $('#div_phoneNumber').html('');

        $('#loadingImgContact').show();


        $.ajax({
            type: 'POST',
            url: baseURL + 'site/product/contactform',
            data: {"question": question, "name": name, "email": email, "phone": phone, "selleremail": selleremail, "sellerid": sellerid, "product_id": product_id},
            success: function (response) {
                //alert(response);
                if (response == 'Success') {

                    location.reload();
                    $('#loadingImgContact').hide();
                }
            }
        });

    }
}

function UserContactSeller() {

    $('#div_question').html('');
    $('#div_name').html('');
    $('#div_emailaddress').html('');
    $('#div_phoneNumber').html('');

    var question = $('.user_contact_frm #question').val();
    var name = $('.user_contact_frm #name').val();
    var email = $('.user_contact_frm #emailaddress').val();
    var phone = $('.user_contact_frm #phoneNumber').val();
    var selleremail = $('.user_contact_frm #selleremail').val();
    var sellerid = $('.user_contact_frm #sellerid').val();
    var product_id = $('.user_contact_frm #productId').val();

    if (question == '') {
        $('#div_question').html('This field is required');
        return false;
    } else if (name == '') {
        $('#div_name').html('This field is required');
        return false;
    } else if (email == '') {
        $('#div_emailaddress').html('This field is required');
        return false;
    } else if (!IsEmail(email)) {
        $('#div_emailaddress').html('Please Enter Valid Email Address');
        return false;
        /*}else if(phone ==''){
         $('#div_phoneNumber').html('This field is required');
         return false;*/
    } else {
        $('#div_question').html('');
        $('#div_name').html('');
        $('#div_emailaddress').html('');
        $('#div_phoneNumber').html('');

        $('#loadingImgContact').show();


        $.ajax({
            type: 'POST',
            url: baseURL + 'site/product/usercontactform',
            data: {"question": question, "name": name, "email": email, "phone": phone, "selleremail": selleremail, "sellerid": sellerid, "product_id": product_id},
            success: function (response) {
                //alert(response);
                if (response == 'Success') {

                    location.reload();
                    $('#loadingImgContact').hide();
                }
            }
        });

    }
}

function editPicturePetimage(val, imgId) {
    var id = 'img_' + val;
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    $.ajax(
            {
                type: 'POST',
                url: BaseURL + '/site/user/deleteImages',
                data: {"id": id, 'cpage': sPage, 'position': val, 'imgId': imgId},
                dataType: 'json',
                success: function (response)
                {
                    if (response == 'No') {
                        alert("You can't delete all the images");
                        return false;
                    } else {
                        $('#img_' + val).remove();
                    }
                }
            });
}

function sivarating() {

    document.getElementById('PetVoteRate').innerHTML = '<font color="red">Please Login for feedback</font>';
}

function AddProduct() {
    var shipMethod = $('input:radio[name=shipMethod]:checked').val();
    var category1 = $('#category1').val();
    var category2 = $('#category2').val();
    var category3 = $('#category3').val();
    var store1 = $('#store1').val();
    var store2 = $('#store2').val();
    var store3 = $('#store3').val();

    if (category1 == '') {
        var category1 = 0;
    } else {
        var category1 = 1;
    }
    if (category2 == '') {
        var category2 = 0;
    } else {
        var category2 = 1;
    }
    if (category3 == '') {
        var category3 = 0;
    } else {
        var category3 = 1;
    }
    var CategoryCountVal = category1 + category2 + category3;

    if (store1 == '') {
        var store1 = 0;
    } else {
        var store1 = 1;
    }
    if (store2 == '') {
        var store2 = 0;
    } else {
        var store2 = 1;
    }
    if (store3 == '') {
        var store3 = 0;
    } else {
        var store3 = 1;
    }
    var StoreCountVal = store1 + store2 + store3;

    var description = $('#description').val();
    var materials = $('#materials').val();
    var pre_shipping = $('#pre_shipping').val();
    var pre_order = $('#pre_order').val();
    var tag = $('#tags_Amt').val();

    var product_name = $('#product_name').val();
    var price = $('#price').val();
    var quantity = $('#quantity').val();

    $('#SpecialErr').html('');



    if (CategoryCountVal == 0) {
        $('#category1_Err').html('Choose atlest 1 Category');
    } else if (StoreCountVal == 0) {
        $('#store1_Err').html('Choose atlest 1 store');
    } else if (product_name == '') {
        $('#product_nameErr').html('Product name required');
    } else if (!$.isNumeric(price)) {
        $('#product_priceErr').html('Price required');
    } else if (!$.isNumeric(quantity)) {
        $('#quantity_noErr').html('Quantity required');
    } else if (shipMethod == undefined) {
        $('#shipMethod_Err').html('Choose shipping method ');
    } else {
        var brand = 'no';
        if ($('.brandSt').is(':checked')) {
            brand = 'yes';
        }
        if (response.success == '0') {
            $('#SpecialErr').html(response.msg);
            return false;
        } else {
            location.href = baseURL + '';
        }
    }
    return false;

}

function Addshipping() {


    var full_name = $('#full_name').val();
    var e = document.getElementById('country');
    var country = e.options[e.selectedIndex].value;
    var nick_name = $('#nick_name').val();
    var address1 = $('#address1').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var postal_code = $('#postal_code').val();
    var phone = $('#phone').val();

    $('#SpecialErr').html('');



    if (country == 0) {
        $('#country_Err').html('This field is required');
    } else if (full_name == 0) {
        $('#full_name_Err').html('This field is required');

    } else if (nick_name == 0) {
        $('#nick_name_Err').html('This field is required');

    } else if (address1 == 0) {
        $('#address1_Err').html('This field is required');

    } else if (city == 0) {
        $('#city_Err').html('This field is required');

    } else if (state == 0) {
        $('#state_Err').html('This field is required');

    } else if (!$.isNumeric(postal_code)) {
        $('#postal_code_Err').html('This field is required');

    } else if (!$.isNumeric(phone)) {
        $('#phone_Err').html('This field is required');

    } else {
        var brand = 'no';
        if ($('.brandSt').is(':checked')) {
            brand = 'yes';
        }
        if (response.success == '0') {
            $('#SpecialErr').html(response.msg);
            return false;
        } else {
            location.href = baseURL + '';
        }
    }
    return false;

}

function AddFeedback() {
    var title = $('#title').val();

    $('#SpecialErr').html('');
    if (title == '') {

        $('#title_Err').html('This field is required');
    } else {
        var brand = 'no';
        if ($('.brandSt').is(':checked')) {
            brand = 'yes';
        }
        if (response.success == '0') {
            $('#SpecialErr').html(response.msg);
            return false;
        } else {
            location.href = baseURL + '';
        }
    }
    return false;

}
function validateSeller_Signup() {
    var seller_businessname = $('#seller_businessname').val();
    var seller_crafting = $('#seller_crafting').val();
    var seller_product = $('#seller_product').val();
    var seller_make = $('#seller_make').val();
    var seller_site = $('#seller_site').val();
    var seller_nda = $('input[name=seller_nda]:checked').val();
    var seller_agreement = $('input[name=seller_agreement]:checked').val();
    //  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    $('#SpecialErr').html('');

    if (seller_businessname == 0) {
        $('#seller_businessname_Err').html('Business name required');
    } else if (seller_crafting == 0) {
        $('#seller_crafting_Err').html('This field required');
    } else if (seller_product == 0) {
        $('#seller_product_Err').html('This field required');
    } else if (seller_make == 0) {
        $('#seller_make_Err').html('This field required');
    }/*else if(!pattern.test(seller_site)){ 
     $('#seller_site_Err').html('This field required');	
     }*/ else if (seller_nda == undefined) {
        $('#seller_nda_Err').html('This field required');
    } else if (seller_agreement == undefined) {
        $('#seller_agreement_Err').html('This field required');
    } else {
        var brand = 'no';
        if ($('.brandSt').is(':checked')) {
            brand = 'yes';
        }
        if (response.success == '0') {
            $('#SpecialErr').html(response.msg);
            return false;
        } else {
            location.href = baseURL + '';
        }
    }
    return false;

}

/* This function is used to validation footer's newsletter functionality. 
 * return 	: boolean (true: success, false: fail)
 * @author 	: pav
 */
function subscribe_user() {
    var email = $('#emailtext').val();
    $('#suscribeemailErr').html('');
    if (email == '') {
        $('#suscribeemailErr').html(lg_required_field);
        return false;
    } else if (!IsEmail(email)) {
        $('#suscribeemailErr').html(lg_invalid_email);
        return false;
    }

    /*else {
     $.ajax({
     type: 'POST',
     url: baseURL+'site/user/subscribeUser',
     data: {"email": email},
     dataType: 'json',
     success: function(response)
     {
     //alert(response.success);
     if(response.success == 0) {
     $('#SpecialErr').show()
     $('#SpecialErr').html(response.msg);
     //location.href = baseURL+'home';					
     return false;
     } else {
     //location.href = baseURL+'send-confirm-mail';
     }
     }
     });
     }*/

    return true;
}

function validateAlphabet(value) {
    var regexp = /^[a-zA-Z ]*$/;
    return regexp.test(value);
}

function register_user() {
    var err_cnt = 0;
    var fullname = $('#fullname').val();
    var lastname = $('#lastname').val();
     var phoneno = $('#phone').val();
    var email = $('#email').val();
    var regexp = /^[a-zA-Z0-9]*$/;
    var pwd = $('#pwd').val();
    var Confirmpwd = $('#Confirmpwd').val();
    var username = $('#username').val();
    var gender = $('input[type="radio"]:checked').val();
    var priTerm = $('#privacychecking').is(':checked');
    var phonereg = /^(?:\+971|0)?\d{10}$/;
    var landline = /^(?:\+971|0)?\d{10}$/;
    if ($('#subscription').is(':checked')) {
        subscription = 'on';
    } else {
        subscription = 'off';
    }

    var allow = /^[A-z\s]+$/;
    var status = 0;
    //$('#SpecialErr').html('');

    if (fullname == '') {
        $('.reg-fullname-err1').addClass('has-error');
        $('.reg-fullname-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (allow.test(fullname) == false) {
        $('.reg-fullname-err1').addClass('has-error');
        $('.reg-fullname-err2').html(lg_alphabets);
        err_cnt = 1;
    } else if (fullname.length > 25) {
        $('.reg-fullname-err1').addClass('has-error');
        $('.reg-fullname-err2').html(lg_firstname_25_max);
        err_cnt = 1;
    } else {
        $('.reg-fullname-err1').removeClass('has-error');
        $('.reg-fullname-err2').html('');
    }

    if (lastname == '') {
        $('.reg-lastname-err1').addClass('has-error');
        $('.reg-lastname-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (allow.test(lastname) == false) {
        $('.reg-lastname-err1').addClass('has-error');
        $('.reg-lastname-err2').html(lg_alphabets);
        err_cnt = 1;
    } else if (lastname.length > 25) {
        $('.reg-lastname-err1').addClass('has-error');
        $('.reg-lastname-err2').html(lg_lastname_25_max);
        err_cnt = 1;
    } else {
        $('.reg-lastname-err1').removeClass('has-error');
        $('.reg-lastname-err2').html('');
    }

    if (phoneno == '') {
        $('.reg-phone-err1').addClass('has-error');
        $('.reg-phone-err2').html(lg_required_field);
        err_cnt = 1;
    }
   /* else if (!phoneno.match(phonereg) && !phoneno.match(landline)) {
         $('.reg-phone-err1').addClass('has-error');
                $('.reg-phone-err2').html('Invalid No');
                err_cnt = 1;
    }*/
    else {
        $('.reg-phone-err1').removeClass('has-error');
        $('.reg-phone-err2').html('');
    }

    
    

    if (!IsEmail(email)) {
        $('.reg-email-err1').addClass('has-error');
        $('.reg-email-err2').html(lg_invalid_email);
        err_cnt = 1;
    } else if (email == '') {
        $('.reg-email-err1').addClass('has-error');
        $('.reg-email-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (!IsEmail(email)) {
        $('.reg-email-err1').addClass('has-error');
        $('.reg-email-err2').html(lg_invalid_email);
        err_cnt = 1;
    } else {
        $('.reg-email-err1').removeClass('has-error');
        $('.reg-email-err2').html('');
    }

    if (pwd == '') {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (pwd.length < 6) {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_pwd_6_char);
        err_cnt = 1;
    } else if (pwd.length > 12) {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_pwd_12_char);
        err_cnt = 1;
    } else {
        $('.reg-pwd-err1').removeClass('has-error');
        $('.reg-pwd-err2').html('');
    }

    if (Confirmpwd == '') {
        $('.reg-cpwd-err1').addClass('has-error');
        $('.reg-cpwd-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (pwd != Confirmpwd) {
        $('.reg-cpwd-err1').addClass('has-error');
        $('.reg-cpwd-err2').html(lg_pwd_not_match);
        err_cnt = 1;
    } else {
        $('.reg-cpwd-err1').removeClass('has-error');
        $('.reg-cpwd-err2').html('');
    }

    if (username == '') {
        $('.reg-username-err1').addClass('has-error');
        $('.reg-username-err2').html(lg_required_field);
        err_cnt = 1;
    } else if (username.length > 25) {
        $('.reg-username-err1').addClass('has-error');
        $('.reg-username-err2').html(lg_username_25_max);
        err_cnt = 1;
    } else if (!isNaN(username)) {
        $('.reg-username-err1').addClass('has-error');
        $('.reg-username-err2').html('Please Enter The Valid User Name');
        err_cnt = 1;
    } else if (username == '') {
        $('.reg-username-err1').addClass('has-error');
        $('.reg-username-err2').html('Please Enter The User Name');
        err_cnt = 1;
    } else {
        $('.reg-username-err1').removeClass('has-error');
        $('.reg-username-err2').html('');
    }

    if (pwd == fullname && pwd != '') {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_pwd_firstname_notsame);
        err_cnt = 1;
    } else if (pwd == username && pwd != '') {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_pwd_username_notsame);
        err_cnt = 1;
    } else if (pwd == email && pwd != '') {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_email_pwd_notsame);
        err_cnt = 1;
    } else if (pwd == '') {
        $('.reg-pwd-err1').addClass('has-error');
        $('.reg-pwd-err2').html(lg_required_field);
        err_cnt = 1;
    } else {
        $('.reg-pwd-err1').removeClass('has-error');
        $('.reg-pwd-err2').html('');
    }

    if (!priTerm) {
        $('.reg-privacy-err2').html(lg_accept_terms_policy);
        err_cnt = 1;
    } else {
        $('.reg-privacy-err2').html('');
    }

    if (err_cnt == 0) {
        return true;
    } else {
        return false;
    }
}

function hideErrDiv(arg) {
    $("#" + arg).hide("slow");
}

function resendConfirmation(mail) {
    if (mail != '') {
        $('.confirm-email').html('<span>Sending...</span>');
        $.ajax({
            type: 'POST',
            url: baseURL + 'site/user/resend_confirm_mail',
            data: {"mail": mail},
            //dataType: 'json',
            success: function (response) {
                if (response.success == '0') {
                    alert(response.msg);
                    return false;
                } else {
                    //$('#tempp').html(response);
                    $('.confirm-email').html('<font color="white">' + conf_mail_sent + '</font>');
                    $('.confirm-email').removeAttr('onClick');
                    $('.confirm-email').removeAttr('style');

                }
            }
        });
    }
}
function resendConfirmationPopUp(mail) {
    if (mail != '') {
        $.ajax({
            type: 'POST',
            url: baseURL + 'site/user/resend_confirm_mail',
            data: {"mail": mail},
            //dataType: 'json',
            success: function (response) {
                if (response.success == '0') {
                    alert(response.msg);
                    return false;
                } else {
                    location.href = baseURL + 'verify';
                }
            }
        });
    }
}
function profileUpdate() {



    $('#loadingImgProfile').show();
    $('#userErr').html('');
    //$('#save_account').disable();
    var full_name = $('.setting_fullname').val();
    var last_name = $('.setting_lastname').val();

    var paypal_id = $('.setting_paypal_email').val();
    var location = $('.setting_location').val();
    var twitter = $('.setting_twitter').val();
    var facebook = $('.setting_facebook').val();
    var pinterest = $('.setting_pinterest').val();
    var google = $('.setting_google').val();
    var b_year = $('.birthday_year').val();
    var b_month = $('.birthday_month').val();
    var b_day = $('.birthday_day').val();
    var setting_bio = $('.setting_bio').val();
    var email = $('.setting_email').val();
    var age = $('.setting_age').val();
    var gender = $('.setting_gender:checked').val();

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/user_settings/update_profile',
        data: {"full_name": full_name, "last_name": last_name, "paypal_email": paypal_id, "location": location, "twitter": twitter, "facebook": facebook, "pinterest": pinterest, "google": google, "b_year": b_year, "b_month": b_month, "b_day": b_day, "about": setting_bio, "email": email, "age": age, "gender": gender},
        dataType: 'json',
        success: function (response) {
            if (response.success == 0) {
                $('#userErr').html(response.msg);
                $('#save_account').removeAttr('disabled');
                $('#loadingImgProfile').hide();
                return false;
            } else {
                $('#loadingImgProfile').hide();
                window.location.href = baseURL + 'settings';
            }
        }
    });

    return false;
}
function updateUserPhoto() {
    //$('#save_profile_image').disable();
    if ($('.uploadavatar').val() == '') {
        alert('Choose a image to upload');
        $('#save_profile_image').removeAttr('disabled');
        return false;
    } else {
        $('#profile_settings_form').removeAttr('onSubmit');
        $('#profile_settings_form').submit();
    }
}
function deleteUserPhoto() {
    //$('#delete_profile_image').disable();
    var res = window.confirm('Are you sure?');
    if (res) {
        $.ajax({
            type: 'POST',
            url: baseURL + 'site/user_settings/delete_user_photo',
            dataType: 'json',
            success: function (response) {
                if (response.success == '0') {
                    alert(response.msg);
                    $('#delete_profile_image').removeAttr('disabled');
                    return false;
                } else {
                    window.location.href = baseURL + 'settings';
                }
            }
        });
    } else {
        $('#delete_profile_image').removeAttr('disabled');
        return false;
    }
}
function deactivateUser() {
    //$('#close_account').disable();
    var res = window.confirm(lg_sure);
    if (res) {
        $.ajax({
            url: baseURL + 'site/user_settings/delete_user_account',
            success: function (response) {
                window.location.href = baseURL;
            }
        });
    } else {
        $('#close_account').removeAttr('disabled');
    }
}

function delete_gift(val, gid) {

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDelete',
        data: {'curval': val, 'cart': 'gift'},
        success: function (response) {
            window.location.reload();
            /*var arr = response.split('|');
             $('#gift_cards_amount').val(arr[0]);
             $('#item_total').html(arr[0]);
             $('#total_item').html(arr[0]);
             $('#Shop_id_count').html(arr[1]);	
             $('#Shop_MiniId_count').html(arr[1]+' items');				
             $('#giftId_'+gid).hide();
             $('#GiftMindivId_'+gid).hide();
             if(arr[0] == 0){
             $('#GiftCartTable').hide();
             if(arr[1]==0){
             $('#EmptyCart').show();
             }
             }*/
        }
    });
}


function delete_subscribe(val, sid) {

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDelete',
        data: {'curval': val, 'cart': 'subscribe'},
        success: function (response) {
            //alert(response);
            var arr = response.split('|');
            $('#subcrib_amount').val(arr[0]);
            $('#subcrib_ship_amount').val(arr[1]);
            $('#subcribt_tax_amount').val(arr[2]);
            $('#subcrib_total_amount').val(arr[3]);
            $('#SubCartAmt').html(arr[0]);
            $('#SubCartSAmt').html(arr[1]);
            $('#SubCartTAmt').html(arr[2]);
            $('#SubCartGAmt').html(arr[3]);
            $('#Shop_id_count').html(arr[4]);
            $('#Shop_MiniId_count').html(arr[4] + ' items');
            $('#SubscribId_' + sid).hide();
            $('#SubcribtMinidivId_' + sid).hide();


            if (arr[0] == 0) {
                $('#SubscribeCartTable').hide();
                if (arr[4] == 0) {
                    $('#EmptyCart').show();
                }
            }
        }
    });
}


function ajaxEditproductAttribute(attname, attval, attId) {

    //alert(attname+''+attval+''+attId);

    $('#loadingImg_' + attId).html('<span class="loading"><img src="images/indicator.gif" alt="Loading..."></span>');

    $.ajax({
        type: 'POST',
        url: baseURL + 'admin/product/ajaxProductAttributeUpdate',
        data: {'attname': attname, 'attval': attval, 'attId': attId},
        success: function (response) {
            //alert(response);
            $('#loadingImg_' + attId).html('');
        }
    });

}

function ajaxCartAttributeChange(attId, prdId) {

    $('#loadingImg_' + prdId).html('<span class="loading"><img src="images/indicator.gif" alt="Loading..."></span>');
    $('#AttrErr').html('');
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/product/ajaxProductDetailAttributeUpdate',
        data: {'prdId': prdId, 'attId': attId},
        success: function (response) {
            //alert(response);
            var arr = response.split('|');

            $('#attribute_values').val(arr[0]);
            $('#price').val(arr[1]);
            $('#SalePrice').html(arr[1]);
            $('#loadingImg_' + prdId).html('');
        }
    });

}


function ajaxCartAttributeChangePopup(attId, prdId) {


    $('#loadingImg1_' + prdId).html('<span class="loading"><img src="images/indicator.gif" alt="Loading..."></span>');
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/product/ajaxProductDetailAttributeUpdate',
        data: {'prdId': prdId, 'attId': attId},
        success: function (response) {
            //alert(response);
            var arr = response.split('|');
            $('#attribute_values').val(arr[0]);
            $("#attr_name_id").val(attId);
            $('#price').val(arr[1]);
            $('#SalePrice').html(arr[1]);
            $('#loadingImg1_' + prdId).html('');
        }
    });

}


function delete_cart(val, cid) {
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDelete',
        data: {'curval': val, 'cart': 'cart'},
        success: function (response) {

            //alert(response);
            var arr = response.split('|');
            $('#cart_amount').val(arr[0]);
            $('#cart_ship_amount').val(arr[1]);
            $('#cart_tax_amount').val(arr[2]);
            $('#cart_total_amount').val(arr[3]);
            $('#CartAmt').html(arr[0]);
            $('#CartAmtDup').html(arr[0]);
            $('#CartSAmt').html(arr[1]);
            $('#CartTAmt').html(arr[2]);
            $('#CartGAmt').html(arr[3]);
            $('#Shop_id_count').html(arr[4]);
            $('#Shop_MiniId_count').html(arr[4] + ' items');
            $('#cartdivId_' + cid).hide();
            $('#cartMindivId_' + cid).hide();

            if (arr[0] == 0) {
                $('#CartTable').hide();
                if (arr[4] == 0) {
                    $('#EmptyCart').show();
                }
            }
        }
    });
}

$(document).on('click', '[data-selidx]', function () {
    var val = $(this).data('val');
    var cart = 'usercart';
    var selid = $(this).data('selidx');
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDelete',
        data: {'curval': val, 'cart': cart, 'sellId': selid},
        success: function (response) {
            var arr = response.split('|');
            arr[0] = parseInt(arr[0]);

            $('#cart-block .cart-link .total').html(arr[0] + ' items - ' + '<span id="Cartamount">' + arr[1] + '</span><span class="notify notify-left"><span id="CartCount1" class="CartCount1 font-bold">0</span></span>');
            $('h5.cart-title').html(arr[0] + 'items in my cart');
            $('.cart-block-list ul').html(arr[2]);
            if (arr[0] > 0) {
                $('#CartCount1').html(arr[0]);
                $('.btn-check-out').show();
            } else {
                $('#CartCount1').html(0);
                $('.btn-check-out').hide();
            }
            $('.toal-cart span.toal-price').html(arr[1]);
        }
    });
});

function delete_cart_user(val, cid, selid) {
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDelete',
        data: {'curval': val, 'cart': 'usercart', 'sellId': selid},
        success: function (response) {

            window.location.reload();
            //alert(response);
            /*var arr = response.split('|');
             $('#user_cart_amount_'+selid).val(arr[0]);
             $('#user_cart_ship_amount_'+selid).val(arr[1]);
             $('#user_cart_tax_amount_'+selid).val(arr[2]);
             $('#user_cart_total_amount_'+selid).val(arr[3]);			
             $('#UserCartAmt_'+selid).html(arr[0]);
             $('#UserCartAmtDup_'+selid).html(arr[0]);
             $('#UserCartSAmt_'+selid).html(arr[1]);
             $('#UserCartTAmt_'+selid).html(arr[2]);
             $('#UserCartGAmt_'+selid).html(arr[3]);
             $('#Shop_id_count').html(arr[4]);
             $('#Shop_MiniId_count').html(arr[4]+' items');			
             $('#UsercartdivId_'+cid).hide();
             $('#UsercartMindivId_'+cid).hide();
             
             if(arr[0] == 0){
             $('#UserCartTable_'+selid).hide();
             if(arr[4]==0){
             $('#EmptyCart').show();
             }
             }*/
        }
    });

    return false;
}


function update_cart(val, cid) {

    var qty = $('#quantity' + cid).val();
    var mqty = $('#quantity' + cid).data('mqty');
    if (qty - qty != 0 || qty == '' || qty == '0') {
        alert('Invalid quantity');
        return false;
    }
    if (qty > mqty) {
        $('#quantity' + cid).val(mqty);
        qty = mqty;
        alert('Maximum stock available for this product is ' + mqty);
    }
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxUpdate',
        data: {'updval': val, 'qty': qty},
        success: function (response) {
            //alert(response); 
            var arr = response.split('|');
            $('#cart_amount').val(arr[1]);
            $('#cart_ship_amount').val(arr[2]);
            $('#cart_tax_amount').val(arr[3]);
            $('#cart_total_amount').val(arr[4]);
            $('#IndTotalVal' + cid).html(arr[0]);
            $('#CartAmt').html(arr[1]);
            $('#CartAmtDup').html(arr[1]);
            $('#CartSAmt').html(arr[2]);
            $('#CartTAmt').html(arr[3]);
            $('#CartGAmt').html(arr[4]);
            $('#Shop_id_count').html(arr[5]);
            $('#Shop_MiniId_count').html(arr[5] + ' items');

        }
    });
}


function update_cart_user(view,val, cid, selid) {
    if(view=='desktop'){
        var qty = $('#desktop_userquantity' + cid).val();
        var mqty = $('#desktop_userquantity' + cid).data('mqty');    
    }else{
        var qty = $('#mobile_userquantity' + cid).val();
        var mqty = $('#mobile_userquantity' + cid).data('mqty');    
    }
    
    if (qty - qty != 0 || qty == '' || qty == '0') {
        alert('Invalid quantity');
        return false;
    }
    if (qty > mqty) {
        $('#quantity' + cid).val(mqty);
        qty = mqty;
        alert('Maximum stock available for this product is ' + mqty);
    }
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxUserUpdate',
        data: {'updval': val, 'qty': qty, 'selid': selid},
        success: function (response) {
            //alert(response); 
            window.location.reload();
            /*				var arr = response.split('|');
             $('#user_cart_amount_'+selid).val(arr[1]);
             $('#user_cart_ship_amount_'+selid).val(arr[2]);
             $('#user_cart_tax_amount_'+selid).val(arr[3]);
             $('#user_cart_total_amount_'+selid).val(arr[4]);
             $('#UserIndTotalVal'+cid+'_'+selid).html(arr[0]);	
             $('#UserCartAmt_'+selid).html(arr[1]);
             $('#UserCartAmtDup_'+selid).html(arr[1]);
             $('#UserCartSAmt_'+selid).html(arr[2]);
             $('#UserCartTAmt_'+selid).html(arr[3]);
             $('#UserCartGAmt_'+selid).html(arr[4]);
             $('#Shop_id_count').html(arr[5]);
             $('#Shop_MiniId_count').html(arr[5]+' items');	
             */
        }
    });
}


function CartChangeAddress(IDval) {

    var amt = $('#cart_amount').val();
    var disamt = $('#discount_Amt').val();


    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxChangeAddress',
        data: {'add_id': IDval, 'amt': amt, 'disamt': disamt},
        success: function (response) {

            if (response != '0') {

                var arr = response.split('|');
                $('#cart_ship_amount').val(arr[0]);
                $('#cart_tax_amount').val(arr[1]);
                $('#cart_tax_Value').val(arr[2]);
                $('#cart_total_amount').val(arr[3]);
                $('#CartSAmt').html(arr[0]);
                $('#CartTAmt').html(arr[1]);
                $('#carTamt').html(arr[2]);
                $('#CartGAmt').html(arr[3]);

                $('#Ship_address_val').val(IDval);
                $('#Chg_Add_Val').html(arr[4]);
            } else {

                return false;
            }
        }
    });
}


function UserCartChangeAddress(IDval, selid) {

    var amt = $('#user_cart_amount_' + selid).val();

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxUserChangeAddress',
        data: {'add_id': IDval, 'amt': amt, 'seller_id': selid},
        success: function (response) {

            //alert(response); return false;

            if (response != '0') {

                window.location.reload();

                /*var arr = response.split('|');
                 $('#user_cart_ship_amount_'+selid).val(arr[0]);
                 $('#user_cart_tax_amount_'+selid).val(arr[1]);
                 $('#user_cart_tax_Value_'+selid).val(arr[2]);
                 $('#user_cart_total_amount_'+selid).val(arr[3]);
                 $('#UserCartSAmt_'+selid).html(arr[0]);
                 $('#UserCartTAmt_'+selid).html(arr[1]);
                 $('#UsercarTamt_'+selid).html(arr[2]);
                 $('#UserCartGAmt_'+selid).html(arr[3]);
                 
                 $('#User_Ship_address_val_'+selid).val(IDval);
                 $('#Chg_Add_Val_'+selid).html(arr[4]);*/

            } else {
                return false;
            }
        }
    });
}


function SubscribeChangeAddress(IDval) {

    var amt = $('#subcrib_amount').val();

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxSubscribeAddress',
        data: {'add_id': IDval, 'amt': amt},
        success: function (response) {
            if (response != '0') {
                //alert(response);
                var arr = response.split('|');
                $('#subcrib_ship_amount').val(arr[0]);
                $('#subcrib_tax_amount').val(arr[1]);
                $('#subcrib_total_amount').val(arr[3]);
                $('#SubCartSAmt').html(arr[0]);
                $('#SubCartTAmt').html(arr[1]);
                $('#SubTamt').html(arr[2]);
                $('#SubCartGAmt').html(arr[3]);
                $('#SubShip_address_val').val(IDval);
                $('#SubChg_Add_Val').html(arr[4]);
            } else {
                return false;
            }
        }
    });
}

function shipping_Subcribe_address_delete() {
    var DelId = $('#SubShip_address_val').val();
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDeleteAddress',
        data: {'del_ID': DelId},
        success: function (response) {
            if (response == 0) {
                location.reload();
            } else {
                $('#Ship_Sub_err').html('Default address don`t be deleted.');
                setTimeout("hideErrDiv('Ship_Sub_err')", 3000);
                return false;
            }
        }
    });
}

function shipping_cart_address_delete() {
    var DelId = $('#Ship_address_val').val();

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDeleteAddress',
        data: {'del_ID': DelId},
        success: function (response) {
            if (response == 0) {
                location.reload();
            } else {
                $('#Ship_err').html('Default address don`t be deleted.');
                setTimeout("hideErrDiv('Ship_err')", 3000);
                return false;
            }
        }
    });
}

function shipping_user_cart_address_delete(selId) {
    var DelId = $('#User_Ship_address_val_' + selId).val();
    //alert(DelId);
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/ajaxDeleteAddress',
        data: {'del_ID': DelId},
        success: function (response) {
            if (response == 0) {
                location.reload();
            } else {
                $('#User_Ship_err_' + selId).html('Default address don`t be deleted.');
                setTimeout("hideErrDiv('User_Ship_err_'+selId)", 3000);
                return false;
            }
        }
    });
}

function apply_coupon_code(selid) {
    $('#Coupon_apply_' + selid).show();
    $('#shopcoupon' + selid).attr('onclick', 'display_coupon_code(' + selid + ')');
}

function display_coupon_code(selid) {
    $('#Coupon_apply_' + selid).hide();
    $('#shopcoupon' + selid).attr('onclick', 'apply_coupon_code(' + selid + ')');
}


function apply_userCredits(evt, selid) {

    var credit = $('#userCredit_' + selid).val();
    var total = Math.floor($('#user_cart_total_amount_' + selid).val());

    if (credit >= total) {

    } else {

        something = $("#creditErr").html('You have not enough credits');
        setTimeout(function ()
        {
            something.html('');
        }, 3000);
        $(evt).prop('checked', false);
    }

//	if(creditcheck == 'apply'){
//		//something = $("#creditErr").html('You have not enough credits');
//		//$('#payment-total').find('tbody').append('<tr><td>User Credits</td><td class="txt_right">$<span id="user_credits">'+credits+'</span> USD</td></tr>');
//	}else if(creditcheck == 'notapply'){
//		
//		something = $("#creditErr").html('You have not enough credits');
//		setTimeout(function()
//				{
//					something.html('');
//				},2000);
//		//$('#payment-total').find('tbody').append('<tr><td>User Credits</td><td class="txt_right">$<span id="user_credits">'+credits+'</span> USD</td></tr>');
//	}
}

function ajax_add_cart() {
    var is_auctioned = 'normal';
    var auction_id = '0';
    if ($('#add_to_cart').hasClass('auctioned_product')) {
        is_auctioned = 'auction';
        auction_id = $('#add_to_cart').attr('data-auction-id');
    }
    var variation_count = $('#variation_count').html();
    if (variation_count == 2) {
        if ($('#variation_one').val() == "") {
            $('#Err_variation_one').html('Choose ' + $('#variation_one_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_one').html('');
        }

        if ($('#variation_two').val() == "") {
            $('#Err_variation_two').html('Choose ' + $('#variation_two_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_two').html('');
        }
    } else if (variation_count == 1) {
        if ($('#variation_one').val() == "") {
            $('#Err_variation_one').html('Choose ' + $('#variation_one_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_one').html('');
        }
    }

    $('#QtyErr').html('');
    $('#ADDCartErr').html('');
    $('#ADDCartErr').show();

    var AttrCountVal = parseInt($('#variation_count').html());
    var quantity = $('#qty_select').val();//qty
    if(quantity==''){
        quantity = $('#qty_select').attr('data-mqty');//qty
    }

    var mqty = $('#quantity_list').attr('data-mqty');
    if (quantity == '0' || quantity == '') {
        $('#QtyErr').html('<font color="red">Invalid quantity</font>');
        return false;
    }

    var check_cat_id = $('#check_cat_id').val();
    if(check_cat_id == '333')
    {
        if (parseInt(quantity) > 3)
        {
            $('#QtyErr').html('<font color="red">Maximum Purchase Quantity at a time is 3 </font>');
            $('#quantity').val(mqty);
            return false;
        }
    }
    
 
    var attrVal = '';
    if (AttrCountVal == 1) {
        attrVal = $('#variation_one_name').val() + ':' + $('#variation_one_val').val();
    } else if (AttrCountVal == 2) {
        attrVal = $('#variation_one_name').val() + ':' + $('#variation_one_val').val() + ',' + $('#variation_two_name').val() + ':' + $('#variation_two_val').val();
    } else {
        attrVal = '';
    }

    var digital_files = $('#digital_files').val();
    var product_id = $('#product_id').val();
    var sell_id = $('#sell_id').val();

    var variable_here = $('#discountprice').val();

    if (typeof variable_here === 'undefined') {
        var discount = 0;
    }
    else {
        var discount = $('#price').val() * $('#discountprice').val();
    }
    price = $('#cart_price_variation').val();
    if (typeof price === 'undefined' || price == '') {
        price = $('#txt_hidden_price').val();
    }
    var weight = $('#weight').val();
    var current_store_id = $('#current_store_id').val();

    $.ajax({
        type: 'POST',
        url: 'site/cart/usercartadd',
        /*data: {'mqty': mqty, 'quantity': quantity,'current_store_id':current_store_id, 'product_id': product_id, 'sell_id': sell_id, 'price': price, 'attribute_values': attrVal, 'digital_files': digital_files, 'order_type': is_auctioned, 'auction_id': auction_id, 'weight': weight},*/
        data: {'variation_one_name' : $('#variation_one_val').val() , 'variation_two_name' : $('#variation_two_val').val(),'mqty': mqty, 'quantity': quantity,'current_store_id':current_store_id, 'product_id': product_id, 'sell_id': sell_id, 'price': price,  'digital_files': digital_files, 'order_type': is_auctioned, 'auction_id': auction_id, 'weight': weight},
        success: function (response) {
            //alert(response);
            var response = response.trim();
            var arr = response.split('|');

            if (arr[0] == 'login') {
                window.location.href = baseURL + "login";
            } else if (arr[0] == 'Error') {
                if ($.isNumeric(arr[1]) == true) {
                    $('#ADDCartErr').html('<font color="red">Maximum Purchase Quantity: ' + mqty + '. Already in your cart: ' + arr[1] + '.</font>');
                } else {
                    $('#ADDCartErr').html('<font color="red">' + arr[1] + '.</font>');
                }
                $('#ADDCartErr').show().delay('2000').fadeOut();
            } else {
                arr[1] = parseInt(arr[1]);
                $('#cart-block .cart-link .total').html(arr[1] + ' items - ' + '<span id="Cartamount">' + arr[2] + '</span><span class="notify notify-left"><span id="CartCount1" class="CartCount1 font-bold">0</span></span>');
                $('#shopping-cart-box-ontop').html('<i class="fa fa-shopping-cart"><span class="notify notify-left" style="top:2px"><span id="CartCount2" class="CartCount2 font-bold">0</span></span></i>');
                $('h5.cart-title').html(arr[1] + 'items in my cart');
                $('.cart-block-list ul').html(arr[3]);
                if (arr[1] > 0) {
                    $('#CartCount1').html(arr[1]);
                    $('#CartCount2').html(arr[1]);
                    $('.btn-check-out').show();
                } else {
                    $('#CartCount1').html(0);
                    $('#CartCount2').html(0);
                    $('.btn-check-out').hide();
                }
                $('.toal-cart span.toal-price').html(arr[2]);
                $.fancybox.close();
                $('#ADDCartErr').html('<font color="green">' + prod_add_cart + '</font>');
                $('#ADDCartErr').show().delay('2000').fadeOut();
                $('#product_add_cart').trigger('click');
                //$('#cart_popup').show().delay('2000').fadeOut();
            }
        }
    });
    return false;


}

function ajax_express_checkout() {

   
    var is_auctioned = 'normal';
    var auction_id = '0';
    if ($('#add_to_cart').hasClass('auctioned_product')) {
        is_auctioned = 'auction';
        auction_id = $('#add_to_cart').attr('data-auction-id');
    }
    var variation_count = $('#variation_count').html();
    if (variation_count == 2) {
        if ($('#variation_one').val() == "") {
            $('#Err_variation_one').html('Choose ' + $('#variation_one_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_one').html('');
        }

        if ($('#variation_two').val() == "") {
            $('#Err_variation_two').html('Choose ' + $('#variation_two_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_two').html('');
        }
    } else if (variation_count == 1) {
        if ($('#variation_one').val() == "") {
            $('#Err_variation_one').html('Choose ' + $('#variation_one_name').val());
            $('html, body').animate({ scrollTop:$("#add_to_cart_box").offset().top - 120}, 500);
            return false;
        } else {
            $('#Err_variation_one').html('');
        }
    }

    $('#QtyErr').html('');
    $('#ADDCartErr').html('');
    $('#ADDCartErr').show();

    var AttrCountVal = parseInt($('#variation_count').html());
    var quantity = $('#qty_select').val();//qty
 
    var mqty = $('#quantity_list').attr('data-mqty');
   

    if (quantity == '0' || quantity == '') {
        $('#QtyErr').html('<font color="red">Invalid quantity</font>');
        return false;
    }

    if (parseInt(quantity) > parseInt(mqty)) {
       
        $('#QtyErr').html('<font color="red">Maximum Purchase Quantity at a time is ' + mqty + '</font>');
        $('#quantity').val(mqty);
        return false;
    }


    var attrVal = '';
    if (AttrCountVal == 1) {
        attrVal = $('#variation_one_name').val() + ':' + $('#variation_one_val').val();
    } else if (AttrCountVal == 2) {
        attrVal = $('#variation_one_name').val() + ':' + $('#variation_one_val').val() + ',' + $('#variation_two_name').val() + ':' + $('#variation_two_val').val();
    } else {
        attrVal = '';
    }

    var digital_files = $('#digital_files').val();
    var product_id = $('#product_id').val();
    var sell_id = $('#sell_id').val();

    var variable_here = $('#discountprice').val();

    if (typeof variable_here === 'undefined') {
        var discount = 0;
    }
    else {
        var discount = $('#price').val() * $('#discountprice').val();
    }
    price = $('#cart_price_variation').val();
    if (typeof price === 'undefined' || price == '') {
        price = $('#txt_hidden_price').val();
    }
    var weight = $('#weight').val();
    var current_store_id = $('#current_store_id').val();
    $.ajax({
        type: 'POST',
        url: 'site/cart/usercartadd',
        data: {'mqty': mqty,'current_store_id':current_store_id, 'quantity': quantity, 'product_id': product_id, 'sell_id': sell_id, 'price': price, 'attribute_values': attrVal, 'digital_files': digital_files, 'order_type': is_auctioned, 'auction_id': auction_id, 'weight': weight},
        success: function (response) {

            console.log(response);
         
            var response = response.trim();
            var arr = response.split('|');

            if (arr[0] == 'login') {
                window.location.href = baseURL + "login";
            } else if (arr[0] == 'Error') {
                if ($.isNumeric(arr[1]) == true) {
                    $('#ADDCartErr').html('<font color="red">Maximum Purchase Quantity: ' + mqty + '. Already in your cart: ' + arr[1] + '.</font>');
                } else {
                    $('#ADDCartErr').html('<font color="red">' + arr[1] + '.</font>');
                }
                $('#ADDCartErr').show().delay('2000').fadeOut();
            } else {
                arr[1] = parseInt(arr[1]);
                $('#cart-block .cart-link .total').html(arr[1] + ' items - ' + '<span id="Cartamount">' + arr[2] + '</span><span class="notify notify-left"><span id="CartCount1" class="CartCount1 font-bold">0</span></span>');
                $('#shopping-cart-box-ontop').html('<i class="fa fa-shopping-cart"><span class="notify notify-left" style="top:2px"><span id="CartCount2" class="CartCount2 font-bold">0</span></span></i>');
                $('h5.cart-title').html(arr[1] + 'items in my cart');
                $('.cart-block-list ul').html(arr[3]);
                if (arr[1] > 0) {
                    $('#CartCount1').html(arr[1]);
                    $('#CartCount2').html(arr[1]);
                    $('.btn-check-out').show();
                } else {
                    $('#CartCount1').html(0);
                    $('#CartCount2').html(0);
                    $('.btn-check-out').hide();
                }
                $('.toal-cart span.toal-price').html(arr[2]);
                $.fancybox.close();
                $('#ADDCartErr').html('<font color="green">' + prod_add_cart + '</font>');
                $('#ADDCartErr').show().delay('2000').fadeOut();
               // console.log(baseURL);
              //  exit();
              //console.log(baseURL+'cart/signin');
                window.location.href = baseURL+'cart/signin'
              
                
            }
        }
    });
    return false;   


}


function ajax_add_cart_subcribe() {
    var login = $('#subscribe').attr('require_login');
    if (login) {
        require_login();
        return;
    }

    var user_id = $('#user_id').val();
    var quantity = 1;
    var fancybox_id = $('#fancybox_id').val();
    var price = $('#price').val();
    var fancy_shipping_cost = $('#shipping_cost').val();
    var fancy_tax_cost = $('#tax').val();
    var category_id = $('#category_id').val();
    var name = $('#name').val();
    var seourl = $('#seourl').val();
    var image = $('#image').val();

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/fancybox/cartsubscribe',
        data: {'name': name, 'quantity': quantity, 'user_id': user_id, 'fancybox_id': fancybox_id, 'price': price, 'fancy_ship_cost': fancy_shipping_cost, 'category_id': category_id, 'fancy_tax_cost': fancy_tax_cost, 'seourl': seourl, 'image': image},
        success: function (response) {
            //alert(response);
            if (response == 'login') {
                window.location.href = baseURL + "login";
            } else {
                $('#MiniCartViewDisp').html(response);
                $('#cart_popup').show().delay('2000').fadeOut();
            }

        }
    });
    return false;
}



function ajax_add_gift_card() {

    var login = $('.create-gift-card').attr('require_login');
    if (login) {
        require_login();
        return;
    }

    $('#GiftErr').html();

    var price = $('#price_value').val();
    var rec_name = $('#recipient_name').val();
    var rec_mail = $('#recipient_mail').val();
    var descp = $('#description').val();
    var sen_name = $('#sender_name').val();
    var sen_mail = $('#sender_mail').val();
    if (price == '') {
        $('#GiftErr').html('Please Select the Price Value');
        return false;
    }
    if (rec_name == '') {
        $('#GiftErr').html('Please Enter the Receiver Name');
        return false;
    }
    if (rec_mail == '') {
        $('#GiftErr').html('Please Enter the Receiver Email');
        return false;
    } else {
        if (!validateEmail(rec_mail)) {
            $('#GiftErr').html('Please Enter Valid Email Address');
            return false;
        }
    }
    if (descp == '') {
        $('#GiftErr').html('Please  Enter the Description');
        return false;
    }

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/giftcard/insertEditGiftcard',
        data: {'price_value': price, 'recipient_name': rec_name, 'recipient_mail': rec_mail, 'description': descp, 'sender_name': sen_name, 'sender_mail': sen_mail},
        success: function (response) {
            if (response == 'login') {
                window.location.href = baseURL + "login";
            } else {
                $('#MiniCartViewDisp').html(response);
                $('#cart_popup').show().delay('2000').fadeOut();
            }
        }
    });

    return false;

}



function ajax_user_add_cart() {



    $('#QtyUserErr').html('');
    var login = $('.add_to_cart').attr('require_login');
    if (login) {
        require_login();
        return;
    }
    var quantity = $('#quantity').val();
    var mqty = $('#quantity').data('mqty');
    if (quantity == '0' || quantity == '') {
        $('#QtyUserErr').html('Invalid quantity');
        return false;
    }
    if (quantity > mqty) {
        $('#QtyUserErr').html('Maximum Purchase Quantity at a time is ' + mqty);
        $('#quantity').val(mqty);
        return false;
    }

    var product_id = $('#product_id').val();
    var sell_id = $('#sell_id').val();
    var price = $('#price').val();
    var cate_id = $('#cateory_id').val();


    var attribute_values = $('#attribute_values').val();

    //alert(product_id+''+sell_id+''+price+''+cate_id+''+quantity+''+attribute_values);
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/usercartadd',
        data: {'quantity': quantity, 'product_id': product_id, 'sell_id': sell_id, 'cate_id': cate_id, 'price': price, 'attribute_values': attribute_values, 'mqty': mqty, 'weight': weight},
        success: function (response) {
            //alert(response);
            var arr = response.split('|');
            if (arr[0] == 'login') {
                window.location.href = baseURL + "login";
            } else if (arr[0] == 'Error') {
                //alert('siva');
                $('#QtyUserErr').html('Maximum Purchase Quantity: ' + mqty + '. Already in your cart: ' + arr[1] + '.');
            } else {
                $('#MiniCartViewDisp').html(arr[1]);
                $('#cart_popup').show().delay('2000').fadeOut();
            }

        }
    });
    return false;


}




function change_user_password() {
    $('#save_password').disable();
    var pwd = $('#pass').val();
    var cfmpwd = $('#confirmpass').val();
    if (pwd == '') {
        $('#passErr').html('Enter new password');
        $('#save_password').removeAttr('disabled');
        $('#pass').focus();
        return false;
    } else if (pwd.length < 6) {
        $('#passErr').html('Password must be minimum of 6 characters');
        $('#save_password').removeAttr('disabled');
        $('#pass').focus();
        return false;
    } else if (cfmpwd == '') {
        $('#confirmpassErr').html('Confirm password required');
        $('#save_password').removeAttr('disabled');
        $('#confirmpass').focus();
        return false;
    } else if (pwd != cfmpwd) {
        $('#confirmpassErr').html('Passwords doesnot match');
        $('#save_password').removeAttr('disabled');
        $('#confirmpass').focus();
        return false;
    } else {
        return true;
    }
}

function shipping_address_cart() {
    var tempEmail = $('#temporart_email').val();
    var tempId = $('#temporary_userid').val();
    $('#tempemailErr').text('');
    if (tempEmail == '') {
        $('#tempemailErr').text(lg_required_field);
        return false;
    } else if (!IsEmail(tempEmail)) {
        $('#tempemailErr').text(lg_invalid_email);
        return false;
    }
    $.post('settings/cart-shipping-address', {'email': tempEmail, 'tempId': tempId}, function (json) {
        location.href = json.redirect;
    }, 'json');
    /* var dlg_address = $.dialog('newadds-frm'), 
     dlg_address1 = $.dialog('editadds-frm'), 
     $tpl = $('#address_tmpl').remove(); */
    //dlg_address.$obj.trigger('reset').find('.ltit').text(gettext('Add Shipping Address')).end().find('.ltxt dt').html('<b>'+gettext('New Shipping Address')+'</b><small>'+gettext('We ships worldwide with global delivery services.')+'</small>');
    /* dlg_address.open();
     setTimeout(function(){dlg_address.$obj.find(':text:first').focus()},10); */
}
function shipping_address_cart1() {
    var dlg_address = $.dialog('newadds-frm'),
            dlg_address1 = $.dialog('editadds-frm'),
            $tpl = $('#address_tmpl').remove();
    //dlg_address.$obj.trigger('reset').find('.ltit').text(gettext('Add Shipping Address')).end().find('.ltxt dt').html('<b>'+gettext('New Shipping Address')+'</b><small>'+gettext('We ships worldwide with global delivery services.')+'</small>');
    dlg_address.open();
    setTimeout(function () {
        dlg_address.$obj.find(':text:first').focus()
    }, 10);
}
function shipping_address_login() {
    $('#Ship_err').html('Please Login to add Shipping Address.');
    setTimeout("hideErrDiv('Ship_err')", 3000);
    return false;
}

function product_details_contact_form() {
    var dlg_signin = $.dialog('contact_frm');
    dlg_signin.open();
}


function product_details_user_contact_form() {
    var dlg_signin = $.dialog('user_contact_frm');
    dlg_signin.open();
}


//Coupon code Used
function checkCode(selId) {
    $('#CouponErr_' + selId).html('');
    $('#CouponErr_' + selId).show();
    var cartValue = $('#user_cart_amount_' + selId).val();
    if (cartValue > 0) {
        var code = 0;
        if($('.is_coupon_mobile_' + selId).val()==''){
            code = $('.is_coupon_desktop_' + selId).val();
        }else{
            code = $('.is_coupon_mobile_' + selId).val();
        }
        
        var current_store_id = $('#current_store_id' + selId).val();
        var amount = $('#user_cart_amount_' + selId).val();
        var shipamount = 0;//$('#user_cart_ship_amount_' + selId).val();
        var taxamount = $('#user_cart_tax_amount_' + selId).val();
        if (code != '') {
            $.ajax({
                type: 'POST',
                url: 'site/cart/checkCode',
                data: {'code': code, 'amount': amount, 'shipamount': shipamount, 'seller_id': selId,'current_store_id':current_store_id},
                success: function (response) {
                    //console.log(response);
                  // exit();
                    var response = response.trim();
                    var resarr = response.split('|');
                    if (response == 1) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت باستخدام كوبون غير صالح');
                        }
                        else
                        {
                            $('.CouponErr_' + selId).html('You have entered an invalid discount code');
                        }
                        
                        return false;
                    } else if (response == 2) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت باستخدام كوبون مستخدم من قبل');
                        }
                        else
                        {
                             $('.CouponErr_' + selId).html('You have entered an already used discount code');
                        }
                        return false;
                    } else if (response == 3) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('الرجاء اضافة المزيد من المنتجات لاستخدام هذا الكوبون');
                        }
                        else
                        {
                             $('.CouponErr_' + selId).html('You need to add more products to use this discount code');
                        }
                        
                        return false;
                    } else if (response == 4) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت بإدخال كوبون لا يتماشى مع المنتج المختار');
                        }
                        else
                        {
                           $('.CouponErr_' + selId).html('Your entered discount code is not applicable on the above product');
                        }
                        
                        return false;
                    } else if (response == 5) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت بإدخال كوبون منتهي الصلاحية');
                        }
                        else
                        {
                           $('.CouponErr_' + selId).html('You have entered an expired discount code');
                        }
                        
                        return false;
                    } else if (response == 6) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت باستخدام كوبون غير صالح');
                        }
                        else
                        {
                            $('.CouponErr_' + selId).html('You have entered an invalid discount code');
                        }
                        return false;
                    } else if (response == 7) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('الرجاء اضافة المزيد من المنتجات لاستخدام هذا الكوبون');
                        }
                        else
                        {
                             $('.CouponErr_' + selId).html('You need to add more products to use this discount code');
                        }
                        return false;
                    } else if (response == 8) {

                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('Entered Gift code is expired');
                        }
                        else
                        {
                             $('.CouponErr_' + selId).html('Entered Gift code is expired');
                        }
                        
                        return false;
                    }
                    else if (response == 9) {
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('الكوبون الذي قمت بإدخاله لم يبدأ تاريخ العمل به بعد');
                        }
                        else
                        {
                              $('.CouponErr_' + selId).html('Your discount code period is not yet started');
                        }
                       
                        return false;
                    }
                    else if (response == '66') {
                        
                        if(owl_case)
                        {
                            $('.CouponErr_' + selId).html('لقد قمت باستخدام كوبون مستخدم من قبل');
                        }
                        else
                        {
                             $('.CouponErr_' + selId).html('You have entered an already used discount code');
                        }
                        return false;
                    }
                    else if (resarr[0] == 'Success') {
                        window.location.reload();
                        /*$.ajax({
                         type: 'POST',
                         url: baseURL+'site/cart/checkCodeSuccess',
                         data: {'code':code, 'amount':amount, 'shipamount':shipamount},
                         success: function(response){
                         //						alert(response); 	
                         var arr = response.split('|');
                         
                         $('#cart_amount').val(arr[0]);
                         $('#cart_ship_amount').val(arr[1]);
                         $('#cart_tax_amount').val(arr[2]);
                         $('#cart_total_amount').val(arr[3]);
                         $('#discount_Amt').val(arr[4]);						
                         $('#CartAmt').html(arr[0]);
                         $('#CartSAmt').html(arr[1]);
                         $('#CartTAmt').html(arr[2]);
                         $('#CartGAmt').html(arr[3]);	
                         $('#disAmtVal').html(arr[4]);
                         $('#disAmtValDiv').show();
                         $('#CouponCode').val(code);
                         $('#Coupon_id').val(resarr[1]);
                         $('#couponType').val(resarr[2]);
                         var j=6;
                         for (var i=0;i<arr[5];i++)	{ 
                         //alert(arr[j]);
                         $('#IndTotalVal'+i).html(arr[j]);
                         j++;
                         }
                         $("#CheckCodeButton").val('Remove');
                         $("#is_coupon").attr('readonly','readonly');
                         //$("#CheckCodeButton").removeAttr("onclick");
                         document.getElementById("CheckCodeButton").setAttribute("onclick", "javascript:checkRemove();");
                         }
                         });*/
                    }
                }
            });
        } else {
            $('#CouponErr').html('Enter Valid Code');
        }
    } else {
        $('#CouponErr').html('Please add items in cart and enter the coupon code');
    }
    setTimeout("hideErrDiv('CouponErr')", 3000);
}

function reedemGiftcard() {

    $('#reedemLoad').show();
    $('#ReedemErr').html('');
    $('#ReedemErr').show();

    var cartValue = $('#total_price').val();

    var code = $('#reedemcode').val();
    var amount = $('#cart_price').val();
    var shipamount = $('#ship_price').val();
    var taxamount = $('#tax_price').val();
    var discountamount = $('#discount_price').val();
    var giftdiscountamount = $('#gift_discount_price').val();
    var cartlessamount = $('#cart_less_price').val();

    if (code != '') {

        $.ajax({
            type: 'POST',
            url: baseURL + 'site/checkout/ReedemCheckCode',
            data: {'code': code, 'amount': amount, 'shipamount': shipamount, 'taxamount': taxamount, 'discountamount': discountamount, 'giftdiscountamount': giftdiscountamount, 'cartlessamount': cartlessamount},
            success: function (response) {
                //alert(response);
                var resarr = response.split('|');
                if (response == 1) {
                    $('#ReedemErr').html('Entered code is invalid');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 2) {
                    $('#ReedemErr').html('Code is already used');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 3) {
                    $('#ReedemErr').html('Please add more items in the cart and enter the coupon code');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 4) {
                    $('#ReedemErr').html('Entered Gift code is not valid for this product');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 5) {
                    $('#ReedemErr').html('Entered Gift code is expired');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 6) {
                    $('#ReedemErr').html('Entered code is Not Valid');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 7) {
                    $('#ReedemErr').html('Please add more items quantity in the particular category or product, for using this Gift code');
                    $('#reedemLoad').hide();
                    return false;
                } else if (response == 8) {
                    $('#ReedemErr').html('Entered Gift code is expired');
                    $('#reedemLoad').hide();
                    return false;
                } else if (resarr[0] == 'Success') {

                    window.location.reload();
                    /*$.ajax({
                     type: 'POST',
                     url: baseURL+'site/cart/checkCodeSuccess',
                     data: {'code':code, 'amount':amount, 'shipamount':shipamount},
                     success: function(response){
                     //						alert(response); 	
                     var arr = response.split('|');
                     
                     $('#cart_amount').val(arr[0]);
                     $('#cart_ship_amount').val(arr[1]);
                     $('#cart_tax_amount').val(arr[2]);
                     $('#cart_total_amount').val(arr[3]);
                     $('#discount_Amt').val(arr[4]);						
                     $('#CartAmt').html(arr[0]);
                     $('#CartSAmt').html(arr[1]);
                     $('#CartTAmt').html(arr[2]);
                     $('#CartGAmt').html(arr[3]);	
                     $('#disAmtVal').html(arr[4]);
                     $('#disAmtValDiv').show();
                     $('#CouponCode').val(code);
                     $('#Coupon_id').val(resarr[1]);
                     $('#couponType').val(resarr[2]);
                     var j=6;
                     for (var i=0;i<arr[5];i++)	{ 
                     //alert(arr[j]);
                     $('#IndTotalVal'+i).html(arr[j]);
                     j++;
                     }
                     $("#CheckCodeButton").val('Remove');
                     $("#is_coupon").attr('readonly','readonly');
                     //$("#CheckCodeButton").removeAttr("onclick");
                     document.getElementById("CheckCodeButton").setAttribute("onclick", "javascript:checkRemove();");
                     }
                     });*/
                }
            }
        });
    } else {
        $('#ReedemErr').html(gift_code);
        $('#reedemLoad').hide();
        return false;
    }


    setTimeout("hideErrDiv('ReedemErr')", 3000);
}

function reedemGiftcardRemove() {
    $('#reedemLoad').show();
    $('#ReedemErr').html('');
    $('#ReedemErr').show();

    var code = $('#reedemcode').val();
    //alert(code);
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/checkout/ReedemcheckCodeRemove',
        data: {'code': code},
        success: function (response) {
            //alert(response);
            window.location.reload();

        }
    });
}

function sellerCartdelete(selId) {
    //alert(selId);
    $.ajax({
        type: 'POST',
        //url: baseURL + 'site/cart/SellerCartRemove',
        url: 'site/cart/SellerCartRemove',
        data: {'seller_id': selId},
        success: function (response) {
            //alert(response);
            window.location.reload();
        }
    });
}

function giftcardCartRemove(user_id) {
    //alert(selId);
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/giftcardCartRemove',
        data: {'user_id': user_id},
        success: function (response) {
            //alert(response);
            window.location.reload();
        }
    });
}

function contactshopowner(selId, prodId) {
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/contactshopowner',
        data: {'seller_id': selId, 'product_id': prodId},
        success: function (response) {
            //alert(response);
            $('#contact_shopowner_content').html(response);
            $('#contact_shop_owner_link').trigger('click');
            //window.location.reload();
        }
    });
}

function cart_contactshopowner(selId, prodId) {
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/cart/cart_contactshopowner',
        data: {'seller_id': selId, 'product_id': prodId,'redirect':location.href},
        success: function (response) {
            data = JSON.parse(response);
            if(data.status=='login'){
                window.location.href = baseURL + 'login';
            }else{
                $('.conversation_headline').html(data.heading);
                $('#conversation_seller_img').attr('src',data.seller_img);
                $('#conversation-subject').val(data.product_name);
                $('#conversation-message').val(data.product_url);
                $('#productid').val(data.product_id);
                $('#productname').val(data.product_name);
                $('#username').val(data.user_name);
                $('#useremail').val(data.user_email);
                $('#userid').val(data.user_id);
                $('#selleremail').val(data.seller_email);
                $('#sellerid').val(data.seller_id);
                $('#subject_name').val();
                $('#product_seourl').val(data.seourl);
                $('#sellername').val(data.seller_bussinessname);
                $('#ask_reg').modal('show');
            }
        }
    });
}
/*function checkCode(selId) {
    $('#CouponErr_' + selId).html('');
    $('#CouponErr_' + selId).show();
    var cartValue = $('#user_cart_amount_' + selId).val();
    if (cartValue > 0) {
        var code = $('#is_coupon_' + selId).val();
        var amount = $('#user_cart_amount_' + selId).val();
        var shipamount = $('#user_cart_ship_amount_' + selId).val();
        var taxamount = $('#user_cart_tax_amount_' + selId).val();
        if (code != '') {
            $.ajax({
                type: 'POST',
                url: baseURL + '/site/cart/checkCode',
                data: {'code': code, 'amount': amount, 'shipamount': shipamount, 'seller_id': selId},
                success: function (response) {
                    //alert(response);
                    var resarr = response.split('|');
                    if (response == 1) {
                        $('#CouponErr_' + selId).html('Entered code is invalid');
                        return false;
                    } else if (response == 2) {
                        $('#CouponErr_' + selId).html('Code is already used');
                        return false;
                    } else if (response == 3) {
                        $('#CouponErr_' + selId).html('Please add more items in the cart and enter the coupon code');
                        return false;
                    } else if (response == 4) {
                        $('#CouponErr_' + selId).html('Entered Coupon code is not valid for this product');
                        return false;
                    } else if (response == 5) {
                        $('#CouponErr_' + selId).html('Entered Coupon code is expired');
                        return false;
                    } else if (response == 6) {
                        $('#CouponErr_' + selId).html('Entered code is Not Valid');
                        return false;
                    } else if (response == 7) {
                        $('#CouponErr_' + selId).html('Please add more items quantity in the particular category or product, for using this coupon code');
                        return false;
                    } else if (response == 8) {
                        $('#CouponErr_' + selId).html('Entered Gift code is expired');
                        return false;
                    } else if (response == 9) {
                        $('#CouponErr_' + selId).html('Coupon code not yet started');
                        return false;
                    } else if (resarr[0] == 'Success') {
                        window.location.reload();
                    }
                }
            });
        } else {
            $('#CouponErr_' + selId).html('Enter Valid Code');
        }
    } else {
        $('#CouponErr_' + sellId).html('Please add items in cart and enter the coupon code');
    }
    setTimeout("hideErrDiv('CouponErr')", 3000);
}*/

function alertOwnprodBuy() {
    $(".alert-popupcart").colorbox({width: "360px", height: "auto", overflow: "auto", open: true, inline: true, href: "#alert_cartAdd"});
}



/*function contacttheshop(usrId,orderId){ 
 $.ajax({
 type: 'POST',
 url: baseURL+'site/user/contactshop',
 data: {'usrId':usrId,'orderId':orderId},
 success: function(response){
 //alert(response);
 $('#contact_shop_popup').html(response);
 $('#purchase_shop_contact').trigger('click');
 //window.location.reload();
 }
 });
 }*/


function contacttheshop(usrId, orderId, sellerId) {

    $.ajax({
        type: 'POST',
        url: baseURL + 'site/user/contactshop',
        data: {'usrId': usrId, 'orderId': orderId, 'sellerId': sellerId},
        success: function (response) {

            $('#contact_shop_popup').html(response);
            $('#purchase_shop_contact').trigger('click');
            //$('#inline_nxt').html(response);
            //$(".reg-popupnxt").colorbox({width:"748px", height:"auto", open:true,inline:true, href:"#inline_nxt"});
            //window.location.reload();
        }
    });
}
function makeReview(usrId, prodId, dealCode) {

   
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/user/makeReviewBox',
        data: {'userId': usrId, 'product_id': prodId, 'dealCode': dealCode},
        success: function (response) {
            //alert(response);

            $('#review_response').html(response);
            $('#purchase_shop_review').trigger('click');
            //window.location.reload();
        }
    });
}


function contactUser(id) {
    $('#contact_reg').html('');
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/shop/contactuserpopup',
        data: {'id': id},
        success: function (response) {
            $('#shop_contacts').html(response);
            $('#shop_contacts_link').trigger('click');
        }
    });
}

function checkRemove(selId) {

    $('#CouponErr_' + selId).html('');
    $('#CouponErr_' + selId).show();

    var code = $('#is_coupon_' + selId).val();
    //alert(code);
    $.ajax({
        type: 'POST',
        url: 'site/cart/checkCodeRemove',
        data: {'code': code, 'seller_id': selId},
        success: function (response) {
            //alert(response);
            window.location.reload();
            /*var arr = response.split('|');
             
             $('#cart_amount').val(arr[0]);
             $('#cart_ship_amount').val(arr[1]);
             $('#cart_tax_amount').val(arr[2]);
             $('#cart_total_amount').val(arr[3]);
             $('#discount_Amt').val(arr[4]);						
             $('#CartAmt').html(arr[0]);
             $('#CartSAmt').html(arr[1]);
             $('#CartTAmt').html(arr[2]);
             $('#CartGAmt').html(arr[3]);	
             $('#disAmtVal').html(arr[4]);
             $('#disAmtValDiv').show();
             $('#CouponCode').val(code);
             $('#Coupon_id').val(0);
             $('#couponType').val('');
             var j=6;
             for (var i=0;i<arr[5];i++)	{ 
             //alert(arr[j]);
             $('#IndTotalVal'+i).html(arr[j]);
             j++;
             }
             
             $('#is_coupon').val('');
             $('#disAmtValDiv').hide();
             
             $("#is_coupon").removeAttr('readonly');
             $("#CheckCodeButton").val('Apply');
             document.getElementById("CheckCodeButton").setAttribute("onclick", "javascript:checkCode();");*/



        }
    });
}


function paypal() {
    $('#PaypalPay').show();
    $('#CreditCardPay').hide();
    $('#otherPay').hide();
    $("#dep1").attr("class", "depth1 current");
    $("#dep2").attr("class", "depth2");
    $("#dep1 a").attr("class", "current");
    $("#dep2 a").attr("class", "");
}
/***************PesaPal*************/
function pesapal() {
    $('#PesapalPay').show();
    $('#PaypalPay').hide();
    $('#CreditCardPay').hide();
    $('#otherPay').hide();
    $("#dep1").attr("class", "depth1");
    $("#dep2").attr("class", "depth2 current");
    $("#dep1 a").attr("class", "");
    $("#dep2 a").attr("class", "current");
}
/****************End***************/
function creditcard() {

    $('#CreditCardPay').show();
    $('#PaypalPay').hide();
    $('#otherPay').hide();

    $("#dep1").attr("class", "depth1");
    $("#dep2").attr("class", "depth2 current");
    $("#dep1 a").attr("class", "");
    $("#dep2 a").attr("class", "current");

}

function othermethods() {

    $('#otherPay').show();
    $('#PaypalPay').hide();
    $('#CreditCardPay').hide();

    $("#dep1").attr("class", "depth1");
    $("#dep2").attr("class", "depth2");
    $("#dep3").attr("class", "depth3 current");
    $("#dep1 a").attr("class", "");
    $("#dep2 a").attr("class", "");
    $("#dep3 a").attr("class", "current");

}

function loadListValues(e) {
    var lid = $(e).val();
    var listValue = $(e).parent().next().find('select');
    if (lid == '') {
        listValue.html('<option value="">--Select--</option>');
    } else {
        listValue.hide();
        $(e).parent().next().append('<span class="loading">Loading...</span>');
        $.ajax({
            type: 'POST',
            url: BaseURL + 'admin/product/loadListValues',
            data: {lid: lid},
            dataType: 'json',
            success: function (json) {
                listValue.next().remove();
                listValue.html(json.listCnt).show();
            }
        });
    }
}

function loadListValuesUser(e) {
    var lid = $(e).val();
    var listValue = $(e).parent().next().find('select');
    if (lid == '') {
        listValue.html('<option value="">--Select--</option>');
    } else {
        listValue.hide();
        $(e).parent().next().append('<span class="loading">Loading...</span>');
        $.ajax({
            type: 'POST',
            url: BaseURL + '/site/product/loadListValues',
            data: {lid: lid},
            dataType: 'json',
            success: function (json) {
                listValue.next().remove();
                listValue.html(json.listCnt).show();
            }
        });
    }
}



function changeListValues(e, lvID) {
    var lid = $(e).val();
    var listValue = $(e).parent().next().find('select');
    if (lid == '') {
        listValue.html('<option value="">--Select--</option>');
    } else {
        listValue.hide();
        $(e).parent().next().append('<span class="loading">Loading...</span>');
        $.ajax({
            type: 'POST',
            url: BaseURL + 'admin/product/loadListValues',
            data: {lid: lid, lvID: lvID},
            dataType: 'json',
            success: function (json) {
                listValue.next().remove();
                listValue.html(json.listCnt).show();
            },
            complete: function () {
                listValue.next().remove();
                listValue.show();
            }
        });
    }
}

function changeListValuesUser(e, lvID) {
    var lid = $(e).val();
    var listValue = $(e).parent().next().find('select');
    if (lid == '') {
        listValue.html('<option value="">--Select--</option>');
    } else {
        listValue.hide();
        $(e).parent().next().append('<span class="loading">Loading...</span>');
        $.ajax({
            type: 'POST',
            url: BaseURL + '/site/product/loadListValues',
            data: {lid: lid, lvID: lvID},
            dataType: 'json',
            success: function (json) {
                listValue.next().remove();
                listValue.html(json.listCnt).show();
            },
            complete: function () {
                listValue.next().remove();
                listValue.show();
            }
        });
    }
}


//confirm status change
function confirm_status_dashboard(path) {
    $.confirm({
        'title': 'Confirmation',
        'message': 'You are about to change the status of this record ! Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    window.location = BaseURL + 'admin/dashboard/admin_dashboard';
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}


function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test($email)) {
        return false;
    } else {
        return true;
    }
}

function changeShipStatus(value, dealCode, seller) {
    $('.status_loading_' + dealCode).prev().hide();
    $('.status_loading_' + dealCode).show();
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/change_order_status',
        data: {'value': value, 'dealCode': dealCode, 'seller': seller},
        dataType: 'json',
        success: function (json) {
            if (json.status_code == 1) {
//				alert('Shipping status changed successfully');
            }
        },
        fail: function (data) {
            alert(data);
        },
        complete: function () {
            $('.status_loading_' + dealCode).hide();
            $('.status_loading_' + dealCode).prev().show();
        }
    });
}

function changeCatPos(evt, catID) {
    var pos = $(evt).prev().val();
    if ((pos - pos) != 0) {
        alert('Invalid position');
        return;
    } else {
        $(evt).hide();
        $(evt).next().show();
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/category/changePosition',
            data: {'catID': catID, 'pos': pos},
            complete: function () {
                $(evt).next().hide();
                $(evt).show().text('Done').delay(800).text('Update');
            }
        });
    }
}

function approveCmt(evt) {
    if ($(evt).hasClass('approving'))
        return;
    $(evt).addClass('approving');
    $(evt).text('Approving...');
    var cfm = window.confirm('Are you sure to approve this comment ?\n This action cannot be undone.');
    if (cfm) {
        var cid = $(evt).data('cid');
        var tid = $(evt).data('tid');
        var uid = $(evt).data('uid');
        $.ajax({
            type: 'post',
            url: baseURL + 'site/product/approve_comment',
            data: {'cid': cid, 'tid': tid, 'uid': uid},
            dataType: 'json',
            success: function (json) {
                if (json.status_code == '1') {
                    $(evt).parent().remove();
                } else {
                    $(evt).removeClass('approving');
                    $(evt).text('Approve');
                }
            }
        });
    } else {
        $(evt).removeClass('approving');
        $(evt).text('Approve');
    }
}

function deleteCmt(evt) {
    if ($(evt).hasClass('deleting'))
        return;
    $(evt).addClass('deleting');
    $(evt).text('Deleting...');
    var cfm = window.confirm('Are you sure to delete this comment ?\n This action cannot be undone.');
    if (cfm) {
        var cid = $(evt).data('cid');
        $.ajax({
            type: 'post',
            url: baseURL + 'site/product/delete_comment',
            data: {'cid': cid},
            dataType: 'json',
            success: function (json) {
                if (json.status_code == '1') {
                    $(evt).parent().parent().remove();
                } else {
                    $(evt).removeClass('deleting');
                    $(evt).text('Delete');
                }
            }
        });
    } else {
        $(evt).removeClass('deleting');
        $(evt).text('Delete');
    }
}

function post_order_comment(pid, utype, uid, dealcode) {
    if ($('.order_comment_' + pid).hasClass('posting'))
        return;
    $('.order_comment_' + pid).addClass('posting');
    var $form = $('.order_comment_' + pid).parent();
    if (uid == '') {
        alert('Login required');
        $('.order_comment_' + pid).removeClass('posting');
    } else {
        if ($('.order_comment_' + pid).val() == '') {
            alert('Your comment is empty');
            $('.order_comment_' + pid).removeClass('posting');
        } else {
            $form.find('img').show();
            $form.find('input').hide();
            $.ajax({
                type: 'post',
                url: baseURL + 'site/user/post_order_comment',
                data: {'product_id': pid, 'comment_from': utype, 'commentor_id': uid, 'deal_code': dealcode, 'comment': $('.order_comment_' + pid).val()},
                complete: function () {
                    $form.find('img').hide();
                    $form.find('input').show();
                    window.location.reload();
                }
            });
        }
    }
}

function post_order_comment_admin(pid, dealcode) {
    if ($('.order_comment_' + pid).hasClass('posting'))
        return;
    $('.order_comment_' + pid).addClass('posting');
    var $form = $('.order_comment_' + pid).parent();
    if ($('.order_comment_' + pid).val() == '') {
        alert('Your comment is empty');
        $('.order_comment_' + pid).removeClass('posting');
    } else {
        $form.find('img').show();
        $form.find('input').hide();
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/order/post_order_comment',
            data: {'product_id': pid, 'comment_from': 'admin', 'commentor_id': '1', 'deal_code': dealcode, 'comment': $('.order_comment_' + pid).val()},
            complete: function () {
                $form.find('img').hide();
                $form.find('input').show();
                window.location.reload();
            }
        });
    }
}

function changeReceivedStatus(evt, rid) {
    $(evt).hide();
    $(evt).next().show();
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/change_received_status',
        data: {'rid': rid, 'status': $(evt).val()},
        complete: function () {
            $(evt).show();
            $(evt).next().hide();
        }
    });
}

function update_refund(evt, uid) {
    if ($(evt).hasClass('updating'))
        return;
    $(evt).addClass('updating').text('Updating..');
    var amt = $(evt).prev().val();
    if (amt == '' || (amt - amt != 0)) {
        alert('Enter valid amount');
        $(evt).removeClass('updating').text('Update');
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/seller/update_refund',
            data: {'amt': amt, 'uid': uid},
            complete: function () {
                window.location.reload();
            }
        });
    }
}
// for controlling checkboxs
var checked = false;
function checkBoxController(frm, names, search_mode) {


    if (checked == false) {
        checked = true;
    } else {
        checked = false;
    }
    for (var i = 0; i < frm.elements.length; i++) {
        if (frm.elements[i].name == names) {
            frm.elements[i].checked = checked;
        }
    }
}
/* Formating function for row details 
 function fnFormatDetails ( oTable, nTr )
 {
 var aData = oTable.fnGetData( nTr );
 
 alert(baseURL);
 $.ajax({
 type: 'POST',
 url: baseURL+'admin/order/subviewDetails',
 data: {'dealId':aData[4]},
 success: function(response){
 alert(response);
 
 
 }
 });
 
 var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
 sOut += '<tr><td>Transaction ID:</td><td>'+aData[1]+' '+aData[4]+'</td></tr>';
 sOut += '<tr><td>Link to source:</td><td>Could provide a link here</td></tr>';
 sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
 sOut += '</table>';
 
 return sOut;
 }*/


function social_media(val) {

    $('#' + val + 'Err').html('');
    var SocVal = $('#' + val).val();
    if (SocVal == '') {
        $('#' + val + 'Err').html('Please enter the ' + val + ' Link');
        return false;
    } else if (SocVal == 'http://') {
        $('#' + val + 'Err').html('Please enter the ' + val + ' Link');
        return false;
    } else {
        //alert('siva'); return false;
        $.ajax({
            type: 'POST',
            url: baseURL + 'site/shop/socialmediaupdate',
            data: {'id': val, 'idval': SocVal},
            success: function (response) {
                //alert(response);
                $('#' + val + 'check').prop('checked', true);
                $('#cboxClose').trigger('click');

            }
        });
    }
}


function location_shop(val) {

    $('#' + val + 'Err').html('');
    var SocVal = $('#' + val).val();
    if (SocVal == '') {
        $('#' + val + 'Err').html('Please enter the ' + val + ' Link');
        return false;
    } else if (SocVal == 'Eg: Newyork, NY') {
        $('#' + val + 'Err').html('Please enter the ' + val + ' Link');
        return false;
    } else {
        //alert('siva'); return false;
        $.ajax({
            type: 'POST',
            url: baseURL + 'site/shop/socialmediaupdate',
            data: {'id': val, 'idval': SocVal},
            success: function (response) {
                $('#locationVal').html(SocVal);
                $('#cboxClose').trigger('click');
            }
        });
    }
}


function storesetup() {

    var chkArray = [];
    $(".check:checked").each(function () {
        chkArray.push($(this).val());
    });

    var SocialSelected = chkArray.join(',') + ",";

    var descrip = $('#seller_description').val();
    var fontfam = $('#fontfamily').val();

    var bgcolor = $('input:radio[name=bgcolor]:checked').val();
    var fontscolor = $('input:radio[name=fontscolor]:checked').val();
    var iconcolor = $('input:radio[name=iconcolor]:checked').val();
    var sellsetup = SocialSelected + '|' + fontfam + '|' + bgcolor + '|' + fontscolor + '|' + iconcolor;
    //alert(sellsetup);


    $.ajax({
        type: 'POST',
        url: baseURL + 'site/shop/storesetupfirstpage',
        data: {'seller_social_icons': SocialSelected, 'seller_description': descrip, 'seller_font': fontfam, 'seller_bg_color': bgcolor, 'seller_font_color': fontscolor, 'seller_icon_color': iconcolor, 'seller_setup': sellsetup},
        success: function (response) {
            //alert(response);
            location.href = baseURL + 'shop-product-layout';

        }
    });

}

function closesettins() {
    $('#closeSetings').hide();
}


function editPictureProductsSite(val, imgId) {

    var id = 'img_' + val;
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    $.ajax(
            {
                type: 'POST',
                url: BaseURL + '/site/product/editPictureProducts',
                data: {"id": id, 'cpage': sPage, 'position': val, 'imgId': imgId},
                dataType: 'json',
                success: function (response)
                {
                    if (response == 'No') {
                        alert("You can't delete all the images");
                        return false;
                    } else {
                        $('#img_' + val).remove();
                    }
                }
            });
}

function add_delete_follow(option, user_id)
{
    /*var show="";
     var hide="";
     if(option=="add_follow")
     {
     show="unfollow_button";
     hide="follow_button";	
     }	
     else
     {
     show="follow_button";
     hide="unfollow_button";
     }*/
    //alert(user_id);
    //var user_id=document.getElementById("user_id").value;
    $.ajax({
        type: 'post',
        url: BaseURL + 'site/user/' + option,
        data: {user_id: user_id},
        dataType: 'json',
        success: function (json) {
            //alert(json);
            if (json.status_code == 1) {
                if ($('#followAct').val() == 'yes' && $('#userName').val() != '') {
                    window.location.href = "people/" + $('#userName').val() + "/following";
                } else {
                    window.location.href = window.location.pathname;
                }
            }
            else
            {
                alert(login_require);
            }
        },
        error: function () {
        },
        complete: function () {
        }
    });

}


/*Ajax Favorite Functions*/

function changeShopToFavourite(shopid, type) {
    var ar = location.href;
    var d = ar.split("browse");
    var redirect = "";
    if (d.length == 1)
    {
        d = ar.split("products");
        if (d.length > 1)
        {
            redirect = "products" + d[1];
        }
        else
        {
            redirect = "";
        }
    }
    else
    {
        redirect = "browse" + d[1];
    }
    $(this).attr('onclick', '').unbind('click');
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/insert_favorite_status',
        data: {'shopid': shopid, 'type': type},
        dataType: 'json',
        success: function (json) {
            if (json.status_code == 2) {

                $(".ownshopfav-popup").colorbox({width: "350px", height: "auto", open: true, inline: true, href: "#alert_ownshopfav"});
            } else if (json.status_code == 1) {

                window.location.href = window.location.pathname;
            }
            else
            {

                location.href = baseURL + 'login?action=' + json.next_url + '&redirect=' + redirect;
            }
        }
    });
}
/* This function is used to put product in a favourite list
 * pid : It is a product id not comes from basic table but comes from seller_product(column:id)
 * author: pav
 */
function changeProductToFavourite(pid, type) {
    var ar = location.href;
    var d = ar.split("browse");
    var redirect = "";
    if (d.length == 1) {
        var d = ar.split("market");
        if (d.length == 1) {
            d = ar.split("products");
            if (d.length > 1) {
                redirect = "products" + d[1];
            } else {
                redirect = "";
            }
        } else {
            redirect = "market" + d[1];
        }
    } else {
        redirect = "browse" + d[1];
    }

    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/product_favorite_status',
        data: {'pid': pid, 'type': type},
        dataType: 'json',
        success: function (json) {

            if (json.status_code == 2) {
                $('#ownProdFavAlertCommonlink').trigger('click');
            } else if (json.status_code == 1) {
                console.log(json);
                if (type == 'Old') {
                    $('.wishlist-round-btn').attr('style', '').attr('onclick', '');
                } else {
                    $('.wishlist-round-btn').attr('style', 'background-color:#ef2d5e');

                }
                //window.location.href = window.location.href;
            } else {
                window.location.href = baseURL + 'login?action=' + json.next_url + '&redirect=' + redirect;
            }
        }
    });
}

function cart_changeProductToFavourite(pid, type) {
    var ar = location.href;
    var d = ar.split("browse");
    var redirect = "";
    var force_redirect = location.href;
    if (d.length == 1) {
        var d = ar.split("market");
        if (d.length == 1) {
            d = ar.split("products");
            if (d.length > 1) {
                redirect = "products" + d[1];
            } else {
                redirect = "";
            }
        } else {
            redirect = "market" + d[1];
        }
    } else {
        redirect = "browse" + d[1];
    }

    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/product_favorite_status',
        data: {'pid': pid, 'type': type},
        dataType: 'json',
        success: function (json) {

            if (json.status_code == 2) {
                $('#ownProdFavAlertCommonlink').trigger('click');
            } else if (json.status_code == 1) {
                window.location.href = force_redirect;
            } else {
                window.location.href = baseURL + 'login?action=' + json.next_url + '&redirect=' + redirect;
            }
        }
    });
}


$(document).on('click', '[data-mywhichlist]', function () {
    var pid = $(this).data('id');
    var type = $(this).data('type');
    var current = $(this);
    var ar = location.href;
    var d = ar.split("browse");
    var redirect = "";
    if (d.length == 1) {
        var d = ar.split("market");
        if (d.length == 1) {
            d = ar.split("products");
            if (d.length > 1) {
                redirect = "products" + d[1];
            } else {
                redirect = "";
            }
        } else {
            redirect = "market" + d[1];
        }
    } else {
        redirect = "browse" + d[1];
    }
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/product_favorite_status',
        data: {'pid': pid, 'type': type},
        dataType: 'json',
        success: function (json) {
            if (json.status_code == 2) {
                $('#ownProdFavAlertCommonlink').trigger('click');
            } else if (json.status_code == 1) {
                if (current.hasClass('heart')) {
                    if (type == 'Old') {
                        current.attr('style', '').data('type', 'Fresh');
                    } else {
                        current.attr('style', 'background-color:#ef2d5e').data('type', 'Old');
                    }
                } else {
                    if (type == 'Old') {
                        current.children('i').attr('style', '');
                        current.data('type', 'Fresh');
                    } else {
                        current.children('i').attr('style', 'background-color:#ef2d5e');
                        current.data('type', 'Old');
                    }
                }
                window.location.href = ar; 
            } else {
                window.location.href = baseURL + 'login?action=' + json.next_url + '&redirect=' + redirect;
            }
        }
    });
    return false;
});

function ownProductFav() {
    $('#ownProdFavAlertCommonlink').trigger('click');
}
/*-----------------------Script for product detail page------------------------------------*/

$(document).ready(function (e) {

    $('#quantity_list').change(function (e) {
        $('#qty').val($('#quantity_list').val());
    });
    $('#variation_one').change(function (e) {

        variation_price = $('#variation_one').val().indexOf("[");
        if (variation_price != -1)
        {
            end = $('#variation_one').val().indexOf("]");
            $('#price').val($('#variation_one').val().substring(variation_price + 1, end));
            $('#variation_one_val').val($('#variation_one').val().substring(0, variation_price - 1));
        }
        else
        {
            $('#price').val($('#price_val').val());
            $('#variation_one_val').val($('#variation_one').val());
        }
    });
    $('#variation_two').change(function (e) {
        $('#variation_two_val').val($('#variation_two').val());
    });
    return true;
});
/*Create List in Favorite page*/
$(document).ready(function (e) {
    $('#list_create').click(function (e) {
        $(this).hide();
        $('#create_list').show();
    });
    $('#list_close').click(function (e) {
        $('#create_list').hide();
        $('#list_create').show();
    });
});

function addproducttoList(listId, prodId)
{
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/user_addproducttolist',
        data: {'listId': listId, 'prodId': prodId},
        success: function (response) {
            //alert(response);
            window.location.href = window.location.href;
        }
    });
}
function manageRegisrtyProduct(userId, prodId)
{
    $.ajax({
        type: 'post',
        url: baseURL + 'site/user/user_manageRegistryProduct',
        data: {'userId': userId, 'prodId': prodId},
        success: function (response) {
            //alert(response);
            window.location.href = window.location.href;
        }
    });
}
function validate_create_list(val)
{
    if ($('#creat_list_' + val).val() != '')
    {
        var ddl = $('#ddl').val();
        var list = $('#list').val();
        var productId = $('#productId').val();
        $.ajax({
            type: 'post',
            url: baseURL + 'site/user/add_list',
            data: {'ddl': ddl, 'list': list, 'productId': productId},
            success: function (response) {
                //alert(response);
                window.location.href = window.location.pathname;
            }
        });
    }
    else
    {

        alert(lg_Enter_List_Name);
        return false;
    }
}
/*Validation for Add Shipping Address*/
function shipping_validation()
{
    document.getElementById("err_country").innerHTML = "";
    document.getElementById("err_name").innerHTML = "";
    document.getElementById("err_street").innerHTML = "";
    //document.getElementById("err_city").innerHTML="";
    document.getElementById("err_state").innerHTML = "";
    //document.getElementById("err_postal").innerHTML="";
    document.getElementById("err_phone").innerHTML = "";
    var err = "";
    if (document.getElementById("country").value == "Select")
    {
        document.getElementById("err_country").innerHTML = shop_country;
        err = 1;
    }
    if (document.getElementById("name").value == "")
    {
        document.getElementById("err_name").innerHTML = cant_blank;
        ;
        err = 1;
    }
    if (document.getElementById("street").value == "")
    {
        document.getElementById("err_street").innerHTML = cant_blank;
        err = 1;
    }


    if (document.getElementById("cityae").value == "")
    {
        //alert(document.getElementById("cityae").value);
        document.getElementById("err_cityae").innerHTML = 'Please select city';
        err = 1;
    }



    if (document.getElementById("state").value == "")
    {
        document.getElementById("err_state").innerHTML = cant_blank;
        err = 1;
    }

    var phone = document.getElementById("phone").value;

    if (document.getElementById("phone").value == "")
    {
        document.getElementById("err_phone").innerHTML = cant_blank;
        err = 1;
    }

    //var phoneno = /[^a-zA-Z]/;
    var phoneno = /^(?:\+971|0)?\d{9}$/;///^(?:\+971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/;
    var landline = /^(?:\+971|0)?\d{8}$/;
    if (phone.match(phoneno) || phone.match(landline)) {

    }
    else {
        document.getElementById("err_phone").innerHTML = 'Invalid Mobile No';
        err = 1;

    }

    if (err == 1)
    {
        return false;
    }

}
function editgitcardPictures(val, imgId) {//alert('123');

    var id = 'img_' + val;
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    $.ajax(
            {
                type: 'POST',
                url: BaseURL + 'admin/giftcards/editgitcardPictures',
                data: {"id": id, 'cpage': sPage, 'position': val, 'imgId': imgId},
                dataType: 'json',
                success: function (response)
                {
                    //alert(response);
                    //return false;
                    if (response == 'No') {
                        alert("You can't delete all the images");
                        return false;
                    } else {
                        //alert(val);
                        $('#img_' + val).remove();
                    }
                }
            });
}
/*delete user list*/
function delete_user_list() {

    if (!window.confirm(lg_sure))
        return false;
    var $this = $(this), params = {}, url;

    url = baseURL + 'site/user/delete_user_list';

    params.lid = $('#list_Id').val();
    params.uid = $('#uid').val();

    $.ajax({
        type: 'post',
        url: url,
        data: params,
        dataType: 'json',
        success: function (json) {
            if (json.status_code != 1) {
                alert(json.message);
                return;
            } else {
                window.location = json.url;
            }
        }
    });

    return false;
}
/* Change USer NAme */
function change_name() {
    var first_name = document.getElementById("new-first-name").value;
    var last_name = document.getElementById("new-last-name").value;
    $.ajax({
        url: baseURL + 'site/user/change_name/pops',
        data: {'new-first-name': first_name, 'new-last-name': last_name},
        type: "post",
        success: function (e) {
            window.location.href = window.location.pathname;
        },
        error: function (er) {
            alert("error");
        }
    });
}

/*validation for popup send*/
function validat_popup_send() {
    if ($('#subject').val() == '' || $('#message_text').val() == '') {
        if ($('#subject').val() == '') {
            $('#contact_popupErr').html(lg_pls_add_subject);
        } else {
            $('#contact_popupErr').html('Please add message.');
        }
        return false;
    }
}

/*Auto suggest*/
$(document).ready(function (e) {
    $('#search_items').keyup(function (e) {
        if ($('#search_items').val() == '') {
            $('#sugglist').html('');
            return false;
        }
        search_key = $(this).val();
        $.ajax({
            url: 'site/search/autosuggest_list/' + search_key,
            data: {'search_key': search_key},
            type: "post",
            success: function (data) {
                data = data.trim();
                $('#sugglist').html(data);
            }
        });
    });

    $('#search_items_mobile').keyup(function (e) {
        if ($('#search_items_mobile').val() == '') {
            $('#sugglist_mobile').html('');
            return false;
        }
        search_key = $(this).val();
        $.ajax({
            url: 'site/search/autosuggest_list/' + search_key,
            data: {'search_key': search_key},
            type: "post",
            success: function (data) {
                data = data.trim();
                $('#sugglist_mobile').html(data);
            }
        });
    });
});
/*Rating Script*/
/*$(document).ready(function(e) {
 $('.ratting-list').each(function(e) {
 $(this).click(function(e) {
 $('#dummy').val('gfgh');
 });
 });
 });*/
function rattingValidation() {
    var des = $('#description').val();
    if (des.length < 10) {
        $('#descriptionErr').html('Type minimum 15 characters');
        $('#descriptionErr').show().delay('3000').fadeOut();
        return false;
    } else {
        return true;
    }
}
function ratting_star(rate) {
    var i;
    for (i = 1; i <= 5; i++) {
        $('#r' + i).removeClass();
        if (i <= rate) {
            $('#r' + i).addClass('star-active');
        } else {
            $('#r' + i).addClass('star-inactive');
        }
    }
}
function makeReportReview(reviewer_id, review_id, reporter_id) {
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/shop/contactReviewer',
        data: {'reviewer_id': reviewer_id, 'review_id': review_id, 'reporter_id': reporter_id},
        success: function (response) {
            $('#reportReview').html(response);
            $('#review_popup_link').trigger('click');
        }
    });
}
function contactsCheck() {
    var subject = $('#subject').val();
    var message_text = $('#message_text').val();
    if (subject.length < 3) {
        $('#ErrPUP').html(min_three);
        $('#ErrPUP').show().delay('5000').fadeOut();
        return false;
    }
    if (message_text.length < 5) {
        $('#ErrPUP').html(min_five);
        $('#ErrPUP').show().delay('5000').fadeOut();
        return false;
    } else {
        return true;
    }
}
function rattingValidation() {
    var des = $('#description').val();
    if (des.length < 10) {
        $('#descriptionErr').html(min_five);
        $('#descriptionErr').show().delay('3000').fadeOut();
        return false;
    } else {
        return true;
    }
}
/*gift card scriptings*/
function add_gift_card() {

    var login = $('.cart_button').attr('require_login');
    if (login) {
        require_login();
        return;
    }

    $('#GiftErr').html();
    err = 0;
    var price = $('#price_value').val();
    var rec_name = $('#recipient_name').val();
    var descp = $('#description').val();
    var sen_name = $('#sender_name').val();
    var sen_mail = $('#sender_mail').val();

    var rec_mail = $('#recipient_mail').val();
    var re_recipient_mail = $('#re_recipient_mail').val();

    if (price == '') {
        $('#priceErr').html(lg_Pls_select_one);
        $('.amount').addClass('error');
        err = 1;
    } else {
        $('#priceErr').html('');
        $('.amount').removeClass('error');
    }
    if (rec_name == '') {
        $('.recipient_nameErr').html(lg_pls_enter_receiver_name);
        $('.to').addClass('error');
        err = 1;
    } else {
        $('.recipient_nameErr').html('');
        $('.to').removeClass('error');
    }
    if (sen_name == '') {
        $('#sender_nameErr').html(lg_Please_enter_your_name);
        $('.from').addClass('error');
        err = 1;
    } else {
        $('#sender_nameErr').html('');
        $('.from').removeClass('error');
    }

    if (rec_mail == '') {
        $('#recipient_email').html(lg_pls_enter_receiver_email);
        $('.to_mail').addClass('error');
        err = 1;
    } else if (!validateEmail(rec_mail)) {
        $('#recipient_email').html(lg_Please_Enter_Valid_Email_Address);
        $('.to_mail').addClass('error');
        err = 1;
    } else if (re_recipient_mail == '') {
        $('.to_mail').removeClass('error');
        $('#recipient_email').html(lg_Please_Re_Enter_the_Receiver_Email);
        $('.to_rmail').addClass('error');
        err = 1;
    } else if (rec_mail != re_recipient_mail) {
        $('#recipient_email').html(lg_Receiver_Email_doest_matched);
        $('.to_rmail').addClass('error');
        err = 1;
    } else {
        $('#recipient_email').html('');
        $('.to_rmail').removeClass('error');
    }


    if (err > 0) {
        return false;
    }
    return true;

}
function add_gift_card1() {

    var login = $('.cart_button').attr('require_login');
    if (login) {
        require_login();
        return;
    }

    $('#GiftErr').html();
    err = 0;
    var price = $('#price_value1').val();
    var rec_name = $('#recipient_name1').val();
    var descp = $('#description1').val();
    var sen_name = $('#sender_name1').val();
    var sen_mail = $('#sender_mail1').val();


    if (price == '') {
        $('#priceErr1').html('Please select one');
        $('.amount1').addClass('error');
        err = 1;
    } else {
        $('#priceErr1').html('');
        $('.amount1').removeClass('error');
    }
    if (rec_name == '') {
        $('.recipient_name1Err').html('Please enter the recipient\'s name');
        $('.to').addClass('error');
        err = 1;
    } else {
        $('.recipient_name1Err').html('');
        $('.to').removeClass('error');
    }
    if (sen_name == '') {
        $('#sender_name1Err').html('Please enter your name');
        $('.from').addClass('error');
        err = 1;
    } else {
        $('#sender_name1Err').html('');
        $('.from').removeClass('error');
    }


    if (err > 0) {
        return false;
    }
    return true;

}
$(document).ready(function () {
    var maxChars = $("#description");
    var max_length = maxChars.attr('maxlength');
    if (max_length > 0) {
        maxChars.bind('keyup', function (e) {
            length = new Number(maxChars.val().length);
            counter = max_length - length;
            $("#maxtext_notify").text(counter);
        });
    }
    $('.priceList').click(function (e) {
        $('#price_value').val($(this).attr('id'));
    });

    var maxChars1 = $("#description1");
    var max_length1 = maxChars.attr('maxlength');
    if (max_length1 > 0) {
        maxChars1.bind('keyup', function (e) {
            length1 = new Number(maxChars1.val().length);
            counter1 = max_length1 - length1;
            $("#maxtext_notify1").text(counter1);
        });
    }


    $('.pah_priceList').click(function (e) {
        $('#price_value1').val($(this).attr('id'));
    });


    $('.es-carousel ul li').click(function (e) {
        $('#image').val($(this).attr('data-img'));
    });

});


/****This for image size validation for banners  start ***************/
function shipping_rate_calc(value, sid) {
    var shppingId = $('#address-cart option:selected').val();
    var page = value.toLowerCase();
    var controller = page + 'rate/';
    if (page == 'ups') {
        controller = page + 'rates/';
    }
    $.ajax({
        type: 'POST',
        url: baseURL + 'site/' + controller + value + 'shippingrate',
        data: {'shippingid': shppingId, 'value': value, 'seller_id': sid},
        success: function (response) {
            if (response != '0') {
                window.location.reload();
            } else {
                alert('Your shipping not allowed this country');
                return false;
            }
        }
    });
}


$(document).ready(function () {

    $("#shop_banner_img").change(function (e) {
        var $image = $('.croppdiv > img'),
                replaced;

        $image.cropper();
        e.preventDefault();
        var formData = new FormData($(this).parents('form')[0]);
        $.ajax({
            beforeSend: function ()
            {
                $("#loadedImgshop").css("display", "block");
                // $("#shop_banner_img").html('<img id="loadedImg" src="images/loader64.gif" style="widows:25px; height:25px;" />');
            },
            url: 'site/shop/ajax_check_shop_mainBanner_size',
            type: 'POST',
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            success: function (data) {
                $("#loadedImgshop").css("display", "none");
                data = data.trim();
                var arr = data.split('|');
                if (arr[0] == 'Success') {
                    $('#croppdiv').css('display', 'block');
                    document.getElementById("cropimage").src = arr[1];

                    $image.cropper('replace', arr[1]);
                    $('#ErrImage').css('color', '#090');
                    $('#ErrImage').html('Success');
                    return true;
                } else {
                    $('#croppdiv').css('display', 'none');
                    $('#ErrImage').css('color', '#F00');
                    $('#ErrImage').html(upload_image);
                    return false;
                }
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
        return false;


    });



    $("#banner_img").change(function (e) {
        e.preventDefault();
        var formData = new FormData($(this).parents('form')[0]);
        $.ajax({
            beforeSend: function ()
            {
                $("#loadedImgPromote").css("display", "block");
                //$("#banner_img").html('<img id="loadedImg" src="images/loader64.gif" style="widows:25px; height:25px;" />');
            },
            url: 'site/shop/ajax_check_shop_mainBanner_size',
            type: 'POST',
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            success: function (data) {
                $("#loadedImgPromote").css("display", "none");
                if (data == 'Success') {
                    $('#ErrImage').css('color', '#090');
                    $('#ErrImage').html('Success');
                    return true;
                } else {
                    $('#ErrImage').css('color', '#F00');
                    $('#ErrImage').html('Upload Image Too Small. Please Upload Image Size More than or Equalto 1400 X 400 .');
                    return false;
                }
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
        return false;


    });



});


/*gift card validtion for checkout*/
function giftcardprocess() {

    $('#GiftCartErr').html('');
    var giftvalue = $("input[name=gift_payment_value]").is(":checked");
    if (giftvalue == false) {
        $('#GiftCartErr').html('<span class="error">Please Choose the Payment Gateway</span>');
        return false;
    } else {
        $("#giftSubmit").submit();
    }
}
/*Spam report validation*/
function validate_spamreport() {
    var countVAl = 0;
    $('.spamchk').each(function () {
        if ($(this).is(':checked')) {
            countVAl = countVAl + 1;
        }
    });
    if (countVAl == 0) {
        $('#spamErr').html(lg_select_reason);
        $('#spamErr').show().delay('3000').fadeOut();
        return false;
    } else if (countVAl > 0) {
        if ($('#spam_text').val() == '') {
            $('#spamErr').html('Type your Explanation.');
            $('#spamErr').show().delay('3000').fadeOut();
            return false;
        }
        else {
            return true;
        }
    }
}
/*check all in conversation*/
$(document).ready(function (e) {
    $(".select-all-msg").click(function () {
        if ($(this).is(':checked')) {
            $('input:checkbox[name=find_all]').prop("checked", true);
            $(".chkMsg").prop("checked", true);
        } else {
            $('input:checkbox[name=find_all]').prop("checked", false);
            $(".chkMsg").prop("checked", false);
        }
    });
    $(".chkMsg").click(function () {
        $(".chkMsg").each(function () {
            if ($(this).is(':checked')) {
            } else {
                $(".select-all-msg").prop("checked", false);
            }
        });
    });
});
function confirmTrashMsg(UsrId, folder, actionTake) {
    var countVAl = 0;
    $('.chkMsg').each(function () {
        if ($(this).is(':checked')) {
            countVAl = countVAl + 1;
        }
    });
    if (countVAl == 0) {
        alert(atleast_one_del);
        return false;
    } else if (countVAl > 0) {
        if (confirm(are_u_sure)) {
            var MsgId = '';
            $('.chkMsg').each(function () {
                if ($(this).is(':checked')) {
                    MsgId = MsgId + $(this).val() + '|';
                }
            });
            $.ajax({
                beforeSend: function () {
                    $("#MessageStatus").css("display", "block");
                },
                url: 'site/user/ajax_conversation_action',
                type: 'POST',
                data: {'MsgId': MsgId, 'UsrId': UsrId, 'folder': folder, 'actionTake': actionTake},
                success: function (data) {
                    var RemoveIdsArr = data.split('|');
                    var i = 0;
                    for (i = 0; i < RemoveIdsArr.length; i++) {
                        $("#Msg_" + RemoveIdsArr[i]).remove();
                    }
                    var count = 0;
                    $('.chkMsg').each(function () {
                        count++;
                    });
                    if (count < 1) {
                        //$('#checkbox-id').prop("checked", false);
                        $('.conversation_container_right').append(folder_empty);
                        $('.message-box').hide();
                    }
                    $("#MessageStatus").css("display", "none");
                    location.reload();
                }
            });
        } else {
            return false;
        }
    }
}

function markmessage(modes) {
    $('.chkMsg').each(function () {
        $(this).prop("checked", false);
        if ($(this).attr('data-mode') == modes) {
            $(this).prop("checked", true);
        }
    });
}

function taxCaluAdd() {
    var cname = $('#country_name').val();
    var sname = $('#state_name').val();
    var tax = $('#tax').val();

    $('#countryErr').html('');
    $('#stateErr').html('');
    $('#taxErr').html('');

    if (cname == '') {
        $('#countryErr').html(field_req);
        return false;
    } else if (sname == '') {
        $('#stateErr').html(field_req);
        return false;
    } else if (tax == '') {
        $('#taxErr').html(field_req);
        return false;
    } else {
        $('#taxeditForm').submit();
        return true;
    }


}


function checkCapcha() {
    var capcha = $("#captcha").val();
    var post = $('#post').val();
    $('#c-load').css('display', 'block');
    $('#user_captchaErr').html('');
    $('#threadErr').html('');
    $('#captchaErr').html('');
    $.ajax({
        type: 'post',
        url: baseURL + 'site/community/checkCapchaAjax',
        dataType: 'html',
        data: {'capcha': capcha},
        success: function (data) {
            if (data == 'success') {
                $('#c-load').css('display', 'none');
                if ($("#post_title").val() == '') {
                    $('#threadErr').html('Please enter thread title');
                    return false;
                } else if (post == '') {
                    $('#captchaErr').html('Please enter your comments');
                    return false;
                } else {
                    $('#addnewdiscussion_form').submit();
                    return true;
                }
            } else {

                if ($("#post_title").val() == '') {
                    $('#threadErr').html('Please enter thread title');
                } else {
                    $('#threadErr').html('');
                }
                if (post == '') {
                    $('#captchaErr').html('Please enter your comments');
                } else {
                    $('#captchaErr').html('');
                }

                if (capcha == '') {
                    $('#user_captchaErr').html('Please enter the text shown in image');
                } else {
                    $('#user_captchaErr').html('Please re-enter the text shown in image');
                }
                $('#c-load').css('display', 'none');
                return false;
            }
        }
    });

}

/******* Code earnings update *******/

function update_cod(evt, uid) {
    if ($(evt).hasClass('updating'))
        return;
    $(evt).addClass('updating').text('Updating..');
    var amt = $(evt).prev().val();
    if (amt == '' || (amt - amt != 0)) {
        alert('Enter valid amount');
        $(evt).removeClass('updating').text('Update');
        return false;
    } else {
        $.ajax({
            type: 'post',
            url: baseURL + 'admin/seller/update_cod',
            data: {'amt': amt, 'uid': uid},
            complete: function () {
                window.location.reload();
            }
        });
    }
}

$(document).ready(function () {
    $('#pwd').keyup(function () {
        str = $(this).val();
        str = str.replace(/\s/g, '');
        $(this).val(str);
    });

    $('#Confirmpwd').keyup(function () {
        str = $(this).val();
        str = str.replace(/\s/g, '');
        $(this).val(str);
    });

    $(document).on("cut copy paste", "#pwd", function (e) {
        e.preventDefault();
    });
    $(document).on("cut copy paste", "#Confirmpwd", function (e) {
        e.preventDefault();
    });



});

// FUNCTION TO VALIDATE TICKET Form

function ticket_validation() {
    var sub = $('#support_subject').val();
    var desc = $('#support_description').val();
    var prio = $('#support_priority').val();
    $('#errorSub').html('');
    $('#errorDesc').html('');
    $('#errorPri').html('');
    var err = 0;
    if (sub == '' || sub.length < 5) {
        $('#errorSub').html('please enter the subject more then 5 character');
        $('#errorSub').css('color', 'red');
        $('#errorSub').css('float', 'initial');
        err = 1;
    }
    if (desc == '' | desc.length < 5) {
        $('#errorDesc').html('please enter the Description more then 5 character');
        $('#errorDesc').css('color', 'red');
        $('#errorDesc').css('float', 'initial');
        err = 1;
    }
    if (isNaN(prio) == true) {
        $('#errorPri').html('please select the priority');
        $('#errorPri').css('color', 'red');
        $('#errorPri').css('float', 'initial');

        err = 1;
    }

    if (err == 0) {
        return true;
    } else {
        return false;

    }

}
function confirm_Mail_sent(path) {
    $.confirm({
        'title': 'Mail Send Confirmation',
        'message': 'Do You Want Sent Mail! <br/> Continue?',
        'buttons': {
            'Yes': {
                'class': 'yes',
                'action': function () {
                    window.location = BaseURL + path;
                }
            },
            'No': {
                'class': 'no',
                'action': function () {
                    return false;
                }	// Nothing to do in this case. You can as well omit the action property.
            }
        }
    });
}

//FUNCTION TO VALIDATE COMMENT IN SELLER SUPPORT

function validateTktCommt() {
    var text = $('#ticket_reply_textarea').val();
    if (text == '') {
        alert('Please type comment and submit');
        return false;
    } else {
        return true;
    }

}

function loader() {
    $("#fakeLoader").attr('style', '');
    $("#fakeLoader").fakeLoader({
        timeToHide: 10000, //10 seconds
        zIndex: "999",
        spinner: "spinner7", //Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
        bgColor: "rgba(51, 49, 49, 0.7)",
    });
}



/*---------------------------------------Add Shop GetPaid Page Validations--------------------------------------------------------------------*/
function shop_payment_disp2(id, dis)
{
    if (document.getElementById(id).checked == true)
    {
        document.getElementById(dis).style.display = "block";
    } else if (document.getElementById(id).checked == false)
    {
        document.getElementById(dis).style.display = "none";
        $('#authorize_id').val('');
        $('#authorize_idErr').html('');
        $('#authorize_id').removeClass('errors');

        $('#authorize_key').val('');
        $('#authorize_keyErr').html('');
        $('#authorize_key').removeClass('errors');

    }

}

// ************ Strip validation on shopper page Siva********************

function shop_payment_disp4(id, dis)
{
    if (document.getElementById(id).checked == true)
    {
        document.getElementById(dis).style.display = "block";
    } else if (document.getElementById(id).checked == false)
    {
        document.getElementById(dis).style.display = "none";
        //$('# Secret Key').val('');
        $('# Secret KeyErr').html('');
        $('# Secret Key').removeClass('errors');

        //$('#stripe_publish_key').val('');
        $('#stripe_publish_keyErr').html('');
        $('#stripe_publish_key').removeClass('errors');

    }

}


// ************ cod validate on shopper page  by udhaya********************

function shop_payment_disp3(id, dis)
{
    if (document.getElementById(id).checked == true)
    {
        document.getElementById(dis).style.display = "block";
    } else if (document.getElementById(id).checked == false)
    {
        document.getElementById(dis).style.display = "none";


    }

}



function shop_payment_disp1(id, dis)
{
    if (document.getElementById(id).checked == true)
    {
        document.getElementById(dis).style.display = "block";
    } else if (document.getElementById(id).checked == false)
    {
        document.getElementById(dis).style.display = "none";
        $('#emailaddress').val('');
        $('#emailaddressErr').html('');
        $('#emailaddress').removeClass('errors');

        $('#APIUsername').val('');
        $('#APIUsernameErr').html('');
        $('#APIUsername').removeClass('errors');

        $('#APIPassword').val('');
        $('#APIPasswordErr').html('');
        $('#APIPassword').removeClass('errors');

        $('#APISignature').val('');
        $('#APISignatureErr').html('');
        $('#APISignature').removeClass('errors');
    }

}
function shop_payment_disp()
{
    if (document.getElementById('money_order').checked == true || document.getElementById('personal_check').checked == true)
    {
        document.getElementById('money__wrap').style.display = "block";
    }
    else
    {
        document.getElementById('money__wrap').style.display = "none";
        $('#country').val('');
        $('#fullname').val('');
        $('#street').val('');
        $('#city').val('');
        $('#zippostalcode').val('');
        $('#Pay_aso').val('');
        $('#Pay_state').val('');
        $('#countryErr').html('');
        $('#fullnameErr').html('');
        $('#streetErr').html('');
        $('#cityErr').html('');
        $('#zippostalcodeErr').html('');
        $('#country').removeClass('errors');
        $('#fullname').removeClass('errors');
        $('#street').removeClass('errors');
        $('#city').removeClass('errors');
        $('#zippostalcode').removeClass('errors');
    }
}
function shop_payment_validation()
{

    if (document.getElementById('paypal').checked == false && document.getElementById('Authorize').checked == false)
    {
        $('#overall_err').html(atleast_one_payment);
        return false;
    }
    else
    {
        $('#overall_err').html('');

        if (document.getElementById('paypal').checked == true)
        {
            err = 0;
            if (document.getElementById('pplive').checked == false && document.getElementById('ppsandbox').checked == false)
            {
                $('#PayPal_modeErr').html('This field is required');
                err = 1;
            }
            var email = $('#emailaddress').val();
            if (email == '' || email == null) {
                $('#emailaddressErr').html('This field is required');
                $('#emailaddress').addClass('errors');
                err = 1;
            } else if (!IsEmail(email)) {
                $('#emailaddressErr').html('Please Enter Valid Email Address');
                $('#emailaddress').addClass('errors');
                err = 1;
            } else {
                $('#emailaddressErr').html('');
                $('#emailaddress').removeClass('errors');
                //err=0;	
            }

            /*$('#APIUsernameErr').html('');
             $('#APIPasswordErr').html('');					
             $('#APISignatureErr').html('');
             
             $('#APIUsername').removeClass('errors');
             $('#APIPassword').removeClass('errors');
             $('#APISignature').removeClass('errors');
             
             var APIUsername = $('#APIUsername').val();
             var APIPassword = $('#APIPassword').val();
             var APISignature = $('#APISignature').val();
             
             
             if(APIUsername =='' || APIUsername ==null){
             $('#APIUsernameErr').html('This field is required');
             $('#APIUsername').addClass('errors');
             err=1;				
             }
             if(APIPassword =='' || APIPassword ==null) { 
             $('#APIPasswordErr').html('This field is required');	
             $('#APIPassword').addClass('errors');	
             err=1;		
             }
             if(APISignature =='' || APISignature ==null) { 
             $('#APISignatureErr').html('This field is required');	
             $('#APISignature').addClass('errors');	
             err=1;		
             }*/

        }
        if (document.getElementById('Authorize').checked == true)
        {
            //err=0;
            $('#authorize_idErr').html('');
            $('#authorize_keyErr').html('');
            $('#authorize_modeErr').html('');

            $('#authorize_id').removeClass('errors');
            $('#authorize_key').removeClass('errors');

            var authorize_id = $('#authorize_id').val();
            var authorize_key = $('#authorize_key').val();

            if (document.getElementById('live').checked == false && document.getElementById('sandbox').checked == false)
            {
                $('#authorize_modeErr').html('This field is required');
                err = 1;
            }
            if (authorize_id == '' || authorize_id == null) {
                $('#authorize_idErr').html('This field is required');
                $('#authorize_id').addClass('errors');
                err = 1;
            }
            if (authorize_key == '' || authorize_key == null) {
                $('#authorize_keyErr').html('This field is required');
                $('#authorize_key').addClass('errors');
                err = 1;
            }
        }
        /*if(document.getElementById('money_order').checked==true || document.getElementById('personal_check').checked==true)
         {
         err=0;
         $('#countryErr').html('');
         $('#fullnameErr').html('');
         $('#streetErr').html('');
         $('#cityErr').html('');
         $('#zippostalcodeErr').html('');
         $('#country').removeClass('errors');
         $('#fullname').removeClass('errors');
         $('#street').removeClass('errors');
         $('#city').removeClass('errors');
         $('#zippostalcode').removeClass('errors');
         
         
         var country = $('#country').val();
         var fullname = $('#fullname').val();
         var street = $('#street').val();
         var city = $('#city').val();
         var zippostalcode = $('#zippostalcode').val();
         
         if(country =='' || country ==null){
         $('#countryErr').html('This field is required');
         $('#country').addClass('errors');
         err=1;				
         }
         if(fullname =='' || fullname ==null) { 
         $('#fullnameErr').html('This field is required');	
         $('#fullname').addClass('errors');	
         err=1;		
         }
         if(street =='' || street ==null){
         $('#streetErr').html('This field is required');
         $('#street').addClass('errors');
         err=1;				
         }
         if(city =='' || city ==null) { 
         $('#cityErr').html('This field is required');	
         $('#city').addClass('errors');	
         err=1;		
         }
         if(zippostalcode =='' || zippostalcode ==null){
         $('#zippostalcodeErr').html('This field is required');
         $('#zippostalcode').addClass('errors');
         err=1;				
         }					
         }*/
        if (err == 1)
        {
            return false;
        }
    }
}
function IsEmail(email)
{
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/*---------------------------------------Add Shop Billing Page Validations--------------------------------------------------------------------*/

function checkUsername(element)
{
    err = element + '_err';
    els = '#' + element;

    if (element == 'card_number')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = credit_card_num;
            $(els).addClass('errors');
        } else if (isNaN(document.getElementById(element).value))
        {
            document.getElementById(err).innerHTML = credit_card_num_digit;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'cvv_number')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = cvv_num;
            $(els).addClass('errors');
        } else if (isNaN(document.getElementById(element).value))
        {
            document.getElementById(err).innerHTML = cvv_num_digit;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'name')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_name;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'phone')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_phone_num;
            $(els).addClass('errors');
        } else if (isNaN(document.getElementById(element).value))
        {
            document.getElementById(err).innerHTML = phone_num_digit;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'street')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_street;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'city')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_city;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'state')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_province;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'postalcode')
    {
        if (document.getElementById(element).value.length == 0)
        {
            document.getElementById(err).innerHTML = enter_zipcode;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'country')
    {
        if (document.getElementById(element).value == "")
        {
            document.getElementById(err).innerHTML = sel_country;
            $(els).addClass('errors');
        }
        else
        {
            document.getElementById(err).innerHTML = "";
            $(els).removeClass('errors');
        }
    }
    if (element == 'exp_month' || element == 'exp_year')
    {
        if (element == 'exp_month')
        {
            if (document.getElementById(element).value == "")
            {
                document.getElementById('exp_err').innerHTML = sel_month;
                $(els).addClass('errors');
            } else
            {
                document.getElementById('exp_err').innerHTML = "";
                $(els).removeClass('errors');
            }
        }
        else if (element == 'exp_year')
        {
            if (document.getElementById(element).value == "")
            {
                document.getElementById('exp_err').innerHTML = sel_year;
                $(els).addClass('errors');
            } else
            {
                document.getElementById('exp_err').innerHTML = "";
                $(els).removeClass('errors');
            }
        }

    }


    if (!isNaN($('#card_number').val()) && !isNaN($('#cvv_number').val()) && $('#exp_month').val() != "" && $('#exp_year').val() != "" && $('#name').val() != "" && !isNaN($('#phone').val()) && $('#country').val() != "" && $('#street').val() != "" && $('#city').val() != "" && $('#state').val() != "" && $('#postalcode').val() != "")
    {
        $('#validate_card').removeClass('btn_save');
        $('#validate_card').addClass('save_btn');
    }
    else
    {
        $('#validate_card').removeClass('save_btn');
        $('#validate_card').addClass('btn_save');
    }

}
function billing_validation(id)
{
    var count = 0;
    if (id == 'credit') {
        if (document.getElementById('card_number').value.length == 0)
        {
            document.getElementById('card_number_err').innerHTML = credit_card_num;
            $('#card_number').addClass('errors');
            count = 1;
        } else if (isNaN(document.getElementById('card_number').value))
        {
            document.getElementById('card_number_err').innerHTML = credit_card_num_digit;
            $('#card_number').addClass('errors');
            count = 1;
        }
        else
        {
            document.getElementById('card_number_err').innerHTML = "";
            $('#card_number').removeClass('errors');
        }

        if (document.getElementById('cvv_number').value.length == 0)
        {
            document.getElementById('cvv_number_err').innerHTML = cvv_num;
            $('#cvv_number').addClass('errors');
            count = 1;
        } else if (isNaN(document.getElementById('cvv_number').value))
        {
            document.getElementById('cvv_number_err').innerHTML = cvv_num_digit;
            $('#cvv_number').addClass('errors');
            count = 1;
        }
        else
        {
            document.getElementById('cvv_number_err').innerHTML = "";
            $('#cvv_number').removeClass('errors');
        }


        if (document.getElementById('name').value.length == 0)
        {
            document.getElementById('name_err').innerHTML = enter_name;
            $('#name').addClass('errors');
            count = 1;
        }
        else
        {
            document.getElementById('name_err').innerHTML = "";
            $('#name').removeClass('errors');
        }
        if (document.getElementById('exp_month').value == "")
        {
            document.getElementById('exp_err').innerHTML = sel_month;
            $('#exp_month').addClass('errors');
            count = 1;
        } else
        {
            document.getElementById('exp_err').innerHTML = "";
            $('#exp_month').removeClass('errors');
        }

        if (document.getElementById('exp_year').value == "")
        {
            document.getElementById('exp_err').innerHTML = sel_year;
            $('#exp_year').addClass('errors');
            count = 1;
        } else
        {
            document.getElementById('exp_err').innerHTML = "";
            $('#exp_year').removeClass('errors');
        }

    }

    if (document.getElementById('phone').value.length == 0)
    {
        document.getElementById('phone_err').innerHTML = enter_phone_num;
        $('#phone').addClass('errors');
        count = 1;
    } else if (isNaN(document.getElementById('phone').value))
    {
        document.getElementById('phone_err').innerHTML = phone_num_digit;
        $('#phone').addClass('errors');
        count = 1;
    }
    else
    {
        document.getElementById('phone_err').innerHTML = "";
        $('#phone').removeClass('errors');
    }

    if (document.getElementById('street').value.length == 0)
    {
        document.getElementById('street_err').innerHTML = enter_street;
        $('#street').addClass('errors');
        count = 1;
    }
    else
    {
        document.getElementById('street_err').innerHTML = "";
        $('#street').removeClass('errors');
    }

    if (document.getElementById('city').value.length == 0)
    {
        document.getElementById('city_err').innerHTML = enter_city;
        $('#city').addClass('errors');
        count = 1;
    } else if (!isNaN(document.getElementById('city').value))
    {
        document.getElementById('city_err').innerHTML = "Please enter valid city.";
        $('#city').addClass('errors');
        count = 1;
    } else
    {
        document.getElementById('city_err').innerHTML = "";
        $('#city').removeClass('errors');
    }
    if (document.getElementById('state').value.length == 0)
    {
        document.getElementById('state_err').innerHTML = enter_province;
        $('#state').addClass('errors');
        count = 1;
    } else if (!isNaN(document.getElementById('state').value))
    {
        document.getElementById('state_err').innerHTML = "Please enter valid state.";
        $('#state').addClass('errors');
        count = 1;
    } else
    {
        document.getElementById('state_err').innerHTML = "";
        $('#state').removeClass('errors');
    }
    if (document.getElementById('postalcode').value.length == 0 || document.getElementById('postalcode').value == 0)
    {
        document.getElementById('postalcode_err').innerHTML = enter_zipcode;
        $('#postalcode').addClass('errors');
        count = 1;
    }
    else
    {
        document.getElementById('postalcode_err').innerHTML = "";
        $('#postalcode').removeClass('errors');
    }


    if (document.getElementById('country').value == "")
    {
        document.getElementById('country_err').innerHTML = sel_country;
        $('#country').addClass('errors');
        count = 1;
    }
    else
    {
        document.getElementById('country_err').innerHTML = "";
        $('#country').removeClass('errors');
    }


    if (count == 0)
    {
        if (id != 'credit') {
            var full_name = $("#full_name").val();
            var street = $("#street").val();
            var city = $("#city").val();
            var state = $("#state").val();
            var country = $("#country").val();
            var postalcode = $("#postalcode").val();
            var phone = $("#phone").val();
            $('#billLoder').css('display', 'block');
            $.ajax({
                url: baseURL + 'site/shop/addBillingAjax',
                type: 'post',
                data: {'full_name': full_name, 'street': street, 'city': city, 'state': state, 'country': country, 'postalcode': postalcode, 'phone': phone},
                success: function (data) {
                    $('#billLoder').css('display', 'none');
                },
            });
            return true;
        } else {
            return true;
        }
    }
    else
    {
        return false;
    }


}
/*******************************************************************************************************************************************************/

function change(boxid, divtoaffect)
{
    content = document.getElementById(boxid).value;
    document.getElementById(divtoaffect).innerHTML = content;
}
function processing_time_shipping(val)
{
    if (val == 'custom')
    {
        document.getElementById('custom_shipping_time').style.display = "block";
    }
    else
    {
        document.getElementById('custom_shipping_time').style.display = "none";
    }
}

/**************************************Shop Section ******************************/
function validate_shop_section()
{
    if ($('#name').val() == "")
    {
        $('#name').addClass('errors');
        return false;
    }
    else
    {
        $('#name').removeClass('errors');
    }
}
$(document).ready(function (e) {
    $('.create_shop_sec').click(function () {
        $('#create_sec').css('display', 'none');
        $('#create_sec_div').css('display', 'block');
    });
    $('.cancel_create_shop_sec').click(function () {
        $('#create_sec').css('display', 'block');
        $('#create_sec_div').css('display', 'none');
    });
});
function confirm_section_delete()
{
    return confirm('Are you sure want to delete this section? Listings currently in this section will appear under All Items');
}
function edit_section(val, status)
{
    if (status == 'edit')
    {
        $('#' + val).hide();
        $('#edit_' + val).show();
    }
    else if (status == 'cancel')
    {
        $('#' + val).show();
        $('#edit_' + val).hide();
    }
}

/**************************************Shop Coupon Coedes ******************************/
function couponcodeValidate() {
    var count = 0;
    $('#quantityErr').hide();
    $('#datefromErr').hide();
    $('#datetoErr').hide();
    $('#price_valueErr').hide();
    $('#descriptionErr').hide();

    $('#quantityErr').html('');
    $('#datefromErr').html('');
    $('#datetoErr').html('');
    $('#price_valueErr').html('');
    $('#descriptionErr').html('');

    $('#quantity').removeClass('errors');
    $('#datefrom').removeClass('errors');
    $('#dateto').removeClass('errors');
    $('#price_value').removeClass('errors');
    $('#description').removeClass('errors');

    if ($('#quantity').val() == 0 || isNaN($('#quantity').val())) {
        $('#quantityErr').show();
        $('#quantityErr').html(max_coupen);
        $('#quantity').addClass('errors');
        count = 1;
    }
    if ($('#datefrom').val() == '') {
        $('#datefromErr').show();
        $('#datefromErr').html(cou_from);
        $('#datefrom').addClass('errors');
        count = 1;
    }
    if ($('#dateto').val() == '') {
        $('#datetoErr').show();
        $('#datetoErr').html(cou_expiry);
        $('#dateto').addClass('errors');
        count = 1;
    }
    if ($('#price_value').val() == 0 || isNaN($('#price_value').val())) {
        $('#price_valueErr').show();
        $('#price_valueErr').html(price_coupen);
        $('#price_value').addClass('errors');
        count = 1;
    }
    if ($('#description').val() == '') {
        $('#descriptionErr').show();
        $('#descriptionErr').html(enter_description);
        $('#description').addClass('errors');
        count = 1;
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
}

function pickupaddressvalidate() {

    var count = 0;
    $('#address1err').hide();
    $('#address2err').hide();
    $('#cityerr').hide();
    $('#phoneerr').hide();
    $('#fax_valueErr').hide();

    $('#address1err').html('');
    $('#address2err').html('');
    $('#cityerr').html('');
    $('#phoneerr').html('');
    $('#fax_valueErr').html('');


    $('#address1err').removeClass('errors');
    $('#address2err').removeClass('errors');
    $('#cityerr').removeClass('errors');
    $('#phoneerr').removeClass('errors');
    $('#fax_valueErr').removeClass('errors');






    if ($('#address1').val() == '') {
        $('#address1err').show();
        $('#address1err').html('Enter the address 1 ');
        $('#address1err').addClass('errors');
        count = 1;
    }
    if ($('#address2').val() == '') {
        $('#address2err').show();
        $('#address2err').html('Enter the address 2');
        $('#address2err').addClass('errors');
        count = 1;
    }
    if ($('#citycode').val() == '') {
        $('#cityerr').show();
        $('#cityerr').html('Please select the City');
        $('#cityerr').addClass('errors');
        count = 1;
    }
    if ($('#phoneno').val() == '') {
        $('#phoneerr').show();
        $('#phoneerr').html('Enter the Phone no');
        $('#phoneerr').addClass('errors');
        count = 1;
    }
    if ($('#fax_Detail').val() == '') {
        $('#fax_valueErr').show();
        $('#fax_valueErr').html('Enter the FAX No');
        $('#fax_valueErr').addClass('errors');
        count = 1;
    }
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
}

// function by udhay  	 	 	
function checkrecords(recid, userid)
{
    if (userid == "nil")
    {
        if (confirm("Do you want remove this listing?") == true)
        {
            $.get('site/market/deleteRegistryListing?listingid=' + recid, function (data) {
                window.location = location.href;
            });
        }
        else
        {

        }
    }
    else
    {
        $.get('site/market/insertRegistryListing?listingid=' + recid + '&count=' + $("#" + userid).val(), function (data) {
            if (data != "no")
            {
                window.location = location.href;
            }

        });
    }
}
// checkrecords ends 
/**/
