package com.fgi.utils;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
 * 字符串处理工具类
 */

public class StringHelper {
	public static String getSqlCodePath(String code) {
		if (code.length() < 6) {
			String codeEnd = "";
			for (int i = 0; i < 6 - code.length(); i++) {
				codeEnd += "0";
			}
			code += codeEnd;
		}
		if (code.substring(2, 6).equals("0000")) {
			return " substr(AreaCode,0,2)='" + code.substring(0, 2) + "'";
		}
		if (code.substring(4, 6).equals("00")) {
			return " substr(AreaCode,0,4)='" + code.substring(0, 4) + "'";
		} else {
			return " AreaCode='" + code + "'";
		}

	}
	
	/**
	 * 判断字符串是否为null，""或是"null"
	 * @param s 要检查的字符串
	 * @return boolean
	 */
	public static boolean isNull(String s) {
		return StringUtils.isEmpty(s) || s.equals("null");
	}

	/**
	 * 判断字符串是否为null，如果不是就直接返回，否则返回"" 这个函数主要用于对一些前台对象值的判断，以防止在界面上显示null
	 * 
	 * @param s
	 *            要检查的字符串
	 * @return 如果为null,返回""空字符串
	 */
	public static String checkNull(String s) {
		return isNull(s) ? "" : s;
	}

	/**
	 * 判断对象是否为null，如果不是就直接返回，否则返回"" 这个函数主要用于对一些前台对象值的判断，以防止在界面上显示null
	 * 
	 * @param obj
	 *            要检查的对象
	 * @return 如果为null,返回""空字符串
	 */
	public static String checkNull(Object obj) {
		return obj == null ? "" : obj.toString();
	}

	/**
	 * 判断字符串是否为null和""，如果不是就直接返回，否则返回defaultStr
	 * 这个函数主要用于对一些前台对象值的判断，以防止在界面上显示null
	 * 
	 * @param s
	 *            要检查的字符串
	 * @return 如果为null,返回 defaultStr 空字符串
	 */
	public static String checkNull(String s, String defaultStr) {
		if (StringUtils.isEmpty(defaultStr)) {
			return checkNull(s);
		} else if (isNull(s)) {
			return defaultStr;
		}
		return s;
	}

	/**
	 * 检索字符串是否存在特殊字符（\ / : * ? \" < > |），若存在就替换为空
	 * 
	 * @param filename
	 * @return
	 */
	public static String checkSpecialChar(String strSpecial) {

		String regEx = "[/|*|\\\\|:|?|\"|<|>||]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(strSpecial);

		return m.replaceAll("").trim();
	}

	public static void main(String[] args) {
		String dObject = "fffffff";
		checkNull(dObject,"dasd");
	}
}
