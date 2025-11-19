/**
 * Task List Component
 * Legacy AngularJS component with controller
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .component('taskList', {
            templateUrl: 'src/app/components/task-list/task-list.template.html',
            controller: TaskListController
        });

    TaskListController.$inject = ['$scope', '$location', 'TaskService'];

    function TaskListController($scope, $location, TaskService) {
        var vm = this;

        // Properties
        vm.tasks = [];
        vm.filteredTasks = [];
        vm.loading = true;
        vm.error = null;
        vm.filter = {
            status: '',
            priority: '',
            search: ''
        };
        vm.stats = null;

        // Methods
        vm.$onInit = onInit;
        vm.loadTasks = loadTasks;
        vm.deleteTask = deleteTask;
        vm.toggleTaskStatus = toggleTaskStatus;
        vm.editTask = editTask;
        vm.createNewTask = createNewTask;
        vm.applyFilter = applyFilter;
        vm.clearFilter = clearFilter;
        vm.getPriorityClass = getPriorityClass;
        vm.getStatusClass = getStatusClass;

        function onInit() {
            loadTasks();
            loadStats();
        }

        function loadTasks() {
            vm.loading = true;
            vm.error = null;

            TaskService.getAllTasks()
                .then(function(tasks) {
                    vm.tasks = tasks;
                    vm.filteredTasks = tasks;
                    applyFilter();
                })
                .catch(function(error) {
                    vm.error = 'Failed to load tasks: ' + error;
                    console.error('Error loading tasks:', error);
                })
                .finally(function() {
                    vm.loading = false;
                    $scope.$apply(); // Force digest cycle (legacy pattern)
                });
        }

        function loadStats() {
            TaskService.getTaskStats()
                .then(function(stats) {
                    vm.stats = stats;
                    $scope.$apply();
                });
        }

        function deleteTask(taskId) {
            if (confirm('Are you sure you want to delete this task?')) {
                TaskService.deleteTask(taskId)
                    .then(function() {
                        loadTasks();
                        loadStats();
                    })
                    .catch(function(error) {
                        alert('Failed to delete task: ' + error);
                    });
            }
        }

        function toggleTaskStatus(task) {
            if (task.completed) {
                task.markAsPending();
            } else {
                task.markAsCompleted();
            }

            TaskService.updateTask(task.id, task)
                .then(function() {
                    loadStats();
                    $scope.$apply();
                })
                .catch(function(error) {
                    alert('Failed to update task: ' + error);
                });
        }

        function editTask(taskId) {
            $location.path('/tasks/' + taskId + '/edit');
        }

        function createNewTask() {
            $location.path('/tasks/new');
        }

        function applyFilter() {
            vm.filteredTasks = vm.tasks.filter(function(task) {
                var matchesStatus = !vm.filter.status || task.status === vm.filter.status;
                var matchesPriority = !vm.filter.priority || task.priority === vm.filter.priority;
                var matchesSearch = !vm.filter.search || 
                    task.title.toLowerCase().indexOf(vm.filter.search.toLowerCase()) !== -1 ||
                    task.description.toLowerCase().indexOf(vm.filter.search.toLowerCase()) !== -1;

                return matchesStatus && matchesPriority && matchesSearch;
            });
        }

        function clearFilter() {
            vm.filter = {
                status: '',
                priority: '',
                search: ''
            };
            applyFilter();
        }

        function getPriorityClass(priority) {
            return 'priority-' + priority;
        }

        function getStatusClass(status) {
            return 'status-' + status;
        }

        // Watch for filter changes (legacy AngularJS pattern)
        $scope.$watch(function() {
            return vm.filter;
        }, function() {
            applyFilter();
        }, true);
    }

})();
