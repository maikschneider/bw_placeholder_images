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
            $('.form-triangular-placeholder').addClass('is-loading');
            $.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
                sysFileUid: fileUid
            }).done((data) => {
                if (data.svg) {
                    $('.form-triangular-placeholder > svg').remove();
                    $('.form-triangular-placeholder').prepend(data.svg).removeClass('is-loading').addClass('is-downloaded');
                    return;
                }
                if (!data.svg) {
                    console.log('message: is queued');
                }
            });
        }
        onDeleteClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $.post(TYPO3.settings.ajaxUrls['triangular_delete'], {
                sysFileUid: fileUid
            }).done((data) => {
                $('.form-triangular-placeholder').removeClass('is-loading').removeClass('	is-downloaded');
                $('.form-triangular-placeholder > svg').remove();
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VzL1B1YmxpYy9KYXZhU2NyaXB0L1RyaWFuZ3VsYXJFbGVtZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlHQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsMkNBQVEsQ0FBQyxtQ0FBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7Ozs7OztBQzlDRjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS8uL1Jlc291cmNlcy9Qcml2YXRlL1R5cGVTY3JpcHQvVHJpYW5ndWxhckVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdL2V4dGVybmFsIGFtZCBcImpxdWVyeVwiIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwianF1ZXJ5XCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGNsYXNzIFRyaWFuZ3VsYXJFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAkKCcjdHJpYW5ndWxhci1yZWZyZXNoJykub24oJ2NsaWNrJywgdGhpcy5vblJlZnJlc2hDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLWRlbGV0ZScpLm9uKCdjbGljaycsIHRoaXMub25EZWxldGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLWFib3J0Jykub24oJ2NsaWNrJywgdGhpcy5vbkFib3J0Q2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgb25SZWZyZXNoQ2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgICAgICAgJC5wb3N0KFRZUE8zLnNldHRpbmdzLmFqYXhVcmxzWyd0cmlhbmd1bGFyX3JlZnJlc2gnXSwge1xuICAgICAgICAgICAgICAgIHN5c0ZpbGVVaWQ6IGZpbGVVaWRcbiAgICAgICAgICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdmcpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmZvcm0tdHJpYW5ndWxhci1wbGFjZWhvbGRlciA+IHN2ZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyJykucHJlcGVuZChkYXRhLnN2ZykucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKS5hZGRDbGFzcygnaXMtZG93bmxvYWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5zdmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ21lc3NhZ2U6IGlzIHF1ZXVlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG9uRGVsZXRlQ2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQucG9zdChUWVBPMy5zZXR0aW5ncy5hamF4VXJsc1sndHJpYW5ndWxhcl9kZWxldGUnXSwge1xuICAgICAgICAgICAgICAgIHN5c0ZpbGVVaWQ6IGZpbGVVaWRcbiAgICAgICAgICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKS5yZW1vdmVDbGFzcygnXHRpcy1kb3dubG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgJCgnLmZvcm0tdHJpYW5ndWxhci1wbGFjZWhvbGRlciA+IHN2ZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25BYm9ydENsaWNrKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVVaWQgPSBwYXJzZUludCgkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1zeXMtZmlsZS11aWQnKSk7XG4gICAgICAgICAgICAkLnBvc3QoVFlQTzMuc2V0dGluZ3MuYWpheFVybHNbJ3RyaWFuZ3VsYXJfYWJvcnQnXSwge1xuICAgICAgICAgICAgICAgIHN5c0ZpbGVVaWQ6IGZpbGVVaWRcbiAgICAgICAgICAgIH0pLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgVHJpYW5ndWxhckVsZW1lbnQoKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pxdWVyeV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9SZXNvdXJjZXMvUHJpdmF0ZS9UeXBlU2NyaXB0L1RyaWFuZ3VsYXJFbGVtZW50LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9