const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

module.exports = {
  mongoTestSetup: function(decoded, token, user_id)
  {
    // May require additional time for downloading MongoDB binaries
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

    let mongoServer;

    beforeAll(async () => {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri, (err) => {
        if (err) console.error(err);
      });
    });

    afterAll(async () => {
      mongoose.disconnect();
      await mongoServer.stop();
    });
  }
}
