/**
 * AngularJS Application Configuration
 * Routing configuration using ngRoute (legacy)
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/tasks', {
                template: '<task-list></task-list>'
            })
            .when('/tasks/new', {
                template: '<task-form></task-form>'
            })
            .when('/tasks/:id/edit', {
                template: '<task-form></task-form>'
            })
            .when('/projects', {
                template: '<project-list></project-list>'
            })
            .when('/about', {
                template: '<about></about>'
            })
            .otherwise({
                redirectTo: '/tasks'
            });

        // Use hash-based routing (legacy)
        $locationProvider.hashPrefix('!');
    }

})();
