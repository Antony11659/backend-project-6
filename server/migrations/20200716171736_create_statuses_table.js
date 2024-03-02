// @ts-check

export const up = (knex) =>
  knex.schema.createTable("statuses", (table) => {
    table.increments("id").primary();
    table.string("name");
  });

export const down = (knex) => knex.schema.dropTable("statuses");
