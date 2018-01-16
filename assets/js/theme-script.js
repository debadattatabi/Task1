(function (a) {
    a.fn.addBack = a.fn.addBack || a.fn.andSelf;
    a.fn.extend({actual: function (b, l) {
            if (!this[b]) {
                throw'$.actual => The jQuery method "' + b + '" you called does not exist';
            }
            var f = {absolute: false, clone: false, includeMargin: false};
            var i = a.extend(f, l);
            var e = this.eq(0);
            var h, j;
            if (i.clone === true) {
                h = function () {
                    var m = "position: absolute !important; top: -1000 !important; ";
                    e = e.clone().attr("style", m).appendTo("body");
                };
                j = function () {
                    e.remove();
                };
            } else {
                var g = [];
                var d = "";
                var c;
                h = function () {
                    c = e.parents().addBack().filter(":hidden");
                    d += "visibility: hidden !important; display: block !important; ";
                    if (i.absolute === true) {
                        d += "position: absolute !important; ";
                    }
                    c.each(function () {
                        var m = a(this);
                        var n = m.attr("style");
                        g.push(n);
                        m.attr("style", n ? n + ";" + d : d);
                    });
                };
                j = function () {
                    c.each(function (m) {
                        var o = a(this);
                        var n = g[m];
                        if (n === undefined) {
                            o.removeAttr("style");
                        } else {
                            o.attr("style", n);
                        }
                    });
                };
            }
            h();
            var k = /(outer)/.test(b) ? e[b](i.includeMargin) : e[b]();
            j();
            return k;
        }});
})(jQuery);




(function ($) {
    "use strict"; // Start of use strict
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    $(window).load(function () {
        // auto width megamenu
        auto_width_megamenu();
        resizeTopmenu();
        js_height_full();
    });
    /* ---------------------------------------------
     Scripts ready
     --------------------------------------------- */
    $(document).ready(function () {
        js_height_full();
        if ($('.parallax').length > 0) {
            $('.parallax').each(function () {
                $(this).parallax("50%", 0.1);
            })
        }
        $('[data-toggle="tooltip"]').tooltip();
        /* Resize top menu*/
        resizeTopmenu();
        /* Zoom image */
        if ($('#product-zoom').length > 0) {
            $('#product-zoom').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 750,
                gallery: 'gallery_01'
            });
        }

        /* Popup sizechart */
        if ($('#size_chart').length > 0) {
            $('#size_chart').fancybox();
        }

        /** OWL CAROUSEL**/

        $(".owl-carousel").each(function (index, el) {
            var config = $(this).data();
            config.navText = ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'];
            config.smartSpeed = "300";
            if ($(this).hasClass('owl-style2')) {
                config.animateOut = "fadeOut";
                config.animateIn = "fadeIn";
            }
            $(this).owlCarousel(config);
        });

        $(".brand-showcase-logo").each(function (index, el) {
            var config = $(this).data();
            config.navText = ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'];
            config.smartSpeed = "300";
            config.rtl = owl_case;
            if ($(this).hasClass('owl-style2')) {
                config.animateOut = "fadeOut";
                config.animateIn = "fadeIn";
            }
            $(this).owlCarousel(config);
        });

        $(".owl-carousel-vertical").each(function (index, el) {
            var config = $(this).data();
            config.navText = ['<span class="icon-up"></spam>', '<span class="icon-down"></span>'];
            config.smartSpeed = "900";
            config.animateOut = "";
            config.animateIn = "fadeInUp";
            $(this).owlCarousel(config);
        });
        /** COUNT DOWN **/
        $('[data-countdown]').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                var fomat = '<span>%d</span><b></b><span>%H</span><b></b><span>%M</span><b></b><span>%S</span>';
                $this.html(event.strftime(fomat));
            });
        });
        if ($('.countdown-lastest').length > 0) {
            var labels = ['Years', 'Months', 'Weeks', 'Days', 'Hrs', 'Mins', 'Secs'];
            var layout = '<span class="box-count"><span class="number">{dnn}</span> <span class="text">Days</span></span><span class="dot">:</span><span class="box-count"><span class="number">{hnn}</span> <span class="text">Hrs</span></span><span class="dot">:</span><span class="box-count"><span class="number">{mnn}</span> <span class="text">Mins</span></span><span class="dot">:</span><span class="box-count"><span class="number">{snn}</span> <span class="text">Secs</span></span>';
            $('.countdown-lastest').each(function () {
                var austDay = new Date($(this).data('y'), $(this).data('m') - 1, $(this).data('d'), $(this).data('h'), $(this).data('i'), $(this).data('s'));
                $(this).countdown({
                    until: austDay,
                    labels: labels,
                    layout: layout
                });
            });
        }
        /* Close top banner*/
        $(document).on('click', '.btn-close', function () {
            $(this).closest('.top-banner').animate({height: 0, opacity: 0}, 1000);
            return false;
        })
        /** SELECT CATEGORY **/
        $('.select-category').select2({
            minimumResultsForSearch: -1,
        });
        /* Toggle nav menu*/
        $(document).on('click', '.toggle-menu', function () {
            $(this).closest('.nav-menu').find('.navbar-collapse').toggle();
            return false;
        })
        /** HOME SLIDE**/
        if ($('#home-slider').length > 0 && $('#contenhomeslider').length > 0) {
            var slider = $('#contenhomeslider').bxSlider(
                    {
                        nextText: '<i class="fa fa-angle-right"></i>',
                        prevText: '<i class="fa fa-angle-left"></i>',
                        auto: true,
                        mode: 'fade'
                    }

            );
        }
        /** Custom page sider**/
        if ($('#home-slider').length > 0 && $('#contenhomeslider-customPage').length > 0) {
            var slider = $('#contenhomeslider-customPage').bxSlider(
                    {
                        nextText: '<i class="fa fa-angle-right"></i>',
                        prevText: '<i class="fa fa-angle-left"></i>',
                        auto: true,
                        pagerCustom: '#bx-pager',
                        nextSelector: '#bx-next',
                        prevSelector: '#bx-prev',
                    }

            );
        }

        if ($('#home-slider').length > 0 && $('#slide-background').length > 0) {
            var slider = $('#slide-background').bxSlider(
                    {
                        nextText: '<i class="fa fa-angle-right"></i>',
                        prevText: '<i class="fa fa-angle-left"></i>',
                        auto: true,
                        onSlideNext: function ($slideElement, oldIndex, newIndex) {
                            var corlor = $($slideElement).data('background');
                            $('#home-slider').css('background', corlor);
                        },
                        onSlidePrev: function ($slideElement, oldIndex, newIndex) {
                            var corlor = $($slideElement).data('background');
                            $('#home-slider').css('background', corlor);
                        }
                    }

            );
            //slider.goToNextSlide();
        }

        /* elevator click*/
        $(document).on('click', 'a.btn-elevator', function (e) {
            e.preventDefault();
            var target = this.hash;
            if ($(document).find(target).length <= 0) {
                return false;
            }
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 50
            }, 500);
            return false;
        })
        /* scroll top */
        $(document).on('click', '.scroll_top', function () {
            $('body,html').animate({scrollTop: 0}, 400);
            return false;
        })
        /** #brand-showcase */
        $(document).on('click', '.brand-showcase-logo li', function () {
            var id = $(this).data('tab');
            $(this).closest('.brand-showcase-logo').find('li').each(function () {
                $(this).removeClass('active');
            });
            $(this).closest('li').addClass('active');
            $('.brand-showcase-content').find('.brand-showcase-content-tab').each(function () {
                $(this).removeClass('active');
            })
            $('#' + id).addClass('active');
            return false;
        })
        // CATEGORY FILTER 
        $('.price_range_slider').each(function () {
            var min = $(this).data('min');
            var max = $(this).data('max');
            var unit = $(this).data('unit');
            var value_min = $(this).data('value-min');
            var value_max = $(this).data('value-max');
            var label_reasult = $(this).data('label-reasult');
            var t = $(this);
            $(this).slider({
                range: true,
                min: min,
                max: max,
                values: [value_min, value_max],
                slide: function (event, ui) {
                    var result = label_reasult + " " + ui.values[ 0 ] + ' ' + unit + ' - ' + ui.values[ 1 ] + ' ' + unit;
                    $("#custom_min_price").val(ui.values[0]);
                    $("#custom_max_price").val(ui.values[1]);
                    $("#minPriceVal").val(ui.values[0]);
                    $("#maxPriceVal").val(ui.values[1]);
                    my_custome_filter();
                }
            });
        })

        // $('.discount_range_slider').each(function () {
        //     var min = $(this).data('min');
        //     var max = $(this).data('max');
        //     var unit = $(this).data('unit');
        //     var value_min = $(this).data('value-min');
        //     var value_max = $(this).data('value-max');
        //     var label_reasult = $(this).data('label-reasult');
        //     var t = $(this);
        //     $(this).slider({
        //         range: true,
        //         min: min,
        //         max: max,
        //         values: [value_min, value_max],
        //         slide: function (event, ui) {
        //             var result = label_reasult + " " + ui.values[ 0 ] + ' ' + unit + ' - ' + ui.values[ 1 ] + ' ' + unit;
        //             $("#min_disc").val(ui.values[0]);
        //             $("#max_disc").val(ui.values[1]);
        //             $('.discount_range_slider').mouseout(function () {
        //                 $('#discountFilterForm').submit();
        //             });
        //             t.closest('.slider-range').find('.amount-range-price').html(result);
        //         }
        //     });
        // });
//        /** ALL CAT **/
//        $(document).on('click', '.open-cate', function () {
//            $(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function () {
//                $(this).slideDown();
//            });
//            $(this).addClass('colse-cate').removeClass('open-cate').html('Close');
//        })
//        /* Close category */
//        $(document).on('click', '.colse-cate', function () {
//            $(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function () {
//                $(this).slideUp();
//            });
//            $(this).addClass('open-cate').removeClass('colse-cate').html('All Categories');
//            return false;
//        })
        // bar ontop click
        $(document).on('click', '.vertical-megamenus-ontop-bar', function () {
            $('#vertical-megamenus-ontop').find('.box-vertical-megamenus').slideToggle();
            $('#vertical-megamenus-ontop').toggleClass('active');
            return false;
        })
        // View grid list product 
        $(document).on('click', '.display-product-option .view-as-grid', function () {
            $(this).closest('.display-product-option').find('li').removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('#view-product-list').find('.product-list').removeClass('list').addClass('grid');
            return false;
        })
        // View list list product 
        $(document).on('click', '.display-product-option .view-as-list', function () {
            $(this).closest('.display-product-option').find('li').removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('#view-product-list').find('.product-list').removeClass('grid').addClass('list');
            return false;
        })
        /// tre menu category
        $(document).on('click', '.tree-menu li span', function () {
            $(this).closest('li').children('ul').slideToggle();
            if ($(this).closest('li').haschildren('ul')) {
                $(this).toggleClass('open');
            }
            return false;
        })
        /* Open menu on mobile */
        $(document).on('click', '.btn-open-mobile', function () {
            var width = $(window).width();
            if (width > 1024) {
                if ($('body').hasClass('home')) {
                    if ($('#nav-top-menu').hasClass('nav-ontop')) {

                    } else {

                       // return false;
                    }
                }
            }
            $(this).closest('.box-vertical-megamenus').find('.vertical-menu-content').slideToggle();
            $(this).closest('.title').toggleClass('active');
            return false;
        })
        /* Product qty */
        $(document).on('click', '.btn-plus-down', function () {
            var value = parseInt($('#option-product-qty').val());
            value = value - 1;
            if (value <= 0)
                return false;
            $('#option-product-qty').val(value);
            return false;
        })
        $(document).on('click', '.btn-plus-up', function () {
            var value = parseInt($('#option-product-qty').val());
            value = value + 1;
            if (value <= 0)
                return false;
            $('#option-product-qty').val(value);
            return false;
        })
        /* Close vertical */
        $(document).on('click', '*', function (e) {
            var container = $("#box-vertical-megamenus");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('home')) {
                    if ($('#nav-top-menu').hasClass('nav-ontop')) {
                    } else {
                        return;
                    }
                }
                container.find('.vertical-menu-content').hide();
                container.find('.title').removeClass('active');
            }
        })
        /* Send conttact*/
        $(document).on('click', '#btn-send-contact', function () {
            var subject = $('#subject').val(),
                    email = $('#email').val(),
                    order_reference = $('#order_reference').val(),
                    message = $('#message').val();
            var data = {
                subject: subject,
                email: email,
                order_reference: order_reference,
                message: message
            }
            $.post('ajax_contact.php', data, function (result) {
                if (result.trim() == "done") {
                    $('#email').val('');
                    $('#order_reference').val('');
                    $('#message').val('');
                    $('#message-box-conact').html('<div class="alert alert-info">Your message was sent successfully. Thanks</div>');
                } else {
                    $('#message-box-conact').html(result);
                }
            })
        })
        // Quick view
        $(document).on('click', '.quick-view .search,a.quick-view,.add-to-cart .search,a.add-to-cart', function () {
            var data = {'product_id': $(this).attr('data-id')}
            loader();
            $.post('site/product/get_ajax_product_details', data, function (response) {
                $("#fakeLoader").attr('style', 'visibility:hidden');
                $.fancybox(response, {
                    // fancybox API options
                    fitToView: true,
                    autoSize: true,
                    closeClick: false,
                    openEffect: 'none',
                    closeEffect: 'none'
                }); // fancybox
                // OWL Product thumb
                $('.product-img-thumb .owl-carousel').owlCarousel(
                        {
                            dots: false,
                            nav: true,
                            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                            margin: 21,
                            responsive: {
                                // breakpoint from 0 up
                                0: {
                                    items: 2,
                                },
                                // breakpoint from 480 up
                                480: {
                                    items: 2,
                                },
                                // breakpoint from 768 up
                                768: {
                                    items: 2,
                                },
                                1000: {
                                    items: 3,
                                }
                            }

                        }
                );
            })
            return false;
        })

        $(document).on('click', '.block-quickview .product-img-thumb a', function () {
            var image = $(this).data('image');
            $(this).closest('.product-image').find('.product-full img').attr('src', image);
            return false;
        })

        // Poppup video
        if ($('.video-btn').length > 0) {
            $('.video-btn').fancybox();
        }
        // Open form search in header 10
        $(document).on('click', '.form-search .icon', function () {
            $(this).closest('.form-search').find('.form-search-inner').fadeIn(600);
            $(this).closest('.form-search').find('.form-search-inner .input-serach input').focus();
        })
        /* Close form search in header 10*/
        $(document).on('click', '*', function (e) {
            var container = $(".form-search");
            var icon = $(".form-search .icon");
            if (!container.is(e.target) && container.has(e.target).length === 0 && !icon.is(e.target) && icon.has(e.target).length === 0) {
                container.find('.form-search-inner').fadeOut(600);
            }
        })

        //SLIDE FULL SCREEN
        var slideSection = $(".slide-fullscreen .item-slide");
        slideSection.each(function () {
            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });
    });
    /* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
    $(window).resize(function () {
        // auto width megamenu
        auto_width_megamenu();
        // Remove menu ontop
        remove_menu_ontop();
        // resize top menu
        resizeTopmenu();
        js_height_full();
    });
    /* ---------------------------------------------
     Scripts scroll
     --------------------------------------------- */
    $(window).scroll(function () {
        resizeTopmenu();
        /* Show hide scrolltop button */
        if ($(window).scrollTop() == 0) {
            $('.scroll_top').stop(false, true).fadeOut(600);
        } else {
            $('.scroll_top').stop(false, true).fadeIn(600);
        }
        /* Main menu on top */
        var h = $(window).scrollTop();
        var max_h = $('#header').height() + $('#top-banner').height();
        var width = $(window).width();
        if (width > 767) {
            //console.log(h+"Sc");
            //console.log(((max_h + vertical_menu_height) -50)+"-Div");
            if(h<10){

                $('.top-header').removeClass('nav-ontop');
                $('.header-static').removeClass('nav-ontop');
            }else if (h > (max_h + vertical_menu_height) -90) {
                // fix top menu
                //alert(max_h + vertical_menu_height);
                //alert(h);
                $('.top-header').addClass('nav-ontop');
                $('.header-static').addClass('nav-ontop');
                //$('#nav-top-menu').find('.vertical-menu-content').hide();
                //$('#nav-top-menu').find('.title').removeClass('active');
                // add cart box on top menu
                //$('#cart-block .cart-block').appendTo('#shopping-cart-box-ontop .shopping-cart-box-ontop-content');
                //$('#shopping-cart-box-ontop').fadeIn();
                //$('#user-info-top').appendTo('#user-info-opntop');
                //$('#header .header-search-box form').appendTo('#form-search-opntop');
            } else {
                $('.top-header').removeClass('nav-ontop');
                $('.header-static').removeClass('nav-ontop');
                /*if ($('body').hasClass('home')) {
                    $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                    if (width > 1024)
                        $('#nav-top-menu').find('.vertical-menu-content').show();
                    else {
                        $('#nav-top-menu').find('.vertical-menu-content').hide();
                    }
                    $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                }*/
                ///
                //$('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
                //$('#shopping-cart-box-ontop').fadeOut();
                //$('#user-info-opntop #user-info-top').appendTo('.top-header .container');
                //$('#form-search-opntop form').appendTo('#header .header-search-box');
            }
        }
    });
    var vertical_menu_height = $('#box-vertical-megamenus .box-vertical-megamenus').innerHeight();
    /**==============================
     ***  Auto width megamenu
     ===============================**/
    function auto_width_megamenu() {
        var full_width = parseInt($('.container').innerWidth());
        //full_width = $( document ).width();
        var menu_width = parseInt($('.vertical-menu-content').actual('width'));
        $('.vertical-menu-content').find('.vertical-dropdown-menu').each(function () {
            $(this).width((full_width - menu_width) - 2);
        });
    }
    /**==============================
     ***  Remove menu on top
     ===============================**/
    function remove_menu_ontop() {
        var width = parseInt($(window).width());
        if (width < 768) {
            $('#nav-top-menu').removeClass('nav-ontop');
            if ($('body').hasClass('home')) {
                if (width > 1024)
                    $('#nav-top-menu').find('.vertical-menu-content').show();
                else {
                    $('#nav-top-menu').find('.vertical-menu-content').hide();
                }
            }
            ///
            $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
            $('#shopping-cart-box-ontop').fadeOut();
            $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
            $('#form-search-opntop form').appendTo('#header .header-search-box');
        }
    }
    /* Top menu*/
    function scrollCompensate() {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = parseInt(inner.offsetWidth);
        outer.style.overflow = 'scroll';
        var w2 = parseInt(inner.offsetWidth);
        if (w1 == w2)
            w2 = outer.clientWidth;
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    function resizeTopmenu() {
        if ($(window).width() + scrollCompensate() >= 768) {
            var main_menu_w = $('#main-menu .navbar').innerWidth();

            if ($('#main-menu').hasClass('menu-option9') || $('#main-menu').hasClass('menu-option10') || $('#main-menu').hasClass('menu-option11')) {
                return false;
            }

            $("#main-menu ul.mega_dropdown").each(function () {
                var menu_width = $(this).innerWidth();
                var offset_left = $(this).position().left;
                if (menu_width > main_menu_w) {
                    $(this).css('width', main_menu_w + 'px');
                    $(this).css('left', '0');
                } else {
                    if ((menu_width + offset_left) > main_menu_w) {
                        var t = main_menu_w - menu_width;
                        var left = parseInt((t / 2));
                        $(this).css('left', left);
                    }
                }
            });
        }

        if ($(window).width() + scrollCompensate() < 1025) {
            $("#main-menu li.dropdown:not(.active) >a").attr('data-toggle', 'dropdown');
        } else {
            $("#main-menu li.dropdown >a").removeAttr('data-toggle');
        }
    }
    /* ---------------------------------------------
     Height Full
     --------------------------------------------- */
    function js_height_full() {
        (function ($) {
            var heightSlide = $(window).outerHeight();
            $(".full-height").css("height", heightSlide);
        })(jQuery);
    }
})(jQuery); // End of use strict