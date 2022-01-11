define("TYPO3/CMS/BwPlaceholderImages/TriangularElement", ["jquery"], (__WEBPACK_EXTERNAL_MODULE_jquery__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Resources/Private/TypeScript/TriangularElement.ts":
/*!***********************************************************!*\
  !*** ./Resources/Private/TypeScript/TriangularElement.ts ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, $) {
    "use strict";
    class TriangularElement {
        constructor() {
            $('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
            $('#triangular-delete').on('click', this.onDeleteClick.bind(this));
            $('#triangular-abort').on('click', this.onAbortClick.bind(this));
        }
        onRefreshClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
                sysFileUid: fileUid
            }).done((data) => {
                const wrapper = $('.form-triangular-placeholder');
                if (data.svg) {
                    $('svg:first-child', wrapper).remove();
                    wrapper.append(data.svg).removeClass('is-loading').addClass('is-downloaded');
                    return;
                }
                wrapper.addClass('is-loading');
            });
        }
        onDeleteClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            console.log('onDeleteClick');
        }
        onAbortClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $.post(TYPO3.settings.ajaxUrls['triangular_abort'], {
                sysFileUid: fileUid
            }).done((data) => {
                $('.form-triangular-placeholder').removeClass('is-loading');
            });
        }
    }
    return new TriangularElement();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./Resources/Private/TypeScript/TriangularElement.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VzL1B1YmxpYy9KYXZhU2NyaXB0L1RyaWFuZ3VsYXJFbGVtZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlHQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsMkNBQVEsQ0FBQyxtQ0FBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7OztBQ3ZDRjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS8uL1Jlc291cmNlcy9Qcml2YXRlL1R5cGVTY3JpcHQvVHJpYW5ndWxhckVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdL2V4dGVybmFsIGFtZCBcImpxdWVyeVwiIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwianF1ZXJ5XCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsYXNzIFRyaWFuZ3VsYXJFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAkKCcjdHJpYW5ndWxhci1yZWZyZXNoJykub24oJ2NsaWNrJywgdGhpcy5vblJlZnJlc2hDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLWRlbGV0ZScpLm9uKCdjbGljaycsIHRoaXMub25EZWxldGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLWFib3J0Jykub24oJ2NsaWNrJywgdGhpcy5vbkFib3J0Q2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgb25SZWZyZXNoQ2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQucG9zdChUWVBPMy5zZXR0aW5ncy5hamF4VXJsc1sndHJpYW5ndWxhcl9yZWZyZXNoJ10sIHtcbiAgICAgICAgICAgICAgICBzeXNGaWxlVWlkOiBmaWxlVWlkXG4gICAgICAgICAgICB9KS5kb25lKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd3JhcHBlciA9ICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdmcpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnc3ZnOmZpcnN0LWNoaWxkJywgd3JhcHBlcikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kKGRhdGEuc3ZnKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpLmFkZENsYXNzKCdpcy1kb3dubG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25EZWxldGVDbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlVWlkID0gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc3lzLWZpbGUtdWlkJykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRGVsZXRlQ2xpY2snKTtcbiAgICAgICAgfVxuICAgICAgICBvbkFib3J0Q2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQucG9zdChUWVBPMy5zZXR0aW5ncy5hamF4VXJsc1sndHJpYW5ndWxhcl9hYm9ydCddLCB7XG4gICAgICAgICAgICAgICAgc3lzRmlsZVVpZDogZmlsZVVpZFxuICAgICAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBUcmlhbmd1bGFyRWxlbWVudCgpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanF1ZXJ5X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL1Jlc291cmNlcy9Qcml2YXRlL1R5cGVTY3JpcHQvVHJpYW5ndWxhckVsZW1lbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=