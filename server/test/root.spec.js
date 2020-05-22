const dbHandler = require('./db-handler');

/**
 * Connect to a new in-memory database before running any tests.
 */
before(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
beforeEachSuite(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
after(async () => await dbHandler.closeDatabase());

// Helper :
function beforeEachSuite(fn) {
  before(function () {
    let suites = this.test.parent.suites || [];
    suites.forEach((s) => {
      s.beforeAll(fn);
      let hook = s._beforeAll.pop();
      s._beforeAll.unshift(hook);
    });
  });
}

/**
 * reference(s) :
 *  helper : https://github.com/mochajs/mocha/issues/911#issuecomment-396861668
 *  hooks : https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
 */
