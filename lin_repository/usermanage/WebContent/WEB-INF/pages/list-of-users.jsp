<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<?xml version="1.0" encoding="UTF-8" ?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="javax.servlet.*"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>用户列表</title>
</head>
<body>
	<h1>用户列表</h1>
	<p>可以查看、修改和添加和删除用户</p>
	<table border="1px" cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				<th width="5%">编号</th>
				<th width="5%">名称</th>
				<th width="10%">地址</th>
				<th width="10%">电话</th>
				<th width="10%">操作</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="user" items="${users}">
				<tr>
					<td>${user.id}</td>
					<td>${user.name}</td>
					<td>${user.address}</td>
					<td>${user.phone}</td>
					<td>
						<a href="${pageContext.request.contextPath}/user/edit/${user.id}.html">编辑</a><br/>
						<a href="${pageContext.request.contextPath}/user/delete/${user.id}.html">删除</a><br/>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

	<p>
		<a href="${pageContext.request.contextPath}/index.html">主页面</a>
	</p>

</body>
</html>