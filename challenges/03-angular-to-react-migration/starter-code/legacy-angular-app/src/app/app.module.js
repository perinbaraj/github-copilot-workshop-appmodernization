/**
 * Legacy AngularJS Application Module
 * Version: 1.8.2
 * 
 * This is a legacy AngularJS (1.x) application that needs migration to React.
 * It uses outdated patterns including:
 * - AngularJS modules and dependency injection
 * - Two-way data binding with $scope
 * - Controllers instead of component-based architecture
 * - $http service instead of modern fetch/axios
 * - jQuery dependencies
 */

(function() {
    'use strict';

    angular.module('taskManagerApp', [
        'ngRoute',
        'ngResource'
    ]);

})();
