const BaseModel = require("./BaseModel.cjs");
const User = require("./User.cjs");
const Status = require("./Status.cjs");

module.exports = class Tasks extends BaseModel {
  static get tableName() {
    return "tasks";
  }

  static relationMappings = {
    users: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "users.id",
        to: "tasks.creatorId",
      },
    },
    statuses: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Status,
      join: {
        from: "statuses.id",
        to: "tasks.statusId",
      },
    },
    executor: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "users.id",
        to: "tasks.executorId",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "statusId", "creatorId"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
        statusId: { type: "integer" },
        creatorId: { type: "integer" },
        executorId: { type: "integer" },
      },
    };
  }
};
