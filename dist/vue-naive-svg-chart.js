!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vue-naive-svg-chart",[],t):"object"==typeof exports?exports["vue-naive-svg-chart"]=t():e["vue-naive-svg-chart"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var r=n(1)(n(2),n(7),null,null);e.exports=r.exports},function(e,t){e.exports=function(e,t,n,r){var o,u=e=e||{},i=typeof e["default"];"object"!==i&&"function"!==i||(o=e,u=e["default"]);var s="function"==typeof u?u.options:u;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),r){var a=Object.create(s.computed||null);Object.keys(r).forEach(function(e){var t=r[e];a[e]=function(){return t}}),s.computed=a}return{esModule:o,exports:u,options:s}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={components:function(){var e=n(3);return e.keys().map(function(t){return e(t)}).reduce(function(e,t){return e[t.name]=t,e},{})}(),props:{type:{type:String,required:!0},title:String,fontSize:{type:Number,"default":16},padding:{type:Number,"default":16},dataset:{type:Array,required:!0},labels:{type:Array,required:!0},showLegend:{type:Boolean,"default":!0}}}},function(e,t,n){function r(e){return n(o(e))}function o(e){return u[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var u={"./VnscLine.vue":4};r.keys=function(){return Object.keys(u)},r.resolve=o,e.exports=r,r.id=3},function(e,t,n){var r=n(1)(n(5),n(6),null,null);e.exports=r.exports},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"VnscLine",props:["title","fontSize","padding","dataset","labels","showLegend"]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(e._s(e.title))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("vnsc-"+e.type,{tag:"component",attrs:{title:e.title,fontSize:e.fontSize,padding:e.padding,dataset:e.dataset,labels:e.labels,showLegend:e.showLegend}})},staticRenderFns:[]}}])});