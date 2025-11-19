# Solution Guide: AngularJS to React Migration

Complete solution for migrating the legacy AngularJS task manager to modern React.

## Overview

This guide demonstrates a systematic migration from AngularJS 1.8 to React 18 with TypeScript.

## Phase 1: Project Setup

### Create New React Project

```powershell
# Create Vite React TypeScript project
npm create vite@latest react-task-app -- --template react-ts
cd react-task-app

# Install dependencies
npm install react-router-dom
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind CSS

**tailwind.config.js:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Phase 2: Type Definitions

### src/types/task.ts

```typescript
export type TaskStatus = 'pending' | 'inprogress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: number;
  assignedTo: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  tags: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  overdue: number;
}

export interface TaskFilter {
  status: string;
  priority: string;
  search: string;
}
```

### src/types/project.ts

```typescript
export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
}
```

## Phase 3: Custom Hooks

### src/hooks/useLocalStorage.ts

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### src/hooks/useTaskService.ts

```typescript
import { useState, useCallback, useEffect } from 'react';
import { Task, TaskStats } from '../types/task';
import { useLocalStorage } from './useLocalStorage';

const SAMPLE_TASKS: Task[] = [
  {
    id: 1,
    title: 'Migrate to React',
    description: 'Convert this legacy AngularJS application to modern React',
    status: 'inprogress',
    priority: 'high',
    projectId: 1,
    assignedTo: 'Development Team',
    dueDate: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completed: false,
    tags: ['migration', 'react', 'modernization']
  },
  // ... more sample tasks
];

export function useTaskService() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', SAMPLE_TASKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      // Tasks already loaded from localStorage
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskById = useCallback((id: number): Task | undefined => {
    return tasks.find(task => task.id === id);
  }, [tasks]);

  const createTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const updateTask = useCallback((id: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTaskStatus = useCallback((id: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        return {
          ...task,
          completed: newCompleted,
          status: newCompleted ? 'completed' : 'pending',
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  }, [setTasks]);

  const getTaskStats = useCallback((): TaskStats => {
    const now = new Date();
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'inprogress').length,
      overdue: tasks.filter(t => 
        t.dueDate && new Date(t.dueDate) < now && !t.completed
      ).length
    };
  }, [tasks]);

  const getTasksByProject = useCallback((projectId: number) => {
    return tasks.filter(task => task.projectId === projectId);
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskStats,
    getTasksByProject
  };
}
```

## Phase 4: Components

### src/components/TaskList.tsx

```typescript
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useTaskService } from '../hooks/useTaskService';
import { TaskFilter } from '../types/task';

export function TaskList() {
  const { tasks, loading, error, deleteTask, toggleTaskStatus, getTaskStats } = useTaskService();
  const [filter, setFilter] = useState<TaskFilter>({
    status: '',
    priority: '',
    search: ''
  });

  const stats = useMemo(() => getTaskStats(), [getTaskStats]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesStatus = !filter.status || task.status === filter.status;
      const matchesPriority = !filter.priority || task.priority === filter.priority;
      const matchesSearch = !filter.search || 
        task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.search.toLowerCase());
      
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filter]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const clearFilter = () => {
    setFilter({ status: '', priority: '', search: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Legacy Warning */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        <strong>✅ Migrated:</strong> This application has been successfully migrated from AngularJS to React!
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <Link
          to="/tasks/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create New Task
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: stats.total, color: 'blue' },
          { label: 'Completed', value: stats.completed, color: 'green' },
          { label: 'In Progress', value: stats.inProgress, color: 'yellow' },
          { label: 'Overdue', value: stats.overdue, color: 'red' }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
            <div className={`text-3xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">Filter Tasks</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search}
            onChange={e => setFilter({ ...filter, search: e.target.value })}
            className="border rounded-lg px-4 py-2"
          />
          <select
            value={filter.status}
            onChange={e => setFilter({ ...filter, status: e.target.value })}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filter.priority}
            onChange={e => setFilter({ ...filter, priority: e.target.value })}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={clearFilter}
            className="border rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No tasks found</p>
            {(filter.search || filter.status || filter.priority) && (
              <p className="mt-2">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`bg-white p-6 rounded-lg shadow hover:shadow-md transition ${
                task.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-semibold ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{task.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span>Assigned to: {task.assignedTo || 'Unassigned'}</span>
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'inprogress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    task.completed 
                      ? 'bg-yellow-600 hover:bg-yellow-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white transition`}
                >
                  {task.completed ? <XCircle size={16} /> : <CheckCircle size={16} />}
                  {task.completed ? 'Reopen' : 'Complete'}
                </button>
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### src/App.tsx

```typescript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { ProjectList } from './components/ProjectList';
import { About } from './components/About';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Task Manager (React)
              </Link>
              <div className="flex gap-6">
                <Link to="/tasks" className="text-gray-700 hover:text-blue-600">
                  Tasks
                </Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600">
                  Projects
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            <p>© 2025 Task Manager | Migrated from AngularJS to React</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## Phase 5: Build and Run

### Commands

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Verification Checklist

- ✅ All AngularJS dependencies removed from package.json
- ✅ No jQuery dependencies
- ✅ React Router working with all routes
- ✅ State management using hooks
- ✅ TypeScript types throughout
- ✅ Modern UI with Tailwind CSS
- ✅ All CRUD operations functional
- ✅ localStorage persistence working
- ✅ Responsive design
- ✅ Performance optimized with useMemo/useCallback

## Key Migration Patterns

### State Management
```javascript
// Before (AngularJS)
$scope.tasks = [];
$scope.$watch('filter', applyFilter);

// After (React)
const [tasks, setTasks] = useState([]);
useEffect(() => applyFilter(), [filter]);
```

### Component Structure
```javascript
// Before (AngularJS)
angular.component('taskList', {
    templateUrl: 'template.html',
    controller: TaskListController
});

// After (React)
export function TaskList() {
    return <div>...</div>;
}
```

### Routing
```javascript
// Before (AngularJS)
$routeProvider.when('/tasks', {...});

// After (React)
<Route path="/tasks" element={<TaskList />} />
```

---

**Congratulations!** You've successfully migrated a legacy AngularJS application to modern React.
