# Technical Assessment: React & TypeScript

## Table of Contents

- [Technical Assessment: React \& TypeScript](#technical-assessment-react--typescript)
  - [Table of Contents](#table-of-contents)
  - [Question 1: Array - Find Missing Number](#question-1-array---find-missing-number)
    - [Solution](#solution)
    - [Test](#test)
  - [Question 2: String Manipulation - Anagram Checker](#question-2-string-manipulation---anagram-checker)
    - [Solution](#solution-1)
    - [Test](#test-1)
  - [Question 3: Refactor \& Debug Challenge](#question-3-refactor--debug-challenge)
    - [What Was Improved](#what-was-improved)
      - [1. **Code Quality \& Best Practices**](#1-code-quality--best-practices)
      - [2. **UX Improvements**](#2-ux-improvements)
      - [3. **Performance Optimizations**](#3-performance-optimizations)
      - [4. **Testing**](#4-testing)
    - [How to Run the Code and Tests](#how-to-run-the-code-and-tests)

---

## Question 1: Array - Find Missing Number

**Location:** `src/utils/find-missing-number.ts`

### Solution

The implementation uses the mathematical formula for the sum of n numbers to efficiently find the missing number in O(n) time complexity with O(1) space complexity.

### Test

Run the tests with:

```bash
npm test -- src/utils/__tests__/find-missing-number.test.ts
```

---

## Question 2: String Manipulation - Anagram Checker

**Location:** `src/utils/is-anagram.ts`

### Solution

The implementation normalizes both strings by converting to lowercase and removing spaces, then compares character frequency.

### Test

Run the tests with:

```bash
npm test -- src/utils/__tests__/is-anagram.test.ts
```

---

## Question 3: Refactor & Debug Challenge

**Location:** `src/features/user-list/`

### What Was Improved

#### 1. **Code Quality & Best Practices**

- Separated concerns by creating `user-list-content.tsx` for presentational logic
- Added proper TypeScript types and interfaces
- Implemented custom hooks (`useApi`, `useDebounce`) for reusable logic
- Used `useCallback` and `useMemo` for performance optimization
- Added proper error handling with `ContentError` component

#### 2. **UX Improvements**

- Added loading spinner with clear "Loading users..." message
- Implemented search functionality with visual feedback
- Added clear button (✕) for search input
- Display results count: "Found X user(s)"
- Show "No users found" message when search yields no results
- Disabled search input during loading
- Added search term in no-results message for better UX

#### 3. **Performance Optimizations**

- Implemented debouncing (300ms) for search input to reduce unnecessary renders
- Used `useMemo` for filtered users calculation
- Used `useCallback` for event handlers to prevent unnecessary re-renders
- Separated `UserListContent` component for better render optimization

#### 4. **Testing**

- Comprehensive test suite using Vitest and React Testing Library
- Tests cover: loading state, error handling, user rendering, search filtering, debouncing, and clear functionality
- Proper mocking of custom hooks
- User interaction testing with `@testing-library/user-event`

### How to Run the Code and Tests

```bash
# Copy env file
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev

# Run all tests
npm test

# Run specific question tests
npm test -- src/utils/__tests__/find-missing-number.test.ts
npm test -- src/utils/__tests__/is-anagram.test.ts
npm test -- src/features/user-list/__tests__/user-list.spec.tsx
```
