<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="javax.servlet.*"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>主页</title>
</head>
<body>
	<h1>主页</h1>
	<p>
		${message}<br /> 
		<a href="${pageContext.request.contextPath}/user/add.html">添加用户</a><br/>
		<a href="${pageContext.request.contextPath}/user/list.html">用户列表</a><br/>
	</p>
</body>
</html>