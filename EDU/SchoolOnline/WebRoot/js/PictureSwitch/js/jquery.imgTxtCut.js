/**
**  使用说明：

1. 需要先引用jquery 文件
2.  图片简单切换效果 示例代码如下：

$(function () {
$("#img-txt-box").imgTxtCut({
effects: "fade",
speed: 300
});
});


**********************************************************/



; (function ($) {
    $.fn.imgTxtCut = function (options) {
        //默认设置
        var options_default = {
            effects: "flaser",
            speed: "normal"
        }
        //插件设置
        var opts = $.extend({}, options_default, options);
        var targetObj = $(this).find("li");
        var targetObjH = $(this).find("li img").height();
        return this.each(function () {
            $.fn.imgTxtCut.effect[opts.effects](targetObj, targetObjH, opts);
        });
    };

    //效果
    $.fn.imgTxtCut.effect = {
        //图片上拉效果
        flaser: function (targetObj, targetObjH, opts) {
            targetObj.hover(function () {
                $(this).find('img').stop().animate({ height: "0" }, opts.speed);
            }, function () {
                $(this).find('img').stop().animate({ height: targetObjH }, opts.speed);

            });
        },
        //图片渐变效果
        fade: function (targetObj, targetObjH, opts) {
            targetObj.hover(function () {
                $(this).find(".imgBox").stop().animate({ opacity: 0.1 }, opts.speed);
            }, function () {
                $(this).find(".imgBox").stop().animate({ opacity: 1 }, opts.speed);
            });
        }
    };


})(jQuery);






