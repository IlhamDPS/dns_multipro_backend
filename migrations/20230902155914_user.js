exports.up = function(knex) {
    return knex.schema
        .createTable('user', (table) => {
            table.uuid('id').primary();
            table.string('username').notNullable();
            table.string("password").notNullable()
            table.string("salt").notNullable()
        });
};

exports.down = function(knex) {

};
