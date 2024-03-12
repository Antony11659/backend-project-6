const BaseModel = require("./BaseModel.cjs");
const Task = require("./Task.cjs");

module.exports = class Status extends BaseModel {
  static get tableName() {
    return "statuses";
  }

  static relationMappings = {
    tasks: {
      relation: BaseModel.HasManyRelation,
      modelClass: Task,
      join: {
        from: "statuses.id",
        to: "tasks.statusId",
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
