/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
export const up = (knex) =>
  knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("description ");
    table.integer("executor_id");
    table.integer("creator_id");
    table.integer("status_id");
    table.foreign("executor_id ").references("id").inTable("users");
    table.foreign("creator_id  ").references("id").inTable("users");
    table.foreign("status_id ").references("id").inTable("statuses");
  });

export const down = (knex) => knex.schema.dropTable("tasks");
