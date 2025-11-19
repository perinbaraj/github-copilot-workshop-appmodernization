/**
 * Task Model
 * Legacy AngularJS model definition
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .factory('Task', TaskFactory);

    function TaskFactory() {
        function Task(data) {
            this.id = data.id || Date.now();
            this.title = data.title || '';
            this.description = data.description || '';
            this.status = data.status || 'pending'; // pending, inprogress, completed
            this.priority = data.priority || 'medium'; // low, medium, high
            this.projectId = data.projectId || null;
            this.assignedTo = data.assignedTo || '';
            this.dueDate = data.dueDate || null;
            this.createdAt = data.createdAt || new Date().toISOString();
            this.updatedAt = data.updatedAt || new Date().toISOString();
            this.completed = data.completed || false;
            this.tags = data.tags || [];
        }

        Task.prototype.markAsCompleted = function() {
            this.completed = true;
            this.status = 'completed';
            this.updatedAt = new Date().toISOString();
        };

        Task.prototype.markAsPending = function() {
            this.completed = false;
            this.status = 'pending';
            this.updatedAt = new Date().toISOString();
        };

        Task.prototype.isOverdue = function() {
            if (!this.dueDate) return false;
            return new Date(this.dueDate) < new Date() && !this.completed;
        };

        return Task;
    }

})();
