const moment = require("moment");

module.exports = {
  async up(db) {
    const events = await db
      .collection("events")
      .find({ date: { $exists: true } })
      .toArray();

    for (const event of events) {
      await db.collection("events").updateOne(
        { _id: event._id },
        {
          $set: {
            dateStart: moment.utc(event.date).startOf("day").format(),
            dateEnd: moment.utc(event.date).endOf("day").format(),
          },
          $unset: {
            date: "",
          },
        }
      );
    }
  },

  async down(db) {
    const events = await db.collection("events").find({}).toArray();

    for (const event of events) {
      db.collection("events").updateOne(
        {
          _id: event._id,
        },
        {
          $set: {
            date: moment.utc(events.dateStart).endOf("day").format(),
          },
          $unset: {
            dateStart: "",
            dateEnd: "",
          },
        }
      );
    }
  },
};
