!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).dialogPolyfill=t()}(this,function(){"use strict";var e=window.CustomEvent;function t(e,t){var o="on"+t.type.toLowerCase();return"function"==typeof e[o]&&e[o](t),e.dispatchEvent(t)}function o(e){for(;e;){if("dialog"===e.localName)return e;e=e.parentElement?e.parentElement:e.parentNode?e.parentNode.host:null}return null}function i(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function n(e,t){for(var o=0;o<e.length;++o)if(e[o]===t)return!0;return!1}function a(e){return!(!e||!e.hasAttribute("method"))&&"dialog"===e.getAttribute("method").toLowerCase()}function s(e){return e.isConnected||document.body.contains(e)}function r(e){if(e.submitter)return e.submitter;var t=e.target;if(!(t instanceof HTMLFormElement))return null;var o=c.formSubmitter;if(!o){var i=e.target;o=("getRootNode"in i&&i.getRootNode()||document).activeElement}return o&&o.form===t?o:null}function l(e){if(!e.defaultPrevented){var t=e.target,i=c.imagemapUseValue,n=r(e);null===i&&n&&(i=n.value);var a=o(t);if(a)"dialog"===(n&&n.getAttribute("formmethod")||t.getAttribute("method"))&&(e.preventDefault(),null!=i?a.close(i):a.close())}}function d(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",l,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window){new MutationObserver(this.maybeHideModal.bind(this)).observe(e,{attributes:!0,attributeFilter:["open"]})}else{var t,o=!1,i=function(){o?this.downgradeModal():this.maybeHideModal(),o=!1}.bind(this),n=function(n){if(n.target===e){var a="DOMNodeRemoved";o|=n.type.substr(0,a.length)===a,window.clearTimeout(t),t=window.setTimeout(i,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(t){e.addEventListener(t,n)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}e&&"object"!=typeof e||((e=function(e,t){t=t||{};var o=document.createEvent("CustomEvent");return o.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail||null),o}).prototype=window.Event.prototype),d.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&s(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),c.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var o=document.createEvent("MouseEvents");o.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(o),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=function e(t){var o=["button","input","keygen","select","textarea"].map(function(e){return e+":not([disabled])"});o.push('[tabindex]:not([disabled]):not([tabindex=""])');var i=t.querySelector(o.join(", "));if(!i&&"attachShadow"in Element.prototype)for(var n=t.querySelectorAll("*"),a=0;a<n.length&&!(n[a].tagName&&n[a].shadowRoot&&(i=e(n[a].shadowRoot)));a++);return i}(this.dialog_)),i(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!s(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!c.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");(function(e){for(;e&&e!==document.body;){var t=window.getComputedStyle(e),o=function(e,o){return!(void 0===t[e]||t[e]===o)};if(t.opacity<1||o("zIndex","auto")||o("transform","none")||o("mixBlendMode","normal")||o("filter","none")||o("perspective","none")||"isolate"===t.isolation||"fixed"===t.position||"touch"===t.webkitOverflowScrolling)return!0;e=e.parentElement}return!1})(this.dialog_.parentElement)&&console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context"),this.setOpen(!0),this.openAsModal_=!0,c.needsCentering(this.dialog_)?(c.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(o){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),void 0!==o&&(this.dialog_.returnValue=o);var i=new e("close",{bubbles:!1,cancelable:!1});t(this.dialog_,i)}};var c={reposition:function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,o=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,o)+"px"},isInlinePositionSetByStylesheet:function(e){for(var t=0;t<document.styleSheets.length;++t){var o=document.styleSheets[t],i=null;try{i=o.cssRules}catch(e){}if(i)for(var a=0;a<i.length;++a){var s=i[a],r=null;try{r=document.querySelectorAll(s.selectorText)}catch(e){}if(r&&n(r,e)){var l=s.style.getPropertyValue("top"),d=s.style.getPropertyValue("bottom");if(l&&"auto"!==l||d&&"auto"!==d)return!0}}}return!1},needsCentering:function(e){return"absolute"===window.getComputedStyle(e).position&&(!("auto"!==e.style.top&&""!==e.style.top||"auto"!==e.style.bottom&&""!==e.style.bottom)&&!c.isInlinePositionSetByStylesheet(e))},forceRegisterDialog:function(e){if((window.HTMLDialogElement||e.showModal)&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),"dialog"!==e.localName)throw new Error("Failed to register dialog: The element is not a dialog.");new d(e)},registerDialog:function(e){e.showModal||c.forceRegisterDialog(e)},DialogManager:function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}.bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(t){var o=[];t.forEach(function(e){for(var t,i=0;t=e.removedNodes[i];++i)t instanceof Element&&("dialog"===t.localName&&o.push(t),o=o.concat(t.querySelectorAll("dialog")))}),o.length&&e(o)}))}};if(c.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})},c.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()},c.DialogManager.prototype.updateStacking=function(){for(var e,t=this.zIndexHigh_,o=0;e=this.pendingDialogStack[o];++o)e.updateZIndex(--t,--t),0===o&&(this.overlay.style.zIndex=--t);var i=this.pendingDialogStack[0];i?(i.dialog.parentNode||document.body).appendChild(this.overlay):this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)},c.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=o(e);){for(var t,i=0;t=this.pendingDialogStack[i];++i)if(t.dialog===e)return 0===i;e=e.parentElement}return!1},c.DialogManager.prototype.handleFocus_=function(e){var t=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(t)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),i(t),void 0!==this.forwardTab_)){var o=this.pendingDialogStack[0];return o.dialog.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?o.focus_():t!==document.documentElement&&document.documentElement.focus()),!1}},c.DialogManager.prototype.handleKey_=function(o){if(this.forwardTab_=void 0,27===o.keyCode){o.preventDefault(),o.stopPropagation();var i=new e("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&t(n.dialog,i)&&n.dialog.close()}else 9===o.keyCode&&(this.forwardTab_=!o.shiftKey)},c.DialogManager.prototype.checkDOM_=function(e){this.pendingDialogStack.slice().forEach(function(t){-1!==e.indexOf(t.dialog)?t.downgradeModal():t.maybeHideModal()})},c.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return!(this.pendingDialogStack.length>=t)&&(1===this.pendingDialogStack.unshift(e)&&this.blockDocument(),this.updateStacking(),!0)},c.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);-1!==t&&(this.pendingDialogStack.splice(t,1),0===this.pendingDialogStack.length&&this.unblockDocument(),this.updateStacking())},c.dm=new c.DialogManager,c.formSubmitter=null,c.imagemapUseValue=null,void 0===window.HTMLDialogElement){var u=document.createElement("form");if(u.setAttribute("method","dialog"),"dialog"!==u.method){var h=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(h){var p=h.get;h.get=function(){return a(this)?"dialog":p.call(this)};var m=h.set;h.set=function(e){return"string"==typeof e&&"dialog"===e.toLowerCase()?this.setAttribute("method",e):m.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",h)}}document.addEventListener("click",function(e){if(c.formSubmitter=null,c.imagemapUseValue=null,!e.defaultPrevented){var t=e.target;if("composedPath"in e)t=e.composedPath().shift()||t;if(t&&a(t.form)){if(!("submit"===t.type&&["button","input"].indexOf(t.localName)>-1)){if("input"!==t.localName||"image"!==t.type)return;c.imagemapUseValue=e.offsetX+","+e.offsetY}o(t)&&(c.formSubmitter=t)}}},!1),document.addEventListener("submit",function(e){var t=e.target;if(!o(t)){var i=r(e);"dialog"===(i&&i.getAttribute("formmethod")||t.getAttribute("method"))&&e.preventDefault()}});var g=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){if(!a(this))return g.call(this);var e=o(this);e&&e.close()}}return c}),window.addEventListener("DOMContentLoaded",()=>{async function e(e){const t=e.dataset.asset,o=t.length>0,i=e.querySelector("[data-asset-field]");if(i&&(i.value=o?t:""),e.querySelectorAll("[data-asset-hide-if-set]").forEach(e=>e.style.display=o?"none":""),e.querySelectorAll("[data-asset-hide-if-missing]").forEach(e=>e.style.display=o?"":"none"),!o)return;const n=e.querySelector("img[data-asset-preview-image]"),a=e.querySelector("[data-asset-preview-label]");if(n||a){n&&n.setAttribute("src",""),a&&(a.textContent="");const{label:e,previewUrl:o}=await async function(e){const t=await fetch(`/neos/service/assets/${e}`),o=await t.text(),i=(new DOMParser).parseFromString(o,"text/html");return{label:i.querySelector("label.asset-label").textContent,previewUrl:i.querySelector('a[rel="preview"]').getAttribute("href")}}(t);n&&n.setAttribute("src",o),a&&(a.textContent=e)}}document.querySelectorAll("[data-asset]").forEach(async t=>{!function(t){t.querySelectorAll("[data-asset-browse]").forEach(o=>{o.addEventListener("click",async o=>{o.preventDefault();const i="assetConstraintsAssetSources"in t.dataset?t.dataset.assetConstraintsAssetSources.split(","):[],n="assetConstraintsMediaTypes"in t.dataset?t.dataset.assetConstraintsMediaTypes.split(","):[],a=await async function(e,t,o){return new Promise(i=>{const n=o.dataset.asset,a=n?new URL("/neos/media/browser/images/edit.html?asset="+n,window.location.origin):new URL("/neos/media/browser/assets/index.html",window.location.origin);e.map(e=>a.searchParams.append("constraints[assetSources][]",e.trim())),t.map(e=>a.searchParams.append("constraints[mediaTypes][]",e.trim()));const s=document.createElement("dialog");s.style.padding="0",s.style.width="90%",s.style.height="720px";const r=document.createElement("iframe");r.setAttribute("src",a.toString()),r.style.position="absolute",r.style.width="100%",r.style.height="100%",r.style.borderWidth="0",r.style.backgroundColor="#222",s.appendChild(r),window.NeosMediaBrowserCallbacks={assetChosen:e=>{i(e),s.close()}},s.addEventListener("cancel",e=>i(null)),o.appendChild(s),dialogPolyfill.registerDialog(s),s.showModal()})}(i,n,t);a&&(t.dataset.asset=a,t.dispatchEvent(new CustomEvent("assetChosen",{detail:a})),await e(t))})}),t.querySelectorAll("[data-asset-replace]").forEach(o=>{o.addEventListener("click",async o=>{o.preventDefault(),t.dataset.asset="",t.dispatchEvent(new CustomEvent("assetRemoved")),await e(t)})})}(t),await e(t,t.dataset.asset)})});
