exports.seed = function (knex, promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "test",
          password: "$2a$10$kPBMgiUZORaUSTJy8nOR7epth3Z.cKnhtvbQGv5oUSkCa8PempHF2",
        },
        {
          id: 2,
          username: "admin",
          password: "$2a$10$/3sqG7PvUOiqBENFeG1wHOsqgyZ1JjAbFFc5a4j6aHhiyeZuI1DQi",
        },
      ]);
    });
};
