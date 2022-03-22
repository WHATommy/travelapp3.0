/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/dashboard";
exports.ids = ["pages/dashboard"];
exports.modules = {

/***/ "./pages/dashboard.js":
/*!****************************!*\
  !*** ./pages/dashboard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node_modules/bootstrap/dist/css/bootstrap.min.css */ \"./node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var _node_modules_bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utilsServer_baseUrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilsServer/baseUrl */ \"./utilsServer/baseUrl.js\");\n/* harmony import */ var _utilsServer_baseUrl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utilsServer_baseUrl__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nfunction Dashboard({ user , trips  }) {\n    const { 0: radioValue , 1: setRadioValue  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('home');\n    console.log(\"TRIPS: \" + trips);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Tab.Container, {\n            id: \"\",\n            defaultActiveKey: \"Home\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Row, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Col, {\n                    sm: 2,\n                    className: \"p-0 text-center\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Nav, {\n                            variant: \"pills\",\n                            className: \"flex-column\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.ToggleButton, {\n                                        children: \"Home\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                                        lineNumber: 20,\n                                        columnNumber: 33\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                                    lineNumber: 19,\n                                    columnNumber: 29\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {\n                                    children: trips.map((trip)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.ToggleButton, {\n                                            id: trip._id,\n                                            children: trip.name\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                                            lineNumber: 26,\n                                            columnNumber: 37\n                                        }, this)\n                                    )\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                                    lineNumber: 24,\n                                    columnNumber: 29\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                            lineNumber: 18,\n                            columnNumber: 25\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"d-grid gap-2\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                variant: \"success\",\n                                children: \"Add\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                                lineNumber: 33,\n                                columnNumber: 29\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                            lineNumber: 32,\n                            columnNumber: 25\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                    lineNumber: 17,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n                lineNumber: 16,\n                columnNumber: 17\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n            lineNumber: 15,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Tommy\\\\Documents\\\\GitHub\\\\travelapp3.0\\\\pages\\\\dashboard.js\",\n        lineNumber: 14,\n        columnNumber: 9\n    }, this));\n}\nDashboard.getInitialProps = async (ctx)=>{\n    const { token  } = (0,nookies__WEBPACK_IMPORTED_MODULE_2__.parseCookies)(ctx);\n    if (!token) {\n        return {\n            trips: []\n        };\n    }\n    const payload = {\n        headers: {\n            token: token\n        }\n    };\n    const url = `${(_utilsServer_baseUrl__WEBPACK_IMPORTED_MODULE_5___default())}/api/trip/`;\n    const res = await axios__WEBPACK_IMPORTED_MODULE_6___default().get(url, payload);\n    return {\n        trips: res.data\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kYXNoYm9hcmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QjtBQUNhO0FBQ2U7QUFDa0M7QUFDMUI7QUFDakI7QUFDbkI7U0FFaEJjLFNBQVMsQ0FBQyxDQUFDLENBQUNDLElBQUksR0FBRUMsS0FBSyxFQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2pDLEtBQUssTUFBRUMsVUFBVSxNQUFFQyxhQUFhLE1BQUloQiwrQ0FBUSxDQUFDLENBQU07SUFDbkRpQixPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFTLFdBQUdKLEtBQUs7SUFFN0IsTUFBTSw2RUFDRGIsMkNBQVE7OEZBQ0pJLDBEQUFhO1lBQUNlLEVBQUUsRUFBQyxDQUFFO1lBQUNDLGdCQUFnQixFQUFDLENBQU07a0dBQ3ZDZixnREFBRztzR0FDQ0MsZ0RBQUc7b0JBQUNlLEVBQUUsRUFBRSxDQUFDO29CQUFFQyxTQUFTLEVBQUMsQ0FBaUI7O29HQUNsQ25CLGdEQUFHOzRCQUFDb0IsT0FBTyxFQUFDLENBQU87NEJBQUNELFNBQVMsRUFBQyxDQUFhOzs0R0FDdkNkLHdEQUFXOzBIQUNQRCx5REFBWTtrREFBQyxDQUVkOzs7Ozs7Ozs7Ozs0R0FFSEMsd0RBQVc7OENBQ1BLLEtBQUssQ0FBQ1csR0FBRyxFQUFDQyxJQUFJLCtFQUNWbEIseURBQVk7NENBQUNZLEVBQUUsRUFBRU0sSUFBSSxDQUFDQyxHQUFHO3NEQUNyQkQsSUFBSSxDQUFDRSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0dBS3pCQyxDQUFHOzRCQUFDTixTQUFTLEVBQUMsQ0FBYztrSEFDeEJwQixtREFBTTtnQ0FBQ3FCLE9BQU8sRUFBQyxDQUFTOzBDQUFDLENBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU81QixDQUFDO0FBRURaLFNBQVMsQ0FBQ2tCLGVBQWUsVUFBU0MsR0FBRyxHQUFJLENBQUM7SUFDdEMsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxFQUFDLENBQUMsR0FBR2pDLHFEQUFZLENBQUNnQyxHQUFHO0lBQ2xDLEVBQUUsR0FBRUMsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLENBQUMsQ0FBQztZQUFDbEIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNELEtBQUssQ0FBQ21CLE9BQU8sR0FBRyxDQUFDO1FBQUNDLE9BQU8sRUFBRSxDQUFDO1lBQUNGLEtBQUssRUFBRUEsS0FBSztRQUFDLENBQUM7SUFBQyxDQUFDO0lBQzdDLEtBQUssQ0FBQ0csR0FBRyxNQUFNekIsNkRBQU8sQ0FBQyxVQUFVO0lBQ2pDLEtBQUssQ0FBQzBCLEdBQUcsR0FBRyxLQUFLLENBQUN6QixnREFBUyxDQUFDd0IsR0FBRyxFQUFFRixPQUFPO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDO1FBQUNuQixLQUFLLEVBQUVzQixHQUFHLENBQUNFLElBQUk7SUFBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxpRUFBZTFCLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbGFwcDMuMC8uL3BhZ2VzL2Rhc2hib2FyZC5qcz8wZTUwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgcGFyc2VDb29raWVzIH0gZnJvbSAnbm9va2llcyc7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCBGcmFnbWVudCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IEJ1dHRvbiwgTmF2LCBUYWIsIFJvdywgQ29sLCBUb2dnbGVCdXR0b24sIEJ1dHRvbkdyb3VwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJztcclxuaW1wb3J0IGJhc2VVcmwgZnJvbSAnLi4vdXRpbHNTZXJ2ZXIvYmFzZVVybCc7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjsgXHJcblxyXG5mdW5jdGlvbiBEYXNoYm9hcmQoeyB1c2VyLCB0cmlwcyB9KSB7XHJcbiAgICBjb25zdCBbcmFkaW9WYWx1ZSwgc2V0UmFkaW9WYWx1ZV0gPSB1c2VTdGF0ZSgnaG9tZScpO1xyXG4gICAgY29uc29sZS5sb2coXCJUUklQUzogXCIgKyB0cmlwcyk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIDxUYWIuQ29udGFpbmVyIGlkPVwiXCIgZGVmYXVsdEFjdGl2ZUtleT1cIkhvbWVcIj5cclxuICAgICAgICAgICAgICAgIDxSb3c+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbCBzbT17Mn0gY2xhc3NOYW1lPVwicC0wIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOYXYgdmFyaWFudD1cInBpbGxzXCIgY2xhc3NOYW1lPVwiZmxleC1jb2x1bW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9nZ2xlQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIb21lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ub2dnbGVCdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbkdyb3VwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmlwcy5tYXAodHJpcCA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUb2dnbGVCdXR0b24gaWQ9e3RyaXAuX2lkfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmlwLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVG9nZ2xlQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b25Hcm91cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9OYXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1ncmlkIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJzdWNjZXNzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Db2w+XHJcbiAgICAgICAgICAgICAgICA8L1Jvdz5cclxuICAgICAgICAgICAgPC9UYWIuQ29udGFpbmVyPlxyXG4gICAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICApXHJcbn1cclxuXHJcbkRhc2hib2FyZC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyBjdHggPT4ge1xyXG4gICAgY29uc3QgeyB0b2tlbiB9ID0gcGFyc2VDb29raWVzKGN0eCk7XHJcbiAgICBpZighdG9rZW4pIHtcclxuICAgICAgICByZXR1cm4geyB0cmlwczogW10gfTtcclxuICAgIH1cclxuICAgIGNvbnN0IHBheWxvYWQgPSB7IGhlYWRlcnM6IHsgdG9rZW46IHRva2VuIH0gfTtcclxuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9L2FwaS90cmlwL2A7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQodXJsLCBwYXlsb2FkKTtcclxuICAgIHJldHVybiB7IHRyaXBzOiByZXMuZGF0YSB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7Il0sIm5hbWVzIjpbIlJlYWN0IiwicGFyc2VDb29raWVzIiwidXNlU3RhdGUiLCJGcmFnbWVudCIsInVzZUVmZmVjdCIsIkJ1dHRvbiIsIk5hdiIsIlRhYiIsIlJvdyIsIkNvbCIsIlRvZ2dsZUJ1dHRvbiIsIkJ1dHRvbkdyb3VwIiwiYmFzZVVybCIsImF4aW9zIiwiRGFzaGJvYXJkIiwidXNlciIsInRyaXBzIiwicmFkaW9WYWx1ZSIsInNldFJhZGlvVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiQ29udGFpbmVyIiwiaWQiLCJkZWZhdWx0QWN0aXZlS2V5Iiwic20iLCJjbGFzc05hbWUiLCJ2YXJpYW50IiwibWFwIiwidHJpcCIsIl9pZCIsIm5hbWUiLCJkaXYiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJ0b2tlbiIsInBheWxvYWQiLCJoZWFkZXJzIiwidXJsIiwicmVzIiwiZ2V0IiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/dashboard.js\n");

/***/ }),

/***/ "./utilsServer/baseUrl.js":
/*!********************************!*\
  !*** ./utilsServer/baseUrl.js ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("\nconst baseUrl =  true ? \"http://localhost:3000\" : 0;\nmodule.exports = baseUrl;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlsc1NlcnZlci9iYXNlVXJsLmpzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSxLQUFLLENBQUNBLE9BQU8sR0FBYixLQUN1QyxHQUNqQyxDQUF1Qix5QkFDdkIsQ0FBRTtBQUVSQyxNQUFNLENBQUNDLE9BQU8sR0FBR0YsT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYXZlbGFwcDMuMC8uL3V0aWxzU2VydmVyL2Jhc2VVcmwuanM/ZDJkZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBiYXNlVXJsID1cclxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCJcclxuICAgID8gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIlxyXG4gICAgOiBcIlwiO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVXJsOyJdLCJuYW1lcyI6WyJiYXNlVXJsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utilsServer/baseUrl.js\n");

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.min.css ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("nookies");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/dashboard.js"));
module.exports = __webpack_exports__;

})();