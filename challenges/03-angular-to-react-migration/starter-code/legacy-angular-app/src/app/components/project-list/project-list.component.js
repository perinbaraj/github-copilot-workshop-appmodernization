/**
 * Project List Component
 * Legacy AngularJS component
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .component('projectList', {
            templateUrl: 'src/app/components/project-list/project-list.template.html',
            controller: ProjectListController
        });

    ProjectListController.$inject = ['$scope', 'ProjectService', 'TaskService'];

    function ProjectListController($scope, ProjectService, TaskService) {
        var vm = this;

        vm.projects = [];
        vm.projectStats = {};
        vm.loading = true;

        vm.$onInit = onInit;

        function onInit() {
            loadProjects();
        }

        function loadProjects() {
            vm.loading = true;

            ProjectService.getAllProjects()
                .then(function(projects) {
                    vm.projects = projects;
                    
                    // Load stats for each project
                    projects.forEach(function(project) {
                        loadProjectStats(project.id);
                    });
                })
                .catch(function(error) {
                    console.error('Error loading projects:', error);
                })
                .finally(function() {
                    vm.loading = false;
                    $scope.$apply();
                });
        }

        function loadProjectStats(projectId) {
            TaskService.getTasksByProject(projectId)
                .then(function(tasks) {
                    vm.projectStats[projectId] = {
                        total: tasks.length,
                        completed: tasks.filter(function(t) { return t.completed; }).length,
                        inProgress: tasks.filter(function(t) { return t.status === 'inprogress'; }).length
                    };
                    $scope.$apply();
                });
        }
    }

})();
