exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id').primary();
            table.uuid('user_type_id').references('user_types.id').onDelete('restrict');
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('salt').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
