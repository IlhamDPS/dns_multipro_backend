exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user_types', (table) => {
            table.uuid('id').primary();
            table.string('name').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_types');
};
