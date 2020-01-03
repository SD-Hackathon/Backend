exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.primary();
      table.string("first_name", 128).notNullable();
      table.string("last_name", 128);
      table
        .string("email", 128)
        .unique()
        .notNullable();
      table
        .string("username", 128)
        .unique()
        .notNullable();
      table.string("password", 128).notNullable();
      table.date("birthdate");
      table.integer("age").notNullable();
      table.string("gender", 128).notNullable();
      table.date("joined").default(Date.now());
      table.date("last_active").default(Date.now());
      table.string("location", 128);
    })
    .createTable("preferences", table => {
      table
        .integer("userID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.boolean("cisMale").defaultTo(false);
      table.boolean("cisFemale").defaultTo(false);
      table.boolean("transMale").defaultTo(false);
      table.boolean("transFemale").defaultTo(false);
      table.boolean("nonBinary").defaultTo(false);
      table.boolean("other").defaultTo(false);
    })
    .createTable("blocked", table => {
      table
        .integer("userID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("blockedID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["userID", "blockedID"]);
    })
    .createTable("like", table => {
      table
        .integer("userID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("targetID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["userID", "targetID"]);
      table.boolean("liked");
      table.boolean("matched");
      table.date("timestamp").defaultTo(Date.now());
    })
    .createTable("photo", table => {
      table.primary();
      table
        .integer("userID")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("caption", 255);
      table.string("photo").notNullable();
    });
};

exports.down = function(knex) {};
