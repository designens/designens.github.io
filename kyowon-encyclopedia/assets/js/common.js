/*! common.js v1.0.0 © inyoung524@naver.com */

(function(global, doc, $) {

    // Accordion 사용
    // [참고] http://codepen.io/dope/pen/yyxVga
    var $item  = $('.accordion-item'),
          open   = 'js-open';

    $item.click(function() {
        if ( $(this).hasClass(open) ) {
            $(this).children().next().slideUp();
            $(this).removeClass(open);
            $(this).siblings().removeClass(open);
        } else {
            $(this).children().next().slideDown();
            $(this).addClass(open);
            $(this).siblings().removeClass(open);
            $(this).siblings().children().next().slideUp();
        }
        return;
    });

    // Main Touch Slider
    // [참고] http://flickity.metafizzy.co/api.html
    $('.carousel').flickity({
      // options
      cellAlign: 'left',
      contain: true,
      // 스와이프 기능
      wrapAround: true,
      // 자동 슬라이드 기능 (기본시간 : 3000)
      autoPlay: false,
    });
    // 자동 스와이프
    $('.carousel-auto').flickity({
      // options
      cellAlign: 'left',
      contain: true,
      // 스와이프 기능
      wrapAround: true,
      // 자동 슬라이드 기능 (기본시간 : 3000)
      autoPlay: true,
    });

    // 드로그 앱 드롭
    // [참고] http://farhadi.ir/projects/html5sortable/
    $('.dreg-drop').sortable({
        forcePlaceholderSize: true,
    });

    // 가로 스크롤 배너
    var element     = $('#scrolling'),
          wrapper     = element.wrap('<div style="overflow: auto;">');

    getCurrentFolder = function(scroll, width) {
        return Math.ceil(width / scroll);
    };

    // 최근 검색어 버튼 제어
    var $btnSearch = $('.btn-new-search button'),
           btnOn = $('.btn-on'),
           btnOff = $('.btn-off');

    $btnSearch.click(function() {
        if ( btnOn.hasClass('active') ) {
            btnOn.removeClass('active');
            btnOff.addClass('active');
        } else {
            btnOff.removeClass('active');
            btnOn.addClass('active');
        }
    });


})(window, document, window.jQuery);