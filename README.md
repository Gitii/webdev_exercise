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

## Feature set
The challenge defines a single acceptance criteria and a general background.
Because this challenge is about primitive CRUD and a basic UI, I've added CRUD for skills and kept the UI functional. 
* Several Skills can be linked to several users at once. 
* Deleting a skill will also remove the assignment. 
* It's not possible to rename a skill after creation. 
* Any number of skills can be assigned to a user. 
* The list of users can be filter by a skill.

## Setup

### Design considerations
* I have opted for a node.js backend implementation because I am not familiar enough with the used python frameworks
* Both backend and frontend are written in *Typescript* and have a *100% test coverage*. Some parts are only covered indirectly, but I think that's sufficient for this challenge. 
* As package manager, I've used `yarn` because backend and frontend are organized as mono repository.
* A minimal eslint and prettier config has been used.
* Frontend: 
    * `swr` is used for rest requests to the backend. It provides a nice developer flow, similar to apollo GraphQL hooks. It also caches requests.
    * All components are either placed in `components` (shared stuff) or under `pages/**/*`. If a component is atleast used by more than page, it's put in `compoments`, otherwise it's kept in the page folder.
    * Tests are written using `Testing Library` which uses the Behavioural Testing approach. Long story short, it encourages to focus on the user flow, not the technical implementation. That's also why I haven't included any e2e tests. While Behavioural Tests cannot replace e2e Tests, they can provide a similar confidence with less effort (test duration). The test setup is done in `test/*`
    * During testing, all network requests are captured by `msw` at the "network level". That means that `swr` will work under "real conditions" but receive fake data as arranged in the tests. That approach reduces the number of mocks: less mocks, more stable tests.
    * Styling: Usually I would prefer to use third party frameworks or an internal collection of predefined components. For this challenge I decided to keep everything "nice" and simple. User Experience hasn't been a priority either. For example, not all errors will be shown, only a subset of the pages actually render error messages.
    * Filtering of the users is done client side. Server-side filtering could have been done instead but in the current setup, that would be overkill.
* Backend:
    * `hapi.js` is used as web server framework. Routes are put into `routes/*` and each handler is in a separate file. Database source is passed down during setup.
    * Error handling is basic, yet simple. There is a very simple global `errorHandler` to catch sql constraint errors. The error handling should be moved to the individual route instead as soon as complexity of the routes increases.
    * Tests are written as integration tests. Hapi allows to "inject" requests. That is used to validate the handlers are working as expected.
    * An in-memory database is used. Ideally this is moved out of the package and is provided as part of the development infrastructure (for example as docker container).
    * `typeorm` is used as orm. Because of the simple data schema, I opted for a basic orm setup, including eager loading of entities.

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