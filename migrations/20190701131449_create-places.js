exports.up = async function(knex, Promise) {
    await knex.schema.createTable("province", table => {
        table.integer('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo(null);

        table.string("name");
    });
    await knex.schema.createTable("city", table => {
        table.integer('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo(null);

        table.integer("province_id").references('province.id').onDelete('restrict');
        table.string("name");
    });
    await knex.schema.createTable("district", table => {
        table.integer('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo(null);

        table.integer("city_id").references('city.id').onDelete('restrict');
        table.string("name");
    });
    await knex.schema.createTable("subdistrict", table => {
        table.bigInteger('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('deleted_at').defaultTo(null);

        table.integer("district_id").references('district.id').onDelete('restrict');
        table.string("name");
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("subdistrict");
    await knex.schema.dropTable("district");
    await knex.schema.dropTable("city");
    await knex.schema.dropTable("province");
};
