const { MongoClient } = require('mongodb')
const db = process.env.ATLAS_URI

const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

var _db

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('bullbearDB')
        console.log('Successfully connected to MongoDB.')
      }
      return callback(err)
    })
  },

  getDb: function () {
    return _db
  },
}
