/**
 * Task Form Component
 * Legacy AngularJS component for creating/editing tasks
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .component('taskForm', {
            templateUrl: 'src/app/components/task-form/task-form.template.html',
            controller: TaskFormController
        });

    TaskFormController.$inject = ['$scope', '$location', '$routeParams', 'TaskService', 'ProjectService'];

    function TaskFormController($scope, $location, $routeParams, TaskService, ProjectService) {
        var vm = this;

        // Properties
        vm.task = {};
        vm.projects = [];
        vm.isEditMode = false;
        vm.loading = false;
        vm.error = null;

        // Methods
        vm.$onInit = onInit;
        vm.saveTask = saveTask;
        vm.cancel = cancel;

        function onInit() {
            vm.isEditMode = !!$routeParams.id;

            // Load projects
            ProjectService.getAllProjects()
                .then(function(projects) {
                    vm.projects = projects;
                    $scope.$apply();
                });

            if (vm.isEditMode) {
                // Load existing task
                vm.loading = true;
                TaskService.getTaskById($routeParams.id)
                    .then(function(task) {
                        vm.task = task;
                        // Convert date string to Date object for input
                        if (vm.task.dueDate) {
                            vm.task.dueDate = new Date(vm.task.dueDate).toISOString().split('T')[0];
                        }
                    })
                    .catch(function(error) {
                        vm.error = 'Failed to load task: ' + error;
                    })
                    .finally(function() {
                        vm.loading = false;
                        $scope.$apply();
                    });
            } else {
                // Initialize new task
                vm.task = {
                    title: '',
                    description: '',
                    status: 'pending',
                    priority: 'medium',
                    projectId: null,
                    assignedTo: '',
                    dueDate: null,
                    tags: []
                };
            }
        }

        function saveTask() {
            if (!vm.task.title) {
                alert('Please enter a task title');
                return;
            }

            vm.loading = true;
            vm.error = null;

            var savePromise;
            if (vm.isEditMode) {
                savePromise = TaskService.updateTask(vm.task.id, vm.task);
            } else {
                savePromise = TaskService.createTask(vm.task);
            }

            savePromise
                .then(function() {
                    $location.path('/tasks');
                })
                .catch(function(error) {
                    vm.error = 'Failed to save task: ' + error;
                    vm.loading = false;
                    $scope.$apply();
                });
        }

        function cancel() {
            $location.path('/tasks');
        }
    }

})();
