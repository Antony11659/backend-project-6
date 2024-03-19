/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
export const up = (knex) =>
  knex.schema.createTable("task_label", (table) => {
    table.integer("task_id");
    table.integer("label_id");
    table.primary(["task_id", "label_id"]);
  });

export const down = (knex) => knex.schema.dropTable("task_label");
