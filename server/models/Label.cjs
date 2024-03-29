const BaseModel = require("./BaseModel.cjs");
const Task = require("./Task.cjs");

module.exports = class Labels extends BaseModel {
  static get tableName() {
    return "labels";
  }

  static relationMappings = {
    tasks: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: Task,
      join: {
        from: "labels.id",
        through: {
          from: "tasks_labels.label.id",
          to: "tasks_labels.task_id",
        },
        to: "tasks.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1 },
      },
    };
  }
};
