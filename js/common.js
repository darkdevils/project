'use strict';

//const h = $('.slideLayer').outerHeight();
let h = 0;
//$('.toastLayer').css({bottom: -toastHeigh});

$('.toastLayer').each(function(){
    h = $(this).outerHeight();
    $(this).css({bottom: -h });
});

$('.slideLayer').each(function(){
    h = $(this).outerHeight();
    $(this).css({bottom: -h});
});

const common = {
    init: function() {
        this.btnSearchClose();
        this.selectColor();
        this.headerLine();
        this.slideLayer.slideType();
        //this.btnToggle();
        $(".slideLayerScroll").closest('.slideLayer').addClass('slideLayer-half');
    },

    // search close button
    btnSearchClose: function(){
        $("#search").keyup(function(){
            const text = $(this).val();
            if(text.length > 0) {
                $('.searchArea .btnSearchClose').fadeIn();
            } else {
                $('.searchArea .btnSearchClose').fadeOut();
            }
        });
        $('.searchArea .btnSearchClose').on('click',function(){
            $("#search").val('');
            $(this).fadeOut();
        });
    },

    // Tab
    tabType: function(e,num) {
        num = num || 0;
        const menu = $(e).children();
        const con = $(e + '__con').children();
        let select = $(menu).eq(num);
        let i = num;

        con.hide();
        select.addClass('on').prepend("<span class='blind'>현재선택</span>");
        con.eq(num).show();

        menu.click(function(){
            if(select !==null) {
                $(".blind").remove();
                select.removeClass('on');
                con.eq(i).hide();
            }
            select = $(this);
            i = $(this).index();

            select.addClass('on').prepend("<span class='blind'>현재선택</span>");
            con.eq(i).show();
            return false;
        });
    },

    // Toggle Button
    btnToggle: function(el) {
        //el.classList.toggle('on');
        $(el).toggleClass('on');
    },

    // Slide Layer
    slideLayer: {
        slideOpen: function(el) {
            const layerId = $("#" + el );
            $('body').append('<div class="dim"></div>');
            layerId.animate({
                bottom: 0
            });
        },
        slideClose: function(el) {
            const layerH = $(el).closest('.slideLayer').height();
            $('.dim').fadeOut().queue(function(){
                $('.dim').remove();
            });
            $(el).closest('.slideLayer').animate({
                bottom: -layerH
            });
        },
        slideType: function() {
            $('.layerOpen').on('click',function(){
                const _this = $(this);
                const layerPopup = $("#" + $(this).attr("aria-controls"));
                const layerObjClose = layerPopup.find(".layerClose");
                const layerObj = layerPopup.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
                const layerObjFirst = layerObj && layerObj.first();
                const layerObjLast = layerObj && layerObj.last();
                let tabDisable;

                // Slide Popup 시 내용이 길어서 Scroll 생성 및 Title Line 생성
                const slideheaderH = layerPopup.find('.slideLayer__header').outerHeight();
                const slideH = layerPopup.outerHeight() - slideheaderH;
                const layerScrollTop = $('.slideLayerScroll').scrollTop();
                layerPopup.find(".slideLayerScroll").outerHeight(slideH - 70);
                $('body').css({overflow : 'hidden' });

                $('.slideLayerScroll').scroll(function(){
                    if($(this).scrollTop() > 0) {
                        $('.slideLayer__header').addClass('borBtm');
                    } else {
                        $('.slideLayer__header').removeClass('borBtm');
                    }
                });

                function layerClose() {
                    const layerH = layerPopup.height();
                    $('.dim').fadeOut().queue(function(){
                        $('.dim').remove();
                    });
                    layerPopup.animate({
                        bottom: -layerH
                    });
                    if (tabDisable === true) layerPopup.attr("tabindex", "-1");
                    _this.focus();
                    $(document).off("keydown.lp_keydown");
                    $('body').css({overflow : 'auto' });
                }
                $(this).blur();

                layerObj.length ? layerObjFirst.focus().on("keydown", function(event) {
                    // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
                    if (event.shiftKey && (event.keyCode || event.which) === 9) {
                        // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
                        event.preventDefault();
                        layerObjLast.focus();
                    }
                }) : layerPopup.attr("tabindex", "0").focus().on("keydown", function(event){
                    tabDisable = true;
                    if ((event.keyCode || event.which) === 9) event.preventDefault();
                    // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
                });
                layerObjLast.on("keydown", function(event) {
                    if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                        // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
                        event.preventDefault();
                        layerObjFirst.focus();
                    }
                });

                layerObjClose.on("click", layerClose); // 닫기 버튼 클릭 시 레이어 닫기
                $('body').append('<div class="dim"></div>');
                layerPopup.animate({
                    bottom: 0
                });

                $(document).on("keydown.lp_keydown", function(event) {
                    // Esc키 : 레이어 닫기
                    const keyType = event.keyCode || event.which;

                    if (keyType === 27) {
                        layerClose();
                    }
                });
            })
        }
    },

    //Toast Layer
    toastLayer: function(el) {
        const toastId = $("#"+el);
        toastId.animate({
            bottom: 60 + "px"
        });
        setTimeout(function(){
            toastId.animate({
                bottom: -h
            });
        },3000);
    },
    // Select Color
    selectColor: function(){
        $('.selectBox select').change(function() {
            $(this).css({
                'color' : '#000',
                'font-weight': '400'
            });
        });
    },

    // Scroll Down시 Header line 추가
    headerLine: function(){
        $(window).scroll(function(){
            scrollDown()
        });
        scrollDown();
        function scrollDown() {
            const _window = $(window);
            const scrollTop = _window.scrollTop();
            if(scrollTop > 0) {
                $('.header,.layerHead').addClass('borBtm');
            } else {
                $('.header,.layerHead').removeClass('borBtm');
            }
        }
    },

    // 안내팝업
    popupGuide: function(){
        const popGuide =  $('.popupGuide');
        const popHeight = popGuide.outerHeight();
        $('body').append('<div class="dim"></div>');
        popGuide.css({
            height: popHeight,
            "margin-top":-popHeight/2
        })
    },
    popupGuideClose: function(){
        $('.dim').remove();
        $('.popupGuide').hide();
    }
}

$(function(){
    common.init();
});

(function ($) {
    $.fn.starRating = function (setup) {
        let settings = $.extend(true, {
            wrapperClasses: 'p-5 shadow',
            starIconEmpty: 'far fa-star',
            starIconFull: 'fas fa-star',
            starColorEmpty: 'lightgray',
            starColorFull: '#FFC107',
            starsSize: 4, // em
            stars: 5,
            showInfo: true,
            titles: ["별로예요","그저 그래요", "보통이에요", "만족해요","최고예요"],
            inputName: 'rating'
        }, setup || {});

        $(this).each(function (i, e) {
            return init($(e))
        });

        function getTextColor(value) {
            switch (true) {
                case value < (settings.stars / 3):
                    return 'red';
                case value < (settings.stars / 3 * 2):
                    return 'orange';
                default:
                    return 'green';
            }
        }

        function init(wrapper) {
            if (!wrapper.hasClass('js-wc-star-rating')) {
                let starWrapper = $('<div>', {
                    css: {'display': 'flex', 'flex-wrap': 'nowrap'},
                    class: 'ratingList'
                }).appendTo(wrapper);

                for (let i = 1; i <= settings.stars; i++) {
                    $('<input>', {
                        type: 'radio',
                        value: i,
                        name: settings.inputName,
                        css: {
                            display: 'none'
                        }
                    }).appendTo(starWrapper);

                    $('<button>', {
                        'data-index': i - 1,
                        title: settings.titles[i - 1] || i + " Sterne",
                        css: {
                            color: settings.starColorEmpty,
                            margin: '2px',
                            fontSize: settings.starsSize + 'em'
                        },
                        class: settings.starIconEmpty
                    }).appendTo(starWrapper);

                }

                settings.wrapperClasses.split(' ').forEach(className => {
                    wrapper.addClass(className);
                });
                if (settings.showInfo) {
                    $('<span>', {
                        class: 'js-wc-label',
                        css: {
                            marginTop: 0
                        },
                    }).appendTo(wrapper);
                }
                wrapper.css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'align-items': 'center'
                })
                wrapper.addClass('js-wc-star-rating');
                events(wrapper);
            }

            function events(wrapper) {
                wrapper.on('click', 'button', function (e) {
                        let index = $(e.currentTarget).data('index'),
                            value = index + 1,
                            label = settings.titles[index] || value + " Sterne";
                        // select radio
                        wrapper.find('input[type="radio"][value="' + value + '"]').prop('checked', true);
                        if (settings.showInfo) {
                            wrapper.find('.js-wc-label').text(label).removeClass().addClass('js-wc-label index' + value);
                        }
                        // set stars
                        let allStars = wrapper
                            .find('button')
                            .css('color', settings.starColorEmpty)
                            .removeClass(settings.starIconFull)
                            .addClass(settings.starIconEmpty);

                        allStars.each(function (i, e) {
                            if (i <= index) {
                                $(e)
                                    .removeClass(settings.starIconEmpty)
                                    .addClass(settings.starIconFull)
                                    .css('color', settings.starColorFull);
                            }
                        });

                        wrapper.trigger('change', [value, index]);
                    })
            }
            return this;
        }
    };
}(jQuery));
