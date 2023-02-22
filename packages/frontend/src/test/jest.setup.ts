import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';

import { server } from './server';

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

// point to an non-existent endpoint (just in case)
process.env.REACT_APP_BACKEND_URL = 'http://localhost:666';
