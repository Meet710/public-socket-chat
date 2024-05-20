module.exports = {
  async up(db, client) {
    const rooms = [
      {
        name: 'freechat',      
        __v: 0,
      },
      {
        name: "realtalk",
       
        __v: 0,
      },
    ];
    await db.collection("rooms").insertMany(rooms);
  },

  async down(db, client) {
    await db.collection('rooms').deleteMany({ name: { $in: ['freechat', 'realtalk'] } });
  }
};
