<?php

Route::get('api/dbmanager/tables', function() {
	$response = DBManager::tables();
	return Response::json($response);
});

Route::get('api/dbmanager/table/(:any)', function($table) {
	$response = DBManager::table($table)->info();
	return Response::json($response);
});