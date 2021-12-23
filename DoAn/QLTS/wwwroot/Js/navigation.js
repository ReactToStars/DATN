﻿$(document).ready(function () {
    $(".navbar .toggle-icon").click(function () {
        $(".navbar-item-box .navbar-item-text").addClass("display-none");
        $(".logo-site .qlts-text").addClass("display-none");
        $(".logo-site .toggle-icon").addClass("display-none");
        $(".wrapper .row .left").attr("style", "width: 80px;");
        $(".navbar-item-box .navbar-item-direct").attr("style", "display: none;");
    });

    $(".navbar .qlts-logo").click(function () {
        $(".navbar-item-box .navbar-item-text").removeClass("display-none");
        $(".logo-site .qlts-text").removeClass("display-none");
        $(".logo-site .toggle-icon").removeClass("display-none");
        $(".wrapper .row .left").attr("style", "width: 200px;");
        $(".navbar-item-box .navbar-item-direct").attr("style", "display: block;");
    });

    $('.general').click(function () {
        $('.sub-general').slideToggle();
        $('.sub-general').removeClass('display-none');
    });

    $('.human').click(function () {
        $('.sub-human').slideToggle();
        $('.sub-human').removeClass('display-none');
    });
});