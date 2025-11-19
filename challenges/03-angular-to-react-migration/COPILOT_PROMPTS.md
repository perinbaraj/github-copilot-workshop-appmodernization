# GitHub Copilot Prompts for AngularJS to React Migration

Effective prompts for migrating a legacy AngularJS application to modern React.

## Phase 1: Analysis & Planning

### Initial Assessment
```
@workspace Analyze this AngularJS application and list all components, services, and dependencies

Identify AngularJS-specific patterns that need conversion to React equivalents

Create a migration checklist from AngularJS 1.8 to React 18
```

### Dependency Analysis
```
List all npm dependencies and classify them as: keep, replace, or remove

What modern alternatives exist for Bootstrap 3 and jQuery?

Which AngularJS directives are used and what are their React equivalents?
```

### Architecture Planning
```
Suggest a folder structure for the migrated React application

Should I use Context API or Redux for state management in this app?

What routing library should replace ngRoute?
```

## Phase 2: Project Setup

### Create React Project
```
Generate a Vite React TypeScript project setup command

What dependencies should I install for React Router, state management, and styling?

Create a modern package.json with React 18, TypeScript, and Tailwind CSS
```

### Configuration Files
```
Generate tsconfig.json for React with strict mode

Create Tailwind CSS configuration with custom theme colors

Set up ESLint and Prettier for React TypeScript project
```

## Phase 3: Component Migration

### Task List Component
```
Convert this AngularJS task-list component to React functional component with TypeScript

Replace $scope.tasks with useState and $scope.$watch with useEffect

Convert ng-repeat to Array.map() in JSX with proper key props
```

### Task Form Component
```
Convert this AngularJS form component to React with controlled inputs

Replace AngularJS form validation with React Hook Form or custom validation

Use useParams from React Router instead of $routeParams
```

### Project List Component
```
Migrate project-list AngularJS component to React

Replace nested promises and $scope.$apply() with async/await and proper state updates

Use proper TypeScript interfaces for project data
```

### About Component
```
Convert this static AngularJS component to simple React component

Remove controller logic and use static data
```

## Phase 4: Service to Hook Migration

### Task Service Migration
```
Convert AngularJS TaskService to custom React hook called useTaskService

Replace $q.defer() promises with async/await and native Promises

Add proper error handling and loading states
```

### Storage Service Migration
```
Create useLoca lStorage custom hook from AngularJS StorageService

Add TypeScript generics for type-safe storage operations

Implement error handling for localStorage quota exceeded
```

### Project Service Migration
```
Convert ProjectService to useProjects custom hook

Combine with TaskService data for project statistics

Use React Query for caching if appropriate
```

## Phase 5: State Management

### Context API Setup
```
Create TaskContext using React Context API to replace AngularJS service singletons

Implement TaskProvider with useReducer for complex state management

Type the context with TypeScript interfaces
```

### Global State
```
Should I use Context API, Zustand, or Redux for this application's state?

Create a store for tasks, projects, and filters with proper TypeScript types

Implement actions for CRUD operations on tasks
```

## Phase 6: Routing Migration

### React Router Setup
```
Convert ngRoute configuration to React Router v6 routes

Replace hash-based routing (#!/tasks) with history-based routing (/tasks)

Set up nested routes for edit forms
```

### Navigation Components
```
Replace AngularJS <a href="#!/tasks"> with React Router <Link to="/tasks">

Convert navbar to use NavLink for active route styling

Implement programmatic navigation with useNavigate instead of $location
```

### Route Parameters
```
Use useParams hook to access route parameters instead of $routeParams

Implement route guards for protected routes (if needed)
```

## Phase 7: Template Conversion

### Directive to JSX
```
Convert ng-repeat="task in tasks" to {tasks.map(task => ...)}

Replace ng-if with conditional rendering {condition && <Component />}

Convert ng-show/ng-hide to style={{display: condition ? 'block' : 'none'}}
```

### Event Handling
```
Replace ng-click="ctrl.method()" with onClick={() => method()}

Convert ng-submit to onSubmit with preventDefault

Replace ng-change with onChange handlers
```

### Class Binding
```
Convert ng-class="{active: isActive}" to className={isActive ? 'active' : ''}

Use classnames library or clsx for complex class combinations

Implement dynamic classes with template literals
```

## Phase 8: UI Modernization

### Tailwind CSS Migration
```
Convert Bootstrap 3 classes to Tailwind CSS utility classes

Replace .panel with modern card components using Tailwind

Update form styles from Bootstrap to Tailwind forms
```

### Icon Replacement
```
Replace Bootstrap glyphicons with Heroicons or Lucide React

Install and configure icon library: npm install lucide-react

Convert <span class="glyphicon glyphicon-plus"></span> to <Plus />
```

### Component Styling
```
Create reusable styled components for buttons, cards, and forms

Implement dark mode support with Tailwind's dark: variant

Add animations and transitions for better UX
```

## Phase 9: TypeScript Integration

### Type Definitions
```
Create TypeScript interfaces for Task, Project, and filter types

Type all component props using React.FC or inline types

Add proper return types to all functions and hooks
```

### Generic Hooks
```
Create type-safe custom hooks with TypeScript generics

Type useState, useEffect, and useContext properly

Add JSDoc comments for complex types
```

### API Types
```
Generate TypeScript types from localStorage schema

Type HTTP responses if you add backend API

Use discriminated unions for status and priority types
```

## Phase 10: Testing

### Component Tests
```
Generate Vitest test for TaskList component with React Testing Library

Test user interactions like filtering, creating, and deleting tasks

Mock localStorage and custom hooks in tests
```

### Hook Tests
```
Write tests for useTaskService hook using @testing-library/react-hooks

Test async operations with waitFor and act

Verify error handling in custom hooks
```

### Integration Tests
```
Create integration tests for complete user flows

Test routing with MemoryRouter from React Router

Verify localStorage persistence across sessions
```

## Phase 11: Performance Optimization

### Memoization
```
Identify expensive computations and wrap with useMemo

Use useCallback for event handlers passed to child components

Add React.memo to pure components
```

### Code Splitting
```
Implement lazy loading for routes with React.lazy and Suspense

Split large components into smaller chunks

Configure Vite for optimal code splitting
```

### Bundle Optimization
```
Analyze bundle size with vite-plugin-bundle-analyzer

Remove unused dependencies and tree-shake properly

Optimize images and assets
```

## Phase 12: Build & Deploy

### Production Build
```
Configure Vite build settings for production optimization

Set up environment variables for different environments

Create build scripts in package.json
```

### Docker Containerization
```
Generate Dockerfile for React Vite application

Create docker-compose.yml for local development

Add .dockerignore file
```

### CI/CD Pipeline
```
Generate GitHub Actions workflow for building and testing React app

Create deployment pipeline for Vercel/Netlify/AWS

Add automated testing in CI pipeline
```

## Advanced Prompts

### Performance Analysis
```
@workspace Identify performance bottlenecks in this React app

Suggest opportunities for useMemo, useCallback, and React.memo

Analyze re-render patterns and optimize
```

### Accessibility
```
Add ARIA labels and roles to improve accessibility

Implement keyboard navigation for task list

Ensure color contrast meets WCAG AA standards
```

### Progressive Web App
```
Convert React app to PWA with service worker

Add offline support for task management

Implement install prompt for mobile devices
```

## Troubleshooting Prompts

### Migration Issues
```
This AngularJS two-way binding pattern isn't working in React. How do I fix it?

Getting "Cannot update during render" error. What's wrong with my setState call?

How do I replicate AngularJS $scope.$apply() behavior in React?
```

### TypeScript Errors
```
Fix TypeScript error: "Property 'tasks' does not exist on type"

Add proper types to this custom hook returning multiple values

Resolve "Object is possibly undefined" errors
```

### Build Problems
```
Vite build failing with "Failed to resolve import". How to fix?

Getting module resolution errors after migration. What's wrong with my imports?

Bundle size too large. How to analyze and reduce?
```

## Pattern Comparisons

### State Management
```
Show side-by-side comparison of AngularJS $scope vs React useState

Explain difference between $watch and useEffect dependencies

Convert this $scope.$watchCollection to React equivalent
```

### Lifecycle
```
Compare AngularJS $onInit, $onDestroy with React useEffect

What replaces $scope.$on for event handling?

Convert AngularJS digest cycle logic to React pattern
```

### Forms
```
Compare AngularJS ng-model two-way binding with React controlled components

Convert AngularJS form validation to React validation library

Replace $scope.form.$valid with React form state
```

## Best Practices

### Code Organization
```
@workspace Suggest optimal folder structure for migrated components

Should hooks be in separate files or inline with components?

How to organize types, utils, and constants?
```

### Naming Conventions
```
What naming conventions should I follow for React components and hooks?

Should I use PascalCase or camelCase for component files?

How to name custom hooks (useTaskService vs useTask)?
```

### Documentation
```
Generate JSDoc comments for this complex component

Create README documenting component props and usage

Add inline comments explaining migration decisions
```

## Tips for Effective Prompts

1. **Be specific about conversion**: Mention both the source (AngularJS pattern) and target (React pattern)
2. **Include code context**: Use @workspace or paste relevant AngularJS code
3. **Ask for TypeScript**: Always request TypeScript types when applicable
4. **Request explanations**: Ask "why" certain patterns are used in React
5. **Iterative refinement**: Start broad, then narrow down with follow-up prompts
6. **Test generation**: Ask for tests alongside component migration

---

**Remember**: GitHub Copilot learns from context. Keep relevant files open and use @workspace for better suggestions during migration.
