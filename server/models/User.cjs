// @ts-check
const path = require("path");
const objectionUnique = require("objection-unique");
const BaseModel = require("./BaseModel.cjs");
const encrypt = require("../lib/secure.cjs");

const unique = objectionUnique({ fields: ["email"] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return "users";
  }

  static relationMappings = {
    tasks: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: path.join(__dirname, "Task.cjs"),
      join: {
        from: "users.id",
        to: "tasks.creatorId",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "password"],
      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1 },
        lastName: { type: "string", minLength: 1 },
        email: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 3 },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }
};
