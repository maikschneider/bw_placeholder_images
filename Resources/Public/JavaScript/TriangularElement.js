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
            console.log('onRefreshClick');
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
            });
            $('.form-triangular-placeholder').removeClass('is-loading');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb3VyY2VzL1B1YmxpYy9KYXZhU2NyaXB0L1RyaWFuZ3VsYXJFbGVtZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGlHQUFPLENBQUMsbUJBQVMsRUFBRSxPQUFTLEVBQUUsMkNBQVEsQ0FBQyxtQ0FBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFBQSxrR0FBQzs7Ozs7Ozs7Ozs7O0FDNUJGOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdLy4vUmVzb3VyY2VzL1ByaXZhdGUvVHlwZVNjcmlwdC9Ucmlhbmd1bGFyRWxlbWVudC50cyIsIndlYnBhY2s6Ly9UWVBPMy9DTVMvQndQbGFjZWhvbGRlckltYWdlcy9bbmFtZV0vZXh0ZXJuYWwgYW1kIFwianF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL1RZUE8zL0NNUy9Cd1BsYWNlaG9sZGVySW1hZ2VzL1tuYW1lXS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vVFlQTzMvQ01TL0J3UGxhY2Vob2xkZXJJbWFnZXMvW25hbWVdL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJqcXVlcnlcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCAkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgY2xhc3MgVHJpYW5ndWxhckVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgICQoJyN0cmlhbmd1bGFyLXJlZnJlc2gnKS5vbignY2xpY2snLCB0aGlzLm9uUmVmcmVzaENsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI3RyaWFuZ3VsYXItZGVsZXRlJykub24oJ2NsaWNrJywgdGhpcy5vbkRlbGV0ZUNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI3RyaWFuZ3VsYXItYWJvcnQnKS5vbignY2xpY2snLCB0aGlzLm9uQWJvcnRDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBvblJlZnJlc2hDbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlVWlkID0gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc3lzLWZpbGUtdWlkJykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uUmVmcmVzaENsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgb25EZWxldGVDbGljayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlVWlkID0gcGFyc2VJbnQoJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtc3lzLWZpbGUtdWlkJykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRGVsZXRlQ2xpY2snKTtcbiAgICAgICAgfVxuICAgICAgICBvbkFib3J0Q2xpY2soZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgZmlsZVVpZCA9IHBhcnNlSW50KCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLXN5cy1maWxlLXVpZCcpKTtcbiAgICAgICAgICAgICQucG9zdChUWVBPMy5zZXR0aW5ncy5hamF4VXJsc1sndHJpYW5ndWxhcl9hYm9ydCddLCB7XG4gICAgICAgICAgICAgICAgc3lzRmlsZVVpZDogZmlsZVVpZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcuZm9ybS10cmlhbmd1bGFyLXBsYWNlaG9sZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFRyaWFuZ3VsYXJFbGVtZW50KCk7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qcXVlcnlfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vUmVzb3VyY2VzL1ByaXZhdGUvVHlwZVNjcmlwdC9Ucmlhbmd1bGFyRWxlbWVudC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==