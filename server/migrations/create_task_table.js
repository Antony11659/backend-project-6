/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
export const up = (knex) =>
  knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("description ");
    table.integer("executorId");
    table.integer("creatorId");
    table.integer("statusId");
    table.foreign("executorId ").references("id").inTable("users");
    table.foreign("creatorId  ").references("id").inTable("users");
    table.foreign("statusId ").references("id").inTable("statuses");
  });

export const down = (knex) => knex.schema.dropTable("tasks");
