import { Model } from "objection";

const BaseModel = require("./BaseModel.cjs");

module.exports = class Tasks extends BaseModel {
  static get tableName() {
    return "tasks";
  }

  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "users.id",
        to: "tasks.creatorId",
      },
    },
    statuses: {
      relation: Model.BelongsToOneRelation,
      modelClass: Status,
      join: {
        from: "statuses.id",
        to: "tasks.statusId",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "statusId", "creatorId "],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1 },
      },
    };
  }
};
