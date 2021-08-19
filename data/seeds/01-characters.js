
exports.seed = function(knex) {
  // Deletes ALL existing entries and resets ids
  return knex('characters')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        { char_name: 'marth' },
        { char_name: 'captain falcon' },
        { char_name: 'jigglypuff' },
      ]);
    });
};
