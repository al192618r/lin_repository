(function ($) {
	$.extend({
	    /**
	     * post提交
	     * @param url 接口地址
	     * @param args 参数
	     * @param isnew 是否打开新窗口
	     */
	    standardPost:function(url,args,isnew){
	        var form = document.createElement("form"),
	            input;
	        form.setAttribute("method", "post");
	        form.setAttribute("id", "newwindowpost");
	        form.setAttribute("style", "display:none;");
	        if (isnew==true) {
	        	form.setAttribute("target", "_blank");
	        } 
	        form.setAttribute("action", url);
	        for (var key in args) {
	        	if (args.hasOwnProperty(key)) {
		            input = document.createElement("input");
		            input.setAttribute("name", key);
		            input.setAttribute("value", args[key]);
		            form.appendChild(input);
	        	}
	        }
	        document.body.appendChild(form);
	        form.submit();
	        document.getElementById("newwindowpost").outerHTML='';
	    },
	    jsonFromSubmit:function(url,args,originurl,callback){
	        var body = $(document.body),
	            form = $("<form></form>"),
	            input,submitInput,
	            iframe;
	        form.prop({"id":"jsonform",
				"action":url,
				"style": "display:none;",
				"method":"post"
	        });
	        $.each(args,function(key,value){
	            input = $("<input type='hidden'>");
	            input.prop({"name":key});
	            input.val(value);
	            form.append(input);
	        });
	        submitInput='<input type="submit" value="Submit this form!" id="my-form-submit">';
	        form.append(submitInput);
	        
	        if (!form.prop('target'))
	        {
	            //create a unique iframe for the form
	            iframe = $("<iframe></iframe>").prop('name', 'ajax_form_' + Math.floor(Math.random() * 999999)).hide(0).appendTo(body);
	            form.prop('target', iframe.prop('name'));
	        }
	        body.append(form);
	        
/*	        iframe.load(function () {
                //get the server response
                var response = iframe.contents().find('body').text();
                console.log(response);
	            if(_.isFunction(callback)){
	            	callback(response);
	            }
	            $('iframe[name=" ' + $form.attr('target') + ' "]').remove();
	            document.getElementById("jsonform").outerHTML='';
            });
	        */
	        var state = 0;
	        
	        iframe.load (function() {
	        	var _iframe = document.getElementsByName(form.prop('target'))[0];
	            if(state === 1) {
	            	console.log(_iframe.contentWindow.name);
	                var data = JSON.parse(_iframe.contentWindow.name);
	                console.log(data);
	                _iframe.contentWindow.document.write('');
	                _iframe.contentWindow.close();
	              document.body.removeChild(iframe);
	            } else if(state === 0) {
	                state = 1;
	                _iframe.contentWindow.location = originurl;
	                //iframe.contentWindow.location = originurl;
	            }
	        });
	        
	        $("#my-form-submit").click();
/*        	$("#my-form-submit").click(function(e) {
        		e.preventDefault();
        		var $this = $('#jsonform');
        		if(type==="post"){

	        	    $.post($this.prop("action"), $this.serialize(), function(jsonData){
	        	    	console.log(jsonData);
	    	            if(_.isFunction(callback)){
	    	            	callback(jsonData);
	    	            }
	        	    }, "json");
	        	    document.getElementById("jsonform").outerHTML='';
	        	} else if(type==="get") {

	        	    $.getJSON($this.prop("action")+'?'+$this.serialize(), function(jsonData){
	        	    	console.log(jsonData);
	    	            if(_.isFunction(callback)){
	    	            	callback(jsonData);
	    	            }
	        	    }, "json");
	        	    document.getElementById("jsonform").outerHTML='';
	        	} else {
	        		document.getElementById("jsonform").outerHTML='';
	        	}
        	})
        	$("#my-form-submit").click();*/

	    },
	    /**
	     * 验证身份证正确性
	     * @param idcard 身份证号码
	     * @return 是否
	     */
	    checkIdNumber:function(idcard) {
	        var Errors = new Array(
	        "验证通过!",
	        "身份证号码位数不对!",
	        "身份证号码出生日期超出范围或含有非法字符!",
	        "身份证号码校验错误!",
	        "身份证地区非法!"
	        );
	        
	        var errorStr = "";
	        var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
	
	        var idcard, Y, JYM;
	        var S, M;
	        var idcard_array = new Array();
	        idcard_array = idcard.split("");
	        //地区检验   
	        if (area[parseInt(idcard.substr(0, 2))] == null){
	        	errorStr = Errors[4];
	        	return false;
	        } 
	        //身份号码位数及格式检验   
	        switch (idcard.length) {
	            //15位身份号码检测  
	            case 15:
	                if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
	                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性   
	                } else {
	                    ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性   
	                }
	                if (ereg.test(idcard)){
	                	errorStr = Errors[0];
	                	return true;
	                } else{
	                	errorStr = Errors[2];
	                	return false;
	                }
	                break;
	            //18位身份号码检测  
	            case 18:
	                if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
	                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式   
	                } else {
	                    ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式   
	                }
	                if (ereg.test(idcard)) {//测试出生日期的合法性   
	                    //计算校验位   
	                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
	                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
	                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
	                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
	                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
	                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
	                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
	                    + parseInt(idcard_array[7]) * 1
	                    + parseInt(idcard_array[8]) * 6
	                    + parseInt(idcard_array[9]) * 3;
	                    Y = S % 11;
	                    M = "F";
	                    JYM = "10X98765432";
	                    M = JYM.substr(Y, 1);//判断校验位   
	                    if (M == idcard_array[17]){
	                    	errorStr = Errors[0];
	                    	return true;
	                    } //检测ID的校验位   
	                    else{
	                    	errorStr = Errors[3];
	                    	return false;
	                    } 
	                }
	                else {
	                	errorStr = Errors[2];
	                	return false;
	                }
	                break;
	            default:
	            	errorStr = Errors[1];
	            	return false;
	                break;
	        }
	    },
	    /**
	     * 判断浏览器类型
	     * @return 浏览器值
	     */
	    browserDetect:function() {
			if (this.BrowserDetect.prototype._cachedResult)
	     	    return this.BrowserDetect.prototype._cachedResult;
			// Opera 8.0+
			var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
			
			// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== 'undefined';
			
			// Safari 3.0+ "[object HTMLElementConstructor]" 
			var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
			
			// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/false || !!document.documentMode;
			
			// Edge 20+
			var isEdge = !isIE && !!window.StyleMedia;
			
			// Chrome 1+
			var isChrome = !!window.chrome && !!window.chrome.webstore;
			
			// Blink engine detection
			var isBlink = (isChrome || isOpera) && !!window.CSS;
			
			return this.BrowserDetect.prototype._cachedResult =
		        isOpera ? 'Opera' :
		        isFirefox ? 'Firefox' :
		        isSafari ? 'Safari' :
		        isChrome ? 'Chrome' :
		        isIE ? 'IE' :
		        isEdge ? 'Edge' :
		        "Don't know";
		},
		/**
		 * 禁止拖动图片
		 */
		 disableImageDragging:function(){
			var $div = $("<div>").attr({
							"onselectstart":"return false;",
							"onmousedown":"return false;"
						}).css({
							  "-moz-user-select": "none",
							  "-webkit-user-select": "none",
							  "-ms-user-select": "none",
							  "user-select": "none",
							  "-webkit-user-drag": "none",
							  "user-drag": "none",
							  "-webkit-touch-callout": "none",
							  "display":"inline"
						});
			$("img").wrap($div);
		},
		/**
		 * 随机生成名字
		 * @return 名字
		 */
		randomGenerateName:function(){
			var familyNames = ["李","王","张","刘","陈","杨","赵","黄","周","吴","徐","孙","胡","朱","高","林","何","郭","马","罗","梁","宋","郑","谢","韩","唐","冯","于","董","萧","程","曹","袁","邓","许","傅","沈","曾","彭","吕","苏","卢","蒋","蔡","贾","丁","魏","薛","叶","阎","余","潘","杜","戴","夏","钟","汪","田","任","姜","范","方","石","姚","谭","廖","邹","熊","金","陆","郝","孔","白","崔","康","毛","邱","秦","江","史","顾","侯","邵","孟","龙","万","段","漕","钱","汤","尹","黎","易","常","武","乔","贺","赖","龚","文"];
			
			var givenNames = ["鸿才","兰泽","怡嘉","毅君","驷向","文成","松雪","沛容","成化","梦寒","欣悦","佳晶","浩波","孙安","梦露","清舒","翠琴","黎明","幼仪","迎梅","文昂","元恺","晴霞","恨荷","星泽","如雪","念真","梅青","芃芃","雪萍","梦琪","乐童","静雅","白亦","访波","于惜","俊逸","飞虎","宜修","布侬","翠丝","英华","绿兰","英秀","吟怀","白萱","思涵","平萱","姜云","芝宇","晶晶","和悦","雅韵","承志","涵涵","碧菡","采春","又青","晴丽","念桃","之桃","盼芙","怜翠","代灵","慧颖","寄翠","丰茂","灵秀","语柔","傲松","干芸","凌春","玉轩","慧语","咏思","丘静","秋彤","光济","小星","雅辰","白风","灵寒","鸿羲","红叶","子实","燕珺","夜梦","孟君","凝雁","飞兰","伶俐","问玉","景天","琬凝","云蔚","子墨","珠玉","凝琴","醉山","寒天","诗文","蕙芸","春岚","寻梅","善静","雯华","和玉","希慕","炫明","心愫","书南","刚洁","丘安","安双","星洲","夏之","清淑","高峰","傲之","子舒","丘语","学民","舌正","娇然","纳兰","驰婷","冬卉","舒方","端丽","书意","阳绿","若芳","华荣","郭傲","新竹","智敏","岚岚","宛筠","乐蓉","雪卉","夜卉","云梦","芳蔼","南晴","雪冰","易绿","飞尘","中震","冰薇","韶华","含海","以彤","振荣","天骄","友安","兴发","美曼","灵枫","雅蕊","怜晴","颜子","梓洁","芳洁","昆谊","越彬","晓霜","成天","星雨","迎南","芳泽","宛白","春兰","冬灵","元凯","琼岚","兴怀","怜阳","春荷","桂月","鹏鲸","芳泽","晓凡","雯丽","密思","刚豪","诗怀","平松","宛秋","安珊","春蕾","思溪","珍丽","笑翠","瑜然","空昊","俊才","馨兰","秋寒","语蕊","友菱","鸿祯","向梦","水蕊","鸿熙","曼容","昕雨","芷珍","珊珊","阳夏","元青","沛山","世敏","高洁","晴虹","兴业","晓兰","姣妍","嘉熙","锐达","妙芙","忆南","今瑶","问凝","兰月","西晓","祺然","雁菱","语海","贞静","舒云","寄柔","曼珠","翔飞","海白","光华","迎梅","彤雯","映雁","春柔","迎梅","水卉","访烟","博涛","白云","鸿煊","一瑾","诗蕊","晶灵","书凝","彩妍","萍韵","博明","盼丹","天路","柔惠","梦寒","冷梅","婉君","浩思","婷玉","孤松","佑运","丽泽","雅洁","含桃","樱花","芸儿","沛珊","佳星","琼华","若蕊","寇访","秀英","冰蝶","和暖","韦茹","冰珍","绿海","沛白","新柔","迟如","冷荷","飞烟","怜烟","湛芳","莫暖","官珺","秋白","梦菲","笑晴","明志","盼旋","暖梦","伶伶","荏苒","海冬","高旻","白薇","晓蕾","察嘉","佩杉","卓逸","蕴藉","谷芹","思云","水蓝","念文","书易","经艺","丹寒","令羽","乐蕊","以冬","湛英","鹏海","慕山","温韦","从冬","秋月","星阑","幼丝","奇水","飞航","冰蓝","梓楠","玉珂","婷秀","宏才","又菡","尔烟","孤容","友容","雨竹","嘉澍","人如","文乐","天纵","梦槐","飞莲","丹彤","正雅","听莲","子萱","伟才","觅儿","月桂","代双","香彤","傲丝","哲茂","门昆","翠芙","子菡","依丝","博容","湛英","致萱","从丹","红叶","静枫","千风","秋荣","靖易","尔真","又菡","运杰","晓曼","远悦","皓君","香露","安安","青烟","昆纬","冷萱","友安","晋鹏","忻欢","骊蓉","宛凝","苇然","慕梅","正婷","雅素","若云","逸仙","沛蓝","芳馨","马乐","飞兰","德义","嘉懿","文斌","翠桃","娟丽","雅青","清懿","易绿","思菱","晨轩","和昶","青枫","文石","自珍","恨之","鸿宝","采蓝","红云","雪翎","和志","弘益","霞辉","婷美","文采","依楠","子默","逸馨","建华","云露","文景","孤菱","颐和","宵月","海阳","佳悦","容抒","良奥","春芳","星汉","谷昊","安易","蝶梦","门寻","若彤","官梓","翰翮","怜云","良俊","驰媛","祺祥","耘涛","觅云","含香","江雪","青旋","雅可","敏丽","问蕊","凡双","华皓","笑卉","沛白","于骏","开诚","英华","旭辉","俊美","兰梦","静安","奇思","幻桃","天真","翠茵","紫云","依云","安露","梓舒","建安","泽洋","采萱","静晨","双文","雅柏","玮艺","靖荷","新林","慕梅","清奇","思远","建弼","才俊","承基","涵韵","浩淼","梓欣","碧蓉","杨柳","胤文","修谨","灵安","鸿文","映冬","白安","震博","水之","丹红","紫杉","含灵","丹秋","思雅","涵亮","文丽","迎荷","依琴","寒荷","绮琴","马逸","婉仪","忆敏","成和","旭彬","奇文","从安","可心","淑懿","车文","高朗","曼珍","曼妮","曼雁","善和","恨桃","凝思","初翠","问香","思娜","梅红","旻骞","晓瑶","凌春","笑容","绮梦","雁菱","晨萱","博远","木静","飞雪","海秋","惜萍","向薇","兰娜","彤蕊","奇逸","安梦","念珍","清芬","齐敏","以彤","飞柏","芮欣","丹翠","英耀","夜蓉","又柔","瑞芝","芮悦","文彬","骊英","梓敏","和豫","兴庆","驰皓","怡然","良映","和悌","芳华","初之","屠绮","阳飙","鸿晖","虹影","长菁","辕乐","依心","运莱","雅采","文君","安然","俊拔","慈心","秋巧","依白","双玉","笑槐","典丽","嘉珍","尔阳","叔鸣","俟梦","翠曼","涵衍","叶农","傲旋","灵秋","念瑶","悦宜","采波","诗丹","俊慧","易巧","白萱","妙晴","千雁","水彤","凌波","小夏","温纶","梅英","俊发","梦竹","迎夏","白莲","凯泽","绣文","孙丽","寻桃","傲薇","芸静","鲁以","靖荷","高澹","清婉","离奥","傲薇","绿蕊","叔曦","萧曼","访彤","浩邈","若星","凡白","问枫","静珊","绍祺","沛槐","梁觅","鹤梦","佳悦","孙白","映真","元洲","紫雪","月华","晓楠","瑞锦","徒从","慧丽","和正","丹溪","山兰","平雅","醉波","雪曼","小星","忻畅","悠奕","正信","和平","雁山","小春","凌蝶","小谷","天蓝","芷烟","悦欣","青梦","宛妙","安晏","飞莲","幼柏","沈雅","春绿","盼易","思柔","冰双","甫可","伟茂","碧萱","以莲","羊嘉","凝然","晓桐","春雪","仙媛","秀华","岚翠","敏达","乐心","侯以","锐智","烨华","华彩","安妮","莉莉","国兴","经纬","梓婷","浩言","雅逸","蕴美","安然","门尔","海之","春姝","安琪","萱彤","高昂","静娴","晴丽","运珹","慕思","寒蕾","香巧","白柏","佁然","涵阳","曼雁","玉泉","迎蓉","琛瑞","朗宁","云飞","凌蝶","忆文","父寄","一嘉","烨烨","台俊","山梅","亦丝","坚壁","冰绿","竹雨","梦露","宫和","沈思","念露","甘雨","杏儿","里如","笑阳","尔容","平晓","飞鸿","新月","飞捷","和宜","俊英","德元","史春","丝微","念柏","沙羽","尔云","乐蓉","丰雅","音华","哲丽","孙小","方庆","苒苒","初阳","连其","阳荣","孙沛","访儿","迎波","怀雁","令锋","修真","圣杰","夜卉","姮娥","秀媛","恨瑶","茂典","佳妍","狐逸","红旭","桂枫","香卉","睿思","傲柔","五芬","廖痴","悦爱","秀隽","天籁","情文","振锐","巧夏","俊晤","丹南","暄美","婉慧","红香","古香","慕蕊","鸿卓","瑜蓓","佳玄","智敏","芳懿","高阳","云心","乐安","英光","向槐","葛乐","亦凝","以晴","妍和","暄玲","心语","离尔","景平","又琴","睿敏","萍雅","起运","怀玉","忆安","芳蕤","韶丽","彭丹","向文","和怡","云梦","康伯","忆丹","梓涵","炳君","涵畅","文翰","寻春","恬雅","沛槐","文惠","海桃","琼英","凝绿","梧桐","延访","山槐","怀玉","岚彩","经略","辰韦","虹颖","之双","映冬","之桃","浩涆","晓凡","娴雅","卿月","静枫","谷玉","如风","骏祥","忆曼","阳飇","芳菲","安萱","娴静","子濯","子琳","云淡","建茗","简千","门平","淳美","迎南","子宁","振华","清秋","羡丽","元芹","向山","凡白","瀚海","喇晓","谷兰","星然","睿文","冶友","舒兰","曼凡","熙星","盈盈"];;
			
			var i = parseInt(Math.random()* (familyNames.length));
			var familyName = familyNames[i];
			var j = parseInt(Math.random()* (givenNames.length));
			var givenName = givenNames[j];
			var name = familyName + givenName;
			return name;
		},
		/**
	     * timestamp转换为正常时间
	     * @param ts timestamp数字
	     * @return yyyy-MM-dd hh24:mm:ss
		 */
		timestampToTime:function(ts){
			var time = new Date();
			if (ts){
				if(ts.length == 10) {
					ts*=1000;
				}
				ts-=(time.getTimezoneOffset() * 60000); //UTC时间转化为当前时区时间
				time = new Date(ts);
			}
			var timeArr = time.toJSON().split('T');
			return timeArr[0]+' '+timeArr[1].slice(0,8);
		},
		/**
	     * 获取url链接参数
		 */
		getUrlVars:function() {
		    var vars = {};
		    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		      vars[key] = value;
		    });
		    return vars;
		 }
	});
	
	
    $.fn.extend({
    	disableSelection: function (options) {  
            var defaults = {  
            }　　　　   
            var opts = $.extend(defaults, options);  
            this.attr('unselectable','on')
            .css({'-moz-user-select':'-moz-none',
                  '-moz-user-select':'none',
                  '-o-user-select':'none',
                  '-khtml-user-select':'none',
                  '-webkit-user-select':'none',
                  '-ms-user-select':'none',
                  'user-select':'none'
            }).on('selectstart', function(){ return false; });
        }  
    });
})(jQuery);

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}