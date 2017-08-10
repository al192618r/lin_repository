<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<?xml version="1.0" encoding="UTF-8" ?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="javax.servlet.*"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>修改用户</title>
</head>
<body>
	<h1>修改用户页</h1>
	<p>修改用户信息</p>
	<p>${message}</p>
	<form:form method="POST" commandName="user"
		action="${pageContext.request.contextPath}/user/edit/${user.id}.html">
		<table>
			<tbody>
				<tr>
					<td>名称:</td>
					<td><form:input path="name" /></td>
				</tr>
				<tr>
					<td>地址:</td>
					<td><form:input path="address" /></td>
				</tr>
				<tr>
					<td>电话:</td>
					<td><form:input path="phone" /></td>
				</tr>
				<tr>
					<td><input type="submit" value="修改" /></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</form:form>

	<p>
		<a href="${pageContext.request.contextPath}/index.html">主页面</a>
	</p>
</body>
</html>