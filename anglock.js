var app = angular.module('testapp', ['ngAnimate']); 

app.directive('anglock',  ['$animate', function($animate) {
    return {
        restrict: 'EA',
        scope: { },
        template: [
        '<div class="anglock">',
        '<div class="anglock-hide anglock-child">',
       		'<span class="anglock-hours">{{hours12}}</span>',
          '<span class="anglock-separator">:</span>',
          '<span class="anglock-minutes">{{minutes}}</span>',
          '<span class="anglock-separator">:</span>',
          '<span class="anglock-seconds">{{seconds}}</span>',
          '<span class="anglock-designator">{{ designator }}</span>',
        '</div>',
        '<div class="anglock-child">',
       		'<span class="anglock-hours">{{hours}}</span>',
          '<span class="anglock-separator">:</span>',
          '<span class="anglock-minutes">{{minutes}}</span>',
          '<span class="anglock-separator">:</span>',
          '<span class="anglock-seconds">{{seconds}}</span>',
        '</div>',
        '</div>'
          
          ].join(""),
        controller: ['$scope', '$interval', function ($scope, $interval) { 
        
        $scope.hours = "";
        $scope.hours12 = "";
        $scope.minutes = "";
        $scope.seconds = "";
        $scope.designator = "";
        $scope._24HourMode = true;
          
          $scope.refreshTime = function(){

          		var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                $scope.designator = hours >= 12 ? 'PM' : 'AM';
                $scope.hours = hours < 10 ? '0'+hours : hours;
                //if(!$scope._24HourMode)
                //{
                  hours = hours % 12;
                  if(hours == 0) hours = 12;
                //}
                $scope.hours12 = hours < 10 ? '0'+hours : hours;
                $scope.minutes = minutes < 10 ? '0'+minutes : minutes;
                $scope.seconds = seconds < 10 ? '0' + seconds : seconds;
          	
          }
          $scope.refreshTime();
        
          $interval(function () {
                $scope.refreshTime();
          }, 1000);
        
        }],
        link: function ($scope, element, attrs) { 
        	element.bind('click', function () {
          
		      var elements = element[0].children[0].children;
		      $scope._24HourMode = !$scope._24HourMode;

			  $animate.removeClass(angular.element(elements[$scope._24HourMode ? 1 : 0]), 'anglock-hide');
              $animate.addClass(angular.element(elements[$scope._24HourMode ? 1 : 0]), 'anglock-show');
              
              $animate.removeClass(angular.element(elements[$scope._24HourMode ? 0 : 1]), 'anglock-show');
              $animate.addClass(angular.element(elements[$scope._24HourMode ? 0 : 1]), 'anglock-hide');
              
           });
        } 
    }
}]);