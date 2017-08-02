/* =============================================================

	Smooth Scroll v4.5
	Animate scrolling to anchor links, by Chris Ferdinandi.
	http://gomakethings.com

	Additional contributors:
	https://github.com/cferdinandi/smooth-scroll#contributors

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.smoothScroll = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private {object} variable
	var _defaults = {
		speed: 500,
		easing: 'easeInOutCubic',
		offset: 0,
		updateURL: false,
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

	// Calculate the easing pattern
	// Private method
	// Returns a decimal number
	var _easingPattern = function ( type, time ) {
		if ( type == 'easeInQuad' ) return time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuad' ) return time * (2 - time); // decelerating to zero velocity
		if ( type == 'easeInOutQuad' ) return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInCubic' ) return time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutCubic' ) return (--time) * time * time + 1; // decelerating to zero velocity
		if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuart' ) return time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuart' ) return 1 - (--time) * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuart' ) return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		if ( type == 'easeInQuint' ) return time * time * time * time * time; // accelerating from zero velocity
		if ( type == 'easeOutQuint' ) return 1 + (--time) * time * time * time * time; // decelerating to zero velocity
		if ( type == 'easeInOutQuint' ) return time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration
		return time; // no easing, no acceleration
	};

	// Calculate how far to scroll
	// Private method
	// Returns an integer
	var _getEndLocation = function ( anchor, headerHeight, offset ) {
		var location = 0;
		if (anchor.offsetParent) {
			do {
				location += anchor.offsetTop;
				anchor = anchor.offsetParent;
			} while (anchor);
		}
		location = location - headerHeight - offset;
		if ( location >= 0 ) {
			return location;
		} else {
			return 0;
		}
	};

	// Determine the document's height
	// Private method
	// Returns an integer
	var _getDocumentHeight = function () {
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
	};

	// Convert data-options attribute into an object of key/value pairs
	// Private method
	// Returns an {object}
	var _getDataOptions = function ( options ) {

		if ( options === null || options === undefined  ) {
			return {};
		} else {
			var settings = {}; // Create settings object
			options = options.split(';'); // Split into array of options

			// Create a key/value pair for each setting
			options.forEach( function(option) {
				option = option.trim();
				if ( option !== '' ) {
					option = option.split(':');
					settings[option[0]] = option[1].trim();
				}
			});

			return settings;
		}

	};

	// Update the URL
	// Private method
	// Runs functions
	var _updateURL = function ( anchor, url ) {
		if ( (url === true || url === 'true') && history.pushState ) {
			history.pushState( {pos:anchor.id}, '', anchor );
		}
	};

	// Start/stop the scrolling animation
	// Public method
	// Runs functions
	var animateScroll = function ( toggle, anchor, options, event ) {

		// Options and overrides
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
		var speed = parseInt(overrides.speed || options.speed, 10);
		var easing = overrides.easing || options.easing;
		var offset = parseInt(overrides.offset || options.offset, 10);
		var updateURL = overrides.updateURL || options.updateURL;

		// Selectors and variables
		var fixedHeader = document.querySelector('[data-scroll-header]'); // Get the fixed header
		var headerHeight = fixedHeader === null ? 0 : (fixedHeader.offsetHeight + fixedHeader.offsetTop); // Get the height of a fixed header if one exists
		var startLocation = window.pageYOffset; // Current location on the page
		var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight, offset ); // Scroll to location
		var animationInterval; // interval timer
		var distance = endLocation - startLocation; // distance to travel
		var documentHeight = _getDocumentHeight();
		var timeLapsed = 0;
		var percentage, position;

		// Prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		// Update URL
		_updateURL(anchor, updateURL);

		// Stop the scroll animation when it reaches its target (or the bottom/top of page)
		// Private method
		// Runs functions
		var _stopAnimateScroll = function (position, endLocation, animationInterval) {
			var currentLocation = window.pageYOffset;
			if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= documentHeight ) ) {
				clearInterval(animationInterval);
				options.callbackAfter( toggle, anchor ); // Run callbacks after animation complete
			}
		};

		// Loop scrolling animation
		// Private method
		// Runs functions
		var _loopAnimateScroll = function () {
			timeLapsed += 16;
			percentage = ( timeLapsed / speed );
			percentage = ( percentage > 1 ) ? 1 : percentage;
			position = startLocation + ( distance * _easingPattern(easing, percentage) );
			window.scrollTo( 0, Math.floor(position) );
			_stopAnimateScroll(position, endLocation, animationInterval);
		};

		// Set interval timer
		// Private method
		// Runs functions
		var _startAnimateScroll = function () {
			options.callbackBefore( toggle, anchor ); // Run callbacks before animating scroll
			animationInterval = setInterval(_loopAnimateScroll, 16);
		};

		// Reset position to fix weird iOS bug
		// https://github.com/cferdinandi/smooth-scroll/issues/45
		if ( window.pageYOffset === 0 ) {
			window.scrollTo( 0, 0 );
		}

		// Start scrolling animation
		_startAnimateScroll();

	};

	// Initialize Smooth Scroll
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var toggles = document.querySelectorAll('[data-scroll]'); // Get smooth scroll toggles

			// When a toggle is clicked, run the click handler
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', animateScroll.bind( null, toggle, toggle.getAttribute('href'), options ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		animateScroll: animateScroll
	};

})(window, document);
/**
 * SVGInjector v1.1.2 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014 Waybury <hello@waybury.com>
 * @license MIT
 */
!function(t,e){"use strict";function r(t){t=t.split(" ");for(var e={},r=t.length,n=[];r--;)e.hasOwnProperty(t[r])||(e[t[r]]=1,n.unshift(t[r]));return n.join(" ")}var n="file:"===t.location.protocol,i=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),o=Array.prototype.forEach||function(t,e){if(void 0===this||null===this||"function"!=typeof t)throw new TypeError;var r,n=this.length>>>0;for(r=0;n>r;++r)r in this&&t.call(e,this[r],r,this)},a={},s=0,l=[],u=[],c={},f=function(t){return t.cloneNode(!0)},p=function(t,e){u[t]=u[t]||[],u[t].push(e)},d=function(t){for(var e=0,r=u[t].length;r>e;e++)!function(e){setTimeout(function(){u[t][e](f(a[t]))},0)}(e)},h=function(e,r){if(void 0!==a[e])a[e]instanceof SVGSVGElement?r(f(a[e])):p(e,r);else{if(!t.XMLHttpRequest)return r("Browser does not support XMLHttpRequest"),!1;a[e]={},p(e,r);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===i.readyState){if(404===i.status||null===i.responseXML)return r("Unable to load SVG file: "+e),n&&r("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),r(),!1;if(!(200===i.status||n&&0===i.status))return r("There was a problem injecting the SVG: "+i.status+" "+i.statusText),!1;if(i.responseXML instanceof Document)a[e]=i.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var t;try{var o=new DOMParser;t=o.parseFromString(i.responseText,"text/xml")}catch(s){t=void 0}if(!t||t.getElementsByTagName("parsererror").length)return r("Unable to parse SVG file: "+e),!1;a[e]=t.documentElement}d(e)}},i.open("GET",e),i.overrideMimeType&&i.overrideMimeType("text/xml"),i.send()}},v=function(e,n,a,u){var f=e.getAttribute("data-src")||e.getAttribute("src");if(!/\.svg/i.test(f))return void u("Attempted to inject a file with a non-svg extension: "+f);if(!i){var p=e.getAttribute("data-fallback")||e.getAttribute("data-png");return void(p?(e.setAttribute("src",p),u(null)):a?(e.setAttribute("src",a+"/"+f.split("/").pop().replace(".svg",".png")),u(null)):u("This browser does not support SVG and no PNG fallback was defined."))}-1===l.indexOf(e)&&(l.push(e),e.setAttribute("src",""),h(f,function(i){if("undefined"==typeof i||"string"==typeof i)return u(i),!1;var a=e.getAttribute("id");a&&i.setAttribute("id",a);var p=e.getAttribute("title");p&&i.setAttribute("title",p);var d=[].concat(i.getAttribute("class")||[],"injected-svg",e.getAttribute("class")||[]).join(" ");i.setAttribute("class",r(d));var h=e.getAttribute("style");h&&i.setAttribute("style",h);var v=[].filter.call(e.attributes,function(t){return/^data-\w[\w\-]*$/.test(t.name)});o.call(v,function(t){t.name&&t.value&&i.setAttribute(t.name,t.value)});for(var g,b=i.querySelectorAll("defs clipPath[id]"),m=0,y=b.length;y>m;m++){g=b[m].id+"-"+s;for(var A=i.querySelectorAll('[clip-path*="'+b[m].id+'"]'),w=0,S=A.length;S>w;w++)A[w].setAttribute("clip-path","url(#"+g+")");b[m].id=g}for(var x,j=i.querySelectorAll("defs mask[id]"),T=0,G=j.length;G>T;T++){x=j[T].id+"-"+s;for(var M=i.querySelectorAll('[mask*="'+j[T].id+'"]'),V=0,q=M.length;q>V;V++)M[V].setAttribute("mask","url(#"+x+")");j[T].id=x}i.removeAttribute("xmlns:a");for(var k,E,O=i.querySelectorAll("script"),L=[],P=0,X=O.length;X>P;P++)E=O[P].getAttribute("type"),E&&"application/ecmascript"!==E&&"application/javascript"!==E||(k=O[P].innerText||O[P].textContent,L.push(k),i.removeChild(O[P]));if(L.length>0&&("always"===n||"once"===n&&!c[f])){for(var F=0,N=L.length;N>F;F++)new Function(L[F])(t);c[f]=!0}e.parentNode.replaceChild(i,e),delete l[l.indexOf(e)],e=null,s++,u(i)}))},g=function(t,e,r){e=e||{};var n=e.evalScripts||"always",i=e.pngFallback||!1,a=e.each;if(void 0!==t.length){var s=0;o.call(t,function(e){v(e,n,i,function(e){a&&"function"==typeof a&&a(e),r&&t.length===++s&&r(s)})})}else t?v(t,n,i,function(e){a&&"function"==typeof a&&a(e),r&&r(1),t=null}):r&&r(0)};"object"==typeof module&&"object"==typeof module.exports?module.exports=exports=g:"function"==typeof define&&define.amd?define(function(){return g}):"object"==typeof t&&(t.SVGInjector=g)}(window,document);
//# sourceMappingURL=svg-injector.map.js
(function(global, $){
  'use strict';

  $.popupId = function($popups, id) {
    return $popups.filter(function(index, el) {
      return $popups.eq(index).attr('data-id') === id;
    })[0].$popup;
  };

  var init = function(o){
    o.$el.addClass('is-center').attr('role', 'dialog');
    o.$el.find('.popup-close').last().addClass('loop-focus');
    o.$el.wrapAll('<div class="popup-container">');
    o.$el.parent().hide();
    o.$el.after('<div class="popup-dim"></div');
    bind(o);
    return o;
  };
  var bind = function(o){
    var $close_els = o.$el.parent().find('.popup-dim').add(o.$el.find('.popup-close'));
    $close_els.on('click', $.proxy(o.close, o));
    o.$el.find('.loop-focus')
      .on({
        'focus': $.proxy(createLoop, o),
        'blur': $.proxy(focusMoveWrapper, o),
      });
  };
  var createLoop = function(){
    $('<a class="_temp" href>').insertAfter(this.$el.find('.loop-focus'));
  };
  var focusMoveWrapper = function(){
    this.$el.focus();
    this.$el.find('._temp').remove();
  };

  $.fn.a11y_popup = function(){

    var $this = this;

    function A11yPopup($el, time) {
      this.$el = $el;
      this.$pre_focus_el = null;
      this.time = time || 300;
      return init(this);
    }

    A11yPopup.prototype = {
      constructor: A11yPopup,
      open: function(){
        this.$pre_focus_el = global.document.activeElement;
        this.$el.attr('tabindex', -1).parent().animate({opacity: 'show'},this.time).addBack().focus();
      },
      close: function(){
        this.$el.removeAttr('tabindex').parent().animate({opacity: 'hide'},this.time);
        this.$pre_focus_el.focus();
      }
    };

    return $.each($this, function(index, el){
      var $el = $this.eq(index);
      el.$popup = new A11yPopup($el);
      return $el;
    });

  };

})(window, window.jQuery);
;(function($) {

    $.Accordion = function(el, active) {
        this.el = el || {};
        active = active || 0;
        var that = this;
        var links = this.el.find('[class*="link"]');
        links.each(function(i){
            var link = links.eq(i);
            if (link.next().length === 0) { link.find('.fa').hide(); }
            link.on('click', { link: link }, that.dropdown);
        });
        if (active > 0) {
           links.eq(active - 1).trigger('click');     
        }
    }
    // 아코디언 설정
    $.Accordion.prototype.dropdown = function(e) {
        e.preventDefault();
        var $this = e.data.link;
        $this.parent()
            .siblings('.open').find('[class*="sub"]').slideUp()
        .addBack().removeClass('open');
        $this.parent()
            .toggleClass('open')
            .find('[class*="sub"]').stop().slideToggle();
    };
    
}(window.jQuery));
;(function($) {

    var tabs = $(".tablist [role='tab']"),
        panels = $(".panel-group [role='tabpanel']");

    // 접근성 선택/해제
    tabs.attr("aria-selected", "false");
    tabs.first().attr("aria-selected", "true");

    // 접근성 보기/감추기
    panels.attr("aria-hidden", "true")
    panels.first().attr("aria-hidden", "false");

    // 마우스 접근
    tabs.click(function(ev) {
        ev.preventDefault();
        tabs.attr("aria-selected", "false");
        $(this).attr("aria-selected", "true");
        var tabpanid = $(this).attr("aria-controls");
        var tabpan = $("#" + tabpanid);
        $(panels).attr("aria-hidden", "true");
        tabpan.attr("aria-hidden", "false");
    });

    // 키보드 접근
    tabs.keydown(function(ev) {
        // Enter 키
        if (ev.which == 13) {
            $(this).click();
        }
    });

    tabs.keydown(function(ev) {
        // ev.preventDefault();
        var _this, selected, index, length, tab, tabpanid, tabpan;
        var key = ev.keyCode;
        var dir = 0;
        var left = key === 37;
        var right = key === 39;
        if (left) { dir = -1; }
        if (right){ dir = 1;  }
        if (left || right) {
            _this = $(this);
            selected = _this.attr("aria-selected");
            if (selected === "true") {
                tabs.filter("[aria-selected='true']").attr("aria-selected","false");
                index = _this.index() + dir;
                length = tabs.length;
                if ( index < 0 ) { index = length - 1; }
                if ( index >= length ) { index = 0; }
                tab = tabs.eq(index).attr("aria-selected", "true").focus();
                tabpanid = tab.attr("aria-controls");
                tabpan = $("#" + tabpanid);
                panels.attr("aria-hidden", "true");
                tabpan.attr("aria-hidden", "false");
            }
        }
    });
    
}(window.jQuery));
;(function(global, document, $){
    'use strict';

    var doc = $(document);

    function downloadWidget(selector, active, download){
        if ( this === undefined ) {
            return new downloadWidget(selector, active);
        }
        this.download_areas = $(selector);
        this.active = active || 'show-widget';
        this.download = download || 'download-file';
        this.activated = null;
        this.init();
    }

    downloadWidget.prototype = {
        constructor: downloadWidget,
        init: function(){
            var _this = this;
            $.each(_this.download_areas, function(index){
                var area = _this.download_areas.eq(index);
                area.attr({
                    'tabindex': 0,
                    'aria-label': '첨부파일 다운로드 팝업 보기'
                });
                area.children('.'+_this.download).attr('aria-hidden', true);
                area.on('focus click', _this.showDownloadWidget.bind(_this, area));
            });
            doc.on('click', function(e){
                var target = e.target;
                _this.activated = _this.download_areas.filter('.'+_this.active);
                if ( _this.activated.length > 0 ) {
                    if (_this.activated.is(target)) { return; }
                    _this.hideDownloadWidget.call(_this, _this.activated);
                }
            });
        },
        showDownloadWidget: function(area){
            area.addClass(this.active);
            var file = area.children('.'+this.download);
            if ( file.length > 0 ) {
                file.attr('aria-hidden', false);
                file.children('a:last').on('focusout', this.hideDownloadWidget.bind(this, area));
            }
        },
        hideDownloadWidget: function(area){
            area.removeClass(this.active);
            area.children('.'+this.download).attr('aria-hidden', true);
        }
    };

    global.downloadWidget = downloadWidget;

})(window, document, window.jQuery);