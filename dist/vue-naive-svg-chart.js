!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require(void 0)):"function"==typeof define&&define.amd?define("vue-naive-svg-chart",["lodash"],t):"object"==typeof exports?exports["vue-naive-svg-chart"]=t(require("lodash")):e["vue-naive-svg-chart"]=t(e._)}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var o=n(1)(n(2),n(4),null,null);e.exports=o.exports},function(e,t){e.exports=function(e,t,n,o){var r,i=e=e||{},c=typeof e["default"];"object"!==c&&"function"!==c||(r=e,i=e["default"]);var u="function"==typeof i?i.options:i;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns),n&&(u._scopeId=n),o){var s=Object.create(u.computed||null);Object.keys(o).forEach(function(e){var t=o[e];s[e]=function(){return t}}),u.computed=s}return{esModule:r,exports:i,options:u}}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),i=o(r);t["default"]={mounted:function(){var e=this;this.$nextTick(function(){e.checkIsMobile(),window.addEventListener("resize",i["default"].throttle(function(){e.checkIsMobile()},100))})},beforeDestroy:function(){var e=this;window.removeEventListener("resize",i["default"].throttle(function(){e.checkIsMobile()},100))},methods:{checkIsMobile:function(){this.isMobile=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<=767}},data:function(){return{isMobile:!1}}}},function(t,n){t.exports=e},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{"class":e.isMobile?"text-primary":"text-success"},[e._v("HELLO")])},staticRenderFns:[]}}])});