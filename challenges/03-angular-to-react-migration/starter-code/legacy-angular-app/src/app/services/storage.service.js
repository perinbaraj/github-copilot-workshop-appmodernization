/**
 * Local Storage Service
 * Legacy service using localStorage API
 */

(function() {
    'use strict';

    angular
        .module('taskManagerApp')
        .service('StorageService', StorageService);

    function StorageService() {
        var self = this;

        self.get = function(key) {
            try {
                var item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return null;
            }
        };

        self.set = function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error writing to localStorage:', e);
                return false;
            }
        };

        self.remove = function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        };

        self.clear = function() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Error clearing localStorage:', e);
                return false;
            }
        };
    }

})();
