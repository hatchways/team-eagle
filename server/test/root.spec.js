const dbHandler = require('./db-handler');

/**
 * Connect to a new in-memory database before running any tests.
 */
before(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
after(async () => await dbHandler.closeDatabase());
