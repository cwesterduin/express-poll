const polls = [
  {
    id: 1,
    name: "poll123",
    responses: [
      { id: 1, title: "Yes", votes: ["11.11.11", "22.22.22"] },
      { id: 2, title: "No", votes: ["33.33.33"] },
    ],
  },
  {
    id: 2,
    name: "poll234",
    responses: [
      { id: 1, title: "Yes", votes: ["11.11.11", "22.22.22"] },
      { id: 2, title: "No", votes: ["33.33.33", "::ffff:127.0.0.1"] },
    ],
  },
];

module.exports = { polls };
