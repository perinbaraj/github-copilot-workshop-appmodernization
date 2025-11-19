/**
 * Project Service
 * Legacy AngularJS service
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .service('ProjectService', ProjectService);

    ProjectService.$inject = ['$q', 'StorageService'];

    function ProjectService($q, StorageService) {
        var self = this;
        var STORAGE_KEY = 'projects';

        // Initialize with sample data
        self.initializeSampleData = function() {
            var existingProjects = StorageService.get(STORAGE_KEY);
            if (!existingProjects || existingProjects.length === 0) {
                var sampleProjects = [
                    {
                        id: 1,
                        name: 'App Modernization',
                        description: 'Migrate legacy AngularJS app to React',
                        status: 'active',
                        startDate: '2025-01-01',
                        endDate: '2025-12-31'
                    },
                    {
                        id: 2,
                        name: 'UI Component Library',
                        description: 'Build reusable React component library',
                        status: 'active',
                        startDate: '2025-06-01',
                        endDate: '2025-09-30'
                    },
                    {
                        id: 3,
                        name: 'Performance Optimization',
                        description: 'Improve application performance and load times',
                        status: 'planning',
                        startDate: '2026-01-01',
                        endDate: '2026-03-31'
                    }
                ];
                StorageService.set(STORAGE_KEY, sampleProjects);
            }
        };

        self.getAllProjects = function() {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var projects = StorageService.get(STORAGE_KEY) || [];
                deferred.resolve(projects);
            }, 300);

            return deferred.promise;
        };

        self.getProjectById = function(id) {
            var deferred = $q.defer();
            
            setTimeout(function() {
                var projects = StorageService.get(STORAGE_KEY) || [];
                var project = projects.find(function(p) { return p.id == id; });
                
                if (project) {
                    deferred.resolve(project);
                } else {
                    deferred.reject('Project not found');
                }
            }, 200);

            return deferred.promise;
        };

        // Initialize sample data
        self.initializeSampleData();
    }

})();
