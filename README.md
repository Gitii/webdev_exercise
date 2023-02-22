# WorkGenius Web Developer test exercise

## Exercise

> _In a nutshell a simple many-to-many relationship modeling with some primitive CRUD and UI_

### Context

We have a web application where our admins can see/review/manage users.

### Challenge

Our customer-success department is missing functionality to group users based on their skills.

### User story

- As CS-manager, I want to **attach skills to users**, so I can easily **filter the list of users by skill**.

### Acceptance criteria (happy flow)

1. I choose a user
2. I attach skill "javascript" to the user
3. I filter the list of users by skill "javascript"
4. I see result 1 row with the user from 2nd step

## Setup

### Design considerations
* I have opted for a node.js backend implementation because I am not familier with python frameworks
* Both backend and frontend are written in *Typescript* and have a *100% test coverage*. Some parts are only covered indirectly, but I think that's sufficient for this challenge. As package manager, I've used `yarn` because backend and frontend are organized as monorepository.
* Frontend: 
    * `swr` is used for rest requests to the backend. It provides a nice developer flow, similar to apollo GraphQL hooks.
    * All components are either placed in `components` (shared stuff) or under `pages/**/*`. If a component is atleast used by more than page, it's put in `compoments`, otherwise it's kept in the page folder.
    * Tests are written using `Testing Library` which uses the Behavioural Testing approach. Long story short, it encourages to focus on the user flow, not the technical implementation. That's also why I haven't included any e2e tests. While Behavioural Tests cannot replace e2e Tests, they can provide a similar confidence with less effort (test duration). The test setup is done in `test/*`
    * During testing, all network requests are captured by `msw` at the "network level". That means that `swr` will work under "real conditions" but receive fake data as arranged in the tests. That approach reduces the number of mocks: less mocks, more stable tests.
    * Styling: Usually I would prefer to use third party frameworks or an internal collection of predefined components. For this challenge I decided to keep everything "nice" and simple. User Experience hasn't been a priority either. For example, not all errors will be shown, only a subset of the pages actually render error messages.
* Backend:
    * `hapi.js` is used as web server framework.
    * Error handling is basic, yet simple. There is a very simple global `errorHandler` to catch sql constraint errors. The error handling should be moved to the individual route instead.

### Getting Started & Usage
* Execute `yarn` in the root folder of repository to install all dependencies
* Execute `yarn start` in the root folder of repository to start both frontend and backend in parallel
* Execute `yarn test` in the root folder of repository to execute all tests in sequence

Backend and Frontend can be started individually by executing the `start` script of packages. Same for the tests.

**Remarks**
* `react-scripts` doesn't support node >=18. Please use node 16. 

## Possible future steps
* Use a third party library for UI components (for example Material UI)
* Share & generate typings by using swagger documentation.
* Replace the in-memory database with a dockerized database (for development only). That decouples database & backend and enables future optimizations (layering of infrastructure).
* Replace `react-scripts` with `vite` (it's faster and easier to use)
* Replace `jest` with `vitest`. Idearly both `vite` and `vitest` are used. We had really good experience with both.