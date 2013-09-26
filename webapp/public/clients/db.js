function ViewCtrl ($scope, $http) {
	$http({
		url : "/admin/api/db/",
		method : "GET"
	}).success(function (data, status, headers, config) {		
		$scope.db = data;
	}).error(function (data, status, headers, config) {
		$scope.db = {};
	});
	$scope.save = function () {
		$http({
			url : "/admin/db/save/",
			method : "POST",
			data : $scope.db
		});
	};
}