/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
export const up = (knex) =>
  knex.schema.createTable("tasks_labels", (table) => {
    table.integer("task_id").references("tasks.id");
    table.integer("label_id").references("labels.id");
    table.primary(["task_id", "label_id"]);
  });

export const down = (knex) => knex.schema.dropTable("tasks_labels");
