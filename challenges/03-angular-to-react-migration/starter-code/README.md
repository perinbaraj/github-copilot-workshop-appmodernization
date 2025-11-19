# Legacy AngularJS Task Manager

This is a legacy task management application built with **AngularJS 1.8.2** that needs migration to modern React.

## Current Stack

- **AngularJS 1.8.2** (End of Life)
- **ngRoute** for routing
- **ngResource** for REST operations
- **jQuery 3.5.1** (unnecessary dependency)
- **Bootstrap 3.4.1** (outdated)
- **localStorage** for data persistence
- No build tooling (script tags in HTML)

## Target Stack

- **React 18** with TypeScript
- **React Router v6** for routing
- **Fetch API** or axios for HTTP
- **No jQuery** (native DOM/React patterns)
- **Tailwind CSS** or **Material-UI**
- Modern build tools (**Vite**)
- **ES modules** and modern JavaScript

## Project Structure

```
legacy-angular-app/
├── index.html                  # Main HTML with script tags
├── package.json                # npm dependencies
├── src/
│   ├── app/
│   │   ├── app.module.js       # AngularJS module definition
│   │   ├── app.config.js       # ngRoute configuration
│   │   ├── models/
│   │   │   └── task.model.js   # Task model with prototype methods
│   │   ├── services/
│   │   │   ├── task.service.js      # Task CRUD operations
│   │   │   ├── project.service.js   # Project operations
│   │   │   └── storage.service.js   # localStorage wrapper
│   │   └── components/
│   │       ├── task-list/
│   │       │   ├── task-list.component.js
│   │       │   └── task-list.template.html
│   │       ├── task-form/
│   │       │   ├── task-form.component.js
│   │       │   └── task-form.template.html
│   │       ├── project-list/
│   │       │   ├── project-list.component.js
│   │       │   └── project-list.template.html
│   │       └── about/
│   │           ├── about.component.js
│   │           └── about.template.html
│   └── assets/
│       └── styles.css          # Custom styles
```

## Key Legacy Patterns to Migrate

### 1. Module System
```javascript
// AngularJS - IIFE modules
(function() {
    'use strict';
    angular.module('taskManagerApp', ['ngRoute']);
})();

// React - ES6 modules
import React from 'react';
export default function App() { }
```

### 2. Components
```javascript
// AngularJS - component definition
angular.module('taskManagerApp')
    .component('taskList', {
        templateUrl: 'template.html',
        controller: TaskListController
    });

// React - functional component
export function TaskList() {
    return <div>...</div>;
}
```

### 3. State Management
```javascript
// AngularJS - $scope binding
function Controller($scope) {
    $scope.tasks = [];
    $scope.$watch('filter', applyFilter);
}

// React - hooks
function Component() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => applyFilter(), [filter]);
}
```

### 4. Services
```javascript
// AngularJS - service with $q promises
angular.service('TaskService', function($q) {
    this.getTasks = function() {
        var deferred = $q.defer();
        // ...
        return deferred.promise;
    };
});

// React - custom hook
export function useTaskService() {
    const [tasks, setTasks] = useState([]);
    
    const fetchTasks = async () => {
        const data = await loadFromStorage();
        setTasks(data);
    };
    
    return { tasks, fetchTasks };
}
```

### 5. Routing
```javascript
// AngularJS - ngRoute
$routeProvider
    .when('/tasks', { template: '<task-list></task-list>' })
    .when('/tasks/:id', { template: '<task-form></task-form>' });

// React Router
<Routes>
    <Route path="/tasks" element={<TaskList />} />
    <Route path="/tasks/:id" element={<TaskForm />} />
</Routes>
```

### 6. Templates
```html
<!-- AngularJS -->
<div ng-repeat="task in $ctrl.tasks">
    <h3>{{ task.title }}</h3>
    <button ng-click="$ctrl.delete(task.id)">Delete</button>
</div>

<!-- React JSX -->
{tasks.map(task => (
    <div key={task.id}>
        <h3>{task.title}</h3>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
))}
```

## Running the Legacy Application

**Prerequisites:**
- Node.js 14+ (for http-server)

**Steps:**
1. Install dependencies:
   ```powershell
   npm install
   ```

2. Start the application:
   ```powershell
   npm start
   ```

3. Open browser:
   ```
   http://localhost:8080
   ```

**Note:** This uses `http-server` to serve static files. No build process required (legacy approach).

## Migration Challenges

### Technical Debt
- **jQuery dependency** - Used by Bootstrap 3, but not needed in React
- **Global variables** - AngularJS relies on global `angular` object
- **Script tag loading** - No module bundler
- **Manual DOM manipulation** - Some jQuery in templates
- **Two-way binding** - AngularJS magic vs React explicit state

### Breaking Changes
- **Component lifecycle** - Different lifecycle methods
- **Event handling** - Different syntax and patterns
- **Form handling** - Two-way binding vs controlled components
- **Routing** - Complete routing system replacement
- **Build process** - Need to set up Vite/Webpack

### Performance Issues
- **Digest cycle** - $scope.$apply() performance overhead
- **Watchers** - $watch adds performance cost
- **No virtual DOM** - Direct DOM manipulation
- **Bundle size** - jQuery + AngularJS + Bootstrap = large bundle

## Your Mission

Use **GitHub Copilot** to help you:

1. **Analyze** the codebase and create a migration plan
2. **Set up** a modern React project with Vite
3. **Convert** each component systematically
4. **Migrate** state management to hooks/Context
5. **Replace** routing with React Router
6. **Modernize** UI with current CSS framework
7. **Add** TypeScript for type safety
8. **Test** the migrated application
9. **Deploy** with modern build process

## Features to Preserve

All functionality must work after migration:
- ✅ Create, edit, delete tasks
- ✅ Filter tasks by status, priority, search
- ✅ Mark tasks as complete/incomplete
- ✅ View task statistics
- ✅ View projects with task counts
- ✅ Data persistence in localStorage
- ✅ Responsive design

## Success Metrics

- Zero AngularJS dependencies
- Zero jQuery dependencies
- Modern React patterns throughout
- TypeScript support
- Fast build times with Vite
- Improved performance
- Better developer experience

## Resources

- [AngularJS API Documentation](https://docs.angularjs.org/api)
- [React Migration Guide](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com/)
