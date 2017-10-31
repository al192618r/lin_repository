package com.fgi.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/** 
 * 时间工具类
 * @author  sirc_fxf E-mail: 
 * @date 创建时间：2016年3月18日 上午10:58:29 
 * @version 1.0 
 *
 */
public class DateUtil {

	private static String format = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 将日期格式字符串转换成java.util.Date 类型，如果格式为空将返回null
	 * @param String timeStr 要转换的日期数据
	 * @param String format 转换的格式
	 * @return Date
	 */
	public Date parseDate(String timeStr, String format) {
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			date = sdf.parse(timeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		} 
		return date;
	}
	
	/**
	 * 将日期格式字符串转换成java.util.Date 类型，如果格式为空将返回null
	 * @param String timeStr
	 * @param String format
	 * @param boolean lenient
	 * @return
	 */
	public Date parseDate(String timeStr, String format, boolean lenient) {
		Date date = null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		sdf.setLenient(lenient);
		try {
			date = sdf.parse(timeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		} 
		return date;
	}
	
	/**
	 * 根据指定的日期格式格式化成日期字符串
	 * @param Date date
	 * @param String format
	 * @return String
	 */
	public String toStringFormat(Date date, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		
		String retDate = sdf.format(date);
		
		return retDate;
	}
	
	/**
	 * 获取当前系统时间字符串，yyyy-MM-dd HH:mm:ss格式
	 * @return String
	 */
	public String getNowTime() {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		
		String retDate = sdf.format(new Date());
		
		return retDate;
	}
	
	/**
	 * 根据格式获取当前系统时间字符串，
	 * @param String format 时间格式
	 * @return String
	 */
	public String getNowTime(String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		
		String retDate = sdf.format(new Date());
		
		return retDate;
	}
	
	/**
	 * 根据字符串型时间获取时间类型，不匹配时为空
	 * @param time传入的时间
	 * @return
	 */
	public Date getDateFormat(String time,String timeValue){
		Date value=null;
		boolean flag=false;
		SimpleDateFormat sd=null;
		if(timeValue.equals("1")){
			try {
				sd=new SimpleDateFormat("yyyy/MM/dd");
				sd.setLenient(false);
				sd.parse(time);
				flag=true;
				value= sd.parse(time);
				} catch (ParseException e) {
				}
			try {
				sd=new SimpleDateFormat("yyyy-MM-dd");
				sd.setLenient(false);
				sd.parse(time);
				flag=true;
				value= sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyyMMdd");
				sd.setLenient(false);
				sd.parse(time);
				flag=true;
				value= sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy年MM月dd日");
				sd.setLenient(false);
				sd.parse(time);
				flag=true;
				value= sd.parse(time);
			} catch (ParseException e) {
			}
			if(flag){
				return value;
			}
		}else if(timeValue.equals("9")){
			try {
				sd=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
				sd.setLenient(false);
				sd.parse(time);
				flag=true;
				value= sd.parse(time);
				} catch (ParseException e) {
				}
			if(!flag){
				try {
					sd=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					sd.setLenient(false);
					sd.parse(time);
					flag=true;
					value= sd.parse(time);
					} catch (ParseException e) {
					}
				try {
					sd=new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
					sd.setLenient(false);
					sd.parse(time);
					flag=true;
					value= sd.parse(time);
					} catch (ParseException e) {
					}
				try {
					sd=new SimpleDateFormat("yyyyMMdd HH:mm:ss");
					sd.setLenient(false);
					sd.parse(time);
					flag=true;
					value= sd.parse(time);
					} catch (ParseException e) {
					}
			}
			if(flag){
				return value;
			}
		}else{
			try {
				sd=new SimpleDateFormat("yyyy-MM-dd");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyyMMdd");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy年MM月dd日");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy/MM");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy/MM/dd HH");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
			try {
				sd=new SimpleDateFormat("yyyy/MM/dd HH:mm");
				sd.setLenient(false);
				sd.parse(time);
				return sd.parse(time);
			} catch (ParseException e) {
			}
		}
		return value;
	}
	
	/**
	 * 计算两个时间相差秒数
	 * @param maxtime
	 * @param mintime
	 * @return
	 */
	public  String getDuration(String maxtime,String mintime){
		 String days="";
		SimpleDateFormat df = new SimpleDateFormat(format);
		try
		{
		    Date d1 = df.parse(maxtime);
		    Date d2 = df.parse(mintime);
		    days=getDuration(d1,d2);
		}
		catch (Exception e)
		{
		}
		return String.valueOf(days);
	}
	
	/**
	 * 计算两个时间相差秒数
	 * @param maxtime
	 * @param mintime
	 * @return
	 */
	public  String getDuration(Date maxtime,Date mintime){
		 long days=0;
		try
		{
		    long diff = maxtime.getTime() - mintime.getTime();
		     days = diff / 1000 ;
		}
		catch (Exception e)
		{
		}
		return String.valueOf(days);
	}
	
	
	public static void main(String[] args) {
		DateUtil dateUtil = new DateUtil();
		
		//System.out.println(dateUtil.checkTimeFormatByRegex("4", "2016年5月14日"));
		
		/*long time = 1530736079;
		Date date = new Date(time);
		DateUtil dateutil = new DateUtil();
		System.out.println(dateutil.parseDateToStr(date, "yyyy-MM-dd HH:mm:ss"));*/
		/*String test = "123、阿斯顿发、";
		System.out.println(test.split("、").length);*/
		/*String timeformat = "yyyy年MM月dd日";
		String time = "2016年5月26日";
		DateUtil dateUtil = new DateUtil();
		System.out.println(dateUtil.parseStrToDate(time, timeformat));*/
		/*String input = "2015/01/01 01:01:01";
        String regex = Constant.getTimeRegex("9");
        System.out.println (input.matches (regex));*/
		/*List list = new ArrayList();
		Map<String, String> map1 = new HashMap();
		map1.put("id", "这是ID1");
		map1.put("name", "这是姓名1");
		
		Map<String, String> map2 = new HashMap();
		map2.put("id", "这是ID2");
		map2.put("name", "这是姓名2");
		
		Map<String, String> map3 = new HashMap();
		map3.put("id", "这是ID3");
		map3.put("name", "这是姓名3");
		
		list.add(map1);
		list.add(map2);
		list.add(map3);
		JSONArray jsonArray = new JSONArray(list);
		System.out.println(jsonArray.toString());*/
		/*DateUtil dateUtil = new DateUtil();
		System.out.println(dateUtil.parseStrToDate("2016-01-01", "yyyy"));*/
		/*String[] testarr = ",警告,罚款,没收违法所得、没收非法财物,责令停产停业,暂扣或者吊销许可证、暂扣或吊销执照,行政拘留,其他".split(",");
		System.out.println(testarr.toString());
		for (int j = 0; j < testarr.length; j++) {
			System.out.println(testarr[j]);
		}*/
		/*String test = "1234";
		try {
			System.out.println(test.substring(0, 10));
		} catch (Throwable e) {
			e.printStackTrace();
		}*/
		/*for (int i = 0; i < 100; i++) {
			Thread t1 = new Thread(new Runnable() {
				public void run() {
					testHttp();
				}
			});
			t1.start();
		}*/
		
		
		
	}
	
	public static void testHttp() {
		/*String data = "";
		CloseableHttpClient httpclient = null;
		CloseableHttpResponse httpResponse = null;
		
		boolean flag = false;
		try {
			PropertiesUtil properUtil = new PropertiesUtil();
			String url = "http://127.0.0.1:8080/YzwConvergenceWebService/ImportdataServlet";
			httpclient = HttpClients.createDefault();
			HttpPost httpPost = new HttpPost(url);
			StringEntity entity = new StringEntity("");
			httpPost.setEntity(entity);
			httpResponse = httpclient.execute(httpPost);
			HttpEntity respEntity = httpResponse.getEntity();
			if (httpResponse.getStatusLine().toString().contains("200")) {// 200是成功
				String datetwo = "";
				// 获取响应信息 
				data = EntityUtils.toString(respEntity, Charset.forName("utf-8"));
				
				HttpClient httpclienttwo = new DefaultHttpClient();
				HttpGet httpget = new HttpGet("http://127.0.0.1:8080/YzwConvergenceWebService/ImportdataServlet");
				// 伪装成google的爬虫
				httpget.setHeader("User-Agent",
						"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
				// System.out.println("executing request " +
				// httpget.getURI());
				HttpResponse response = httpclienttwo.execute(httpget);
				// 得到网络资源的字节数组,并写入文件
				HttpEntity entitytwo = response.getEntity();
				if (entitytwo != null) {
					if (response.getStatusLine().toString().contains("200")) {// 200是成功
						// 获取响应信息 
						datetwo = EntityUtils.toString(entitytwo, Charset.forName("utf-8"));
					}
				}
				// 释放资源
				EntityUtils.consume(entity);
				System.out.println("datetwo:" + datetwo);	
				
			}
			httpResponse.close();
			// 释放资源
			EntityUtils.consume(respEntity);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (httpResponse != null) {
					httpResponse.close();
				}

				if (httpclient != null) {
					httpclient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("data:" + data);	*/
	}
}
