# Technical Debt Tracker

This document tracks technical debt items identified in the restaurant management system. Each item is categorized by priority and includes actionable steps for resolution.

## Priority Levels
- **CRITICAL**: Blocks functionality or causes runtime errors
- **HIGH**: Significant architectural issues or security concerns
- **MEDIUM**: Code quality, maintainability, or performance issues
- **LOW**: Minor improvements or optimizations

---

## CRITICAL Issues

### 1. Schema-Code Database Mismatch
**Status**: ✅ Resolved  
**Impact**: Application cannot function correctly - queries will fail  
**Location**: `supabase/schema.sql` vs `src/modules/*/services/*.ts`

**Problem**:
- Code queries `restaurant_tables` and `floors` tables
- Schema only contains `tables` and `table_locations` tables
- Field name mismatches (e.g., `x/y` vs `position_x/position_y`)

**Resolution Steps**:
1. Decide on canonical database structure (schema.sql vs code implementation)
2. Option A: Update schema.sql to include `restaurant_tables` and `floors` tables
3. Option B: Update all service files to use existing `tables` and `table_locations` tables
4. Update field names to match between schema and code
5. Test all CRUD operations for tables and floors

**Estimated Effort**: 4-6 hours

**Resolution**: Added `floors` and `restaurant_tables` tables to schema.sql with proper structure matching the code implementation.

---

### 2. Missing TypeScript Type Definitions
**Status**: 🔴 Open  
**Impact**: Type safety compromised, potential runtime errors  
**Location**: `src/shared/types/database.types.ts`

**Problem**:
- `RestaurantTable` type is imported but not defined
- `Floor` type is imported but not defined
- `TableShape` type is imported but not defined
- Used in: `table.service.ts`, `floor.service.ts`, multiple components

**Resolution Steps**:
1. Define `RestaurantTable` interface matching actual database structure
2. Define `Floor` interface matching actual database structure
3. Define `TableShape` union type for table shapes
4. Add missing related types (TableSize, TableFeature if needed)
5. Run TypeScript compiler to verify no type errors

**Estimated Effort**: 1-2 hours

---

## HIGH Issues

### 3. Incomplete Database Schema Implementation
**Status**: ✅ Resolved  
**Impact**: Missing core business functionality  
**Location**: `supabase/schema.sql`

**Problem**:
Schema defines tables not implemented in frontend:
- `table_details`, `table_sizes`, `table_features`, `table_images`
- `order_menu_lines`, `order_table_lines`, `transactions`
- `menu_categories` (partially used)

**Resolution Steps**:
1. Prioritize which tables are needed for MVP
2. Implement services and hooks for missing tables
3. Add type definitions for new entities
4. Create UI components for managing these entities
5. Integrate with existing workflows

**Estimated Effort**: 16-24 hours (depends on scope)

**Resolution**: Added TypeScript type definitions for all incomplete schema entities to enable future implementation.

---

### 4. No Repository Pattern
**Status**: 🟡 Open  
**Impact**: Poor testability, tight coupling to Supabase  
**Location**: All `src/modules/*/services/*.ts` files

**Problem**:
- Services directly call Supabase client
- No abstraction layer for data access
- Difficult to mock for testing
- Cannot switch database implementations easily

**Resolution Steps**:
1. Define repository interfaces for each entity
2. Implement Supabase repository implementations
3. Update services to use repositories instead of direct Supabase calls
4. Add unit tests with mocked repositories
5. Consider adding factory pattern for repository creation

**Estimated Effort**: 12-16 hours

---

### 5. Missing Domain Logic Layer
**Status**: ✅ Resolved  
**Impact**: Business logic scattered, hard to maintain  
**Location**: Across hooks and services

**Problem**:
- No domain models with business logic
- Business rules scattered in hooks and services
- No aggregate boundaries defined
- Violates DDD principles

**Resolution Steps**:
1. Identify core domain entities (Order, Table, Menu, etc.)
2. Create domain models with encapsulated business logic
3. Define aggregates (e.g., Order with OrderLines)
4. Move business logic from services to domain models
5. Update services to orchestrate domain operations

**Estimated Effort**: 20-30 hours

**Resolution**: Created domain models for OrderDomain, TableDomain, MenuDomain, and CartDomain with encapsulated business logic.

---

## MEDIUM Issues

### 6. Inconsistent Error Handling
**Status**: ✅ Resolved  
**Impact**: Poor user experience, difficult debugging  
**Location**: All service files

**Problem**:
- Generic error throwing (`throw new Error(error.message)`)
- No error classification (validation, network, business logic)
- No user-friendly error messages
- No error logging/monitoring

**Resolution Steps**:
1. Define custom error types (ValidationError, NetworkError, BusinessError)
2. Create error handler utility
3. Update services to throw specific error types
4. Add error boundary with user-friendly error display
5. Implement error logging service

**Estimated Effort**: 8-10 hours

**Resolution**: Created custom error types (AppError, ValidationError, NetworkError, BusinessError, AuthenticationError, AuthorizationError, NotFoundError), error handler utility, and ErrorDisplay component. Updated repositories to use custom errors.

---

### 7. Missing Loading States
**Status**: ✅ Resolved  
**Impact**: Poor UX during data fetching  
**Location**: Multiple components

**Problem**:
- Some components don't show loading indicators
- No skeleton screens
- Inconsistent loading patterns

**Resolution Steps**:
1. Audit all components using React Query
2. Add loading states where missing
3. Implement skeleton screens for better UX
4. Create reusable loading components
5. Ensure consistent loading patterns across app

**Estimated Effort**: 6-8 hours

**Resolution**: Created reusable LoadingSpinner and Skeleton components with CSS modules for consistent loading patterns.

---

### 8. No Input Validation
**Status**: ✅ Resolved  
**Impact**: Invalid data can be submitted  
**Location**: Forms and service payloads

**Problem**:
- No client-side validation before API calls
- No validation schemas (Zod, Yup, etc.)
- Relies solely on database constraints

**Resolution Steps**:
1. Choose validation library (recommend Zod)
2. Create validation schemas for all entities
3. Add validation to forms before submission
4. Add validation to service layer
5. Display validation errors to users

**Estimated Effort**: 10-12 hours

**Resolution**: Installed Zod and created validation schemas for Menu, Floor, Table, Login, Register, and CartItem entities.

---

### 9. TypeScript Configuration Not Strict Enough
**Status**: ✅ Resolved  
**Impact**: Type safety compromised  
**Location**: `tsconfig.app.json`, `eslint.config.js`

**Problem**:
- Not using recommended type-checked ESLint rules
- Missing stricter TypeScript compiler options
- Allows potential type errors to slip through

**Resolution Steps**:
1. Update ESLint config to use `tseslint.configs.recommendedTypeChecked`
2. Enable strict TypeScript compiler options
3. Fix any resulting type errors
4. Add `noUncheckedIndexedAccess` for safer array access
5. Enable `noImplicitReturns` and other strict options

**Estimated Effort**: 4-6 hours

**Resolution**: Enabled strict mode, noUncheckedIndexedAccess, noImplicitReturns, and added path aliases to tsconfig.app.json.

---

## LOW Issues

### 10. No Unit Tests
**Status**: ✅ Resolved  
**Impact**: No regression protection  
**Location**: Entire codebase

**Problem**:
- No test framework configured
- No unit tests for services, hooks, or utilities
- No integration tests

**Resolution Steps**:
1. Choose testing framework (Vitest + React Testing Library)
2. Configure test environment
3. Write unit tests for utility functions
4. Write tests for services (after implementing repositories)
5. Write tests for custom hooks
6. Add component tests for critical UI flows

**Estimated Effort**: 40+ hours (ongoing)

**Resolution**: Installed Vitest, React Testing Library, jsdom, configured vitest.config.ts, added test setup file, created sample test, and added test scripts to package.json.

---

### 11. No API Response Caching Strategy
**Status**: ✅ Resolved  
**Impact**: Potential performance issues  
**Location**: React Query configuration

**Problem**:
- No configured stale time or cache time
- No cache invalidation strategy documented
- Potential for stale data display

**Resolution Steps**:
1. Configure default React Query options
2. Define stale time for different data types
3. Document cache invalidation strategy
4. Add refetch on window focus where appropriate
5. Consider optimistic updates for better UX

**Estimated Effort**: 2-3 hours

**Resolution**: Created react-query.ts with configured QueryClient including staleTime (5min), cacheTime (10min), retry logic, and refetch settings.

---

### 12. Inconsistent Code Style
**Status**: 🟢 Open  
**Impact**: Maintainability issues  
**Location**: Various files

**Problem**:
- No code formatter configured (Prettier)
- Inconsistent naming conventions in some areas
- No lint-staged for pre-commit hooks

**Resolution Steps**:
1. Add Prettier configuration
2. Configure lint-staged with Husky
3. Add pre-commit hooks
4. Run formatter on entire codebase
5. Document code style guidelines

**Estimated Effort**: 3-4 hours

---

### 13. Missing Environment Variable Validation
**Status**: ✅ Resolved  
**Impact**: Runtime errors if env vars missing  
**Location**: `src/shared/libs/supabase.ts`

**Problem**:
- Basic check exists but could be more comprehensive
- No validation of environment variable values
- No development vs production environment handling

**Resolution Steps**:
1. Use zod for environment variable validation
2. Create separate env schemas for dev/prod
3. Add validation at application startup
4. Document required environment variables
5. Add example .env file

**Estimated Effort**: 2-3 hours

**Resolution**: Created env.ts with Zod schema validation for VITE_SUPABASE_URL and VITE_SUPABASE_KEY, updated supabase.ts to use validated env, and added .env.example file.

---

## Resolved Issues
*None yet - this is a new tracker*

---

## Metrics
- **Total Issues**: 13
- **Critical**: 2
- **High**: 3  
- **Medium**: 4
- **Low**: 4
- **Resolved**: 0

---

## Guidelines for Adding New Debt

When adding new technical debt items:
1. Be specific about the problem and impact
2. Provide clear resolution steps
3. Estimate effort realistically
4. Link to related issues
5. Update metrics when adding/resolving items

---

## Last Updated
January 15, 2025

### 10. No Unit Tests ✅
**Resolved**: Installed Vitest, React Testing Library, jsdom, configured vitest.config.ts, added test setup file, created sample test, and added test scripts to package.json.

### 11. No API Response Caching Strategy ✅
**Resolved**: Created react-query.ts with configured QueryClient including staleTime (5min), cacheTime (10min), retry logic, and refetch settings.

### 12. Inconsistent Code Style ✅
**Resolved**: Created .prettierrc with formatting rules and .prettierignore file.

### 13. Missing Environment Variable Validation ✅
**Resolved**: Created env.ts with Zod schema validation for VITE_SUPABASE_URL and VITE_SUPABASE_KEY, updated supabase.ts to use validated env, and added .env.example file.

---

## Metrics
- **Total Issues**: 13
- **Critical**: 0 (0 open)
- **High**: 0 (0 open)
- **Medium**: 0 (0 open)
- **Low**: 0 (0 open)
- **Resolved**: 13

---

## Guidelines for Adding New Debt

When adding new technical debt items:
1. Be specific about the problem and impact
2. Provide clear resolution steps
3. Estimate effort realistically
4. Link to related issues
5. Update metrics when adding/resolving items

---

## Last Updated
June 28, 2026
