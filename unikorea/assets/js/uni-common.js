// =================================================================
// SVG 포맷 처리 실행 (https://github.com/iconic/SVGInjector)
// =================================================================
(function(global, doc, $) {

    // SVGInjector : Style 설정
    var svgInjection = function() {
        // img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
        var mySVGsToInject = doc.querySelectorAll('img.inject-svg');
        // SVG 주입(Injector) 설정 옵션
        var injectorOptions = {
            evalScripts: 'once', // always, once, never
            pngFallback: 'images/ie-assets', // PNG 대체 폴더 설정
            each: function(svg) {
                // svg는 수집된 개별 img.inject-me를 가리킴
                console.log(svg.id);
            }
        };
        // SVGInjector 함수에 연결
        SVGInjector(
            // 수집된 img.inject-me 요소
            mySVGsToInject,
            // SVG 주입(Injector) 설정 옵션
            injectorOptions,
            // 콜백 함수
            function(totalSVGsInjected) {
                // totalSVGsInjected는 SVG 주입된 설정 개수를 출력
                // console.log(totalSVGsInjected);
            }
        );
    };

    // IMG => SVG로 변환, ie9 이하 버전 PNG로 대체
    svgInjection();

})(window, document, window.jQuery);

// =================================================================
// 스크롤 플러그인 실행 (https://github.com/cferdinandi/smooth-scroll)
// =================================================================
(function(global, $) {

    // 부드럽게 스크롤 이동 처리
    smoothScroll.init();

})(window, window.jQuery);

// =================================================================
// 팝업 플러그인 실행
// =================================================================
(function(global, $) {

    // 팝업 플러그인 연결
    var $popups = $('.popup').a11y_popup();

    // 테스트 팝업
    $('.btn-popup-test').on('click', function(e) {
        e.preventDefault();
        // 팝업 찾아 열기 (id)
        $.popupId($popups, 'test-area').open();
    });

})(window, window.jQuery);

// =================================================================
// GNB 플러그인 실행
// =================================================================
(function(global, $) {
    
    // 상단 메뉴 버튼 클릭 시 전체메뉴 오픈
    $("#gnb-menu li button , .btn-gnb-menu").click(function() {
       if($("#gnb-all-menu").css("display") == "none" ) $("#gnb-all-menu").slideDown("slow");
       else $("#gnb-all-menu").slideUp("slow");
    });

    // 사이트맵 닫기 버튼 클릭 시 전체메뉴 감추기
    $(".btn-gnb-close").click(function(){
        $("#gnb-all-menu").slideUp("slow");
    });

})(window, window.jQuery);

// =================================================================
// LNB 플러그인 실행
// =================================================================
(function(global,$) {
    // 아코디언 설정
    var aco_bases = $(".aco-base");
    var aco_opens = $(".aco-open");
    // 기본 설정 (패널 닫힘)
    $.each(aco_bases,function(index) {
        var aco_base = aco_bases.eq(index);
        new $.Accordion(aco_base);
    });
    // 패널 오픈
    $.each(aco_opens,function(index) {
       //현재 나의 위치 찾기, 모바일 메뉴는 open 되지 않고 호출
       var open_index = 0;
       if($(this).attr("class") == "aco-open accordion-lnb") 
          open_index = $(".aco-open.accordion-lnb > li").index($(".aco-open.accordion-lnb > li.on")) + 1;
        
       var aco_open = aco_opens.eq(index);
        new $.Accordion(aco_open, open_index);
    });

})(window, window.jQuery);

// =================================================================
// SelectBox 플러그인 실행
// =================================================================
(function(global, $) {

    // SelectBox Option 선택 설정
    var selectbox = $("select");
    selectbox.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

})(window, window.jQuery);

// =======================================================================================
// Carosel Slider 플러그인 실행 (https://owlcarousel2.github.io/OwlCarousel2/index.html)
// =======================================================================================
(function(global, $){
  'use strict';
    // -------------------------------------------------------------
    // 메인 연속간행물 케로셀 배너
    // -------------------------------------------------------------
    $('.serial-carousel-wrap .owl-carousel').owlCarousel({
        loop: true,
        margin: 55,
        nav: true,
        responsiveClass: true,
        navText: ['', ''],
        responsive: {
            0: {
                dots: false,
                items: 1,
                slideBy: 1
            },
            480: {
                dots: false,
                items: 2,
                slideBy: 2
            },
            720: {
                items: 3,
                slideBy: 3
            },
            900: {
                items: 4,
                slideBy: 4
            },
            1100: {
                items: 5,
                slideBy: 5
            }
        }
    })

    // -------------------------------------------------------------
    // 메인 팝업존 케로셀 배너
    // -------------------------------------------------------------
    $('.popup-zone-carousel').carousel({
        animate: true,
        indicator: false
    });

    // -------------------------------------------------------------
    // 관련 사이트 케로셀 배너
    // -------------------------------------------------------------
    $('.link-banner-area .owl-carousel').owlCarousel({
        loop: true,
        margin: 14,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
                slideBy: 1
            },
            480: {
                items: 2,
                slideBy: 2
            },
            720: {
                items: 3,
                slideBy: 3
            },
            900: {
                items: 4,
                slideBy: 4
            },
            1100: {
                items: 5,
                slideBy: 5
            }
        }
    })

})(window, window.jQuery);


// =================================================================
// 소장정보 보기/닫기 실행
// =================================================================
(function(global, $) {

    var btn_item_table = $(".btn-item-table"),
        item_table_area = $(".item-table-area");
    
    btn_item_table.click(function() {
       // if($(".item-table-area").css("display") == "none" ) $(".item-table-area").slideDown("slow");
       // else $(".item-table-area").slideUp("slow");
       if($(this).parents(0).css("display") == "none" ) $(this).parents(0).slideDown("slow");
       else $(this).parents(0).slideUp("slow");
    });

})(window, window.jQuery);