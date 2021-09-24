/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/formats/highlight-colours.js":
/*!******************************************!*\
  !*** ./src/formats/highlight-colours.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__);






const HighlighterButton = props => {
  const {
    isActive,
    onChange,
    value
  } = props;
  const {
    activeFormats
  } = value;
  const highlighterIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m13.791 3.3624c-0.5017-0.48777-1.3098-0.48245-1.8049 0.01187l-3.9568 3.9507c-0.05791 0.05782-0.10897 0.11977-0.15319 0.18488l-1.9918 1.9887 4.6464 4.517 5.7335-5.7566 0.3683-0.36775c0.4951-0.49433 0.4897-1.2905-0.0121-1.7782l-2.8294-2.7506z"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m5.2528 10.124 4.598 4.4799-1.1632 1.1589c-0.42886 0.4272-1.0916 0.4881-1.5872 0.1804l-0.67343-0.2397-0.94446 0.9259-2.2904-2.2678 0.95586-0.937-0.2139-0.5611c-0.32888-0.4861-0.27782-1.1489 0.15549-1.5806l1.1632-1.1589z"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "m3.2846 15.389 1.1836 1.1382-0.4962 0.4731-1.972-0.476 1.2846-1.1353z"
  }));
  const [showPopover, setShowPopover] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const colors = [{
    name: 'yellow',
    color: '#FFF300'
  }, {
    name: 'green',
    color: '#79FE0C'
  }, {
    name: 'blue',
    color: '#4AF1F2'
  }, {
    name: 'purple',
    color: '#DF00FF'
  }, {
    name: 'red',
    color: '#FF2226'
  }, {
    name: 'orange',
    color: '#FF7B19'
  }, {
    name: 'pink',
    color: '#FF70C5'
  }];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichTextToolbarButton, {
    icon: highlighterIcon,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highlight', 'wholesome-highlighter'),
    onClick: () => {
      let showPopover = true;

      if (activeFormats) {
        // If the selection already has the format, remove it.
        const formats = activeFormats.filter(format => 'wholesome/highlighter' === format['type']);

        if (formats.length > 0) {
          onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__.toggleFormat)(value, {
            type: 'wholesome/highlighter'
          })); // Remove format.

          showPopover = false;
        }
      } // Otherwise show the popover.


      if (showPopover) {
        setShowPopover(true);
      }
    },
    isActive: isActive
  }), showPopover && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.URLPopover, {
    className: "components-popover components-inline-color-popover components-animate__appear is-from-top is-from-center is-without-arrow",
    onClose: () => setShowPopover(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.ColorPalette, {
    colors: colors,
    onChange: color => {
      setShowPopover(false);

      if (color) {
        onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__.toggleFormat)(value, {
          type: 'wholesome/highlighter',
          attributes: {
            style: `background: ${color};`
          }
        }));
      }
    }
  })));
};

(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_3__.registerFormatType)('wholesome/highlighter', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Highlight', 'wholesome-highlighter'),
  tagName: 'mark',
  className: 'wholesome-highlight',
  edit: HighlighterButton
});

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["richText"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formats_highlight_colours__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formats/highlight-colours */ "./src/formats/highlight-colours.js");
// import './formats/highlight';
// import './formats/highlight-paragraph';

}();
/******/ })()
;
//# sourceMappingURL=index.js.map