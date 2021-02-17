module.exports = {
  async up(db) {
    const events = await db.collection('events').find().toArray();

    for (const event of events) {
      await db.collection('events').updateOne(
        { _id: event._id },
        {
          $set: {
            shortDescription: event.description,
          },
        }
      );
    }
  },

  async down(db) {
    const events = await db.collection('events').find().toArray();

    for (const event of events) {
      db.collection('events').updateOne(
        {
          _id: event._id,
        },
        {
          $unset: {
            shortDescription: '',
          },
        }
      );
    }
  },
};
