exports.seed = function (knex) {
  // Inserts seed entries, 000-cleanup.js deleted data from the tables
  return knex('users').insert([
    { username: 'walter', password: 'password' }
  ]);
};
