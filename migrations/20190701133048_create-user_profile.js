exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user_profile', (table) => {
            table.uuid('id').primary();
            table.uuid('user_id').references('users.id').onDelete('restrict');
            table.string('fullname').notNullable();
            table.string('phone_number').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_profile');
};
