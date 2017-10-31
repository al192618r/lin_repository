jQuery.fn.extend(
{
    iframeAutoHeight: function (callback, stayInSecond) {
        this.each(function () {
            var w = this;
            $(this).load(function () {
                var cnt = 0;
                var lastHeight = 0;
                setTimeout(function () {
                    try {
                        var bHeight = w.contentWindow.document.body.scrollHeight;
                        var dHeight = w.contentWindow.document.documentElement.scrollHeight;
                        var contentHeight = Math.max(bHeight, dHeight);

                        var bWidth = w.contentWindow.document.body.scrollWidth;
                        var dWidth = w.contentWindow.document.documentElement.scrollWidth;
                        var contentWidth = Math.max(bWidth, dWidth);


                        //var contentHeight =0;
                        //var contentWidth =0;
                        //var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
                        //var dfdf1 = w.contentWindow.document.documentElement.scrollHeight;
                        //var dfdf2 = w.contentWindow.document.documentElement.offsetHeight;
                        //var dfdf3 = w.contentWindow.document.body.scrollHeight;
                        //var dfdf4 = w.contentWindow.document.body.offsetHeight;
                        //if (isChrome){
                        //    contentHeight = w.contentWindow.document.documentElement.scrollHeight;
                        //    contentWidth = w.contentWindow.document.documentElement.scrollWidth;
                        //}
                        //else {
                        //    contentHeight = w.contentWindow.document.body.scrollHeight;
                        //    contentWidth = w.contentWindow.document.body.scrollWidth;
                        //}

                        

                        //var contentHeight = 0;
                        //var contentWidth = 0;
                        //if (w.contentDocument && w.contentDocument.body.offsetHeight) {
                        //    contentHeight = iframe.contentDocument.body.offsetHeight;
                        //    contentWidth = iframe.contentDocument.body.offsetWidth;
                        //}
                        //else {
                        //    if (w.document && w.document.body.scrollHeight) {
                        //        contentHeight = iframe.Document.body.scrollHeight;
                        //        contentWidth = iframe.Document.body.scrollWidth;
                        //    }
                        //}

                        if (lastHeight!= contentHeight) {
                            $(w).css("height", contentHeight);
                            lastHeight = contentHeight;
                            if (callback) callback(lastHeight, w.contentWindow.document);
                        }
                        if ((contentWidth - $(w).width()) > 20) {
                            $(w).width(contentWidth);
                        }
                    } catch (e) {

                    }
                    if (++cnt < ((stayInSecond || 3600) * 2)) setTimeout(arguments.callee, 500);
                }, 100);
            });
        });
    }
});