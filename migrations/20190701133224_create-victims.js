exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('victims', (table) => {
            table.uuid('id').primary();
            table.uuid('user_id').references('users.id').onDelete('restrict');
            table.string('household_head');
            table.string('kk_number');
            table.string('address');
            table.string('village');
            table.string('rt');
            table.string('rw');
            table.bigInteger('subdistrict').references('subdistrict.id');
            table.integer('district').references('district.id');
            table.integer('city').references('city.id');
            table.string('phone_number');
            table.string('community_name');
            table.string('facilitator_name');
            table.string('facilitator_phone_number');
            table.string('applicator_name');
            table.string('applicator_phone_number');
            table.string('damage_type');
            table.string('household_head_picture');
            table.jsonb('house_photo');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            table.timestamp('deleted_at').defaultTo(null);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('victims');
};
