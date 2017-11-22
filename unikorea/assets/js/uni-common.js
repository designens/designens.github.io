// =================================================================
// SVG 포맷 처리 실행 (https://github.com/iconic/SVGInjector)
// =================================================================
(function(global, doc, $) {

    if ( global.location.protocol !== 'file:' ) {
        // SVGInjector : Style 설정
        var svgInjection = function() {
            // img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
            var mySVGsToInject = doc.querySelectorAll('img.inject-svg');
            // SVG 주입(Injector) 설정 옵션
            var injectorOptions = {
                evalScripts: 'once', // always, once, never
                pngFallback: 'images/ie-assets', // PNG 대체 폴더 설정
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
    }

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
        $.popupId($popups, 'popup-test').open();
    });

    // 서평쓰기 팝업
    $('.btn-popup-write-review').on('click', function(e) {
        e.preventDefault();
        // 팝업 찾아 열기 (id)
        $.popupId($popups, 'popup-write-review').open();
    });

})(window, window.jQuery);

// =================================================================
// GNB 플러그인 실행
// =================================================================
(function(global, $) {
    
    // 상단 메뉴 버튼 클릭 시 전체메뉴 오픈
    $("#gnb-menu li button , .btn-gnb-menu , .btn-site-map").click(function(e) {
        e.preventDefault();
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
        var aco_open = aco_opens.eq(index);
        if($(this).attr("class") == "aco-open accordion-lnb"){
            open_index = $(".aco-open.accordion-lnb > li").index($(".aco-open.accordion-lnb > li.on")) + 1;
        }
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
    $('.serial-carousel-wrap .serial-carousel .owl-carousel').owlCarousel({
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
    // 서브 국내 연속간행물 케로셀 배너
    // -------------------------------------------------------------
    $('.domestic-serials-list .serial-carousel .owl-carousel').owlCarousel({
        loop: true,
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
            640: {
                items: 3,
                slideBy: 3
            },
            800: {
                items: 4,
                slideBy: 4
            },
            960: {
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

    // -------------------------------------------------------------
    // 영화 썸네일 배너
    // -------------------------------------------------------------
    $('.movie-thumbnail .owl-carousel').owlCarousel({
        margin: 7,
        nav: true,
        dots: false,
        responsiveClass: true,
        navText: ['', ''],
        autoWidth:true,
        slideBy: 1
    })

})(window, window.jQuery);

// =================================================================
// 소장정보 보기/닫기 실행
// =================================================================
// (function(global, $) {

//     var $btn_item_table = $(".btn-item-table"),
//         $btn_item_table_icon = $(".btn-item-table-icon"),
//         item_table_area = ".item-table-area",
//         open_text = "소장정보 열기",
//         close_text = "소장정보 닫기";
    
//     $(item_table_area).css("display", "none");

//     $btn_item_table.click(function() {
//         var $this = $(this);
//         if ( $this.html(close_text).parent().siblings(item_table_area).css("display") == "none" ){
//             $this.html(close_text).parent().siblings(item_table_area).slideDown("slow");
//         } else {
//             $this.html(open_text).parent().siblings(item_table_area).slideUp("slow");
//         }
//     });

//     $btn_item_table_icon.click(function() {
//         var $this = $(this);
//         if ( $this.parents().next(item_table_area).css("display") == "none" ) {
//            $this.parents().next(item_table_area).slideDown("slow");
//         } else {
//            $this.parents().next(item_table_area).slideUp("slow");
//         }
//     });

// })(window, window.jQuery);

// =================================================================
// 소장자료 검색 : 검색결과 내 상세검색 더보기
// =================================================================
// 더보기 버튼 아이콘 활설화
(function(global, $) {
    var $btn_more_size = $(".btn-more-size, .tab-menu-select");
    $btn_more_size.click(function(e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass("open");
    });
})(window, window.jQuery);

(function(global, $) {
    var $btn_result_search = $(".btn-result-search"),
        result_table_area = ".sub-search-view-area";

    $btn_result_search.click(function(e) {
        e.preventDefault();
        var $this = $(this);
        if($this.siblings(result_table_area).css("display") == "none" ){
            $this.addClass("open").siblings(result_table_area).slideDown("slow");
        }else{
            $this.removeClass("open").siblings(result_table_area).slideUp("slow");
        }
    });
})(window, window.jQuery);

(function(global, $) {

    var $btn_result_link = $(".result-accordion li .result-link"),
        sub_result_area = ".sub-result";
    
    $btn_result_link.addClass("open");
    $btn_result_link.click(function(e) {
        e.preventDefault();
        var $this = $(this);
        if($this.next(sub_result_area).css("display") == "none" )
            $this.addClass("open").next(sub_result_area).slideDown();
        else $this.removeClass("open").next(sub_result_area).slideUp();
    });

})(window, window.jQuery);

// =================================================================
// 소장정보 상세보기/MARC보기 실행
// =================================================================
// (function(global, $) {

//     var $btn_marc_view = $(".btn-marc-view"),
//         list_view_area = ".list-view-area",
//         marc_view_area = ".marc-view-area",
//         open_text = "상세보기",
//         close_text = "MARC 보기";
    
//     $btn_marc_view.click(function() {
//         var $this = $(this);
//         if($this.parent().siblings(list_view_area).css("display") == "none" )
//             $this.html(close_text).parent().siblings(list_view_area).show(),
//              $this.parent().siblings(marc_view_area).hide();
//         else $this.html(open_text).parent().siblings(marc_view_area).show(),
//             $this.parent().siblings(list_view_area).hide();
//     });

// })(window, window.jQuery);

// =================================================================
// 페이지 정보 평가 삽입 시 간격 설정
// =================================================================
(function(global, $) {
    var pageReview = $(".page-review-star");
    pageReview.parent().css('margin-bottom','0');
})(window, window.jQuery);