define("TYPO3/CMS/BwPlaceholderImages/TriangularElement", ["TYPO3/CMS/Backend/Notification","jquery"], (__WEBPACK_EXTERNAL_MODULE_TYPO3_CMS_Backend_Notification__, __WEBPACK_EXTERNAL_MODULE_jquery__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Resources/Private/TypeScript/TriangularElement.ts":
/*!***********************************************************!*\
  !*** ./Resources/Private/TypeScript/TriangularElement.ts ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! TYPO3/CMS/Backend/Notification */ "TYPO3/CMS/Backend/Notification")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, $, Notification) {
    "use strict";
    class TriangularElement {
        constructor() {
            $(() => {
                $('#triangular-refresh').on('click', this.onRefreshClick.bind(this));
                $('#triangular-delete').on('click', this.onDeleteClick.bind(this));
                $('#triangular-abort').on('click', this.onAbortClick.bind(this));
            });
        }
        onRefreshClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $('.form-triangular-placeholder').addClass('is-loading').removeClass('is-waiting');
            $.post(TYPO3.settings.ajaxUrls['triangular_refresh'], {
                sysFileUid: fileUid
            }).done((data) => {
                $('.form-triangular-placeholder').removeClass('is-loading');
                if (data.svg) {
                    $('.form-triangular-placeholder > svg').remove();
                    $('.form-triangular-placeholder').prepend(data.svg).removeClass('is-waiting').addClass('is-downloaded');
                    return;
                }
                if (!data.svg) {
                    $('.form-triangular-placeholder').addClass('is-waiting');
                    Notification.success('Well done', 'Whatever you did, it was successful.');
                }
            }).fail((err) => {
                console.error(err);
                $('.form-triangular-placeholder').removeClass('is-loading').addClass('is-waiting');
                Notification.error('Error', '', 3);
            });
        }
        onDeleteClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $.post(TYPO3.settings.ajaxUrls['triangular_delete'], {
                sysFileUid: fileUid
            }).done((data) => {
                $('.form-triangular-placeholder').removeClass('is-loading').removeClass('is-downloaded').removeClass('is-waiting');
                $('.form-triangular-placeholder > svg').remove();
            });
        }
        onAbortClick(e) {
            e.preventDefault();
            const fileUid = parseInt($(e.currentTarget).attr('data-sys-file-uid'));
            $.post(TYPO3.settings.ajaxUrls['triangular_abort'], {
                sysFileUid: fileUid
            }).done((data) => {
                $('.form-triangular-placeholder').removeClass('is-loading').removeClass('is-waiting');
            });
        }
    }
    return new TriangularElement();
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "TYPO3/CMS/Backend/Notification":
/*!*************************************************!*\
  !*** external "TYPO3/CMS/Backend/Notification" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_TYPO3_CMS_Backend_Notification__;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VzL1B1YmxpYy9KYXZhU2NyaXB0L1RyaWFuZ3VsYXJFbGVtZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlHQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsMkNBQVEsRUFBRSwyRkFBZ0MsQ0FBQyxtQ0FBRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7O0FDdERGOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdLy4vUmVzb3VyY2VzL1ByaXZhdGUvVHlwZVNjcmlwdC9Ucmlhbmd1bGFyRWxlbWVudC50cyIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vZXh0ZXJuYWwgYW1kIFwiVFlQTzMvQ01TL0JhY2tlbmQvTm90aWZpY2F0aW9uXCIiLCJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdL2V4dGVybmFsIGFtZCBcImpxdWVyeVwiIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwianF1ZXJ5XCIsIFwiVFlQTzMvQ01TL0JhY2tlbmQvTm90aWZpY2F0aW9uXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgJCwgTm90aWZpY2F0aW9uKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY2xhc3MgVHJpYW5ndWxhckVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgICQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLXJlZnJlc2gnKS5vbignY2xpY2snLCB0aGlzLm9uUmVmcmVzaENsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLWRlbGV0ZScpLm9uKCdjbGljaycsIHRoaXMub25EZWxldGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAkKCcjdHJpYW5ndWxhci1hYm9ydCcpLm9uKCdjbGljaycsIHRoaXMub25BYm9ydENsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25SZWZyZXNoQ2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5hZGRDbGFzcygnaXMtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdpcy13YWl0aW5nJyk7XG4gICAgICAgICAgICAkLnBvc3QoVFlQTzMuc2V0dGluZ3MuYWpheFVybHNbJ3RyaWFuZ3VsYXJfcmVmcmVzaCddLCB7XG4gICAgICAgICAgICAgICAgc3lzRmlsZVVpZDogZmlsZVVpZFxuICAgICAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN2Zykge1xuICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyID4gc3ZnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5wcmVwZW5kKGRhdGEuc3ZnKS5yZW1vdmVDbGFzcygnaXMtd2FpdGluZycpLmFkZENsYXNzKCdpcy1kb3dubG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLnN2Zykge1xuICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyJykuYWRkQ2xhc3MoJ2lzLXdhaXRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uLnN1Y2Nlc3MoJ1dlbGwgZG9uZScsICdXaGF0ZXZlciB5b3UgZGlkLCBpdCB3YXMgc3VjY2Vzc2Z1bC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5mYWlsKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgJCgnLmZvcm0tdHJpYW5ndWxhci1wbGFjZWhvbGRlcicpLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJykuYWRkQ2xhc3MoJ2lzLXdhaXRpbmcnKTtcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb24uZXJyb3IoJ0Vycm9yJywgJycsIDMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgb25EZWxldGVDbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlVWlkID0gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc3lzLWZpbGUtdWlkJykpO1xuICAgICAgICAgICAgJC5wb3N0KFRZUE8zLnNldHRpbmdzLmFqYXhVcmxzWyd0cmlhbmd1bGFyX2RlbGV0ZSddLCB7XG4gICAgICAgICAgICAgICAgc3lzRmlsZVVpZDogZmlsZVVpZFxuICAgICAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdpcy1kb3dubG9hZGVkJykucmVtb3ZlQ2xhc3MoJ2lzLXdhaXRpbmcnKTtcbiAgICAgICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyID4gc3ZnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBvbkFib3J0Q2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQucG9zdChUWVBPMy5zZXR0aW5ncy5hamF4VXJsc1sndHJpYW5ndWxhcl9hYm9ydCddLCB7XG4gICAgICAgICAgICAgICAgc3lzRmlsZVVpZDogZmlsZVVpZFxuICAgICAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5mb3JtLXRyaWFuZ3VsYXItcGxhY2Vob2xkZXInKS5yZW1vdmVDbGFzcygnaXMtbG9hZGluZycpLnJlbW92ZUNsYXNzKCdpcy13YWl0aW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFRyaWFuZ3VsYXJFbGVtZW50KCk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9UWVBPM19DTVNfQmFja2VuZF9Ob3RpZmljYXRpb25fXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanF1ZXJ5X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL1Jlc291cmNlcy9Qcml2YXRlL1R5cGVTY3JpcHQvVHJpYW5ndWxhckVsZW1lbnQudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=