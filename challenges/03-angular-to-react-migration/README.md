# Challenge 3: AngularJS to React Migration

## Overview

Migrate a legacy AngularJS 1.8 task management application to modern React 18 using GitHub Copilot to accelerate the conversion process.

## Learning Objectives

- Use GitHub Copilot to convert AngularJS components to React
- Migrate from $scope-based state to React hooks
- Transform AngularJS services to custom React hooks
- Convert ngRoute to React Router v6
- Replace jQuery dependencies with modern alternatives
- Modernize build tooling and development workflow

## Prerequisites

- Visual Studio Code with GitHub Copilot extension
- Node.js 18+ and npm
- Basic understanding of AngularJS and React
- Familiarity with modern JavaScript (ES6+)

## The Challenge

The `starter-code/legacy-angular-app` directory contains a legacy task management application built with:

- **AngularJS 1.8.2** - Outdated framework (EOL)
- **ngRoute** - Legacy routing solution
- **jQuery** - Unnecessary dependency
- **Bootstrap 3** - Outdated UI framework
- **Manual digest cycles** - Performance issues
- **$scope-based state** - Complex state management
- **No TypeScript** - Lack of type safety
- **No modern build tools** - Old module system

### Application Features

1. **Task Management**
   - Create, read, update, delete tasks
   - Filter by status, priority, search
   - Mark tasks as complete/incomplete
   - Task statistics dashboard

2. **Project Management**
   - View projects with task statistics
   - Link tasks to projects

3. **Data Persistence**
   - localStorage for data storage

## Step-by-Step Guide

### Phase 1: Setup & Analysis (20 minutes)

#### Task 1: Analyze Legacy Application

**Copilot Prompts:**
```
@workspace Analyze this AngularJS application structure and identify migration challenges

List all AngularJS-specific patterns that need conversion to React

Identify dependencies that should be removed or replaced
```

#### Task 2: Create React Project

**Commands:**
```powershell
cd starter-code
npm create vite@latest react-task-app -- --template react-ts
cd react-task-app
npm install
```

**Copilot Prompts:**
```
What additional packages do I need for React Router, state management, and UI components?

Generate package.json dependencies for modern React app with routing and styling
```

**Install dependencies:**
```powershell
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Phase 2: Component Migration (60 minutes)

#### Task 3: Convert Task List Component

**Copilot Prompts:**
```
Convert this AngularJS task-list component to React functional component with hooks

Replace $scope with useState for tasks, filteredTasks, and filter state

Convert ng-repeat to Array.map() in JSX
```

**Example conversion:**
```javascript
// AngularJS
$scope.tasks = [];
$scope.$watch('filter', function() {
    applyFilter();
});

// React
const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState({});

useEffect(() => {
    applyFilter();
}, [filter]);
```

#### Task 4: Convert Task Form Component

**Copilot Prompts:**
```
Convert task-form AngularJS component to React with useParams for routing

Replace AngularJS form validation with React controlled components

Use React Router's useNavigate instead of $location.path()
```

#### Task 5: Convert Project List Component

**Copilot Prompts:**
```
Convert project-list component to React functional component

Replace nested $scope.$apply() calls with proper state updates
```

### Phase 3: Service Migration (40 minutes)

#### Task 6: Create Custom Hooks from Services

**Copilot Prompts:**
```
Convert AngularJS TaskService to custom React hook (useTaskService)

Replace $q promises with async/await and native Promises

Convert StorageService to custom hook with localStorage
```

**Example:**
```javascript
// AngularJS Service
TaskService.getAllTasks().then(function(tasks) {
    $scope.tasks = tasks;
    $scope.$apply();
});

// React Hook
const { tasks, loading, error, fetchTasks } = useTaskService();

useEffect(() => {
    fetchTasks();
}, []);
```

#### Task 7: Create Context for Global State

**Copilot Prompts:**
```
Create TaskContext using React Context API to replace AngularJS service singleton pattern

Implement TaskProvider wrapper component with useReducer for complex state
```

### Phase 4: Routing Migration (30 minutes)

#### Task 8: Setup React Router

**Copilot Prompts:**
```
Convert ngRoute configuration to React Router v6 routes

Replace $routeProvider routes with React Router BrowserRouter and Routes

Convert hash-based routing (#!/) to modern history-based routing
```

**Example:**
```javascript
// AngularJS
$routeProvider
    .when('/tasks', { template: '<task-list></task-list>' })
    .when('/tasks/:id/edit', { template: '<task-form></task-form>' });

// React Router
<Routes>
    <Route path="/tasks" element={<TaskList />} />
    <Route path="/tasks/:id/edit" element={<TaskForm />} />
</Routes>
```

#### Task 9: Update Navigation

**Copilot Prompts:**
```
Replace AngularJS ng-href with React Router Link components

Convert navbar navigation to use NavLink for active states
```

### Phase 5: UI Modernization (40 minutes)

#### Task 10: Replace Bootstrap 3

**Copilot Prompts:**
```
Convert Bootstrap 3 classes to Tailwind CSS utility classes

Update glyphicon icons to modern alternatives (Heroicons, Lucide React)

Create modern card components replacing Bootstrap panels
```

#### Task 11: Remove jQuery Dependencies

**Copilot Prompts:**
```
Identify jQuery usage and replace with native DOM APIs or React patterns

Remove Bootstrap JavaScript dependencies that relied on jQuery
```

### Phase 6: TypeScript Migration (30 minutes)

#### Task 12: Add TypeScript Types

**Copilot Prompts:**
```
Create TypeScript interfaces for Task and Project models

Add types to all component props and state

Type custom hooks with proper return types
```

**Example:**
```typescript
interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'inprogress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    projectId?: number;
    assignedTo: string;
    dueDate?: string;
    completed: boolean;
    tags: string[];
}
```

### Phase 7: Testing & Optimization (30 minutes)

#### Task 13: Add Tests

**Copilot Prompts:**
```
Generate Vitest tests for TaskList component

Create React Testing Library tests for user interactions

Add tests for custom hooks using @testing-library/react-hooks
```

#### Task 14: Performance Optimization

**Copilot Prompts:**
```
Identify opportunities for useMemo and useCallback optimization

Add React.memo for expensive components

Implement lazy loading for routes
```

### Phase 8: Build & Deploy (20 minutes)

#### Task 15: Configure Build

**Copilot Prompts:**
```
Configure Vite build for production optimization

Set up environment variables for different environments

Create Dockerfile for containerization
```

**Commands:**
```powershell
npm run build
npm run preview
```

## Success Criteria

- ✅ All AngularJS components converted to React
- ✅ No AngularJS dependencies in package.json
- ✅ React Router working with all routes
- ✅ State management using hooks/Context
- ✅ No jQuery dependencies
- ✅ Modern UI framework implemented
- ✅ TypeScript types added throughout
- ✅ Application builds and runs successfully
- ✅ All features working as in legacy app

## Common Pitfalls

1. **Two-way binding** - AngularJS automatic, React requires controlled components
2. **Digest cycle** - No $scope.$apply() needed in React
3. **Template syntax** - ng-* directives → JSX expressions
4. **Dependency injection** - AngularJS DI → React props/hooks/context
5. **Controllers** - Replace with functional components
6. **$watch** - Replace with useEffect dependencies
7. **Filters** - Replace with regular JavaScript functions

## Bonus Challenges

1. Add Zustand or Redux for advanced state management
2. Implement React Query for server state
3. Add dark mode support
4. Create Storybook for component documentation
5. Add E2E tests with Playwright
6. Implement progressive web app (PWA) features
7. Add internationalization (i18n)

## Migration Comparison

| AngularJS Pattern | React Equivalent |
|------------------|------------------|
| `ng-model` | `value` + `onChange` |
| `ng-click` | `onClick` |
| `ng-if` | `{condition && <Component />}` |
| `ng-repeat` | `array.map()` |
| `$scope.$watch` | `useEffect()` |
| `$scope.variable` | `useState()` |
| `Service` | Custom hook |
| `$http` | `fetch` or `axios` |
| `$q` | Native `Promise` |
| `$routeProvider` | `<Routes>` |
| `$location` | `useNavigate()` |
| `ng-class` | `className={...}` |

## Resources

- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [AngularJS Migration Guide](https://react.dev/learn/start-a-new-react-project)

## Estimated Time

**Total: 4-5 hours**

- Setup & Analysis: 20 minutes
- Component Migration: 60 minutes
- Service Migration: 40 minutes
- Routing Migration: 30 minutes
- UI Modernization: 40 minutes
- TypeScript Migration: 30 minutes
- Testing & Optimization: 30 minutes
- Build & Deploy: 20 minutes
- Buffer: 30 minutes

---

**Previous Challenge:** [Java 8 to 17 Migration](../02-java-8-to-17-migration/README.md)
