/*! common.js v1.0.0 © inyoung524@naver.com */

(function(global, doc, $) {

    // 웹폰트 로더 동기방식
    WebFont.load({
        // For google fonts
        google: {
          families: ['Droid Sans', 'Droid Serif']
        },
        // For early access or custom font
        custom: {
            families: ['Nanum Gothic'],
            urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css']
        },
    });

    // 웹폰트 로더 비동기 로딩 방식
    WebFontConfig = {
        custom: {
            families: ['Nanum Gothic'],
            urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css']
        }
    };

    // SVGInjector : Style 설정
    // [참고] https://github.com/iconic/SVGInjector
    var svgInjection = function() {
        // img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
        var mySVGsToInject = doc.querySelectorAll('img.svg');
        // SVG 주입(Injector) 설정 옵션
        var injectorOptions = {
            evalScripts: 'once', // always, once, never
            pngFallback: 'images/svg/png', // PNG 대체 폴더 설정
            each: function(svg) {
                // svg는 수집된 개별 img.svg를 가리킴
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
            });
    };
    svgInjection();

    // Accordion 사용
    // [참고] http://codepen.io/dope/pen/yyxVga
    var $title = $('.js-title'),
          copy   = '.js-copy';

    $title.click(function () {
      $(this).next(copy).slideDown();
      $(this).parent().addClass('js-open').siblings().children().next().slideUp().parent().removeClass('js-open');
      return false;
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

})(window, document, window.jQuery);