package com.fgi.utils;

import java.util.UUID;

/** 
 * 主键生成工具类
 * @author  
 * @date 
 * @version 1.0 
 *
 */
public class IdGenerateUtil {
	/**
	 * 生成UUID
	 * @return
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString();
	}
	
	/**
	 * 生成Oracle SYS_GUID()
	 * @return
	 */
	public static String getSYSGUID() {
		return UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
	}
	
	public static void main(String[] args) {
		
	}
	
}
