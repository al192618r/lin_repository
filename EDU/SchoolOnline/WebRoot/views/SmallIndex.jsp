<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<fmt:setBundle basename="resources.config" />
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<title></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,10,9,8,chrome=1" />
<meta name="renderer" content="webkit" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"	content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
<link href="<%=basePath%>css/BusStyle.css" rel="stylesheet"	type="text/css" />
<link href="<%=basePath%>css/share_style_pc.css" rel="stylesheet"	type="text/css" />
<script src="<%=basePath%>js/jquery-1.12.4/jquery.min.js"></script>
<script src="<%=basePath%>js/Respond.js/respond.js"></script>
<script src="<%=basePath%>js/highcharts-v5/highcharts.js"></script>
<script src="<%=basePath%>js/highcharts-v5/highcharts-more.js"></script>
<script src="<%=basePath%>js/highcharts-v5/highcharts-3d.js"></script>
<script src="<%=basePath%>js/highcharts-v5/modules/solid-gauge.js"></script>
<script	src="<%=basePath%>js/highcharts-v5/modules/no-data-to-display.js"></script>
<script src="<%=basePath%>js/echarts-v3/echarts.min.js"></script>
<script src="<%=basePath%>js/layer/layer.js"></script>
<script src="<%=basePath%>js/underscore-1.8.3/underscore-min.js"></script>
<script src="<%=basePath%>js/PictureSwitch/js/countUp.min.js"	type="text/javascript"></script>
<script src="<%=basePath%>js/custom/index_charts.js"></script>
<script src="<%=basePath%>js/custom/index_tables.js"></script>
<script src="<%=basePath%>js/extendUtils.js"></script>
<style type="text/css">
body, html {
	width: 100%;
	height: 100%;
}

.J_item {
	overflow: hidden;
}

.J_item>div {
	float: left !important;
	display: inline;
}

.item-inner {
	width: 600px;
	/* height: 100%; */
	zoom: 1;
	display: block;
}

.ser_col {
	cursor: pointer;
}

#data_table_2 td {
	max-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>

<script>

        var unitJson;
        var unitOrgName;
        var oldwidth = $(".ser_tile_main").width();

        $(function () {
        getCategoryInfoV2();
        getfilingShareInfoV2();
        getTodayConvergeShareInfoV2();
        GetBusinfo();
//         LoadTables.dataShareTable();
            //setH();
            $("#info_table tr:even").css("background", "#0f266e");
            $("#data_table_2 tr:even").css("background", "#0f266e");
            $(".tab ul li").click(function () {
                $(this).addClass("now").siblings().removeClass("now");
            })

            $("#ul_sharedOrgNav a").click(function () {
                var id = $(this).prop("id");
                if (id === "a_sharedOrgTotal") {
                    $("#chart_sharedOrgTotal").show(0);
                    $("#chart_sharedOrgMonth").hide(0);
                } else {
                    $("#chart_sharedOrgTotal").hide(0);
                    $("#chart_sharedOrgMonth").show(0);
                }
            })

            $("#atlas").click(function () {
                openLayerIframe("http://10.6.88.104:8080/EnterpriseRelation/", "企业关系图谱", true, 0.3, "80%", '90%', "", "");
            })

			$(document).on("mouseup",document,function(){
	    		if (document.activeElement != document.body) document.activeElement.blur();
	    	})
        });

        function openLayerIframe(src, title, shadeClose, shade, width, height, success, cancel) {
            //var layload = layer.msg('加载中...', {
            //    icon: 16,
            //    shade: 0.3,
            //    time: 20000
            //});

            var layload = layer.load(1, {
                shade: 0.3
            });

            var ifr = $('<iframe/>', {
                id: 'MainPopupIframe',
                style: 'display:none;',
                scrolling: "auto",
                allowtransparency: "true",
                width: "100%",
                height: "100%",
                frameborder: 0
            });

            if ($("#MainPopupIframe").length == 0) $('body').append(ifr);

            $("#MainPopupIframe").one('load', function () {
                layer.open({
                    type: 1,
                    title: title || "",
                    shadeClose: (!!shadeClose),
                    shade: shade || 0.3,
                    maxmin: true,
                    area: [width || '80%', height || '90%'],
                    scrollbar: false,
                    content: $('#MainPopupIframe'), //iframe的url
                    //content: "SmallIndex.aspx", //iframe的url
                    success: function (layero, index) {
                        layer.close(layload);
                        if (_.isFunction(success)) success();
                    },
                    cancel: function (layero, index) {
                        if (_.isFunction(cancel)) cancel();
                        $("#MainPopupIframe").prop("src", "");
                    }
                });
                $(this).parent().css("overflow", "hidden");
            });
            document.getElementById('MainPopupIframe').src = src;
            //$("#MainPopupIframe").prop("src", "SmallIndex.aspx");
        }

        //打开数据超市
        function openDataMarket() {
            window.open("<%=basePath%>/supermarketController/supermarket");
        }

        $(function () {
            //全局属性
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ',',
                    noData: '暂无数据显示'
                }
            });

            //近一周数据增长情况
            $('#WeekCategory').highcharts({
                lang: {
                    thousandsSep: ','
                },
                chart: {
                    type: 'column',
                    backgroundColor: 'rgba(255,255,255,0.002)',
                    style: {
                        fontFamily: '"Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif'
                    }
                },
                title: {
                    text: '单位：条',
                    //floating: true,
                    align: 'left',
                    y: 35,
                    style: {
                        fontSize: '14px',
                        color: '#027FDE',
                        fontWeight: 'normal'
                    },
                    useHTML: true
                },
                credits: {
                    href: null,
                    text: "2017年",
                    position: {
                        align: 'left',
                        x: 10,
                        y: -22
                    },
                    style: {
                        fontSize: '14px',
                        color: '#ffffff'
                    }
                },
                xAxis: {
                    categories: [],
                    labels: {
                        style: {
                            fontSize: '14px',
                            color: '#ffffff',
                            fontWeight: 'normal'
                        }
                        //autoRotation: false
                    },
                    reversed: true,
                    gridLineWidth: 0.5,
                    gridLineColor: '#4e5c7f',
                    tickWidth: 0,
                    lineColor: '#9c9c9c',
                    lineWidth: 1.5
                },
                yAxis: [{
                    //type: 'logarithmic',
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '14px',
                            color: '#ffffff',
                            fontWeight: 'normal'
                        }
                        //autoRotation: false
                    },
                    showFirstLabel: false,
                    showLastLabel: false,
                    tickInterval: 20,
                    min: 0,
                    tickWidth: 0,
                    lineWidth: 1.5,
                    gridLineWidth: 0.5,
                    gridLineColor: '#4e5c7f ',
                    lineColor: '#9c9c9c'
                    //showLastLabel:false
                }],
                legend: {
                    verticalAlign: 'top',
                    itemStyle: {
                        fontSize: '15px',
                        color: '#ffffff',
                        fontWeight: 'normal'
                    },
                    itemHoverStyle: {
                        color: '#ffffff'
                    },
                    itemWidth: 62,
                    itemDistance: 4,
                    symbolPadding: 2,
                    squareSymbol: true,
                    symbolRadius: 0
                },
                tooltip: {
                    formatter: function () {
                        if (this.y < 50) {
                            return this.point.name + '<br/>' + this.series.name + '：' + GetOracledata("hiddenWeekCategory", this.series.name, this.x) + '条';
                        } else {
                            return '总数：<br/>' + Highcharts.numberFormat(parseInt(this.point.value) / 10000, 2) + '万条';
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        minPointLength: 5,
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                //return Highcharts.numberFormat(parseInt(Math.pow(2, this.y)), 0);
                                return GetOracledata("hiddenWeekCategory",this.series.name, this.x);
                            },
                            color: '#ffffff',
                            style: {
                                fontSize: '14px',
                                color: '#ffffff',
                                fontWeight: 'normal'
                            }
                        },
                        borderWidth: 0,
                        borderRadius: 3
                    }
                },
                series: [{
                    name: '法人',
                    data: [],
                    color: '#2196FF',
                }, {
                    name: '自然人',
                    data: [],
                    color: '#FFA100'
                }, {
                    name: '信用',
                    data: [],
                    color: '#93C434'
                }, {
                    name: '证照',
                    data: [],
                    color: '#01C8A9'
                }, {
                    name: '监测',
                    data: [],
                    color: '#F1556E'
                }, {
                    name: '总数',
                    data: [],
                    type: 'line',
                    color: '#E4FD00'
                }]
            });
            //部门信息汇聚总量TOP5
            $('#UnitData').highcharts({
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(255,255,255,0.002)',
                    spacingTop: 30,
                    style: {
                        fontFamily: '"Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif'
                    }
                    //height: 330
                },
                title: {
                    text: '单位：万条',
                    floating: true,
                    align: 'left',
                    y: -15,
                    style: {
                        fontSize: '14px',
                        color: '#027FDE'
                    }
                },
                credits: {
                    href: null,
                    text: ""
                },
                xAxis: {
                    categories: [],
                    labels: {
                        style: {
                            fontSize: '14px',
                            color: '#ffffff'
                        },
                        autoRotation: false
                    },
                    gridLineWidth: 0.5,
                    gridLineColor: '#4e5c7f',
                    tickWidth: 0,
                    lineColor: '#9c9c9c',
                    lineWidth: 1.5
                },
                yAxis: [{
                    //type: 'logarithmic',
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '14px',
                            color: '#ffffff'
                        },
                        formatter: function () {
                            return Highcharts.numberFormat(this.value / 10000, 0)
                        }
                    },
                    //tickPositions:[20000000,40000000,60000000,80000000,100000000],
                    tickPixelInterval: 50,
                    gridLineWidth: 0.5,
                    gridLineColor: '#4e5c7f',
                    tickWidth: 0,
                    lineColor: '#9c9c9c',
                    lineWidth: 1.5
                }],
                legend: {
                    enabled: false
                },
                tooltip: {
                    formatter: function () {
                        if (this.y < 50) {
                            return this.point.name + '：<br/>' + GetOracledata("hiddenDetailUnit", this.point.name, this.series.name) + '条';
                        }
                        else {
                            return this.point.name + '：<br/>' + Highcharts.numberFormat(this.y / 10000, 0) + '万条';
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        pointPadding: 0,
                        minPointLength: 10
                    }
                },
                series: [{
                    name: '',
                    data: [],
                    showInLegend: false,
                    color: '#E4FD00',
                    marker: {
                        fillColor: '#2846AA',
                        lineWidth: 2,
                        lineColor: null // inherit from series
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#fff',
                        formatter: function () {
                            return Highcharts.numberFormat(this.y / 10000, 0) + '万条';
                        }
                    }
                }]
            });            
            //获取数据
            gethiddenWeekCategory();
            gethiddenUnit();
            
            //转换数据            
            getAjaxStatistic();
            DepartList();
            UnitResize();
        })

        function setH() {
            var h1 = $("body").innerHeight();
            var h2 = $(".logo").outerHeight(true);
            var h3 = $(".top_tile_main").outerHeight(true);
            var h4 = $(".sub_title").outerHeight(true);
            $(".main_bottom").height(h1 - h2 - h3 - 50);
            $(".bottom_tile_main").height(h1 - h2 - h3 - h4 - 50 - 10);
            var h = $(".bottom_tile_main").outerHeight(true);
            $(".service_tile_1").height((h / 2) - 30 - 5);
            $(".bottom_tile_main ul li").height(h / 2 - 5);
            $(".bottom_tile_main ul li div").height(h / 2 - 5 - 10 - 20);
        }

        //$(window).resize(function () {
        //    UnitResize();
        //})

        var lazyLayout = _.debounce(UnitResize, 300);
        $(window).resize(lazyLayout);

        function UnitResize() {
            if (unitJson) {
                UnitDetailData(unitJson, unitOrgName);
            }
        }

        //近一周数据增长情况
        function WeekJsonData() {
            var obj = eval('(' + document.getElementById('hiddenWeekCategory').value + ')');
            if (obj.length == 0) {
                return;
            }            
            var xline = [$.timestampToTime(obj[0].TIME).slice(5, 10)];
            for (var i = 1; i < obj.length; i++) {
                if ($.timestampToTime(obj[i].TIME).slice(5, 10) !== xline[xline.length - 1]) {
                    xline.push($.timestampToTime(obj[i].TIME).slice(5, 10));
                    if (xline.length > 4) {
                        break;
                    }
                }
            }
            //test
            //xline = ["03-24","03-23", "03-22", "03-21", "03-20"]

            //以上为去重后的日期
            $("#WeekCategory").highcharts().xAxis[0].update({ categories: xline })

            var typename = ["法人", "自然人", "信用", "电子证照", "监测数据", "总数"];
            //以上为类型名称

            var datalist = [];
            //var _count = [];
            //var realData = [];
            for (var kk = 0; kk < typename.length; kk++) {
                var list = []
                //var _list = [];
                var name = typename[kk];
                for (var ii = 0; ii < obj.length; ii++) {

                    if (obj[ii].TYPE == name) {
                        //list.push([obj[ii].TIME.slice(0,10),obj[ii].CON])

                        if (obj[ii].CON == 0) {
                            list.push([$.timestampToTime(obj[ii].TIME).slice(5, 10), null])
                        } else {
                            list.push([$.timestampToTime(obj[ii].TIME).slice(5, 10), (Math.log(obj[ii].CON) / Math.log(2))])
                        }
                        //_list.push([obj[ii].TIME.slice(2, 10), obj[ii].CON]);
                    }
                }
                if (true) {
                    var arr = [];
                    for (var q = 0; q < xline.length; q++) {
                        var _xtime = xline[q];
                        var e = 0;
                        var xvalue = "";
                        for (var w = 0; w < list.length; w++) {
                            if (list[w][0] == _xtime) {
                                e = 1;
                                xvalue = list[w][1];
                                break;
                            }
                        }
                        if (e == 1) {
                            arr.push([_xtime, xvalue])
                        } else {
                            arr.push([_xtime, null])
                        }
                    }
                    list = arr;
                    //_list = arr;
                }

                //_count.push(list);
                //realData.push(_list)//获取真实数据
                $("#WeekCategory").highcharts().series[kk].update({ data: list });
            }

            // addcolumn(xline, _count, realData);
            clearShadow();
        }

        //用来获取柱状图总数
        function addcolumn(xline, list, real) {
            var count = [];
            for (var i = 0; i < 5; i++) {
                var all = 0;
                var _real = 0;
                for (var j = 0; j < list.length; j++) {
                    var value = list[j][i][1] || 0;
                    var realdata = real[j][i][1] || 0;
                    all += value;
                    _real += realdata;
                }
                //count.push([xline[i], (Math.log(all) / Math.log(2))])
                count.push({ 'name': xline[i], 'y': all, 'value': _real })
            }
            $("#WeekCategory").highcharts().series[5].update({ data: count });
        }

        //部门信息汇聚总量TOP5
        function UnitJsonData() {
            var obj = eval('(' + document.getElementById('hiddenUnit').value + ')')
            if (obj.length == 0) {
                return;
            }
            var item = [];
            var orgname = [];//用于查询
            var xname = [];
            for (var i = 0; i < 6; i++) {
                if (obj[i].ORGSHORTNAME != null) {
                    item.push([obj[i].ORGSHORTNAME, obj[i].CON]);
                    xname.push([obj[i].ORGSHORTNAME]);
                } else {
                    item.push([obj[i].ORGNAME, obj[i].CON]);
                    xname.push([obj[i].ORGNAME]);
                }
                orgname.push([obj[i].ORGNAME]);

            }
            document.getElementById("hiddenxname").value = xname;

            $("#UnitData").highcharts().series[0].update({ data: item });
            $("#UnitData").highcharts().xAxis[0].update({ categories: xname })
            //$("#UnitData1").highcharts().series[0].update({ data: item });
            //$("#UnitData1").highcharts().xAxis[0].update({ categories: xname })

            orgname = orgname.join(',');
            unitOrgName = orgname;
            $.ajax({
                type: "post",
                url: "<%=basePath%>convergecontroller?getDetailUnit",
                data: {"orgname":  orgname },                
                dataType: "json",
                async: true
            }).done(function (data) {
                unitJson = data;
                document.getElementById("hiddenDetailUnit").value = JSON.stringify(unitJson);
                UnitDetailData(unitJson, unitOrgName);
            })
            clearShadow();
        }

        //各部门汇聚总量图附加饼图(具体数值json,部门名称（已排列）)
        function UnitDetailData(obj, orgnamelist) {
            //console.log(obj);
            var chart = $("#UnitData").highcharts();
            console.log(chart.series.length);

            if (chart.series.length > 1) {
                while (chart.series.length > 1)
                    chart.series[1].remove(true);
            }

            var orgname = orgnamelist.split(',');
            var colors = [{ 'type': '法人', color: '#2196FF' }, { 'type': '自然人', color: '#FFA100' }, { 'type': '信用', color: '#93C434' }, { 'type': '电子证照', color: '#01C8A9' }, { 'type': '监测数据', color: '#F1556E' }];
            for (var i = 0; i < orgname.length; i++) {
                //饼图中心坐标
                var UseplotX = $("#UnitData").highcharts().series[0].data[i].plotX;
                var UseplotY = $("#UnitData").highcharts().series[0].data[i].plotY;
                //var UseplotX1 = $("#UnitData1").highcharts().series[0].data[i].plotX;
                //var UseplotY1 = $("#UnitData1").highcharts().series[0].data[i].plotY;
                var usename = orgname[i];
                var item = [];
                for (var j = 0; j < obj.length; j++) {
                    if (obj[j].ORGNAME == usename && obj[j].CON != 0) {
                        for (var k = 0; k < colors.length; k++) {
                            if (colors[k].type == obj[j].TYPE) {
                                item.push({ "name": obj[j].TYPE, "y": (Math.log(obj[j].CON) / Math.log(2)), "color": colors[k].color });
                                //item.push({ "name": obj[j].TYPE, "y": Math.abs(obj[j].CON), "color": colors[k].color });
                            }
                        }
                    }
                }
                var isShow
                if (i == 0) {
                    isShow = true;
                } else {
                    isShow = false;
                }
                $("#UnitData").highcharts().addSeries({
                    type: 'pie',
                    animation: false,
                    center: [UseplotX - 20, UseplotY - 20],
                    innerSize: '50%',
                    name: usename,
                    data: item,
                    size: 55,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: isShow,
                    borderWidth: 0

                })
            }

        }



        //部门信息汇聚总量TOP5图例
        function hideItem(typename) {
            var _series = $("#UnitData").highcharts().series
            for (var i = 1; i < _series.length; i++) {
                var list = $("#UnitData").highcharts().series[i];
                for (var j = 0; j < list.data.length; j++) {
                    if (list.data[j].name == typename) {
                        list.data[j].setVisible();
                    }
                }
            }
            var xname = document.getElementById("hiddenxname").value.split(",");
            $("#UnitData").highcharts().xAxis[0].update({ categories: xname });
        }
        //部门信息汇聚总量TOP5图例单击变色
        function changecolor(color, id) {
            var colorid = id.slice(0, 5) + (id.replace("unit_", "") - 1);
            var ii = document.getElementById(colorid).style.backgroundColor
            if (ii != 'rgb(204, 204, 204)') {
                document.getElementById(colorid).style.backgroundColor = '#cccccc';
                document.getElementById(id).style.color = '#cccccc';
            } else {
                document.getElementById(colorid).style.backgroundColor = color;
                document.getElementById(id).style.color = '#ffffff';
            }
        }

        function getAjaxStatistic() {
            $.ajax({
                type: "post",
                url: "<%=basePath%>convergecontroller?getAjaxStatic",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                $("#info_table tbody").html("");
                var content = data;
                var str = "";
                if(content.length!=7){
                  for(var g=0;g<(7-content.length);g++){
                    str += '<tr><td></td><td></td><td></td><td></td><td></td></tr>';
                  }
                }else{
                $.each(content, function (i, e) {
                    str += '<tr>';
                    str += '<td class="txtLeft" title="' + e.ORGNAME + '">' + (e.ORGNAME.length > 10 ? e.ORGNAME.slice(0, 10) + '...' : e.ORGNAME) || '' + '</td>';
                    str += '<td class="txtLeft"title="' + e.ITEM + '">' + (e.ITEM.length > 10 ? e.ITEM.slice(0, 10) + '...' : e.ITEM) || '' + '</td>';
                    str += '<td>' + e.TYPE || '' + '</td>';
                    str += '<td>' + e.COU || '' + '</td>';
                    str += '<td>' + $.timestampToTime(e.LASTTIME) || '' + '</td>';
                    str += '</tr>';
                })
                }
                $("#info_table tbody").append(str);
            }).then(function () {
                $("#info_table tr:even").css("background", "#0f266e");

            });
        }

        //去除datalabels的阴影
        function clearShadow() {
            $("tspan.highcharts-text-outline").css("fill", "none");
            $("tspan.highcharts-text-outline").css("stroke", "none");
        }

        //改变样式，将圆形图例改为方形
        function changeCircle() {
            $("rect.highcharts-point").css("rx", "0");
            $("rect.highcharts-point").css("ry", "0");
        }


        //头部 法人、自然人、信用、电子证照、传感监测
        function NavType(type) {
            var _num = 0;
            switch (type) {
                case "fr":
                    _num = $("#lb_fr_num").text();
                    break;
                case "zrr":
                    _num = $("#lb_zrr_num").text();
                    break;
                case "xy":
                    _num = $("#lb_xy_num").text();
                    break;
                case "dzzz":
                    _num = $("#lb_dzzz_num").text();
                    break;
                case "cgjc":
                    _num = $("#lb_cgjc_num").text();
                    break;
            }
            var _url = "cdController?toCategoryDetail_Big&type=" + type + "&num=" + _num;
            //            window.location.href = _url;
            window.open(_url, "_blank");
        }

        function DepartList() {
            $.ajax({
              type: "post",
              url:  "<%=basePath%>convergecontroller?getOrgname",
              data: {},
              dataType: "json",
              async: true
           }).done(function(data){
            var info = data;
            var str = "";
            var orgid = "";
            var name = "";
            for (var i = 0; i < info.length; i++) {
                orgid = info[i].ID;
                name = info[i].ORGSHORTNAME;
                str += "<li><a href=\"javascript:void(0);\"  onclick='getOrgDetail(\"" + orgid + "\",\"" + name + "\")' >" + name + "</a></li>";

            }
            $('#uldepart').append(str);
          })
        }

        function getOrgDetail(orgid, name) {
            name = encodeURI(name);
            layer.open({
                type: 2,
                title: "部门目录",
                maxmin: true,
                scrollbar: false,
                shade: 0.3,
                area: ['85%', '625px'],
                content: "convergecontroller/departCatalogue?id=" + orgid + "&name=" + name
            })
        }


        //获取非LOG转换的数据库值
        function GetOracledata(hiddenarea,name, xValue) {
            if (name == "证照") {
                name = "电子证照";
            };
            if (name == "监测") {
                name = "监测数据";
            };
            var data = GetDataFromHiddenarea(hiddenarea,name, xValue)
            return data;
        }
        //根据坐标从隐藏域中获取真实数值
        function GetDataFromHiddenarea(hiddenarea,name, xValue) {
            var obj = eval('(' + document.getElementById(hiddenarea).value + ')');
            var realData = "";
            if (obj[0].hasOwnProperty("TIME")) {
                for (var i = 0; i < obj.length; i++) {
                    if ($.timestampToTime(obj[i].TIME).slice(5, 10) == xValue && obj[i].TYPE == name) {
                        realData = obj[i].CON;
                    }
                }
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].ORGNAME == xValue && obj[i].TYPE == name) {
                        realData = obj[i].CON;
                    }
                }
            }
            return realData;
        }

    </script>
  <script>
    //获取周数据增长
    function gethiddenWeekCategory(){
        $.ajax({
            type: "post",
            url:  "<%=basePath%>convergecontroller?getCategory",
            data: {},
            dataType: "json",
            async: true
        }).done(function(data){
          var json=JSON.stringify(data);
          document.getElementById('hiddenWeekCategory').value=json;
          WeekJsonData();
        })
    };
    
    function gethiddenUnit(){
        $.ajax({
            type: "post",
            url:  "<%=basePath%>convergecontroller?getUnit",
            data: {},
            dataType: "json",
            async: true
        }).done(function(data){
          var json=JSON.stringify(data);
          document.getElementById('hiddenUnit').value=json;          
          UnitJsonData();
        })
    };   
     
  </script>
</head>

<body class="body_bg">
    <input type="hidden" id="hiddenWeekCategory" runat="server" /> 
	<input	type="hidden" id="hiddenUnit" runat="server" /> 
	<input type="hidden" id="hiddenDetailUnit" runat="server" /> 
	<input type="hidden" id="hiddenxname" runat="server" />

	<form id="form1" runat="server">
		<div class="top_bg">
			<div class="top">
				<span> <img src="images/logo_pc.png" />${projectname}
				</span>
				<div class="sys_info">
					<a href="<fmt:message key="login_address" />" target="_blank"> <img src="images/lock.png" />登录
					</a>|<a href="<%=basePath%>bigindex"><img src="images/pc_icon.png" />宽屏</a>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="tile_1">
				<div class="tile_1_l">
					<div class="center_top_main">
						<img class="left_top_border" style="margin: 0;"
							src="images/left_top_wide.png" /> <img
							class="right_bottom_border" src="images/right_bottom_wide.png" />
						<ul>
							<li><img src="images/col_icon1.png" />
								<p class="col_title" onclick="NavType('fr')">法人</p>
								<table align="center">
									<tr>
										<th>数据项：</th>
									</tr>
									<tr>
										<td><span><a href="javascript:void(0);"
												onclick="NavType('fr')"> 
												<asp:Label ID="lb_fr_item" runat="server" Text="0"></asp:Label>
												</a></span>个</td>
									</tr>
									<tr>
										<th>数据量：</th>
									</tr>
									<tr>
										<td><span> <asp:Label ID="lb_fr_num"
													runat="server" Text="0"></asp:Label></span>条</td>
									</tr>
								</table></li>
							<li><img src="images/col_icon2.png" />
								<p class="col_title" onclick="NavType('zrr')">自然人</p>
								<table align="center">
									<tr>
										<th>数据项：</th>
									</tr>
									<tr>
										<td><span><a href="javascript:void(0);"
												onclick="NavType('zrr')"> <asp:Label ID="lb_zrr_item"
														runat="server" Text="0"></asp:Label></a></span>个</td>
									</tr>
									<tr>
										<th>数据量：</th>
									</tr>
									<tr>
										<td><span> <asp:Label ID="lb_zrr_num"
													runat="server" Text="0"></asp:Label></span>条</td>
									</tr>
								</table></li>
							<li><img src="images/col_icon3.png" />
								<p class="col_title" onclick="NavType('xy')">信用</p>
								<table align="center">
									<tr>
										<th>数据项：</th>
									</tr>
									<tr>
										<td><span><a href="javascript:void(0);"
												onclick="NavType('xy')"> <asp:Label ID="lb_xy_item"
														runat="server" Text="0"></asp:Label></a></span>个</td>
									</tr>
									<tr>
										<th>数据量：</th>
									</tr>
									<tr>
										<td><span> <asp:Label ID="lb_xy_num"
													runat="server" Text="0"></asp:Label></span>条</td>
									</tr>
								</table></li>
							<li><img src="images/col_icon4.png" />
								<p class="col_title" onclick="NavType('dzzz')">电子证照</p>
								<table align="center">
									<tr>
										<th>数据项：</th>
									</tr>
									<tr>
										<td><span><a href="javascript:void(0);"
												onclick="NavType('dzzz')"> <asp:Label ID="lb_dzzz_item"
														runat="server" Text="0"></asp:Label></a></span>个</td>
									</tr>
									<tr>
										<th>数据量：</th>
									</tr>
									<tr>
										<td><span> <asp:Label ID="lb_dzzz_num"
													runat="server" Text="0"></asp:Label></span>条</td>
									</tr>
								</table></li>
							<li><img src="images/col_icon5.png" />
								<p class="col_title" onclick="NavType('cgjc')">传感监测</p>
								<table align="center">
									<tr>
										<th>数据项：</th>
									</tr>
									<tr>
										<td><span><a href="javascript:void(0);"
												onclick="NavType('cgjc')"> <asp:Label ID="lb_cgjc_item"
														runat="server" Text="0"></asp:Label></a></span>个</td>
									</tr>
									<tr>
										<th>数据量：</th>
									</tr>
									<tr>
										<td><span> <asp:Label ID="lb_cgjc_num"
													runat="server" Text="0"></asp:Label></span>条</td>
									</tr>
								</table></li>
						</ul>
					</div>
					<div class="center_bottom_main">
						<ul>
							<li>
								<div class="title_l">
									<div>
										数 据<br /> 汇 聚
									</div>
								</div>
								<div class="data_r">
									<div>
										<p>
											部&nbsp;&nbsp;&nbsp;&nbsp;门：<span><a
												href="cdController?toFilingShareOrgName_Big&type=1"
												target="_blank"><asp:Label ID="lb_hj_org" runat="server"
														Text="0"></asp:Label></a></span>家
										</p>
										<p>
											数据项：<span><a
												href="cdController?toFilingShareDetail_Big&type=1"
												target="_blank"> <asp:Label ID="lb_hj_item"
														runat="server" Text="0"></asp:Label></a></span>个
										</p>
										<p>
											数据量：<span><asp:Label ID="lb_hj_num" runat="server"
													Text="0"></asp:Label></span>条
										</p>
									</div>
								</div>
							</li>
							<li>
								<div class="title_l">
									<div>
										数 据<br /> 共 享
									</div>
								</div>
								<div class="data_r">
									<div>
										<p>
											部&nbsp;&nbsp;&nbsp;&nbsp;门：<span><a
												href="cdController?toFilingShareOrgName_Big&type=2"
												target="_blank"><asp:Label ID="lb_gx_org" runat="server"
														Text="0"></asp:Label></a></span>家
										</p>
										<p>
											数据项：<span><a
												href="cdController?toFilingShareDetail_Big&type=2"
												target="_blank"> <asp:Label ID="lb_gx_item"
														runat="server" Text="0"></asp:Label></a></span>个
										</p>
										<p>
											数据量：<span><asp:Label ID="lb_gx_num" runat="server"
													Text="0"></asp:Label></span>条
										</p>
									</div>
								</div>
							</li>
							<li>
								<div class="title_l">
									<div>
										今 日<br /> 数 据
									</div>
								</div>
								<div class="data_r">
									<div>
										<p>
											今日接入：<span><a
												href="cdController?toTodayConvegeShareDetail_Big&type=converge"
												target="_blank"><asp:Label ID="lb_jr_converge"
														runat="server" Text="0"></asp:Label></a></span>条
										</p>
										<p>
											今日共享：<span><a
												href="cdController?toTodayConvegeShareDetail_Big&type=share"
												target="_blank"><asp:Label ID="lb_jr_shared"
														runat="server" Text="0"></asp:Label></a></span>条
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="tile_1_r  tile_bg">
					<div class="tile_main">
						<div class="sub_title">
							<img src="images/title_icon.png" />数据超市<a onclick="openDataMarket();">更多>></a>
						</div>
						<div class="col">
							<ul>
								<li><img src="images/circle_org.png" />
								<div class="title">
										精品服务<a onclick="openDataMarket();">更多>></a>
									</div>
									<div class="col_1 col_width_l">
										<ul>
											<li><a
												href="${enterpriserelation}"
												target="_blank">企业关系图谱</a></li>
											<li class="disabled"><a href="javascript:void(0)">企业基本信息查询</a></li>
											<li class="disabled"><a href="javascript:void(0)">全省经济指标</a></li>
											<li class="disabled"><a href="javascript:void(0)">人口变化趋势</a></li>
											<li class="disabled"><a href="javascript:void(0)">身份证信息查询</a></li>
											<li class="disabled"><a href="javascript:void(0)">身份证信息比对</a></li>
										</ul>
									</div></li>
								<li><img src="images/circle_yellow.png" />
								<div class="title">
										对象档案<a onclick="openDataMarket();">更多>></a>
									</div>
									<div class="col_1 col_width_s">
										<ul class="line_1">
											<li><a
												href=${natural}
												target="_blank">自然人</a></li>
											<li class="disabled"><a href="javascript:void(0)">法人</a></li>
											<li class="disabled"><a href="javascript:void(0)">地址</a></li>
											<li class="disabled"><a href="javascript:void(0)">物件</a></li>
											<li class="disabled"><a href="javascript:void(0)">事件</a></li>
											<li class="disabled"><a href="javascript:void(0)">传感监测</a></li>
										</ul>
									</div></li>
								<li><img src="images/circle_green.png" />
								<div class="title">
										部门目录<a onclick="openDataMarket();">更多>></a>
									</div>
									<div class="col_1 col_width_s">
										<ul id="uldepart">
										</ul>
									</div></li>
								<li><img src="images/circle_blue.png" />
								<div class="title">
										地市目录<a onclick="openDataMarket();">更多>></a>
									</div>
									<div class="col_1 col_width">
										<ul id="ul_citydic">
										</ul>
									</div></li>
							</ul>
							<div class="clear"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="tile_2">
				<div class="tile_2_l">
					<div class="sub_title">
						<img src="images/title_icon.png" />数据接入<a
							href="<%=basePath%>convergecontroller/detailStatistic"
							target="_blank" style="color: #fff">更多>></a>
					</div>
					<div class="top_tile_main tile_bg">
						<table class="data_table" cellpadding="0" cellspacing="0"
							style="width: 100%;" id="info_table">
							<thead>
								<tr>
									<th>单位名称</th>
									<th>信息名称</th>
									<th>类型</th>
									<th>信息总量</th>
									<th>时间</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="sub_title">
						<img src="images/title_icon.png" />数据共享 <a
							href="<%=basePath%>share/datashare" target="_blank">更多>></a>
					</div>
					<div class="top_tile_main tile_bg">
						<table class="data_table" id="data_table_2" cellpadding="0"
							cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th>单位名称</th>
									<th>信息名称</th>
									<th>来源单位</th>
									<th width="80">共享方式</th>
									<th width="100">记录数</th>
									<th width="160">时间</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
				<div class="tile_2_r">
					<div class="chart_title">
						<a href="<%=basePath%>convergecontroller/detailWeek"
							target="_blank">近五天数据增长情况</a>&nbsp;<span
							onmouseover="this.title = '注：1.图表数据已经过对数运算处理(即n=log₂a, '+ '\r\n'+'其中n表示显示在图表的比例，a表示实际值)；'+ '\r\n'+'2.Y轴数值表示2的n次方,n表示Y轴显示的数值';"><img
							src="images/help.png" align="absmiddle" /></span>
					</div>
					<div class="top_tile_main tile_bg" id="WeekCategory">
						<%--<img src="images/1-1index(21比9)_03-03.jpg" width="100%" height="100%" />--%>
					</div>
					<div class="chart_title">
						<a href="<%=basePath%>convergecontroller/detailUnit"
							target="_blank">部门信息汇聚总量Top6</a>
					</div>
					<div class="top_tile_main tile_bg">
						<img class="left_top_border" src="images/left_top_thin.png" /> <img
							class="right_bottom_border" src="images/right_bottom_thin.png" />
						<%--<img src="images/1-1index(1600)_03.jpg" width="100%" height="100%" />--%>
						<div style="clear: both;">
							<table style="text-align: center; margin: 0 auto;">
								<tr>
									<td>
										<div id="unit_1"
											style="width: 14px; height: 14px; background: #2196FF;"></div>
									</td>
									<td><a
										style="color: #ffffff; font-size: 15px; font-weight: normal; fill: #ffffff; line-height: 2;"
										onclick="hideItem('法人'),changecolor('#2196FF','unit_2')"
										id="unit_2">法人&nbsp;&nbsp;</a></td>
									<td>
										<div id="unit_3"
											style="width: 14px; height: 14px; background: #FFA100;"></div>
									</td>
									<td><a
										style="color: #ffffff; font-size: 15px; font-weight: normal; fill: #ffffff; line-height: 2;"
										onclick="hideItem('自然人'),changecolor('#FFA100','unit_4')"
										id="unit_4">自然人</a></td>
									<td>
										<div id="unit_5"
											style="width: 14px; height: 14px; background: #93C434;"></div>
									</td>
									<td><a
										style="color: #ffffff; font-size: 15px; font-weight: normal; fill: #ffffff; line-height: 2;"
										onclick="hideItem('信用'),changecolor('#93C434','unit_6')"
										id="unit_6">信用&nbsp;&nbsp;</a></td>
									<td>
										<div id="unit_7"
											style="width: 14px; height: 14px; background: #01C8A9;"></div>
									</td>
									<td><a
										style="color: #ffffff; font-size: 15px; font-weight: normal; fill: #ffffff; line-height: 2;"
										onclick="hideItem('电子证照'),changecolor('#01C8A9','unit_8')"
										id="unit_8">证照&nbsp;&nbsp;</a></td>
									<td>
										<div id="unit_9"
											style="width: 14px; height: 14px; background: #F1556E;"></div>
									</td>
									<td><a
										style="color: #ffffff; font-size: 15px; font-weight: normal; fill: #ffffff; line-height: 2;"
										onclick="hideItem('监测数据'),changecolor('#F1556E','unit_10')"
										id="unit_10">监测数据</a></td>
								</tr>
							</table>
						</div>
						<div id="UnitData" style="width: 100%; height: 330px;"></div>
						<%--<div id="UnitData1" class="tab_content" style="width: 410px; display: none;"></div>--%>
					</div>
				</div>
			</div>
			<div class="tile_3">
				<div class="tile_3_l">
					<div class="chart_title">
						<a href="<%=basePath%>share/sharinginfodetail" target="_blank">信息共享排行TOP5</a>
					</div>
					<div class="bottom_tile_main tile_bg">
						<img class="left_top_border" src="images/left_top_thin.png" /> <img
							class="right_bottom_border" src="images/right_bottom_thin.png" />
						<div id="chart_sharingInfo" style="width: 100%; height: 100%;">
							<%--<img src="images/1-1index(21比9)_03.jpg" width="100%" height="100%" />--%>
						</div>
					</div>
				</div>
				<div class="tile_3_c">
					<div class="chart_title">
						<a href="<%=basePath%>share/sharedorgdetail" target="_blank">被共享部门排行TOP5</a>
					</div>
					<div class="bottom_tile_main tile_bg">
						<div class="tab">
							<ul id="ul_sharedOrgNav">
								<li class="now"><a id="a_sharedOrgTotal"
									href="javascript:void(0);">累计共享</a></li>
								<li>|</li>
								<li><a id="a_sharedOrgMonth" href="javascript:void(0);">近一月共享</a></li>
							</ul>
						</div>
						<%--<div class="unit">单位：条</div>--%>
						<div id="chart_sharedOrgTotal" class="tab_content"
							style="width: 100%;">
							<%--<img src="images/1-1index(21比9)_12.jpg" width="100%" height="100%" />--%>
						</div>
						<div id="chart_sharedOrgMonth" class="tab_content"
							style="width: 100%;">
							<%--<img src="images/1-1index(21比9)_12.jpg" width="100%" height="100%" />--%>
						</div>
					</div>
				</div>
				<div class="tile_3_r">
					<div class="chart_title">
						<a href="<%=basePath%>share/sharingorgdetail" target="_blank">共享部门排行TOP5</a>
					</div>
					<div class="bottom_tile_main tile_bg">
						<img class="left_top_border" src="images/left_top_thin.png" /> <img
							class="right_bottom_border" src="images/right_bottom_thin.png" />
						<div id="chart_sharingOrg" style="height: 100%; width: 100%;">
							<%--<img src="images/1-1index(21比9)_19.jpg" width="100%" height="100%" />--%>
						</div>
					</div>
				</div>
			</div>
			<div class="tile_4">
				<div class="sub_title">
					<img src="images/title_icon.png" />服务总线
				</div>
				<div class="ser_tile_main tile_bg">
					<ul style="overflow: hidden;">
						<li class="J_item on">
							<div class="item-inner">
								<div class="ser_col ser_col_1">
									<p>一照一码</p>
									<img src="images/ser_icon1.png" />
								</div>
								<div class="ser_data ser_data_1">
									<p>
										接入部门：<span class="num">9</span>家
									</p>
									<p>
										办件总数：<span class="num">957,870</span>件
									</p>
									<p>
										共享数据：<span class="num">6,940,024</span>次
									</p>
									<p>
										企业总数：<span class="num">769,259</span>家
									</p>
								</div>
							</div>
						</li>
						<li class="J_item">
							<div class="item-inner">
								<div class="ser_col ser_col_2">
									<p>低保核对</p>
									<img src="images/ser_icon2.png" />
								</div>
								<div class="ser_data ser_data_2">
								<p> 接入部门：<span class='num' id="JHBM">4</span>家</p><p> 核对业务项：<span class='num' id="HDXXLX">9</span>项</p><p>核对批次：<span class='num' id="HDPC">1,154,081</span>次</p><p>总户数：<span class='num' id="HDZHS">1,154,081</span>户</p><p>总人数：<span class='num' id="HDZRS">1,365,815</span>人</p>
								</div>
							</div>
						</li>
						<li class="J_item">
							<div class="item-inner">
								<div class="ser_col ser_col_3">
									<p>社区平台</p>
									<img src="images/ser_icon3.png" />
								</div>
								<div class="ser_data ser_data_3">
									<p>
										接入部门：<span class="num">3</span>家
									</p>
									<p>
										接入业务：<span class="num">6</span>件
									</p>
									<p>
										办理业务：<span class="num">338</span>次
									</p>
								</div>
							</div>
						</li>
						<li class="J_item">
							<div class="item-inner">
								<div class="ser_col ser_col_4">
									<p>市场管理</p>
									<img src="images/ser_icon4.png" />
								</div>
								<div class="ser_data ser_data_4"><p> 在营企业：<span class='num' id="SETNUM">771,389</span>家</p><p> 注销企业：<span class='num' id="CANCELNUM">66,897</span>家</p><p> 良好企业：<span class='num' id="GOODNUM">11,717</span>家</p><p> 风险企业：<span class='num' id="WARNNUM">177,591</span>家</p><p> 接入部门：<span class='num' id="INSNUM">72</span>家</p><p> 数据项：<span class='num' id="ITEMNUM">739</span>项</p><p> 数据总量：<span class='num' id="MESSAGENUM">7,307,074</span>件</p>
</div>
							</div>
						</li>
						<li class="J_item">
							<div class="item-inner">

								<div class="ser_col ser_col_5">
									<p class="ser_col_valign">暂无内容</p>
								</div>
								<div class="ser_data ser_data_5">暂无内容</div>
							</div>
						</li>
						<li class="J_item">
							<div class="item-inner">

								<div class="ser_col ser_col_6 ">
									<p class="ser_col_valign">暂无内容</p>
								</div>
								<div class="ser_data ser_data_6">暂无内容</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		

		<script>
            $(function () {

                setTimeout(LoadTables.dataShareTable, 1000);

                //法人、信用、 总线等服务数据
                var si = window.setInterval(function () {
                    getCategoryInfo();
                    getfilingShareInfo();
                    getTodayConvergeShareInfo();
                    LoadTables.dataShareTable();  //数据共享表
                    getAjaxStatistic();
                    //                   SmallIndex.GetBusStaticAjax();
                    //                                                             alert(si);
                }, 60000);

                slideWidth();




            });

            $(window).resize(_.debounce(slideWidth, 300));

            var fullwidth = 395;
            var simwidth = 160;

            function slideWidth() {
                var mainwidth = $(".ser_tile_main").width();
                //console.log(mainwidth);

                if (mainwidth == 1201) {
                    fullwidth = 395;
                    simwidth = 160;
                } else if (mainwidth == 1361) {
                    fullwidth = 447;
                    simwidth = 182;
                } else if (mainwidth == 1521) {
                    fullwidth = 474;
                    simwidth = 209;
                } else {
                    fullwidth = 552;
                    simwidth = 257;
                }

                slideBlock(fullwidth, simwidth);

                function slideBlock(fullwidth, simwidth) {
                    $(".J_item").width(simwidth);
                    $(".J_item.on").width(fullwidth);

                    $(".J_item").off("mouseover mouseout").on("mouseover mouseout", function (e) {
                        if (e.type == "mouseover") {
                            window.clearInterval(autofocus);

                            var $this = $(this);
                            $this.addClass("on");
                            var $on = $(".J_item.on");

                            $on.not($this).stop().animate({ width: simwidth }).removeClass("on");
                            $this.stop().animate({ width: fullwidth }).find(".ser_data").show(0);
                        } else if (e.type == "mouseout") {
                            autofocus = setInterval(focusNav, 2000);
                        }
                    });
                    
                }
            }
            var autofocus = setInterval(focusNav, 2000);

            function focusNav() {
                var $this = $(".J_item.on").next(".J_item").first();
                if ($this.length === 0) {
                    $this = $(".J_item").first();
                }

                $this.addClass("on");
                var $on = $(".J_item.on");

                $on.not($this).stop().animate({ width: simwidth }).removeClass("on");
                $this.stop().animate({ width: fullwidth }).find(".ser_data").show(0);
            }


            //数据累加滚动效果
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };

            //获取大类统计数据
            function getCategoryInfo() {
                try {
                $.ajax({
                type: "post",
                url: "cdController?getCategoryData",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                    var _result = data;
                    if (_result != null) {
                        var info = data.value;
                        if (info.length > 0) {
                            for (var i = 0; i < info.length; i++) {
                                var _type = info[i].TYPE;
                                var _new_num = info[i].NUM;
                                var _new_item = info[i].ITEM;
                                var _init_num = null;
                                var _init_item = null;
                                var _object_num_id = "";
                                var _object_item_id = "";
                                switch (_type) {
                                    case "法人":
                                        _init_num = $("#lb_fr_num").text();
                                        _object_num_id = "lb_fr_num";
                                        _init_item = $("#lb_fr_item").text();
                                        _object_item_id = "lb_fr_item";
                                        break;
                                    case "自然人":
                                        _init_num = $("#lb_zrr_num").text();
                                        _object_num_id = "lb_zrr_num";
                                        _init_item = $("#lb_zrr_item").text();
                                        _object_item_id = "lb_zrr_item";
                                        break;
                                    case "信用":
                                        _init_num = $("#lb_xy_num").text();
                                        _object_num_id = "lb_xy_num";
                                        _init_item = $("#lb_xy_item").text();
                                        _object_item_id = "lb_xy_item";
                                        break;
                                    case "电子证照":
                                        _init_num = $("#lb_dzzz_num").text();
                                        _object_num_id = "lb_dzzz_num";
                                        _init_item = $("#lb_dzzz_item").text();
                                        _object_item_id = "lb_dzzz_item";
                                        break;
                                    case "监测数据":
                                        _init_num = $("#lb_cgjc_num").text();
                                        _object_num_id = "lb_cgjc_num";
                                        _init_item = $("#lb_cgjc_item").text();
                                        _object_item_id = "lb_cgjc_item";
                                        break;
                                    default:
                                        _init_num = 0;
                                        _object_num_id = "";
                                        _init_item = 0;
                                        _object_item_id = "";
                                        break;

                                }

                                if (_new_num != _init_num && _object_num_id != "" && _new_num != null) {
                                    var demo = new CountUp(_object_num_id, 0, _new_num, 0, 2.5, options);
                                    demo.start();

                                }
                                if (_init_item != _new_item && _object_item_id != "" && _new_item != null) {
                                    var d = new CountUp(_object_item_id, 0, _new_item, 0, 2.5, options);
                                    d.start();
                                }
                            }
                        }

                    }
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            //汇聚总量、共享总量
            function getfilingShareInfo() {
                try {
                $.ajax({
                type: "post",
                url: "cdController?getfilingShare",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                    var _result = data;
                    if (_result != null) {
                        var info = data.value;
                        if (info.length > 0) {
                            for (var i = 0; i < info.length; i++) {
                                var _type = info[i].TYPE;
                                var _new_orgname = info[i].ORGNAME;
                                var _new_item = info[i].ITEM;
                                var _new_num = info[i].NUM;
                                var _init_orgname = null;
                                var _init_item = null;
                                var _init_num = null;
                                var _object_orgname_id = "";
                                var _object_item_id = "";
                                var _object_num_id = "";
                                //类型 1:汇聚   2：共享
                                switch (_type) {
                                    case "1":
                                        _init_orgname = $("#lb_hj_org").text();
                                        _init_item = $("#lb_hj_item").text();
                                        _init_num = $("#lb_hj_num").text();
                                        _object_orgname_id = "lb_hj_org";
                                        _object_item_id = "lb_hj_item";
                                        _object_num_id = "lb_hj_num";
                                        break;
                                    case "2":
                                        _init_orgname = $("#lb_gx_org").text();
                                        _init_item = $("#lb_gx_item").text();
                                        _init_num = $("#lb_gx_num").text();
                                        _object_orgname_id = "lb_gx_org";
                                        _object_item_id = "lb_gx_item";
                                        _object_num_id = "lb_gx_num";
                                        break;
                                    default:
                                        _init_orgname = null;
                                        _init_item = null;
                                        _init_num = null;
                                        _object_orgname_id = "";
                                        _object_item_id = "";
                                        _object_num_id = "";
                                        break;

                                }
                                if (_init_orgname != _new_orgname && _object_orgname_id != "" && _new_orgname != null) {
                                    var demo1 = new CountUp(_object_orgname_id, 0, _new_orgname, 0, 2.5, options);
                                    demo1.start();
                                }
                                if (_init_item != _new_item && _object_item_id != "" && _new_item != null) {
                                    var demo2 = new CountUp(_object_item_id, 0, _new_item, 0, 2.5, options);
                                    demo2.start();
                                }
                                if (_init_num != _new_num && _object_num_id != "" && _new_num != null) {
                                    var demo3 = new CountUp(_object_num_id, 0, _new_num, 0, 2.5, options);
                                    demo3.start();
                                }
                            }
                        }
                    }
                    })
                } catch (e) {
                    console.log(e);
                }
            }

            //今日数据
            function getTodayConvergeShareInfo() {
            $.ajax({
                type: "post",
                url: "cdController?getTodayConvergeShare",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                var _result = data;
                if (_result != null) {
                    var info = data.value;
                    if (info.length > 0&&info[0]!=null &&info[0]!="null") {
                        for (var i = 0; i < info.length; i++) {

                            var _new_converge = info[i].CONVERGE;
                            var _new_shared = info[i].SHARED;
                            var _init_converge = $("#lb_jr_converge").text();
                            var _init_shared = $("#lb_jr_shared").text();
                            var _object_converge_id = "lb_jr_converge";
                            var _object_item_id = "lb_jr_shared";
                            if (_init_converge != _new_converge && _object_converge_id != "" && _new_converge != null) {
                                var demo1 = new CountUp(_object_converge_id, 0, _new_converge, 0, 2.5, options);
                                demo1.start();
                            }
                            if (_init_shared != _new_shared && _object_item_id != "" && _new_shared != null) {
                                var demo2 = new CountUp(_object_item_id, 0, _new_shared, 0, 2.5, options);
                                demo2.start();
                            }

                        }
                    }else{
                    $("#lb_jr_converge").html(0);
                    $("#lb_jr_shared").html(0);
                    }
                }
                })
            }
            function getCategoryInfoV2() {
                try {
                $.ajax({
                type: "post",
                url: "cdController?getCategoryData",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                    var _result = data;
                    if (_result != null) {
                        var info = data.value;
                        if (info.length > 0) {
                            for (var i = 0; i < info.length; i++) {
                                var _type = info[i].TYPE;
                                var _new_num = info[i].NUM;
                                var _new_item = info[i].ITEM;
                                var _init_num = null;
                                var _init_item = null;
                                var _object_num_id = "";
                                var _object_item_id = "";
                                switch (_type) {
                                    case "法人":
                                        $("#lb_fr_num").html(info[i].NUM);
                                        _object_num_id = "lb_fr_num";
                                        $("#lb_fr_item").html(info[i].ITEM);
                                        _object_item_id = "lb_fr_item";
                                        break;
                                    case "自然人":
                                        $("#lb_zrr_num").html(info[i].NUM);
                                        _object_num_id = "lb_zrr_num";
                                        $("#lb_zrr_item").html(info[i].ITEM);
                                        _object_item_id = "lb_zrr_item";
                                        break;
                                    case "信用":
                                        $("#lb_xy_num").html(info[i].NUM);
                                        _object_num_id = "lb_xy_num";
                                        $("#lb_xy_item").html(info[i].ITEM);
                                        _object_item_id = "lb_xy_item";
                                        break;
                                    case "电子证照":
                                        $("#lb_dzzz_num").html(info[i].NUM);
                                        _object_num_id = "lb_dzzz_num";
                                        $("#lb_dzzz_item").html(info[i].ITEM);
                                        _object_item_id = "lb_dzzz_item";
                                        break;
                                    case "监测数据":
                                        $("#lb_cgjc_num").html(info[i].NUM);
                                        _object_num_id = "lb_cgjc_num";
                                        $("#lb_cgjc_item").html(info[i].ITEM);
                                        _object_item_id = "lb_cgjc_item";
                                        break;
                                    default:
                                        _init_num = 0;
                                        _object_num_id = "";
                                        _init_item = 0;
                                        _object_item_id = "";
                                        break;

                                }

                            }
                        }

                    }
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            //汇聚总量、共享总量
            function getfilingShareInfoV2() {
                try {
                $.ajax({
                type: "post",
                url: "cdController?getfilingShare",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                    var _result = data;
                    if (_result != null) {
                        var info = data.value;
                        if (info.length > 0) {
                            for (var i = 0; i < info.length; i++) {
                                var _type = info[i].TYPE;
                                var _new_orgname = info[i].ORGNAME;
                                var _new_item = info[i].ITEM;
                                var _new_num = info[i].NUM;
                                var _init_orgname = null;
                                var _init_item = null;
                                var _init_num = null;
                                var _object_orgname_id = "";
                                var _object_item_id = "";
                                var _object_num_id = "";
                                //类型 1:汇聚   2：共享
                                switch (_type) {
                                    case "1":
                                         $("#lb_hj_org").html(info[i].ORGNAME);
                                         $("#lb_hj_item").html(info[i].ITEM);
                                         $("#lb_hj_num").html(info[i].NUM);
                                        _object_orgname_id = "lb_hj_org";
                                        _object_item_id = "lb_hj_item";
                                        _object_num_id = "lb_hj_num";
                                        break;
                                    case "2":
                                         $("#lb_gx_org").html(info[i].ORGNAME);
                                         $("#lb_gx_item").html(info[i].ITEM);
                                         $("#lb_gx_num").html(info[i].NUM);
                                        _object_orgname_id = "lb_gx_org";
                                        _object_item_id = "lb_gx_item";
                                        _object_num_id = "lb_gx_num";
                                        break;
                                    default:
                                        _init_orgname = null;
                                        _init_item = null;
                                        _init_num = null;
                                        _object_orgname_id = "";
                                        _object_item_id = "";
                                        _object_num_id = "";
                                        break;

                                }
//                                 if (_init_orgname != _new_orgname && _object_orgname_id != "" && _new_orgname != null) {
//                                     var demo1 = new CountUp(_object_orgname_id, 0, _new_orgname, 0, 2.5, options);
//                                     demo1.start();
//                                 }
//                                 if (_init_item != _new_item && _object_item_id != "" && _new_item != null) {
//                                     var demo2 = new CountUp(_object_item_id, 0, _new_item, 0, 2.5, options);
//                                     demo2.start();
//                                 }
//                                 if (_init_num != _new_num && _object_num_id != "" && _new_num != null) {
//                                     var demo3 = new CountUp(_object_num_id, 0, _new_num, 0, 2.5, options);
//                                     demo3.start();
//                                 }
                            }
                        }
                    }
                    })
                } catch (e) {
                    console.log(e);
                }
            }

            //今日数据
            function getTodayConvergeShareInfoV2() {
            $.ajax({
                type: "post",
                url: "cdController?getTodayConvergeShare",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
                var _result = data;
                if (_result != null) {
                    var info = data.value;
                    if (info.length > 0&&info[0]!=null &&info[0]!="null") {
                        for (var i = 0; i < info.length; i++) {
                            var _new_converge = info[i].CONVERGE;
                            var _new_shared = info[i].SHARED;
                            $("#lb_jr_converge").html(info[i].CONVERGE);
                            $("#lb_jr_shared").html(info[i].SHARED);
                            var _object_converge_id = "lb_jr_converge";
                            var _object_item_id = "lb_jr_shared";
//                             if (_init_converge != _new_converge && _object_converge_id != "" && _new_converge != null) {
//                                 var demo1 = new CountUp(_object_converge_id, 0, _new_converge, 0, 2.5, options);
//                                 demo1.start();
//                             }
//                             if (_init_shared != _new_shared && _object_item_id != "" && _new_shared != null) {
//                                 var demo2 = new CountUp(_object_item_id, 0, _new_shared, 0, 2.5, options);
//                                 demo2.start();
//                             }
                        }
                    }else{
                    $("#lb_jr_converge").html(0);
                    $("#lb_jr_shared").html(0);
                    }
                }
                })
            }
            function GetBusinfo(){
           $.ajax({
                type: "post",
                url: "cdController?getBusinfo",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
            var result=data.value;
            $("#SETNUM").html(result[0].SETNUM);
            $("#CANCELNUM").html(result[0].CANCELNUM);
            $("#GOODNUM").html(result[0].GOODNUM);
            $("#MESSAGENUM").html(result[0].MESSAGENUM);
            $("#WARNNUM").html(result[0].WARNNUM);
            $("#INSNUM").html(result[0].INSNUM);
            $("#ITEMNUM").html(result[0].ITEMNUM);
                });
           }
           function GetBusicinfo(){
           $.ajax({
                type: "post",
                url: "cdController?getBusicinfo",
                data: {},
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (data) {
            var result=data.value;
             $.each(result, function (i, e) {
//              alert(e.jhbm+"------"+e.hdxxlx+"----"+e.hdpc+"------"+e.hdzhs+"-----"+e.hdzrs);
             $("#JHBM").html(e.jhbm);
             $("#HDXXLX").html(e.hdxxlx);
             $("#HDPC").html(e.hdpc);
             $("#HDZHS").html(e.hdzhs);
             $("#HDZRS").html(e.hdzrs);
             })
                });
           }
        </script>
	</form>
</body>
</html>
