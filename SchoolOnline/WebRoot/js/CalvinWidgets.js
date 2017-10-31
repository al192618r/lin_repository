/********************************************************************************************
* 文件名称:	
* 设计人员:	许志伟 
* 设计时间:	
* 功能描述:	
* 注意事项：UI框架
*
*注意：允许你使用该框架 但是不允许修改该框架 有发现BUG请通知作者 切勿擅自修改框架内容
*
********************************************************************************************/
function scrollTabs() { };
scrollTabs.prototype = {
    st: function (tabs, divs, openClass, closeClass) {
        var temp = this;
        if (tabs.length != divs.length) {
            alert("菜单层数量和内容层数量不一样!");
            return false;
        }
        for (var i = 0; i < tabs.length; i++) {
            temp.$(tabs[i]).value = i;
            temp.$(tabs[i]).onclick = function () {
                for (var j = 0; j < tabs.length; j++) {
                    temp.$(tabs[j]).className = closeClass;
                    temp.$(divs[j]).style.display = "none";
                }
                temp.$(tabs[this.value]).className = openClass;
                temp.$(divs[this.value]).style.display = "";
            }
        }
    },
    $: function (oid) {
        if (typeof (oid) == "string")
            return document.getElementById(oid);
        return oid;
    }
};
//broswer
(function () {
    var c = navigator.userAgent, d = /(msie\s|trident.*rv:)([\w.]+)/, e = /(firefox)\/([\w.]+)/, f = /(opera).+version\/([\w.]+)/, g = /(chrome)\/([\w.]+)/, h = /version\/([\w.]+).*(safari)/, b; c.toLowerCase(); b = function (b) {
        var a = d.exec(b); if (null != a) return { browser: "IE", version: a[2] || "0" }; a = e.exec(b); if (null != a) return { browser: a[1] || "", version: a[2] || "0" }; a = f.exec(b); if (null != a) return { browser: a[1] || "", version: a[2] || "0" }; a = g.exec(b); if (null != a) return { browser: a[1] || "", version: a[2] || "0" }; a = h.exec(b); if (null != a) return { browser: a[2] ||
"", version: a[1] || "0"
        }; if (null != a) return { browser: "", version: "0"}
    } (c.toLowerCase()); b.browser && (c = b.browser, b = b.version, $.browser = $.browser || {}, $.browser.msie = "IE" == c, $.browser.version = b)
})();

if (!this.JSON) { this.JSON = {} } (function () { function f(n) { return n < 10 ? '0' + n : n } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key) } if (typeof rep === 'function') { value = rep.call(holder, key, value) } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null' } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null' } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v) } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v) } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' ' } } else if (typeof space === 'string') { indent = space } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify') } return str('', { '': value }) } } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j } throw new SyntaxError('JSON.parse') } } } ());
//core
(function () {
    var f = this; window.calvin = window.calvin || {}; calvin.registerNamespace = function (a) { var c = f; a = a.split("."); for (var b = 0, e = a.length; b < e; b++) { var g = a[b], d = c[g]; d || (d = c[g] = {}); d.__namespace || (d.__namespace = !0, d.__typeName = a.slice(0, b + 1).join("."), d.getName = function () { return this.__typeName }); c = d } return c }; calvin.Create = function () {
        var a = arguments[0], c = arguments[arguments.length - 1], b = f; if ("function" === typeof c) "string" === typeof a ? b = calvin.registerNamespace(a) : "object" === typeof a && (b = a), b.instanceName =
a, c.call(b, this); else throw Error("Function required");
    }; calvin.Class = function () {
        var a = arguments.length, c = arguments[a - 1]; if (2 == a) { var b = arguments[0].base, a = function () { this.base = this.base || {}; for (var a in b.prototype) "function" == typeof b.prototype[a] && (this.base[a] = function (a, c) { return function () { b.prototype[a].apply(c, arguments) } } (a, this)); this.init.apply(this, arguments) }; a.prototype = new b; a.prototype.constructor = a; $.extend(a.prototype, c); return a } c.init = c.init || function () { }; a = function () {
            this.init.apply(this,
arguments)
        }; f.jQuery.extend(a.prototype, c); return a
    }; calvin.Create("calvin.CalvinTimeDelayMaker", function () { this.throttle = function (a, c, b, e, g) { var d = 0, f = 0, l = null, m, h, n, k = function () { f = new Date; c.apply(g, n) }; return function () { g = g || this; n = arguments; m = new Date; h = m - (e ? d : f) - a; clearTimeout(l); e ? b ? l = setTimeout(k, a) : 0 <= h && k() : 0 <= h ? k() : b && (l = setTimeout(k, -h)); d = m } }; this.debounce = function (a, c, b, e) { return calvin.CalvinTimeDelayMaker.throttle(a, c, b, !0, e) } }); calvin.BodyOrHtmlOrWindow = function (a) {
        return a == window ||
a == document || !a.tagName || /^(?:body|html)$/i.test(a.tagName)
    }; calvin.compare = function (a, c) { return null == a || null == c ? a === c : a == c && a.constructor.toString() == c.constructor }; calvin.Array = { indexOf: function (a, c) { for (var b = 0, e = a.length; b < e; b++) if (calvin.compare(a[b], c)) return b; return -1 }, remove: function (a, c) { for (var b = -1, b = calvin.Array.indexOf(a, c); 0 <= b; ) 0 <= b && a.splice(b, 1), b = calvin.Array.indexOf(a, c); return 0 <= b } }; calvin.ie6 = function () {
        if (window.ActiveXObject || "ActiveXObject" in window) {
            var a = navigator.userAgent.match(/MSIE ([\d.]+)/);
            if (null != a && 2 == a.length && 6 == a[1]) return !0
        } return !1
    } 
})();
//mask
calvin.Create("calvin.ui", function () {
    var d = { overlayCSS: { backgroundColor: "#fff", opacity: 0.5 }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: !1, baseZ: 1E3, applyPlatformOpacityRules: !0, quirksmodeOffsetHack: 4 }; this.masker = calvin.Class({ init: function (a, b) {
        this.opts = $.extend(!0, b, d); if (calvin.BodyOrHtmlOrWindow(a)) this.elem = /body/i.test(a.nodeName) ? a : a.body || a.document.body, this.full = !0; else {
            this.elem = a; this.full = !1; var c = this.elem.style.position; if ("static" ==
c || "" == c) this.elem.style.position = "relative"
        } this.ie6 = calvin.ie6(); this.boxModel = $.boxModel; this.CreateMask(); this.SetMaskStyle()
    }, CreateMask: function () {
        var a = this.opts, b = a.baseZ, a = this.ie6 || a.forceIframe ? $('<iframe class="CalvinUIBlock" style="z-index:' + b++ + ';border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;" src="' + a.iframeSrc + '"></iframe>') : $('<div class="CalvinUIBlock" style="width:0px;height:0px;top:0px; left:0px;"></div>'), b = $('<div class="CalvinUIBlock blockOverlay" style="z-index:' +
b++ + ';border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'); a.appendTo(this.elem); b.appendTo(this.elem); this.$lyr1 = a; this.$lyr2 = b
    }, SetMaskStyle: function () {
        var a = this.opts; this.full && $("body").css({ margin: "0px", padding: "0px" }); (this.ie6 || a.forceIframe) && this.$lyr1.css("opacity", 0); this.$lyr2.css(a.overlayCSS); if (!this.ie6 && this.boxModel) this.$lyr1.css("position", this.full ? "fixed" : "absolute"), this.$lyr2.css("position", this.full ? "fixed" : "absolute"); else if ($("html,body").css({ height: "100%",
            width: "100%", margin: "0px"
        }), this.$lyr1.css("position", "absolute"), this.$lyr2.css("position", "absolute"), this.full) { var b = Math.max(document.body.scrollHeight, document.body.offsetHeight), c = document.documentElement.offsetWidth || document.body.offsetWidth; this.boxModel || (b -= a.quirksmodeOffsetHack); this.ie6 && (c -= 20); this.$lyr1.height(b).width(c); this.$lyr2.height(b).width(c) } else a = this.$lyr1.parent(), b = this.$lyr2.parent(), this.$lyr1.height(a.innerHeight()).width(a.width() - (this.ie6 ? 20 : 0)), this.$lyr2.height(b.innerHeight()).width(b.width() -
(this.ie6 ? 20 : 0))
    }, removeMask: function () { this.$lyr1.remove(); this.$lyr2.remove() }, hideMask: function () { this.$lyr1.hide(); this.$lyr2.hide() }, showMask: function () { this.$lyr1.show(); this.$lyr2.show() }, resize: function () { this.SetMaskStyle() } 
    })
});
//dialog
calvin.Create("calvin.ui", function () { var Defaults = { title: "", footer: "", message: "", showTitle: true, showFooter: true, zIndex: 1000, showClose: true, autoShow: false, centerX: true, centerY: true, showOverlay: true, overlayCSS: { backgroundColor: '#fff', opacity: 50 }, dialogCSS: {}, messageCSS: {}, dragable: false }; this.dialog = calvin.Class({ init: function (elem, options) { var full, ie6 = calvin.ie6(), options = $.extend({}, Defaults, options); if (calvin.BodyOrHtmlOrWindow(elem)) { this.elem = /body/i.test(elem.nodeName) ? elem : (elem.body || elem.document.body); full = true } else { this.elem = elem; full = false; var positionType = this.elem.style.position; if (positionType === 'static' || positionType === "") { this.elem.style.position = 'relative' } } this.ie6 = ie6; this.full = full; this.options = options; this.container = this.elem; DialogHelper.createMask(this); var id = DialogHelper.wrapDialog(this); this.dialogId = id; DialogHelper.setDialogStyle(this); if (!options.autoShow) { this.close() } if (options.showTitle) { if (options.dragable) { $(id).CalvinDraggable({ containment: this.elem, handle: "div.Dialog_title" }) } } }, dialogId: "", close: function () { DialogHelper.close(this) }, open: function () { DialogHelper.open(this) }, setTitle: function (title) { $(this.dialogId).find("h4.innerTitle").html(title) }, resize: function () { this.mask.resize() }, setDialogCss: function (css) { this.options.dialogCSS = css; this.$dialog.css(css); DialogHelper.setDialogStyle(this) } }); var DialogHelper = { close: function (obj) { obj.$dialog.hide(); if (obj.mask) { obj.mask.hideMask() } }, open: function (obj) { obj.$dialog.show(); if (obj.mask) { obj.mask.showMask() } }, wrapDialog: function (obj) { var id = new Date().getTime(), opts = obj.options, $dialog = $("<div id='calvinDialog" + id + "' class='calvinDialog' style='display:block;position:" + (obj.full ? 'fixed' : 'absolute') + ";z-index:" + (opts.zIndex + 2) + ";margin: 0px;'></div>"), dialogContent = $('<div class="Dialog_content"></div>'), message = opts.message; $(opts.globalAppend ? opts.globalAppend : obj.elem).append($dialog); $dialog.append(dialogContent); $dialog.css(opts.dialogCSS); if (opts.showTitle) { var cursor = "cursor: move"; if (!opts.dragable) { cursor = "" } var dialogTitle = $('<div class="Dialog_title" id=\"Dialog_title' + id + '" style="' + cursor + '"><h4 style="float:left;display:inline-block;margin:0;" class="innerTitle">' + opts.title + '</h4></div>'); if (opts.showClose) { var closeBtn = $('<a href="javascript:void(0)" title="关闭窗口" class="close_btn" id="calvinCloseBtn' + id + '">×</a>'); closeBtn.click(function () { DialogHelper.close(obj) }); dialogTitle.prepend(closeBtn) } dialogContent.append(dialogTitle); dialogContent.append("<div class='line'/>") } var dialogMessage = $('<div class="Dialog_message"></div>').append($(message).show()); dialogContent.append(dialogMessage); dialogMessage.css(opts.messageCSS); if (opts.showFooter) { dialogContent.append("<div class='line'/>"); var dialogFooter = $('<div class="Dialog_footer"></div>').append($(opts.footer).show()); dialogContent.append(dialogFooter) } obj.$dialog = $dialog; return "#calvinDialog" + id }, createMask: function (obj) { var opts = obj.options; obj.mask = null; if (opts.showOverlay) { var mask = new calvin.ui.masker(obj.container, { baseZ: opts.zIndex++, overlayCSS: opts.overlayCSS }); obj.mask = mask } }, setDialogStyle: function (obj) { var $dialog = obj.$dialog, opts = obj.options, full = obj.full; if (calvin.ie6() && full) { $dialog.css("position", 'absolute'); $dialog[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (document.documentElement.scrollTop||document.body.scrollTop) + "px"'); $dialog[0].style.setExpression('left', '(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (document.documentElement.scrollLeft||document.body.scrollLeft) + "px"') } StyleHelper.center($dialog.get(0), opts.centerX, opts.centerY); var dialogHeight = $dialog.height(), dialogWidth = $dialog.width(), titleHeight = $("div.Dialog_title", $dialog).outerHeight() + 1, footerHeight = $("div.Dialog_footer", $dialog).outerHeight() + 1, $message = $("div.Dialog_message", $dialog), message_paddingV = parseFloat($message.css("paddingTop")) + parseFloat($message.css("paddingBottom")), message_paddingH = parseFloat($message.css("paddingLeft")) + parseFloat($message.css("paddingRight")), message_marginV = parseFloat($message.css("marginTop")) + parseFloat($message.css("marginBottom")), message_marginH = parseFloat($message.css("marginLeft")) + parseFloat($message.css("marginRight")), messageHeight = dialogHeight - message_paddingV - message_marginV; messageWidth = dialogWidth - message_paddingH - message_marginH; if (opts.showTitle) { messageHeight -= titleHeight } if (opts.showFooter) { messageHeight -= footerHeight } $("div.Dialog_message", $dialog).height(messageHeight).width(messageWidth) } }; var StyleHelper = { center: function (el, x, y) { if (!x && !y) return; var p = el.parentNode, s = el.style; p = /[body|html]/i.test(p.nodeName) ? (document.documentElement || document.body) : p; var $p = $(p); var borderAndPaddingWidth, borderAndPaddingHeight; var $ele = $(el); if ($.support.boxModel) { borderAndPaddingWidth = $p.outerWidth() - $p.width(); borderAndPaddingHeight = $p.outerHeight() - $p.height() } var l, t; if ($.support.boxModel) { l = ((p.offsetWidth - $ele.width()) / 2) - (borderAndPaddingWidth / 2); t = ((p.clientHeight - $ele.height()) / 2) - (borderAndPaddingHeight / 2) } else { l = (p.offsetWidth - $ele.width()) / 2; t = (p.offsetHeight - $ele.height()) / 2 } if (x) s.left = l > 0 ? (l + 'px') : '0'; if (y) s.top = t > 0 ? (t + 'px') : '0' } } });
//autocomplete
(function () {
    calvin.Create("calvin.ui", function () {
        var m = { min: 1, source: [], dynamicStyle: !0, selected: function () { }, dynamicSource: !1, ajaxOption: $.ajaxSettings, styleInfo: null, AutoInput: !0, MenuHideAuto: !0, OptimizationAjax: !1 }, l = { SetItemHover: function (a) { a.addClass("ui-menu-itemHover") }, RemoveItemHoverStyle: function (a) { $(">li", a).removeClass("ui-menu-itemHover") }, GetTextBoxStyle: function (a) {
            var b = $(a), f = b.offset(), a = $.data(a, "CalvinAutoComplete.data").options, d = b.data("styleInfo"); if (!a.dynamicStyle && d) return d;
            d = { left: f.left, top: f.top, width: b.width(), height: b.outerHeight() }; b.data("styleInfo", d); return d
        } 
        }, n = "", p = [], i = 0, j = { GenrateMenuItems: function (a, b, f, d, c) {
            var e = $.data(a, "CalvinAutoComplete.data").options, k, g; $(a).data("CalvinAutoCompleteLoading") ? g = $(a).data("CalvinAutoCompleteLoading") : (g = $("<div id='CalvinAutoCompleteLoading' class='autoCompleteLoading'></div>"), g.appendTo("body"), $(a).data("CalvinAutoCompleteLoading", g)); g.html(""); var h = l.GetTextBoxStyle(a); g.css({ left: h.left + "px", width: h.width +
"px", top: h.top + h.height + "px"
            }); k = g; k.show(); var i = a.value; g = /json/.test(e.ajaxOption.contentType) ? JSON.stringify($.extend({ key: i }, e.ajaxOption.data)) : $.param($.extend({ key: i }, e.ajaxOption.data)); if (e.dynamicSource) {
                if (e.OptimizationAjax && i.length > n.length && 0 < i.indexOf(n)) return e.source = p, g = j._GenrateMenuItems(a, o.FilterOptionSouces(e, a.value), b, f, d, c), k.hide(), g; $.ajax({ type: e.ajaxOption.type, url: e.ajaxOption.url, contentType: e.ajaxOption.contentType, dataType: e.ajaxOption.dataType, data: g, success: function (g) {
                    e.source =
g.length ? g : g.d; if (e.OptimizationAjax) { n = i; p = e.source } g = j._GenrateMenuItems(a, o.FilterOptionSouces(e, a.value), b, f, d, c); k.hide(); return g
                }, error: function (a) { e.ajaxOption.error && e.ajaxOption.error.call(this, a, k); k.hide(); return null } 
                })
            } else return g = j._GenrateMenuItems(a, o.FilterOptionSouces(e, a.value), b, f, d, c), k.hide(), g
        }, _GenrateMenuItems: function (a, b, f, d, c, e) {
            var i = $.data(a, "CalvinAutoComplete.data").options; j.RemoveMenuItems(a); if (null != b && b.length) {
                var g = $('<iframe style="position:absolute; z-index:-1;border:none;margin:0;padding:0;width:100%;top:0;left:0;" src="about:blank"></iframe>').css("opacity",
0), h = $("<ul class='ui-autocomplete ui-menu'></ul>"); $.each(b, function (b, c) { var d = $("<li class='ui-menu-item'></li>"), e = $("<a></a>"); $.isPlainObject(c) ? (d.data("MenuItem.Data", { text: c.text, value: c.value, Selected: !1 }), e.append(c.text)) : (d.data("MenuItem.Data", { text: c, value: "", Selected: !1 }), e.append(c)); d.append(e); h.append(d); d.mouseover(function () { l.RemoveItemHoverStyle(h); l.SetItemHover(d) }); q.SetItemClickEvent(d, $(a)) }); h.css({ left: e + "px", width: d + "px", top: c + f + "px" }); i.styleInfo && h.css(i.styleInfo);
                h.appendTo("body"); g.height(h.height()); h.append(g); return $(a).data("CalvinAutoComplete.data").ItemsContainer = h
            } 
        }, RemoveMenuItems: function (a) { a = $(a); a.data("CalvinAutoComplete.data") && (data = a.data("CalvinAutoComplete.data"), data.ItemsContainer && (data.ItemsContainer.remove(), a.data("CalvinAutoComplete.data").ItemsContainer = null)) }, getSelectedItem: function (a) { if (a) return a = $(">li.ui-menu-itemHover", a[0]), 0 != a.length ? a.eq(0) : null } 
        }, q = { SetTextBoxKeyUpDownEvent: function (a) {
            var b = $(a), f = $.data(a, "CalvinAutoComplete.data").options;
            b.unbind("keydown"); b.unbind("keyup"); b.keydown(function (a) {
                var c = b.data("CalvinAutoComplete.data"); if (!(null == c || null == c.ItemsContainer)) {
                    var c = c.ItemsContainer, e = $(">li", c[0]), f = e.length, g = $(">li.ui-menu-itemHover", c[0]), h = e.index(g[0]); switch (a.keyCode) { case 38: l.RemoveItemHoverStyle(c); 0 != h && g.prev().addClass("ui-menu-itemHover"); break; case 40: l.RemoveItemHoverStyle(c), 0 == g.length ? e.eq(0).addClass("ui-menu-itemHover") : h == f - 1 ? e.eq(0).addClass("ui-menu-itemHover") : g.next().addClass("ui-menu-itemHover") } a =
$(">li.ui-menu-itemHover", c[0]).eq(0); 0 != a.length && b.val(a.data("MenuItem.Data").text)
                } 
            }); b.bind("keyup", function (d) {
                var c = l.GetTextBoxStyle(a), e = b.data("CalvinAutoComplete.data"); switch (d.keyCode) {
                    case 38: break; case 40: break; case 13: c = j.getSelectedItem(e.ItemsContainer); null != c && (d = c.data("MenuItem.Data"), c.trigger("selected", [d])); j.RemoveMenuItems(a); break; case 8: if ("" != i && b.val() == i) break; i = b.val(); d = f.min; $.trim(b.val()).length >= d ? j.GenrateMenuItems(this, c.height, c.width, c.top, c.left) : j.RemoveMenuItems(this);
                        break; default: if ("" != i && b.val() == i) break; i = b.val(); d = f.min; $.trim(b.val()).length >= d && j.GenrateMenuItems(this, c.height, c.width, c.top, c.left)
                } 
            })
        }, SetItemClickEvent: function (a, b) { var f = b.data("CalvinAutoComplete.data").options, d = a.data("MenuItem.Data"); a.bind("selected", f.selected); a.bind("click", function (c) { f.AutoInput && b.val(d.text); a.trigger("selected", [d]); f.MenuHideAuto && a.parent().hide(); d.Selected = !0; c.stopPropagation() }) } 
        }, o = { FilterOptionSouces: function (a, b) {
            if (null == a.source || 0 == a.source.length) return null;
            if (a.dynamicSource) return a.source; var f = []; $.each(a.source, function (a, c) { if ($.isPlainObject(c)) { var e = RegExp(".*" + b + ".*", "g"); e.test(c.text) && f.push(c) } else e = RegExp(".*" + b + ".*", "g"), e.test(c) && f.push(c) }); return f
        }, GetSource: function (a, b) { var f = JSON.stringify($.extend({ key: b }, a.ajaxOption.extendData)); a.dynamicSource && (f = $.ajax({ type: "POST", url: a.ajaxOption.url, contentType: "application/json", dataType: "json", data: f, async: !1 }), f = JSON.parse(f.responseText), a.source = f); return a.source } 
        }; this.autocomplete =
calvin.Class({ init: function (a, b) { "string" == typeof a && (a = $(a).get(0)); void 0 != a && a.nodeName && this._init.call(a, b) }, _init: function (a) { var b = {}, f = $(this), d = $.data(this, "CalvinAutoComplete.data"); d ? ($.extend(!0, b, d.options, a), d.options = b) : ($.extend(!0, b, m, a), f.data("CalvinAutoComplete.data", { options: b, ItemsContainer: null }), j.RemoveMenuItems(this), q.SetTextBoxKeyUpDownEvent(this), $(document).click(function () { j.RemoveMenuItems(f[0]) })) } })
    }); $.fn.CalvinAutoComplete = function (m) {
        return this.each(function () {
            new calvin.ui.autocomplete(this,
m)
        })
    } 
})();
//combobox
(function () {
            var defaults = {
                treeBox: null,
                height: 200,
                selected: function (event, item) { }
            };

            function WrapTextBox(textBox, options) {
                var d = $(textBox);
                d.wrap("<span class='combo'></span>");
                var e = d.parent();
                d.addClass("combo-text");
                var f = $("<span><span class='combo-arrow'></span></span>");
                d.appendTo(e);
                e.append(f);
                d.data("styleInfo").height = e.outerHeight();
                f.bind("click", function (g) {
                    g.stopPropagation();
                    SetStyle(textBox, options.treeBox);
                });
                d.bind("click", function (g) {
                    g.stopPropagation();
                    SetStyle(textBox, options.treeBox);
                });
                return e
            };
            function SetStyle(textBox, treeContainer) {
                var e = $(textBox), f = $(treeContainer),
		g = e.data("styleInfo"), h = g.top + g.height, i = g.left;
                f.css({
                    top: h,
                    left: i
                });
                f.show()
            }
            $.fn.comboTree = function (options, param) {
                options = $.extend(true, {}, defaults, options);
                return this.each(function () {
                    if (options == "hide") {
                        $(options.treeBox).hide();
                        return;
                    }
                    $(options.treeBox).hover(function () { }, function () {
                        $(this).hide();
                    });
                    $(document).click(function () {
                        $(options.treeBox).hide();
                    });
                    var $this = $(this), offset = $this.offset(),
                    top = offset.top, left = offset.left;
                    $this.data("styleInfo", { top: top, left: left });
                    WrapTextBox(this, options);
                });
            }
        })();
//fixedtop
calvin.Create("calvin.ui", function () {
    this.fixedtop = calvin.Class({
        init: function (elem, options) {
            var _this = this;
            _this.fixed = false;
            var $elem = $(elem), initialPostion = $elem.css("position"), initialTop = $elem.css("top"), initialleft = $elem.css("left");
            $elem.data("calvin.ui.fixedtop", { initialPostion: initialPostion, initialTop: initialTop, initialleft: initialleft, options: options });
            this.elem = elem;
            var top = options.top || 0, left = options.left || 0;
            var offsetTop = $elem.offset().top - parseInt(options.top);
            $(window).scroll(function () {
                if ($(window).scrollTop() > offsetTop) {
                    if (_this.fixed) return;
                    if (calvin.ie6()) {
                        $("body").css("background-attachment", "fixed").css("background-image", "url(n1othing.txt)");
                        $elem.css("position", 'absolute');
                        var dom = '(document.documentElement || document.body)';
                        elem.style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + parseInt(top) + ') + "px"');
                        //elem.style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + parseInt(left) + ') + "px"');
                    }
                    else {
                        $elem.css({ position: 'fixed', top: top });
                    }
                    _this.fixed = true;
                }
                else if ($(window).scrollTop() <= offsetTop) {

                    if (!_this.fixed) return;
                    _this.fixed = false;
                    $elem.css({ position: initialPostion, top: initialTop });


                }
            });
        }
    });

});
//menu
(function () { $.fn.CalvinMenu = function (options, param) { var opts; var defaults = { zIndex: 110000, left: 0, top: 0, onShow: function () { }, onHide: function () { }, menuData: [], width: 80, autoOpen: false }; function InitMenu(target) { var $target = $(target); var data = $.data(target, "menu"); buildTopMenu(target, data); if (!data.autoOpen) { $target.hide() } }; function buildTopMenu(target, data) { var menuData = data.menuData; var $target = $(target); $target.addClass('CalvinMenu-top').addClass("CalvinMenu"); $target.css({ "z-index": opts.zIndex++, "keft": data.left, "top": data.top }); for (var i = 0, j = menuData.length; i < j; i++) { var itemData = menuData[i]; var MenuItem = bindMenuItem($target, itemData, target); if (itemData.sub) { var $subMenu = bindSubMenu(itemData.sub, target); MenuItem.$subMenu = $subMenu } } $target.width(data.width); $target.appendTo("body"); data.onShow.call(target) }; function bindSubMenu(menuData, target) { var $subMenu = $("<div class='menu'></div>"); $subMenu.css("z-index", opts.zIndex++); for (var i = 0, j = menuData.length; i < j; i++) { var itemData = menuData[i]; var MenuItem = bindMenuItem($subMenu, itemData, target); if (itemData.sub) { var $newSubMenu = arguments.callee(itemData.sub, target); MenuItem.$subMenu = $newSubMenu } } $subMenu.hide(); $subMenu.width(data.width); $subMenu.appendTo("body"); return $subMenu }; function bindMenuItem($menu, itemData, target) { if (itemData.line) { $menu.append("<div class='menu-sep'>&nbsp;</div>"); return null } else { var text = itemData.text, click = itemData.click, value = itemData.value, $item = $("<div style='height: 20px;' class='menu-item'> <div class='menu-text'>" + text + "</div></div>"); var selected = itemData.selected || itemData.click ? true : false || itemData.sub ? false : true; $item.data("itemData", { "text": text, "value": value, "click": click, "selected": selected }); if (itemData.ico) { $item.append("<div class='menu-icon " + itemData.ico + "'/>") } if (itemData.sub) { $item.append("<div class='menu-rightarrow'/>") } $menu.append($item); eventHelper.bindMenuItemEvent($item[0], target); return $item[0] } }; var eventHelper = { bindMenuItemEvent: function (menuItem, target) { eventHelper.howerEvent(menuItem, target); eventHelper.clickEvent(menuItem, target) }, howerEvent: function (menuItem, target) { var $menuItem = $(menuItem); $menuItem.hover(function () { $menuItem.siblings().each(function () { if (this.$subMenu) { hideMenu(this.$subMenu) } $(this).removeClass('menu-active') }); $menuItem.addClass("menu-active"); if (menuItem.$subMenu) { var $subMenu = menuItem.$subMenu; var itemPos = $menuItem.offset(); var left = itemPos.left + $menuItem.outerWidth() - 2; if (left + $subMenu.outerWidth() > $(window).width()) { left = itemPos.left - $subMenu.outerWidth() + 2 } var pos = { left: left, top: itemPos.top + 3 }; showMenu(menuItem.$subMenu, pos) } }, function (e) { $menuItem.removeClass("menu-active"); var $submenu = menuItem.$subMenu; if ($submenu) { if (e.pageX >= parseInt($submenu.css('left'))) { $menuItem.addClass('menu-active') } else { hideMenu($submenu) } } else { $menuItem.removeClass('menu-active') } }) }, clickEvent: function (menuItem, target) { var $menuItem = $(menuItem); $menuItem.click(function (e) { var itemData = $menuItem.data("itemData"); if (itemData.selected && itemData.click) { itemData.click.call(menuItem, itemData.text, itemData.value) }; hideAllMenu($(target)); e.stopPropagation() }) }, bindMenuEvent: function (menu, target) { } }; function showMenu($menu, pos) { if (!$menu) return; var data = $menu.data("menu"); data.onShow.call($menu[0]); if (pos) { $menu.css(pos) } $menu.show() }; function hideMenu($menu) { if (!$menu) return; var data = $menu.data("menu"); $menu.hide(); $menu.find('div.menu-item').each(function () { if (this.$subMenu) { hideMenu(this.$subMenu) } $(this).removeClass('menu-active') }) }; function hideAllMenu($target) { var data = $target.data("menu"); hideMenu($target); data.onHide.call($target[0]); return false }; if (typeof options === "string") { if (!$.data(this[0], "menu")) { alert("请先创建菜单！"); return } switch (options.toUpperCase()) { case "SHOW": hideAllMenu($(this)); return showMenu($(this), param); case "HIDE": hideAllMenu($(this)); return false; default: return } }; return this.each(function () { var _this = this; var $this = $(this); var state = $.data(this, 'menu'); if (state) { opts = $.extend(state.options, options); state.options = opts } else { opts = $.extend(defaults, options); $.data(this, "menu", opts); InitMenu(this); $(document).bind('click.menu', function () { hideAllMenu($(_this)) }) } }) } })();
//menubutton
(function () { $.fn.CalvinMenuButton = function (options, params) { var defaults = { disabled: false, plain: true, menuData: {}, menuId: null, duration: 100, activeClass: "" }; function isEmptyObject(obj) { for (var name in obj) { return false } return true }; function init(target) { var opts = $.data(target, 'menubutton').options; var btn = $(target); btn.removeClass(opts.activeClass); if (opts.menuId && opts.menuData && !isEmptyObject(opts.menuData)) { $(opts.menuId).CalvinMenu({ onShow: function () { btn.addClass(opts.activeClass) }, onHide: function () { btn.removeClass(opts) }, menuData: opts.menuData }) } btn.unbind('.menubutton'); if (opts.disabled == false && opts.menuId) { btn.bind('click.menubutton', function () { showMenu(); return false }); var timeout = null; btn.bind('mouseenter.menubutton', function () { timeout = setTimeout(function () { showMenu() }, opts.duration); return false }).bind('mouseleave.menubutton', function () { if (timeout) { clearTimeout(timeout) } }) } function showMenu() { var left = btn.offset().left; var top = btn.offset().top + btn.outerHeight(); if (left + $(opts.menuId).outerWidth() + 5 > $(window).width()) { left = $(window).width() - $(opts.menuId).outerWidth() - 5 } if (top + $(opts.menuId).outerHeight() + 5 > $(window).height()) { top = btn.offset().top - $(opts.menuId).outerHeight() } $('.CalvinMenu-top').CalvinMenu('hide'); $(opts.menuId).CalvinMenu('show', { left: left, top: top }); btn.blur() } }; options = options || {}; return this.each(function () { var state = $.data(this, 'menubutton'); if (state) { $.extend(state.options, options) } else { $.data(this, 'menubutton', { options: $.extend({}, defaults, { disabled: $(this).attr('disabled') == 'true', menuId: $(this).attr("menuId"), plain: ($(this).attr('plain') == 'false' ? false : true), duration: (parseInt($(this).attr('duration')) || 100) }, options) }); $(this).removeAttr('disabled') } init(this) }) } })();
//input
(function () { var Defaluts = { DefaultText: "" }; var EventHelper = { setInputEvent: function ($text) { $text = $($text); var opts = $text.data("CalvinInput.data").options; $text.focus(function () { if (this.value == opts.DefaultText) { this.value = ""; this.style.color = "#000" } }); $text.blur(function () { if (this.value == opts.DefaultText || $.trim(this.value) == "") { this.value = opts.DefaultText; this.style.color = "#a0a0a0" } }) } }; $.fn.CalvinInput = function (options, param) { return this.each(function () { var opts = {}, $this = $(this), state = $.data(this, 'CalvinInput.data'); $this.css("color", "#a0a0a0"); if (state) { $.extend(opts, state.options, options); state.options = opts } else { $.extend(opts, Defaluts, options); this.value = opts.DefaultText; $this.data("CalvinInput.data", { options: opts }); EventHelper.setInputEvent($this) } }) } })();
//uiblock
(function (b) {
    function p(d, a) {
        var e = d == window, c = a && void 0 !== a.message ? a.message : void 0; a = b.extend({}, b.blockUI.defaults, a || {}); a.overlayCSS = b.extend({}, b.blockUI.defaults.overlayCSS, a.overlayCSS || {}); var g = b.extend({}, b.blockUI.defaults.css, a.css || {}), k = b.extend({}, b.blockUI.defaults.themedCSS, a.themedCSS || {}), c = void 0 === c ? a.message : c; e && l && s(window, { fadeOut: 0 }); if (c && "string" != typeof c && (c.parentNode || c.jquery)) {
            var h = c.jquery ? c[0] : c, f = {}; b(d).data("blockUI.history", f); f.el = h; f.parent = h.parentNode;
            f.display = h.style.display; f.position = h.style.position; f.parent && f.parent.removeChild(h)
        } b(d).data("blockUI.onUnblock", a.onUnblock); var f = a.baseZ, m = b.browser.msie || a.forceIframe ? b('<iframe class="blockUI" style="z-index:' + f++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + a.iframeSrc + '"></iframe>') : b('<div class="blockUI" style="display:none"></div>'), h = a.theme ? b('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + f++ +
';display:none"></div>') : b('<div class="blockUI blockOverlay" style="z-index:' + f++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), f = b(a.theme && e ? '<div class="blockUI ' + a.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (f + 10) + ';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (a.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : a.theme ?
'<div class="blockUI ' + a.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (f + 10) + ';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (a.title || "&nbsp;") + '</div><div class="ui-widget-content ui-dialog-content"></div></div>' : e ? '<div class="blockUI ' + a.blockMsgClass + ' blockPage" style="z-index:' + (f + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + a.blockMsgClass + ' blockElement" style="z-index:' +
(f + 10) + ';display:none;position:absolute"></div>'); c && (a.theme ? (f.css(k), f.addClass("ui-widget-content")) : f.css(g)); a.theme || a.applyPlatformOpacityRules && b.browser.mozilla && /Linux/.test(navigator.platform) || h.css(a.overlayCSS); h.css("position", e ? "fixed" : "absolute"); (b.browser.msie || a.forceIframe) && m.css("opacity", 0); var g = [m, h, f], r = e ? b("body") : b(d); b.each(g, function () { this.appendTo(r) }); a.theme && a.draggable && b.fn.draggable && f.draggable({ handle: ".ui-dialog-titlebar", cancel: "li" }); g = y && (!b.boxModel ||
0 < b("object,embed", e ? null : d).length); if (u || g) {
            e && a.allowBodyStretch && b.boxModel && b("html,body").css("height", "100%"); if ((u || !b.boxModel) && !e) var g = parseInt(b.css(d, "borderTopWidth")) || 0, k = parseInt(b.css(d, "borderLeftWidth")) || 0, p = g ? "(0 - " + g + ")" : 0, q = k ? "(0 - " + k + ")" : 0; b.each([m, h, f], function (b, d) {
                var c = d[0].style; c.position = "absolute"; if (2 > b) e ? c.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:" + a.quirksmodeOffsetHack + ') + "px"') : c.setExpression("height",
'this.parentNode.offsetHeight + "px"'), e ? c.setExpression("width", 'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : c.setExpression("width", 'this.parentNode.offsetWidth + "px"'), q && c.setExpression("left", q), p && c.setExpression("top", p); else if (a.centerY) e && c.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
c.marginTop = 0; else if (!a.centerY && e) { var f = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + (a.css && a.css.top ? parseInt(a.css.top) : 0) + ') + "px"'; c.setExpression("top", f) }
            })
        } c && (a.theme ? f.find(".ui-widget-content").append(c) : f.append(c), (c.jquery || c.nodeType) && b(c).show()); (b.browser.msie || a.forceIframe) && a.showOverlay && m.show(); if (a.fadeIn) g = a.onBlock ? a.onBlock : t, m = a.showOverlay && !c ? g : t, g = c ? g : t, a.showOverlay && h._fadeIn(a.fadeIn, m), c && f._fadeIn(a.fadeIn,
g); else if (a.showOverlay && h.show(), c && f.show(), a.onBlock) a.onBlock(); v(1, d, a); e ? (l = f[0], n = b(":input:enabled:visible", l), a.focusInput && setTimeout(w, 20)) : z(f[0], a.centerX, a.centerY); a.timeout && (c = setTimeout(function () { e ? b.unblockUI(a) : b(d).unblock(a) }, a.timeout), b(d).data("blockUI.timeout", c))
    } function s(d, a) {
        var e = d == window, c = b(d), g = c.data("blockUI.history"), k = c.data("blockUI.timeout"); k && (clearTimeout(k), c.removeData("blockUI.timeout")); a = b.extend({}, b.blockUI.defaults, a || {}); v(0, d, a); null === a.onUnblock &&
(a.onUnblock = c.data("blockUI.onUnblock"), c.removeData("blockUI.onUnblock")); var h; h = e ? b("body").children().filter(".blockUI").add("body > .blockUI") : b(".blockUI", d); e && (l = n = null); a.fadeOut ? (h.fadeOut(a.fadeOut), setTimeout(function () { q(h, g, a, d) }, a.fadeOut)) : q(h, g, a, d)
    } function q(d, a, e, c) {
        d.each(function (a, b) { this.parentNode && this.parentNode.removeChild(this) }); a && a.el && (a.el.style.display = a.display, a.el.style.position = a.position, a.parent && a.parent.appendChild(a.el), b(c).removeData("blockUI.history"));
        if ("function" == typeof e.onUnblock) e.onUnblock(c, e)
    } function v(d, a, e) { var c = a == window; a = b(a); if (d || (!c || l) && (c || a.data("blockUI.isBlocked"))) c || a.data("blockUI.isBlocked", d), !e.bindEvents || d && !e.showOverlay || (d ? b(document).bind("mousedown mouseup keydown keypress", e, x) : b(document).unbind("mousedown mouseup keydown keypress", x)) } function x(d) {
        if (d.keyCode && 9 == d.keyCode && l && d.data.constrainTabKey) {
            var a = n, e = d.shiftKey && d.target === a[0]; if (!d.shiftKey && d.target === a[a.length - 1] || e) return setTimeout(function () { w(e) },
10), !1
        } a = d.data; return 0 < b(d.target).parents("div." + a.blockMsgClass).length ? !0 : 0 == b(d.target).parents().children().filter("div.blockUI").length
    } function w(b) { n && (b = n[!0 === b ? n.length - 1 : 0]) && b.focus() } function z(d, a, e) { var c = d.parentNode, g = d.style, k = (c.offsetWidth - d.offsetWidth) / 2 - (parseInt(b.css(c, "borderLeftWidth")) || 0); d = (c.offsetHeight - d.offsetHeight) / 2 - (parseInt(b.css(c, "borderTopWidth")) || 0); a && (g.left = 0 < k ? k + "px" : "0"); e && (g.top = 0 < d ? d + "px" : "0") } b.fn._fadeIn = b.fn.fadeIn; var t = function () { }, r = document.documentMode ||
0, y = b.browser.msie && (8 > b.browser.version && !r || 8 > r), u = b.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !r; b.blockUI = function (b) { p(window, b) }; b.unblockUI = function (b) { s(window, b) }; b.growlUI = function (d, a, e, c) { var g = b('<div class="growlUI"></div>'); d && g.append("<h1>" + d + "</h1>"); a && g.append("<h2>" + a + "</h2>"); void 0 == e && (e = 3E3); b.blockUI({ message: g, fadeIn: 700, fadeOut: 1E3, centerY: !1, timeout: e, showOverlay: !1, onUnblock: c, css: b.blockUI.defaults.growlCSS }) }; b.fn.block = function (d) {
    return this.unblock({ fadeOut: 0 }).each(function () {
        "static" ==
b.css(this, "position") && (this.style.position = "relative"); b.browser.msie && (this.style.zoom = 1); p(this, d)
    })
}; b.fn.unblock = function (b) { return this.each(function () { s(this, b) }) }; b.blockUI.version = 2.39; b.blockUI.defaults = { message: "<h1>Please wait...</h1>", title: null, draggable: !0, theme: !1, css: { padding: 0, margin: 0, width: "30%", top: "40%", left: "35%", textAlign: "center", color: "#000", border: "3px solid #aaa", backgroundColor: "#fff", cursor: "wait" }, themedCSS: { width: "30%", top: "40%", left: "35%" }, overlayCSS: { backgroundColor: "#fff",
    opacity: .6, cursor: "wait"
}, growlCSS: { width: "350px", top: "10px", left: "", right: "10px", border: "none", padding: "5px", opacity: .6, cursor: "default", color: "#fff", backgroundColor: "#000", "-webkit-border-radius": "10px", "-moz-border-radius": "10px", "border-radius": "10px" }, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank", forceIframe: !1, baseZ: 1E3, centerX: !0, centerY: !0, allowBodyStretch: !0, bindEvents: !0, constrainTabKey: !0, fadeIn: 200, fadeOut: 400, timeout: 0, showOverlay: !0, focusInput: !0,
    applyPlatformOpacityRules: !0, onBlock: null, onUnblock: null, quirksmodeOffsetHack: 4, blockMsgClass: "blockMsg"
}; var l = null, n = []
})(jQuery);
//查询过滤tabs
(function () {
    $.fn.filetertab = function () {
        return this.each(function () {
            var _elem = this;
            $(".tab-header>li a", this).hover(function (e) {
                $(".tab-header>li a").attr("class", "normal");
                $(this).attr("class", "current")
                var i = $(".tab-header>li a", _elem).index(this);
                $(".tab_content", _elem).removeClass("current").hide();
                $(".tab_content", _elem).eq(i).addClass("current").show();
            }, function (e) {
                ///var i = $(".tab-header>li a", _elem).index(this);
                if (e.relatedTarget.className != "tab_content current") {
                    //$(".tab_content", _elem).eq(i).removeClass("current").hide();
                    $(".tab_content", _elem).hide();
                    $(this).attr("class", "normal")
                }
            });
            $(".tab_content", this).hover(function (e) {
                //donothing
            }, function (e) {
                //var i = $(".tab_content", _elem).index(this);
                if (!e.relatedTarget || !e.relatedTarget.className || e.relatedTarget.className != "current") {
                    $(".tab-header>li a").attr("class", "normal");
                    $(this).removeClass("current").hide();
                }
            });

        });
    }
})(jQuery);

