/**
 * About Component
 * Legacy AngularJS component
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .component('about', {
            templateUrl: 'src/app/components/about/about.template.html',
            controller: AboutController
        });

    function AboutController() {
        var vm = this;

        vm.appInfo = {
            name: 'Legacy Task Manager',
            version: '1.0.0',
            framework: 'AngularJS 1.8.2',
            year: 2020
        };

        vm.legacyPatterns = [
            'AngularJS 1.x modules and dependency injection',
            'Two-way data binding with $scope',
            'Controllers instead of component-based architecture',
            '$http service instead of modern fetch/axios',
            'jQuery dependencies',
            'Bootstrap 3 (outdated)',
            'ngRoute instead of modern routing',
            'Manual digest cycles with $scope.$apply()',
            'Legacy template syntax',
            'No TypeScript support'
        ];

        vm.modernEquivalents = [
            { legacy: 'AngularJS modules', modern: 'ES6 modules with React' },
            { legacy: '$scope binding', modern: 'useState, useReducer hooks' },
            { legacy: 'Controllers', modern: 'Functional components' },
            { legacy: '$http service', modern: 'fetch API or axios' },
            { legacy: 'jQuery', modern: 'Native DOM APIs or React refs' },
            { legacy: 'Bootstrap 3', modern: 'Bootstrap 5, Material-UI, Tailwind' },
            { legacy: 'ngRoute', modern: 'React Router v6' },
            { legacy: '$scope.$apply()', modern: 'Automatic re-renders' },
            { legacy: 'ng-repeat', modern: 'Array.map()' },
            { legacy: 'Factories/Services', modern: 'Custom hooks, Context API' }
        ];
    }

})();
