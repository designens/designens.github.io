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

    // 부드럽게 스크롤 이동 처리
    smoothScroll.init();

    // 팝업 플러그인 연결
    var $popups = $('.popup').a11y_popup();

    // 테스트 팝업
    $('.btn-popup-test').on('click', function(e) {
      e.preventDefault();
      // 팝업 찾아 열기 (id)
      $.popupId($popups, 'test-area').open();
    });

    // Q&ampA 팝업
    $('.btn-popup-qna').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-qna').open();
    });

    // 공지사항 상세 팝업
    $('.btn-popup-notices').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-notices').open();
    });

    // 자료실 상세 팝업
    $('.btn-popup-resources').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-resources').open();
    });
    
    // GNB 전체메뉴
    // 상단 메뉴 버튼 클릭 시 전체메뉴 오픈
    $('.btn-gnb-all').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });
    // 전체메뉴 닫기 버튼 클릭 시 닫기
    $('.btn-gnb-close').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });

    // 아코디언 설정
    var aco_bases = $(".aco-base");
    var aco_opens = $(".aco-open");
    // 기본 설정 (패널 닫힘)
    $.each(aco_bases,function(index) {
        var aco_base = aco_bases.eq(index);
        new $.Accordion(aco_base);
    });
    // 첫번째 패널 오픈
    $.each(aco_opens,function(index) {
        var aco_open = aco_opens.eq(index);
        new $.Accordion(aco_open, 1);
    });

    // SelectBox Option 선택 설정
    var selectbox = $("select");
    selectbox.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

})(window, document, window.jQuery);