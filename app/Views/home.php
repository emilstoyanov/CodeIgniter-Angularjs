<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Store App</title>
	<base href="/">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/png" href="/favicon.ico"/>

	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/styles.css">	

	<script src="/lib/script.js"></script>
	<script src="/lib/jquery.min.js"></script>
	<script src="/lib/angular.min.js"></script>
  <script src="/lib/angular-route.min.js"></script>
	<script src="/app/app.js"></script>
	<script src="/app/database.service.js"></script>


</head>
<body ng-app="StoreApp">
	<div id="content-wrap"><div ng-view></div></div>
	<div id="loading_big" data-loading></div>
</body>
</html>
