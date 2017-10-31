
; $(function () {
    LoadChart.loadSharedOrgMonth();
    LoadChart.loadSharedOrgTotal();
    LoadChart.loadSharingOrg();
    LoadChart.loadSharingInfo();

});

var LoadChart = {
    wideSize: function (wide) {

        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;

        if (window.devicePixelRatio == undefined) {
            window.devicePixelRatio = (function () {
                var ratio = 1;
                if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
                    ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
                }
                return ratio;
            })()
        }

        var trueScreenWidth = window.screen.width;
        var browserZoomLevel = window.devicePixelRatio;
        if (isIE || isEdge) {
            trueScreenWidth = Math.round(trueScreenWidth * browserZoomLevel);
        }

        if (trueScreenWidth >= 3000 || wide) {
            this.opts.fontSize = 16;
            this.opts.wide = true;
        }
        //return opts;
    },
    opts: {
        "wide": false,
        "fontSize": 13,
        "fontFamily": '"Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif'
    },
    loadSharedOrgMonth: function () {
        var _this = this;
        $.when($.ajax({
            type: "post",
            url: "share?getsharedorgtop5",
            data: {},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        })).done(function (data) {
            var content = data;
            //console.log(content[1]);
            showChart(content[1]);
        }).fail(function (data) {
            console.log(data);
        }).always(function () {
            //zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
            //autoResize();
            $("#chart_sharedOrgMonth").hide(0);  //dirty hack
        });



        function showChart(data) {
            var orgarr = [];
            var valarr = [];
            var valpercent = [];
            var numMax = 0;
            $.each(data, function (i, e) {
                if (i == 0) {
                    numMax = Number(e.COUNT, 10) * 1.5;
                }
                orgarr.push(e.DATASOURCEORG);
                valarr.push(Number(e.COUNT, 10));
                valpercent.push(Number(e.COUNT, 10) / numMax * 100);

            })

            Highcharts.setOptions({
                colors: ['#08b0fb', '#5fc112', '#ffcc00', '#fc5870', '#a356f2'],
                title: {
                    style: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    style: {
                        color: '#fff'
                    }
                }
            });

            var height = $('#chart_sharedOrgMonth').innerHeight();


            if (!orgarr.length) {
                displayNoData("chart_sharedOrgMonth");
            } else {
                $('#chart_sharedOrgMonth').highcharts({
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'rgba(255,255,255,0.002)',
                        style: {
                            fontFamily: _this.opts.fontFamily
                        }

                    },
                    colors: ['#08b0fb', '#5fc112', '#ffcc00', '#fc5870', '#a356f2'],
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '',
                        style: {
                            fontSize: '24px'
                        }
                    },
                    legend: {
                        enabled: false,
                        layout: 'vertical',
                        align: 'left',

                        verticalAlign: 'middle',
                        floating: true,
                        x: -10,
                        y: 0,
                        labelFormatter: function () {
                            return '<span style="text-weight:bold;color:' + this.points[0].color + '">' + this.name + '</span>';
                        },
                        symbolWidth: 10
                    },
                    tooltip: {
                        borderWidth: 0,
                        backgroundColor: 'none',
                        shadow: false,
                        useHTML: true,
                        style: {
                            fontSize: (_this.opts.fontSize + 3) + "px",
                            fontWeight: "normal"
                        },
                        //pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.val}</span> 条',
                        pointFormatter: function () {
                            return breakTextLineHtml(this.series.name, parseInt((this.series.chart.chartWidth * 0.55) / (_this.opts.fontSize + 3), 10)) + '<br><span style="font-size:' + (_this.opts.fontSize * 2) + 'px; color:' + this.color +
                                '; font-weight: bold">' + numberWithCommas(this.val) + '</span> 条';
                        },
                        positioner: function (labelWidth) {
                            return {
                                x: this.chart.chartWidth * 0.45,
                                y: this.chart.chartHeight * 0.4
                            };
                        }
                    },

                    pane: {
                        startAngle: 360,
                        endAngle: 0,
                        background: [{ // Track for Move
                            outerRadius: '112%',
                            innerRadius: '96%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Exercise
                            outerRadius: '95%',
                            innerRadius: '79%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '78%',
                            innerRadius: '62%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '61%',
                            innerRadius: '45%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '44%',
                            innerRadius: '28%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }]
                    },

                    yAxis: {
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        tickPositions: []
                    },

                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                enabled: false
                            },
                            linecap: 'round',
                            stickyTracking: false,
                            rounded: true
                            //cursor: 'pointer'
                        }
                    },

                    series: [{
                        name: orgarr[0],
                        borderColor: Highcharts.getOptions().colors[0],
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '112%',
                            innerRadius: '96%',
                            y: valpercent[0],
                            val: valarr[0]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            useHTML: true,
                            allowOverlap: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.9), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[1],
                        borderColor: Highcharts.getOptions().colors[1],
                        data: [{
                            color: Highcharts.getOptions().colors[1],
                            radius: '95%',
                            innerRadius: '79%',
                            y: valpercent[1],
                            val: valarr[1]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.76), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[2],
                        borderColor: Highcharts.getOptions().colors[2],
                        data: [{
                            color: Highcharts.getOptions().colors[2],
                            radius: '78%',
                            innerRadius: '62%',
                            y: valpercent[2],
                            val: valarr[2]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.62), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[3],
                        borderColor: Highcharts.getOptions().colors[3],
                        data: [{
                            color: Highcharts.getOptions().colors[3],
                            radius: '61%',
                            innerRadius: '45%',
                            y: valpercent[3],
                            val: valarr[3]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.48), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[4],
                        borderColor: Highcharts.getOptions().colors[4],
                        data: [{
                            color: Highcharts.getOptions().colors[4],
                            radius: '44%',
                            innerRadius: '28%',
                            y: valpercent[4],
                            val: valarr[4]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.34), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'

                            }
                        },
                        showInLegend: true
                    }]
                })
            }
        }
    },
    loadSharedOrgTotal: function () {
        var _this = this;

        $.when($.ajax({
            type: "post",
            url: "share?getsharedorgtop5",
            data: {},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        })).done(function (data) {
            var content = data;
            //console.log(content[1]);
            showChart(content[0]);
        }).fail(function (data) {
            console.log(data);
        }).always(function () {
            //zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
            //autoResize();

        });



        function showChart(data) {
            var orgarr = [];
            var valarr = [];
            var valpercent = [];
            var numMax = 0;
            $.each(data, function (i, e) {
                if (i == 0) {
                    numMax = Number(e.COUNT, 10) * 1.5;
                }
                orgarr.push(e.DATASOURCEORG);
                valarr.push(Number(e.COUNT, 10));
                valpercent.push(Number(e.COUNT, 10) / numMax * 100);

            });

            Highcharts.setOptions({
                colors: ['#08b0fb', '#5fc112', '#ffcc00', '#fc5870', '#a356f2'],
                title: {
                    style: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    style: {
                        color: '#fff'
                    }
                }
            });

            var height = $('#chart_sharedOrgMonth').innerHeight();

            if (!orgarr.length) {
                displayNoData("chart_sharedOrgMonth");
            } else {
                $('#chart_sharedOrgTotal').highcharts({
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: 'rgba(255,255,255,0.002)',
                        style: {
                            fontFamily: _this.opts.fontFamily
                        }
                    },
                    colors: ['#08b0fb', '#5fc112', '#ffcc00', '#fc5870', '#a356f2'],
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: '',
                        style: {
                            fontSize: '24px'
                        }
                    },
                    legend: {
                        enabled: false,
                        layout: 'vertical',
                        align: 'left',

                        verticalAlign: 'middle',
                        floating: true,
                        x: -10,
                        y: 0,
                        labelFormatter: function () {
                            return '<span style="text-weight:bold;color:' + this.points[0].color + '">' + this.name + '</span>';
                        },
                        symbolWidth: 10
                    },
                    tooltip: {
                        borderWidth: 0,
                        backgroundColor: 'none',
                        shadow: false,
                        style: {
                            fontSize: (_this.opts.fontSize + 3) + 'px',
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
                            fontWeight: "normal"
                        },
                        //pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.val}</span> 条',
                        pointFormatter: function () {
                            return breakTextLineHtml(this.series.name, parseInt((this.series.chart.chartWidth * 0.55) / (_this.opts.fontSize + 3), 10)) + '<br><span style="font-size:' + (_this.opts.fontSize * 2) + 'px; color:' + this.color +
                                '; font-weight: bold">' + numberWithCommas(this.val) + '</span> 条';
                        },
                        positioner: function (labelWidth) {
                            return {
                                x: this.chart.chartWidth * 0.45,
                                y: this.chart.chartHeight * 0.4
                            };
                        }
                    },

                    pane: {
                        startAngle: 360,
                        endAngle: 0,
                        background: [{ // Track for Move
                            outerRadius: '112%',
                            innerRadius: '96%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Exercise
                            outerRadius: '95%',
                            innerRadius: '79%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '78%',
                            innerRadius: '62%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '61%',
                            innerRadius: '45%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }, { // Track for Stand
                            outerRadius: '44%',
                            innerRadius: '28%',
                            backgroundColor: 'rgba(255,255,255,0.002)',
                            borderWidth: 0
                        }]
                    },

                    yAxis: {
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        tickPositions: []
                    },

                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                enabled: false
                            },
                            linecap: 'round',
                            stickyTracking: false,
                            rounded: true
                            //cursor: 'pointer'
                        }
                    },

                    series: [{
                        name: orgarr[0],
                        borderColor: Highcharts.getOptions().colors[0],
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            radius: '112%',
                            innerRadius: '96%',
                            y: valpercent[0],
                            val: valarr[0]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            useHTML: true,
                            allowOverlap: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.9), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[1],
                        borderColor: Highcharts.getOptions().colors[1],
                        data: [{
                            color: Highcharts.getOptions().colors[1],
                            radius: '95%',
                            innerRadius: '79%',
                            y: valpercent[1],
                            val: valarr[1]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.76), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[2],
                        borderColor: Highcharts.getOptions().colors[2],
                        data: [{
                            color: Highcharts.getOptions().colors[2],
                            radius: '78%',
                            innerRadius: '62%',
                            y: valpercent[2],
                            val: valarr[2]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.62), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[3],
                        borderColor: Highcharts.getOptions().colors[3],
                        data: [{
                            color: Highcharts.getOptions().colors[3],
                            radius: '61%',
                            innerRadius: '45%',
                            y: valpercent[3],
                            val: valarr[3]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.48), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'
                            }
                        },
                        showInLegend: true
                    }, {
                        name: orgarr[4],
                        borderColor: Highcharts.getOptions().colors[4],
                        data: [{
                            color: Highcharts.getOptions().colors[4],
                            radius: '44%',
                            innerRadius: '28%',
                            y: valpercent[4],
                            val: valarr[4]
                        }],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            borderColor: '#FFFFFF',
                            borderRadius: 0,
                            borderWidth: 0,
                            align: 'left',
                            allowOverlap: true,
                            useHTML: true,
                            //format: '{series.name} <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #16B329; font-weight: bold">{point.val}</span> <span style="font-size:'+(_this.opts.fontSize + 3) + 'px; color: #74BBFC; font-weight: bold">万条</span> ',
                            formatter: function () {
                                return this.series.name.slice(0, 4) + ' <span style="font-size:1em; color: #16B329;">' + (this.point.val / 10000).toFixed(2) + '</span> <span style="font-size:1em; color: #74BBFC;">万条</span>'
                            },
                            y: -(height * 0.5 * 0.34), // 10 pixels down from the top
                            x: 20,
                            style: {
                                fontSize: _this.opts.fontSize + "px",
                                fontWeight: "normal",
                                textOutline: 'none'

                            }
                        },
                        showInLegend: true
                    }]
                })

            }

        }
    },
    loadSharingOrg: function () {
        var _this = this;

        $.when($.ajax({
            type: "post",
            url: "share?getsharingorgtop5",
            data: {},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        })).done(function (data) {
            var content = data;
            //console.log(content);
            showChart(content);
        }).fail(function (data) {
            console.log(data);
        }).always(function () {
            //zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
            //autoResize();

        });



        function showChart(data) {
            var orgarr = [];
            var valtotal = [];
            var valmonth = [];

            $.each(data, function (i, e) {
                orgarr.push(e.RECEIVEORG);
                valtotal.push(Number(e.TOTALCOUNT, 10));
                valmonth.push(Number(e.MONTHCOUNT, 10));
            });

            var maxTotal = Math.max.apply(null, valtotal);
            var maxTotalIndex = valtotal.indexOf(maxTotal);
            var minTotal = Math.min.apply(null, valtotal);
            var minTotalIndex = valtotal.indexOf(minTotal);

            var maxMonth = Math.max.apply(null, valmonth);
            var maxMonthIndex = valmonth.indexOf(maxMonth);
            var minMonth = Math.min.apply(null, valmonth);
            var minMonthIndex = valmonth.indexOf(minMonth);

            if (!orgarr.length) {
                displayNoData("chart_sharingOrg");
            } else {
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: ''
                    },
                    grid: [
                        { x: '12%', y: '18%', width: '76%', height: '72%' }
                    ],
                    color: ['#ffcc00', '#199bfb'],
                    tooltip: {},
                    legend: {
                        top: '4%',
                        data: ['累计共享条数', '近一月共享条数'],
                        textStyle: {
                            color: '#fff',
                            fontSize: _this.opts.fontSize + 2
                        }
                    },
                    xAxis: {
                        data: orgarr,
                        axisTick: {
                            length: 0
                        },
                        axisLabel: {
                            //formatter: '{value}',
                            interval: 0,
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            },
                            formatter: function (value, index) {
                                if (value.length > 4) {
                                    return value.slice(0, 4) + '...';
                                } else {
                                    return value;
                                }
                                //console.log(breakTextLine(value, 4))
                                //return breakTextLine(value, 4);
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5FC210',
                                width: 2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#34436C'
                            }
                        }
                    },
                    yAxis: [{
                        //type: 'log',
                        name: '',
                        //interval:4,
                        //min: 100,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            },
                            formatter: function (value, index) {
                                if (value >= 10000) {
                                    return value / 10000 + "W";
                                } else {
                                    return value;
                                }
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5FC210',
                                width: 2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#34436C'
                            }
                        },
                        splitArea: {
                            interval: 'auto',
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.15)', 'rgba(200,200,200,0.1)']
                            }
                        }
                    }, {
                        //type: 'log',
                        name: '',
                        //interval: 4,
                        //min: 100,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            },
                            formatter: function (value, index) {
                                if (value >= 10000) {
                                    return value / 10000 + "W";
                                } else {
                                    return value;
                                }
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#5FC210',
                                width: 2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.002)'
                            }
                        }
                    }],
                    series: [{
                        name: '累计共享条数',
                        type: 'bar',
                        barCategoryGap: '40%',
                        barGap: '5%',
                        data: valtotal,
                        markPoint: {
                            //symbolOffset: [0, '50%'],
                            data: [
                                {
                                    name: '最大值 : ' + numberWithCommas(maxTotal),
                                    coord: [maxTotalIndex, maxTotal]
                                }, {
                                    name: '最小值 : ' + numberWithCommas(minTotal),
                                    coord: [minTotalIndex, minTotal]
                                }
                                //{ type: 'max', name: '最大值' },
                                //{ type: 'min', name: '最小值' }
                            ]
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 0, 0]
                            }
                        },
                        tooltip: {
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            }
                        }
                    }, {
                        name: '近一月共享条数',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: valmonth,
                        markPoint: {
                            //symbolOffset: [0, '50%'],
                            data: [
                                {
                                    name: '最大值 : ' + numberWithCommas(maxMonth),
                                    coord: [maxMonthIndex, maxMonth]
                                }, {
                                    name: '最小值 : ' + numberWithCommas(minMonth),
                                    coord: [minMonthIndex, minMonth]
                                }
                                //{ type: 'max', name: '最大值' },
                                //{ type: 'min', name: '最小值' }
                            ]
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 0, 0]
                            }
                        },
                        tooltip: {
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            }
                        }
                    }]
                };

                var myChart = echarts.init(document.getElementById('chart_sharingOrg'));
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

                $(window).resize(function () {
                    myChart.resize();
                });
            }
        }
    },
    loadSharingInfo: function () {
        var _this = this;

        $.when($.ajax({
            type: "post",
            url: "share?getsharinginfotop5",
            data: {},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        })).done(function (data) {
            var content = data;
            //console.log(content);
            showChart(content);
        }).fail(function (data) {
            console.log(data);
        }).always(function () {

        });

        //patch for echarts 3.4.0 (deprecated)
        function isFirefox() {
            return (typeof InstallTrigger !== 'undefined');
        }

        function showChart(data) {
            var orgarr = [];
            var valtotal = [];
            var valmonth = [];

            $.each(data, function (i, e) {
                orgarr.push(e.TYPE);
                valtotal.push(Number(e.TOTALCOUNT, 10));
                valmonth.push(Number(e.MONTHCOUNT, 10));
            });

            //var yMax1 = 5000;
            var yMax1 = Math.max.apply(null, valtotal) * 1.1;
            var dataShadow1 = [];

            var yMaxTemp2 = Math.max.apply(null, valmonth);
            var yMax2 = yMaxTemp2 * 1.1 * 1.5;

            var dataShadow2 = [];

            for (var i = 0; i < valtotal.length; i++) {
                dataShadow1.push(yMax1 - valtotal[i]);
                dataShadow2.push(yMax2 - valmonth[i]);
            }

            if (!orgarr.length) {
                displayNoData("chart_sharingInfo")
            } else {
                var option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    grid: [
                        { x: '5%', y: '20%', width: '45%', height: '75%' }
                    ],
                    legend: {
                        top: '4%',
                        data: ['累计共享条数', '近一月共享条数'],
                        textStyle: {
                            color: '#fff',
                            fontSize: _this.opts.fontSize + 2
                        },
                        selectedMode: false,
                        selected: {
                            // 选中'系列1'
                            '累计共享条数': true,
                            // 不选中'系列2'
                            '近一月共享条数': true
                        }
                    },
                    yAxis: [{
                        name: '单位：条',
                        nameLocation: 'start',
                        inverse: true,
                        position: 'right',
                        data: orgarr,
                        nameTextStyle: {
                            fontSize: _this.opts.fontSize + 2
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: _this.opts.fontSize
                            },
                            formatter: function (value, index) {
                                return breakTextLine(value, parseInt((myChart.getWidth() / 2) / _this.opts.fontSize - 1, 10));

                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#2181D8',
                                width: 3
                            }
                        }
                    }],
                    xAxis: [{
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#999'
                            }
                        },
                        splitLine: {
                            show: false,
                            textStyle: {
                                color: '#999'
                            }
                        },
                        max: yMax1
                    }, {
                        inverse: true,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#999'
                            }
                        },
                        splitLine: {
                            show: false,
                            textStyle: {
                                color: '#999'
                            }
                        },
                        max: yMax2
                    }],
                    series: [

                        {
                            type: 'bar',
                            name: '累计共享条数',
                            stack: 'all1',
                            itemStyle: {
                                normal: {
                                    color: '#2081D9',
                                    barBorderRadius: [0, 0, 0, 0]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        return numberWithCommas(params.data);
                                    },
                                    offset: [0, -2],
                                    textStyle: {
                                        fontSize: _this.opts.fontSize
                                    }
                                }
                            },
                            barCategoryGap: '30%',
                            data: valtotal,
                            zlevel: 1
                        },
                        {
                            type: 'bar',
                            name: '近一月共享条数',
                            stack: 'all2',
                            itemStyle: {
                                normal: {
                                    color: '#5EC310',
                                    barBorderRadius: [0, 0, 0, 0]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        return numberWithCommas(params.data);
                                    },
                                    offset: [0, -2],
                                    textStyle: {
                                        fontSize: _this.opts.fontSize
                                    }
                                }
                            },
                            xAxisIndex: 1,
                            data: valmonth,
                            zlevel: 1
                        }, {
                            type: 'bar',
                            name: '利润1s',
                            stack: 'all1',
                            itemStyle: {
                                normal: {
                                    color: '#34436E',
                                    barBorderRadius: [15, 0, 0, 15]
                                }
                            },
                            data: dataShadow1,
                            zlevel: 0
                        }, {
                            type: 'bar',
                            name: '利润2s',
                            stack: 'all2',
                            itemStyle: {
                                normal: {
                                    color: '#34436E',
                                    barBorderRadius: [15, 0, 0, 15]
                                }
                            },
                            xAxisIndex: 1,
                            data: dataShadow2,
                            zlevel: 0
                        }
                    ]
                };

                if (_this.opts.wide) {
                    option.grid = [
                        { x: '50%', y: '20%', width: '45%', height: '75%' }
                    ];
                    option.yAxis[0].position = 'left';
                    $.each(option.xAxis, function (i, e) {
                        e.inverse = false;
                    });
                    option.series[0].label.normal.position = "insideLeft";
                    option.series[1].label.normal.position = "insideLeft";
                    option.series[2].itemStyle.normal.barBorderRadius = [0, 15, 15, 0];
                    option.series[3].itemStyle.normal.barBorderRadius = [0, 15, 15, 0];
                }

                var myChart = echarts.init(document.getElementById('chart_sharingInfo'));
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

                myChart.on('legendselectchanged', function (params) {
                    option.legend.selected[params.name] = true
                    myChart.setOption(option);

                });

                $(window).resize(function () {
                    myChart.resize();
                });
            }
        }
    }
};

Object.freeze(LoadChart);

//数字添加千分位
function numberWithCommas(x) {
    var parts = (_.isNull(x) || _.isUndefined(x) ? "" : x).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};

//字符按长度添加换行符
function breakTextLine(value, length) {
    var _value = value.toString().split("");
    var _length = parseInt(length, 10);
    for (var i = 1; i * _length < _value.length; i++) {
        _value.splice(i * _length + (i - 1), 0, "\n");
    }
    return _value.join("");
};

function breakTextLineHtml(value, length) {
    var _value = value.toString().split("");
    var _length = parseInt(length, 10);
    for (var i = 1; i * _length < _value.length; i++) {
        _value.splice(i * _length + (i - 1), 0, "<br>");
    }
    return _value.join("");
};

function displayNoData(id) {
    var cc = Highcharts.chart(id, {
        chart: {
            backgroundColor: 'rgba(255,255,255,0.002)'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        series: [{
            type: 'pie',
            name: 'Random data',
            data: []
        }],
        noData: {
            style: {
                fontWeight: 'normal',
                fontSize: (LoadChart.opts.fontSize + 3) + 'px',
                fontFamily: LoadChart.opts.fontFamily,
                color: '#fff'
            }
        }
    });
}