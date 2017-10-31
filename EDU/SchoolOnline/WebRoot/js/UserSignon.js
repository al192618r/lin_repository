
/********************************************************************************************
* 文件名称:	UserSignon.js
* 设计人员:	许志伟 依赖/// <reference path="SL.Core.js" />
/// <reference path="SL.Broswer.js" />
* 设计时间:	
* 功能描述:	单点控件(更改以前采用vbs代码很乱或者没有封装API给第三方应用逻辑不清晰)
*		
* 注意事项:	
*
* 版权所有:	Copyright (c) 2012, Fujian SIRC
*
* 修改记录: 	修改时间		人员		修改备注
*				----------		------		-------------------------------------------------
*
********************************************************************************************/
/// <reference path="SL.Core.js" />
/// <reference path="SL.Broswer.js" />
;
;
;
;
(function () {
    var UserSignonObj = window.UserSignonObj = function () {
        this.InitSignonObj.apply(this, arguments);
    }
    UserSignonObj.prototype = {
        InitSignonObj: function (webServerAddress,successFun,failFun) {
            this.comObj = CreateSignonActiveXObject(webServerAddress);
            if( this.comObj)
            {
              successFun && successFun.call(this);
            }
            else{
              failFun && failFun.call(this);
            }

        },
        toString: function () {
            return "单点控件";
        },
        Login: function (userName, usrPWD, successFn, failFn) {
            ///	<summary>
            ///单点登录
            ///	</summary>
            ///	<param name="userName" type="String">
            ///用户名
            ///	</param>
            ///	<param name="usrPWD" type="String">
            ///密码
            ///	</param>
            ///	<returns type="Boolean" />
            if (checkSignonComIsExist(this.comObj)) {
                this.comObj.WebSvcUserName = userName;
                this.comObj.WebSvcUserPassWord = usrPWD;
                var IsSuccess = this.comObj.UserLogin();
                if (IsSuccess) {
                    successFn && successFn.call(this);
                }
                if (!IsSuccess) {
                    this.GetErrorInfo();
                    failFn && failFn.call(this);
                }
                return IsSuccess;
            }
            else {
                return false;
            }

        },
        UserGetGUID: function () {
            ///	<summary>
            ///获取用户Guid
            ///	</summary>
            ///	<returns type="String" >返回用户guid</returns>
            if (checkSignonComIsExist(this.comObj)) {
                return this.comObj.UserGetGUID();
            }
            else {
                return null;
            }
        },
        UserIsValidGUID: function (successFn, failedFn) {
            ///	<summary>
            ///验证用户Guid是否有效
            ///	</summary>
            ///	<returns type="Boolean" >是否有效</returns>
            if (checkSignonComIsExist(this.comObj)) {
                if (this.comObj.UserIsValidGUID()) {
                    successFn && successFn.call(this);
                    return true;
                }
                else {
                failedFn && failedFn.call(this);
                    return false;
                }
            }
            else {
            failedFn && failedFn.call(this);
                return false;
            }
        },
        LoginOut: function () {
            ///	<summary>
            ///注销
            ///	</summary>
            ///	<returns  type="Boolean" >是否有效</returns>
            if (checkSignonComIsExist(this.comObj)) {
                return this.comObj.UserLogoff();
            }
            else {
                return false;
            }

        },
        CheckSignonObj: function () {
            ///	<summary>
            ///验证单点控件是够存在
            ///	</summary>
            ///	<returns  type="Boolean" >/returns>
            return checkSignonComIsExist(this.comObj);

        },
        GetMsg: function () {
            ///	<summary>
            ///监视控件消息
            ///	</summary>
            ///	<returns  type="Boolean" >如果返回的是LOGOFF表示单点在其他地方登录</returns>
            if (checkSignonComIsExist(this.comObj)) {
                return this.comObj.GetMsgInfo();
            }
            else {
                return null;
            }
        },
        GetErrorInfo: function () {
            if (checkSignonComIsExist(this.comObj)) {
                if (this.comObj.VersionNumber >= "3.0.0.6") {
                    alert(this.comObj.GetErrorInfo());
                }
                else {
                    alert("对不起,用户帐号或密码不正确！请安装最新单点登录控件,显示更多错误信息。");
                }
            }
        }
    }

    function CreateSignonActiveXObject(webServerAddress) {
//        if (!SL().Browser.ie) {
//            alert("单点控件只能在IE浏览器下使用，请使用IE浏览器！");
//            return null;
//        }
        try {

            var Ccom = new ActiveXObject("UserInformation.clsUserInformation");
            Ccom.WebSvcAddress = webServerAddress;
            return Ccom;

        }
        catch (e) {
            alert("单点登录控件初始化失败，请确保单点控件已经安装！");
            return null; // alert("单点登录控件初始化失败，请确保单点控件已经安装！");
        }
    }

    function checkSignonComIsExist(com) {
        if (com == null) {
            alert("单点登录控件初始化失败，请确保单点控件已经安装！");
            return false;
        }
     
      if (!(com.VersionNumber&&com.VersionNumber >= "3.0.0.6")) {
              alert("单点控件不是最新版本,请安装最新版本单点控件！");
               return false;
       }

        
        return true;
    }

    function isFunction(obj) {
        return (typeof obj == 'function');
    }
})();

