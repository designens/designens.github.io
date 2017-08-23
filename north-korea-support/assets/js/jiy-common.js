// =========================================================
// SVG 포맷 처리 실행 (https://github.com/iconic/SVGInjector)
// =========================================================
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

// =======================================
// 팝업 플러그인 실행
// =======================================
(function(global, $) {

    // 팝업 플러그인 연결
    var $popups = $('.popup').a11y_popup();

    // 테스트 팝업
    $('.btn-popup-test').on('click', function(e) {
      e.preventDefault();
      // 팝업 찾아 열기 (id)
      $.popupId($popups, 'test-area').open();
    });

    // Q&ampA 상세 조회 팝업
    $('.btn-popup-qna-list').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-qna-list').open();
    });
    // Q&ampA 상세 입력 팝업
    $('.btn-popup-qna-write').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-qna-write').open();
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

    // 공고내용 상세보기 팝업
    $('.btn-popup-business-application').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-business-application').open();
    });
    
    // 구비서류 올리기 팝업
    $('.btn-popup-applicant-application').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-applicant-application').open();
    });

    // 회원명부 인물정보 팝업
    $('.btn-popup-information-inquiry').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-information-inquiry').open();
    });

    // 정책제안 상세 조회 팝업
    $('.btn-popup-policy-proposal-list').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-policy-proposal-list').open();
    });
    // 정책제안 상세 입력 팝업
    $('.btn-popup-policy-proposal-write').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-policy-proposal-write').open();
    });

    // 게시판 상세 조회 팝업
    $('.btn-popup-notice-board-list').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-notice-board-list').open();
    });
    // 게시판 상세 입력 팝업
    $('.btn-popup-notice-board-write').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-notice-board-write').open();
    });

    // 변경사항 요청 글쓰기 팝업
    $('.btn-popup-request-change').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-request-change').open();
    });

    // 결과조회 공고명 조회 팝업
    $('.btn-popup-view-results-announcement').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-view-results-announcement').open();
    });

    // 결과조회 사업명 조회 팝업
    $('.btn-popup-view-results-business').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-view-results-business').open();
    });

    // 자금 사용 보고서 등록 공고명 조회 팝업
    $('.btn-popup-register-your-funds-usage-report-announcement').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-register-your-funds-usage-report-announcement').open();
    });

    // 자금 사용 보고서 등록 사업명 조회 팝업
    $('.btn-popup-register-your-funds-usage-report-business').on('click', function(e) {
      e.preventDefault();
      $.popupId($popups, 'popup-register-your-funds-usage-report-business').open();
    });

})(window, window.jQuery);

// =======================================
// GNB 플러그인 실행
// =======================================
(function(global, $) {

    // GNB 전체메뉴
    // 상단 메뉴 버튼 클릭 시 전체메뉴 오픈
    $('.btn-gnb-all').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });
    // 전체메뉴 닫기 버튼 클릭 시 닫기
    $('.btn-gnb-close').click(function() {
       $('#gnb-all-menu').toggleClass('open');
    });

})(window, window.jQuery);

// =======================================
// GNB 플러그인 실행
// =======================================
(function(global,$) {
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

})(window, window.jQuery);

// =======================================
// SelectBox 플러그인 실행
// =======================================
(function(global, $) {

    // SelectBox Option 선택 설정
    var selectbox = $("select");
    selectbox.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });

})(window, window.jQuery);

// =======================================
// 다운로드 파일 말풍선 플러그인 실행
// =======================================
(function(global, $) {

    // downloadWidget 객체 생성
    // (필수) 첫번째 인자: 객체 지향 자바스크립트 클래스를 연결할 대상 선택자
    // (옵션) 두번째 인자: 활성화 CSS 클래스 이름 (기본 값: 'show-widget')
    // (옵션) 세번째 인자: 다운로드 파일 클래스 이름 (기본 값: 'download-file')
    new global.downloadWidget('.table-download');

})(window, window.jQuery);

// =======================================
// 
// =======================================
(function(global, $){
  'use strict';

    // -----------------------------------------------------------------------------
    // - 인디케이터 또는 이전, 다음 버튼(<,>) 클릭하면 슬라이드 자동 재생이 정지 
    // - 재생(▶) 버튼이 정지(■) 버튼으로 변경
    // - 이전, 다음 버튼(<,>), 재생, 정지(▶, ■) 인디케이터 화면 표시 설정 (true, false)
    // -----------------------------------------------------------------------------

    // -----------------------------------------------------------------------------
    // 메인 상단 케로셀 배너
    // -----------------------------------------------------------------------------
    $('.main-carousel-slider').carousel({
        
        // >>>>>> active = 활성화 번호 1 일 경우, 첫번째 슬라이드 활성화
        // active: 3,

        // >>>>>> indicator = 인디케이터 표시 여부 (기본 값 false)
        indicator: true,

        // >>>>>> nav_btn = 내비게이션 버튼 표시 여부 (기본 값 true)
        // nav_btn: false,

        // >>>>>> toggle_btn = 토글 애니메이션 버튼 표시 여부 (기본 값 true)
        // toggle_btn: false,

        // >>>>>> animate = 애니메이션 재생 설정 (기본 값 false)
        animate: true,
        
        // >>>>>> duration = 애니메이션 재생 시간 설정 (기본 값 3000)
        // duration: 3000,
        
        // >>>>>> easing = 애니메이션 이징 설정 (기본 값 'swing')
        // easing: 'linear',

    });

    // -----------------------------------------------------------------------------
    // 메인 공지사항 케로셀 배너
    // -----------------------------------------------------------------------------
    $('.notices-list').carousel({
        animate: true,
        nav_btn: false,
        // toggle_btn: false,
        indicator: true
    });

    // -----------------------------------------------------------------------------
    // 관련 사이트 케로셀 배너
    // -----------------------------------------------------------------------------
    $('.link-banner-area').carousel();


    // ========================================================================
    // 플러그인 객체 `재생/정지` 외부 버튼 사용법
    // ========================================================================
    // 캐러셀 컴포넌트 외부에서 원격 조정으로 제어하고자 할 경우,
    // 다음과 같이 코드를 사용해야 한다.

    // 플러그인 연결 후, 변수에 플러그인 객체 참조
    // var main_slider = $('.main-carousel-slider').carousel().data('carousel');
    // 외부 버튼 클릭 이벤트를 통해 캐러셀 컴포넌트 제어
    // $('#pl').on('click', function(){
    //   main_slider.play();
    // });
    // $('#st').on('click', function(){
    //   main_slider.stop();
    // });
    // ========================================================================


})(window, window.jQuery);