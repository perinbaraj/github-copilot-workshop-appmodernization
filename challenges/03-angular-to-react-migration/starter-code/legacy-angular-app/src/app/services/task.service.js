/**
 * Task Service
 * Legacy AngularJS service using $http and localStorage
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .service('TaskService', TaskService);

    TaskService.$inject = ['$q', 'StorageService', 'Task'];

    function TaskService($q, StorageService, Task) {
        var self = this;
        var STORAGE_KEY = 'tasks';

        // Initialize with sample data if empty
        self.initializeSampleData = function() {
            var existingTasks = StorageService.get(STORAGE_KEY);
            if (!existingTasks || existingTasks.length === 0) {
                var sampleTasks = [
                    {
                        id: 1,
                        title: 'Migrate to React',
                        description: 'Convert this legacy AngularJS application to modern React',
                        status: 'inprogress',
                        priority: 'high',
                        projectId: 1,
                        assignedTo: 'Development Team',
                        dueDate: '2025-12-31',
                        tags: ['migration', 'react', 'modernization']
                    },
                    {
                        id: 2,
                        title: 'Update Dependencies',
                        description: 'Remove jQuery and Bootstrap 3, use modern alternatives',
                        status: 'pending',
                        priority: 'high',
                        projectId: 1,
                        assignedTo: 'Frontend Team',
                        dueDate: '2025-11-30',
                        tags: ['dependencies', 'cleanup']
                    },
                    {
                        id: 3,
                        title: 'Implement State Management',
                        description: 'Replace AngularJS services with Redux or Context API',
                        status: 'pending',
                        priority: 'medium',
                        projectId: 1,
                        assignedTo: 'Architecture Team',
                        tags: ['state-management', 'redux']
                    },
                    {
                        id: 4,
                        title: 'Create Component Library',
                        description: 'Build reusable React components',
                        status: 'completed',
                        priority: 'medium',
                        projectId: 2,
                        assignedTo: 'UI Team',
                        completed: true,
                        tags: ['components', 'ui']
                    },
                    {
                        id: 5,
                        title: 'Write Unit Tests',
                        description: 'Add Jest and React Testing Library tests',
                        status: 'pending',
                        priority: 'low',
                        projectId: 2,
                        assignedTo: 'QA Team',
                        dueDate: '2026-01-15',
                        tags: ['testing', 'jest']
                    }
                ];
                StorageService.set(STORAGE_KEY, sampleTasks);
            }
        };

        self.getAllTasks = function() {
            var deferred = $q.defer();
            
            // Simulate async operation
            setTimeout(function() {
                var tasks = StorageService.get(STORAGE_KEY) || [];
                deferred.resolve(tasks.map(function(taskData) {
                    return new Task(taskData);
                }));
            }, 300);

            return deferred.promise;
        };

        self.getTaskById = function(id) {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var tasks = StorageService.get(STORAGE_KEY) || [];
                var task = tasks.find(function(t) { return t.id == id; });
                
                if (task) {
                    deferred.resolve(new Task(task));
                } else {
                    deferred.reject('Task not found');
                }
            }, 200);

            return deferred.promise;
        };

        self.createTask = function(taskData) {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var tasks = StorageService.get(STORAGE_KEY) || [];
                var newTask = new Task(taskData);
                newTask.id = Date.now();
                newTask.createdAt = new Date().toISOString();
                newTask.updatedAt = new Date().toISOString();
                
                tasks.push(newTask);
                StorageService.set(STORAGE_KEY, tasks);
                deferred.resolve(newTask);
            }, 200);

            return deferred.promise;
        };

        self.updateTask = function(id, taskData) {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var tasks = StorageService.get(STORAGE_KEY) || [];
                var index = tasks.findIndex(function(t) { return t.id == id; });
                
                if (index !== -1) {
                    taskData.updatedAt = new Date().toISOString();
                    tasks[index] = taskData;
                    StorageService.set(STORAGE_KEY, tasks);
                    deferred.resolve(new Task(tasks[index]));
                } else {
                    deferred.reject('Task not found');
                }
            }, 200);

            return deferred.promise;
        };

        self.deleteTask = function(id) {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var tasks = StorageService.get(STORAGE_KEY) || [];
                var filteredTasks = tasks.filter(function(t) { return t.id != id; });
                
                StorageService.set(STORAGE_KEY, filteredTasks);
                deferred.resolve(true);
            }, 200);

            return deferred.promise;
        };

        self.getTasksByProject = function(projectId) {
            return self.getAllTasks().then(function(tasks) {
                return tasks.filter(function(task) {
                    return task.projectId == projectId;
                });
            });
        };

        self.getTaskStats = function() {
            return self.getAllTasks().then(function(tasks) {
                return {
                    total: tasks.length,
                    completed: tasks.filter(function(t) { return t.completed; }).length,
                    pending: tasks.filter(function(t) { return t.status === 'pending'; }).length,
                    inProgress: tasks.filter(function(t) { return t.status === 'inprogress'; }).length,
                    overdue: tasks.filter(function(t) { return t.isOverdue(); }).length
                };
            });
        };

        // Initialize sample data on service creation
        self.initializeSampleData();
    }

})();
