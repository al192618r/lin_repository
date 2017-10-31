; $(function () {
    if (window.devicePixelRatio == undefined) {
        window.devicePixelRatio = (function () {
            var ratio = 1;
            if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
                ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
            }
            return ratio;
        })()
    }
    
    var wide = 0;

    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;

    var trueScreenWidth = window.screen.width;
    var browserZoomLevel = window.devicePixelRatio;
    if (isIE || isEdge) {
        trueScreenWidth = Math.round(trueScreenWidth * browserZoomLevel);
    }
    if (trueScreenWidth < 3000) {
        
        LoadTables.dataShareTable(wide);
        LoadTables.cityDictionary();
    }
});

var LoadTables = {
    dataShareTable: function (wide) {
        var max;
        if (wide)
            max = 10;
        else
            max = 7;

        $.when($.ajax({
            type: "post",
            url: "share?getdatasharingdetail",
            data: {"search":  ''  ,"pagenum":  1 ,"pagesize":  max },
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        })).done(function (data) {
            $("#data_table_2 tbody").html("");
            var content = data;
            //console.log(content);

            appendTable(content.data);
            $("#data_table_2 tr:even").css("background", "#0f266e");

        }).fail(function (data) {
            console.log(data);
        }).always(function () {

        });

        function appendTable(data) {
            var str = "";

            var arr = [];
            $.each(data, function (i, e) {
                str += '<tr>';
                //str += '<td>' + (i + 1) + '</td>';
                if (wide) str += '<td>' + (i + 1) + '</td>';
                //str += '<td class="txtLeft" title="' + e.ORGNAME + '">' + (e.ORGNAME.length > 12 ? e.ORGNAME.slice(0, 12) + '...' : e.ORGNAME) || '' + '</td>';
                str += '<td class="txtLeft" title="' + (e.ORGNAME || '') + '">' + e.ORGNAME || '' + '</td>';
                str += '<td class="txtLeft" title="' + (e.ITEM || '') + '">' + e.ITEM || '' + '</td>';

                //正式数据用
                str += '<td class="txtLeft" title="' + (e.SOURCEORGNAME || '') + '">' + (e.SOURCEORGNAME || '') + '</td>';
                //临时更改
/*                str += '<td class="txtLeft" title="' +
                    ($.trim(e.ORGNAME) === "福州市发展和改革委员会" ? "福州市数字福州建设领导小组办公室" : e.SOURCEORGNAME || '') + '">' +
                    ($.trim(e.ORGNAME) === "福州市发展和改革委员会" ? "福州市数字福州建设领导小组办公室" : e.SOURCEORGNAME || '') + '</td>';
*/
                str += '<td>' + e.TYPE || '' + '</td>';
                str += '<td>' + e.NUM || '' + '</td>';
                str += '<td>' + $.timestampToTime(e.TIME) || '' + '</td>';
                str += '</tr>';

            });
            $("#data_table_2 tbody").append(str);
        }

    },
    cityDictionary: function () {
        if ($("#ul_citydic").length > 0) {
            $.when($.ajax({
                type: "post",
                url: "share?getcity",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            })).done(function (data) {
                $("#ul_citydic").html("");
                var content = data;
                //console.log(content);

                appendTable(content);

            }).fail(function (data) {
                console.log(data);
            }).always(function () {
                //$("#data_table_2 tr:even").css("background", "#0f266e");

            });

            function appendTable(data) {
                var str = "";

                $.each(data, function (i, e) {

                    str += '<li idval="' + (e.ID || '') +
                        //'" title="' + (e.ORGNAME || '') +
                        '" style="' + ((e.ORGNAME || '').length > 6 ? ('width:' + (e.ORGNAME || '').length * 15 + 'px') : '') +
                        '" class="' + (e.ID ? 'disabled' : 'disabled') + '"><a href="javascript:void(0)">' + (e.ORGNAME || '') + '</a></li>';

                });

                $("#ul_citydic").append(str);
            }
        }
    }
};

Object.freeze(LoadTables);