package com.fgi.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 * 
 * ---------------------------------------------<br>
 * 异常处理类 <br>
 * <br>
 * Version: 1.0<br>
 * Author: sirc_fxf<br>
 * DateTime: 2016-3-31 <br>
 * *********************************************<br>
 */
public class ExceptionUtils {
    
    //  日志
    Logger log = LogManager.getLogger(ExceptionUtils.class);
    
    /**
     * 获取堆栈异常信息
     * @param e
     * @return
     */
    public static String getStackTrace(Exception e) {
        StringWriter writer = new StringWriter();
        e.printStackTrace(new PrintWriter(writer, true));
        return writer.toString();
    }
    
}
