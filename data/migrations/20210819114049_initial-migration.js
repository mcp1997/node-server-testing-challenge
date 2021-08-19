exports.up = function(knex) {
  return knex.schema.createTable('characters', tbl => {
    tbl.increments('char_id')
    tbl.string('char_name', 32).unique().notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters')
};
