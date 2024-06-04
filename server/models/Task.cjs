const path = require("path");
const BaseModel = require("./BaseModel.cjs");

module.exports = class Tasks extends BaseModel {
  static get tableName() {
    return "tasks";
  }

  static get modifiers() {
    return {
      byStatus(query, id) {
        query.skipUndefined().where("statusId", id);
      },
    };
  }

  static relationMappings = {
    users: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: path.join(__dirname, "User.cjs"),
      join: {
        from: "users.id",
        to: "tasks.creatorId",
      },
    },
    statuses: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: path.join(__dirname, "Status.cjs"),
      join: {
        from: "statuses.id",
        to: "tasks.statusId",
      },
    },
    executor: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: path.join(__dirname, "User.cjs"),
      join: {
        from: "users.id",
        to: "tasks.executorId",
      },
    },

    labels: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: path.join(__dirname, "Label.cjs"),
      join: {
        from: "tasks.id",
        through: {
          from: "tasks_labels.task_id",
          to: "tasks_labels.label_id",
        },
        to: "labels.Id",
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
