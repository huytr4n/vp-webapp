function ViewCtrl($scope, $http) { 	
	$http({
	    url: "/admin/api/product/",
	    method: "GET"	    
	}).success(function(data, status, headers, config) {
	    $scope.products = data; 
	});
	
	$scope.destroy = function ($param) {		
		var oldVal = $scope.products;
		$scope.products = [];
		angular.forEach(oldVal, function (product) {
			if(product._id !== $param) $scope.products.push(product);
		});
		$http({
			url : "/admin/product/destroy/" + $param,
			method : "GET"
		});
	};	
}

function EditCtrl($scope, $http) {
	$scope.init = function (id) {
		$http({
			url : "/admin/api/product/" + id,
			method : "GET"
		}).success(function (data, status, headers, config) {
			$scope.product = data;
		});
	}
}