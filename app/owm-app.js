angular.module('OWMApp', ['ngRoute', 'ngAnimate'])

	.value('owmCities', ['New York', 'Dallas', 'Chicago'])


	.config(['$routeProvider', function($routeProvider, $location) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/cities/:city', {
			templateUrl: 'city.html',
			controller: 'CityCtrl',
			resolve : {
        city: function(owmCities, $route, $location) {
          var city = $route.current.params.city;
          if(owmCities.indexOf(city) == -1 ) {
              $location.path('/error');
              return;
          };
          return city;
        }
	    }
		})
		.when('/error', {
			template : '<p>Error - Page Not Found</p>'
		})
		.otherwise({
			redirectTo: '/error'
		});
	}])

	.run(function($rootScope, $location, $timeout) {
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/error');
		});
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.isLoading = true;
		});
		$rootScope.$on('$routeChangeSuccess', function() {
			$timeout(function() {
				$rootScope.isLoading = false;
			}, 1000);
		});
	})

	.controller('HomeCtrl', function($scope) {

	})

	.controller('CityCtrl', function($scope, city) {
		$scope.city = city;
	});