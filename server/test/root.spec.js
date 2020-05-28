const dbHandler = require('./db-handler');

/**
 * Connect to a new in-memory database and seed it
 * before running any tests.
 */
before(async () => {
  await dbHandler.connect();
  await dbHandler.seed();
});

/**
 * Clear and close the db after running all tests
 */
after(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

/**
 * reference(s) :
 *  hooks : https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
 */
